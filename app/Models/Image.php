<?php

namespace App\Models;

use Exception;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    protected $guarded = [];

    public function delete_image()
    {
        $sum = $this->quizzes->count() + $this->questions->count() + $this->options->count();

        if ($sum < 2) {
            $image_link = $this->image_link;

            $image_link = preg_replace('/^storage\//', '', $image_link);

            try {
                unlink(storage_path('app/public/') . $image_link);
            } catch (Exception $e) {
            }

            $this->delete();
        }
    }

    public static function delete_unused_images()
    {
        $images = Image::all();

        foreach ($images as $image) {

            $sum = $image->quizzes->count() + $image->questions->count() + $image->options->count() + $image->quizzesBaseBadgeImage->count();

            if ($sum == 0) {
                $image_link = $image->image_link;

                $image_link = preg_replace('/^storage\//', '', $image_link);

                try {
                    unlink(storage_path('app/public/') . $image_link);
                } catch (Exception $e) {
                }

                $image->delete();
            }
        }
    }

    public function quizzes()
    {
        return $this->hasMany(Quiz::class);
    }

    public function quizzesBaseBadgeImage()
    {
        return $this->hasMany(Quiz::class, 'base_badge_image_id');
    }

    public function questions()
    {
        return $this->hasMany(Question::class);
    }

    public function options()
    {
        return $this->hasMany(Option::class);
    }
}
