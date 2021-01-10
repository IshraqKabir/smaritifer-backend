<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Quiz extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $casts = [
        'assessment' => 'boolean',
        'retake' => 'boolean',
        'is_featured' => 'boolean',
    ];

    public static function quizzes()
    {
        return Quiz::where('id', '!=', '0')->orderBy('serial')->with('image')->with('baseBadgeImage')->get();
    }

    public function questions()
    {
        return $this->hasMany(Question::class)->with(['image', 'options'])->orderBy('serial');
    }

    public function image()
    {
        return $this->belongsTo(Image::class, 'image_id');
    }

    public function baseBadgeImage()
    {
        return $this->belongsTo(Image::class, 'base_badge_image_id');
    }

    // set serial after new quiz created
    // or set serial any time
    public function setSerial($from, $to = 1)
    {
        $quizzes = Quiz::all();

        for ($i = 0; $i < $quizzes->count(); $i++) {
            if ($quizzes[$i]->id == $this->id) {
            } else if ($from == 0) {
                $quizzes[$i]->serial++;
                $quizzes[$i]->save();
            } else if ($from < $to) {
                if ($quizzes[$i]->serial > $from && $quizzes[$i]->serial <= $to) {
                    $quizzes[$i]->serial--;
                    $quizzes[$i]->save();
                }
            } else {
                if ($quizzes[$i]->serial >= $to && $quizzes[$i]->serial < $from) {
                    $quizzes[$i]->serial++;
                    $quizzes[$i]->save();
                }
            }
        }

        $this->serial = $to;
        $this->save();
    }

    // set serial after quiz deleted 
    public function resetSerial()
    {
        $quizzes = Quiz::all();

        for ($i = 0; $i < $quizzes->count(); $i++) {
            if ($quizzes[$i]->serial > $this->serial) {
                $quizzes[$i]->serial--;
                $quizzes[$i]->save();
            }
        }
    }
}
