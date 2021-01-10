<?php

namespace App\Http\Controllers\API;

use App\Models\Image;
use App\Models\Quiz;
use Illuminate\Http\Request;

class QuizController extends Controller
{
    public function __construct()
    {
        auth()->setDefaultDriver('api');
    }

    public function index()
    {
        return Quiz::quizzes();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string',
            'description' => 'required|string',
            'serial' => 'integer',
            'start_at' => 'required|string',
            'end_at' => 'required|string',
            'certificate_title' => 'string',
            'duration' => 'required|date_format:H:i:s',
            'is_featured' => ['required', 'boolean'],
            'retake' => ['required', 'boolean'],
            'assessment' => ['required', 'boolean'],
            'image_id' => ['integer'],
            'base_badge_image_id' => ['integer'],
            'passing_percentage' => ['required', 'integer', 'max:100', 'min:0'],
        ]);

        $quiz = Quiz::create([
            'title' => $data['title'],
            'description' => $data['description'],
            'start_at' => $data['start_at'],
            'end_at' => $data['end_at'],
            'duration' => $data['duration'],
            'is_featured' => $data['is_featured'],
            'retake' => $data['retake'],
            'assessment' => $data['assessment'],
            'passing_percentage' => $data['passing_percentage'],
        ]);

        if (isset($data['image_id'])) {
            $quiz->image_id = $data['image_id'];
        }

        if (isset($data['base_badge_image_id'])) {
            $quiz->base_badge_image_id = $data['base_badge_image_id'];
        }

        if (isset($data['certificate_title'])) {
            $quiz->certificate_title = $data['certificate_title'];
        }

        $quiz->save();

        $quiz->setSerial(0, 1);
        if (isset($data['serial'])) {
            $quiz->setSerial(1, $data['serial']);
        }

        return $quiz;
    }

    public function setSerial(Quiz $quiz, $serial = 1)
    {
        $quiz->setSerial($quiz->serial, $serial);

        return Quiz::quizzes();
    }

    public function delete(Quiz $quiz)
    {
        if ($quiz->image) {
            $quiz->image_id = null;
            $quiz->save();
            $quiz->image->delete_image();
        }

        if ($quiz->baseBadgeImage) {
            $quiz->base_badge_image_id = null;
            $quiz->save();
            $quiz->baseBadgeImage->delete_image();
        }

        $quiz->resetSerial();
        $quiz->delete();

        return 'deleted';
    }

    public function store_image(Quiz $quiz, Image $image)
    {
        $quiz->image_id = $image->id;
        $quiz->save();

        return $quiz;
    }

    public function edit(Quiz $quiz, Request $request)
    {
        $data = $request->validate([
            'title' => 'string',
            'description' => 'string',
            'serial' => 'integer',
            'start_at' => 'string',
            'end_at' => 'string',
            'certificate_title' => 'string',
            'duration' => 'date_format:H:i:s',
            'is_featured' => ['boolean'],
            'retake' => ['boolean'],
            'assessment' => ['boolean'],
            'image_id' => ['integer'],
            'base_badge_image_id' => ['integer'],
            'passing_percentage' => ['integer', 'max:100', 'min:0'],
        ]);

        $quiz->update($data);

        if (isset($data['iimage_id'])) {
            $quiz->image_id = $data['image_id'];
        } else {
            $image = $quiz->image;
            $quiz->image_id = null;
            $quiz->save();
            $image->delete_image();
        }

        if (isset($data['base_badge_image_id'])) {
            $quiz->base_badge_image_id = $data['base_badge_image_id'];
        } else {
            $image = $quiz->baseBadgeImage;
            $quiz->base_badge_image_id = null;
            $quiz->save();
            $image->delete_image();
        }

        $quiz->save();

        $quiz->setSerial($quiz->serial, $data['serial']);

        return $quiz;
    }
}
