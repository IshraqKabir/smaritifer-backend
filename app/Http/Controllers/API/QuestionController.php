<?php

namespace App\Http\Controllers\API;

use App\Models\Image;
use App\Models\Question;
use App\Models\Quiz;
use Illuminate\Http\Request;

class QuestionController extends Controller
{
    public function __construct()
    {
        auth()->setDefaultDriver('api');
    }

    public function quiz_index(Quiz $quiz)
    {
        return $quiz->questions;
    }

    public function store(Quiz $quiz)
    {
        $data = request()->validate([
            'question' => 'required|string',
            'marks' => 'required|integer',
            'serial' => 'integer',
            'image_id' => 'integer',
            'answer_type' => 'string|required',
        ]);

        $question = Question::create([
            'question' => $data['question'],
            'marks' => $data['marks'],
            'quiz_id' => $quiz->id,
            'answer_type' => $data['answer_type'],
        ]);

        if (isset($data['image_id'])) {
            $question->image_id = $data['image_id'];
            $question->save();
        }

        $question->setSerial(0, 1);
        if (isset($data['serial'])) {
            $question->setSerial(1, $data['serial']);
        }

        return $question;
    }

    public function delete(Question $question)
    {
        if ($question->image) {
            $question->image->delete_image();
        }

        $question->resetSerial();
        $question->delete();

        return 'deleted';
    }

    public function setSerial(Question $question, $serial = 1)
    {
        $question->setSerial($question->serial, $serial);

        return Question::questions();
    }

    public function store_image(Question $question, Image $image)
    {
        $question->image_id = $image->id;
        $question->save();

        return $question;
    }

    public function edit(Question $question)
    {
        $data = request()->validate([
            'question' => 'string',
            'marks' => 'integer',
            'serial' => 'integer',
            'image_id' => 'integer',
            'answer_type' => 'string',
        ]);

        $prev_img_id = $question->image_id;

        if (isset($data['question'])) {
            $question->question = $data['question'];
        }

        if (isset($data['marks'])) {
            $question->marks = $data['marks'];
        }

        if (isset($data['serial'])) {
            $question->serial = $data['serial'];
        }

        if (isset($data['image_id'])) {
            $question->image_id = $data['image_id'];
        }

        if (isset($data['answer_type'])) {
            $question->answer_type = $data['answer_type'];
        }

        if (isset($data['image_id']) && $data['image_id'] != $prev_img_id && $prev_img_id) {
            Image::find($prev_img_id)->delete_image();
        }

        $question->save();

        if (!isset($data['image_id']) && $question->image) {
            $image = $question->image;
            $question->image_id = null;
            $question->save();
            $image->delete_image();
        }

        return 'success';
    }
}
