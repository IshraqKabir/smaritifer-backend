<?php

namespace App\Http\Controllers;

use App\Models\Quiz;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;

class QuizController extends Controller
{
    public function store()
    {
        dd(Auth::user);
        return view('quiz.add', [
            'auth_token' => Auth::user()->token->token,
            'serial_limit' => Quiz::all()->count() + 1,
        ]);
    }

    public function index()
    {
        return view('quiz.index', [
            'auth_token' => Auth::user()->token->token,
        ]);
    }

    public function edit(Quiz $quiz)
    {
        $quiz['image'] = $quiz->image;
        $quiz['base_badge_image'] = $quiz->baseBadgeImage;

        return view('quiz.edit', [
            'auth_token' => Auth::user()->token->token,
            'quiz' => $quiz,
            'serial_limit' => Quiz::all()->count() + 1,
        ]);
    }
}
