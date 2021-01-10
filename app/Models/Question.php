<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    protected $guarded = [];

    public static function questions()
    {
        return Question::where('id', '!=', '0')->orderBy('serial')->with('image')->get();
    }

    public function quiz()
    {
        return $this->belongsTo(Quiz::class);
    }

    public function image()
    {
        return $this->belongsTo(Image::class);
    }

    public function options()
    {
        return $this->hasMany(Option::class)->orderBy('serial');
    }

    public function setSerial($from, $to = 1)
    {
        $questions = $this->quiz->questions;

        foreach ($questions as $question) {
            if ($question->id == $this->id) {
            } else if ($from == 0) {
                $question->serial++;
                $question->save();
            } else if ($from < $to) {
                if ($question->serial > $from && $question->serial <= $to) {
                    $question->serial--;
                    $question->save();
                }
            } else {
                if ($question->serial >= $to && $question->serial < $from) {
                    $question->serial++;
                    $question->save();
                }
            }
        }

        $this->serial = $to;
        $this->save();
    }

    // set serial after quiz deleted 
    public function resetSerial()
    {
        $questions = $this->quiz->questions;

        foreach ($questions as $question) {
            if ($question->serial > $this->serial) {
                $question->serial--;
                $question->save();
            }
        }
    }
}
