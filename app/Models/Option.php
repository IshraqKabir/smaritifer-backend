<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Option extends Model
{
    protected $guarded = [];

    protected $casts = [
        'is_right' => 'boolean',
    ];

    public function Question()
    {
        return $this->belongsTo(Question::class);
   }

    public function image()
    {
        return $this->belongsTo(Image::class);
    }

    // set serial after new quiz created
    // or set serial any time
    public function setSerial($from, $to = 1)
    {
        $options = $this->question->options;

        for ($i = 0; $i < $options->count(); $i++) {
            if ($options[$i]->id == $this->id) {
            } else if ($from == 0) {
                $options[$i]->serial++;
                $options[$i]->save();
            } else if ($from < $to) {
                if ($options[$i]->serial > $from && $options[$i]->serial <= $to) {
                    $options[$i]->serial--;
                    $options[$i]->save();
                }
            } else {
                if ($options[$i]->serial >= $to && $options[$i]->serial < $from) {
                    $options[$i]->serial++;
                    $options[$i]->save();
                }
            }
        }

        $this->serial = $to;
        $this->save();
    }

    // set serial after quiz deleted 
    public function resetSerial()
    {
        $options = $this->question->options;

        for ($i = 0; $i < $options->count(); $i++) {
            if ($options[$i]->serial > $this->serial) {
                $options[$i]->serial--;
                $options[$i]->save();
            }
        }
    }
}
