<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Image;
use App\Models\Option;
use App\Models\Question;
use Illuminate\Http\Request;

class OptionController extends Controller
{
    public function __construct()
    {
        auth()->setDefaultDriver('api');
    }

    public function question_index(Question $question)
    {
        return $question->options;
    }

    public function store(Question $question)
    {
        $data = request()->validate([
            'title' => ['string'],
            'serial' =>  ['integer'],
            'image_id' => ['integer'],
            'is_right' => ['required', 'boolean'],
        ]);

        $option = new Option;

        $option->question_id = $question->id;
        $option->is_right = $data['is_right'];

        if (isset($data['title'])) {
            $option->title = $data['title'];
        }

        if (isset($data['image_id'])) {
            $option->image_id = $data['image_id'];
        }

        $option->save();

        $option->setSerial(0, 1);
        if (isset($data['serial'])) {
            $option->setSerial(1, $data['serial']);
        }

        return $option;
    }

    public function delete(Option $option)
    {
        if ($option->image) {
            $option->image->delete_image();
        }

        $option->resetSerial();
        $option->delete();

        return 'deleted';
    }

    public function setSerial(Option $option, $serial = 1)
    {
        $option->setSerial($option->serial, $serial);

        return $option;
    }

    public function store_image(Option $option, Image $image)
    {
        $option->image_id = $image->id;
        $option->save();

        return $option;
    }

    public function edit(Option $option)
    {
        $data = request()->validate([
            'title' => ['string'],
            'serial' =>  ['integer'],
            'image_id' => ['integer'],
            'is_right' => ['boolean'],
        ]);

        $prev_img_id = $option->image_id;

        if (isset($data['title'])) {
            $option->title = $data['title'];
        }

        if (isset($data['serial'])) {
            $option->serial = $data['serial'];
        }

        if (isset($data['image_id'])) {
            $option->image_id = $data['image_idk'];
        }

        if (isset($data['is_right'])) {
            $option->is_right = $data['is_right'];
        }

        $option->save();

        if (isset($data['image_id']) && $data['image_id'] != $prev_img_id && $prev_img_id) {
            Image::find($prev_img_id)->delete_image();
        }

        if (!isset($data['image_id']) && $option->image) {
            $image = $option->image;
            $option->image_id = null;
            $option->save();
            $image->delete_image();
        }

        return 'success';
    }
}
