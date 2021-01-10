<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Quiz;
use Illuminate\Support\Facades\Auth;

class QuestionController extends Controller
{
    public function index(Quiz $quiz)
    {
        return view('questions.index', [
            'auth_token' => Auth::user()->token->token,
            'quiz' => $quiz
        ]);
    }

    public function store(Quiz $quiz)
    {
        return view('questions.add', [
            'auth_token' => Auth::user()->token->token,
            'quiz' => $quiz
        ]);
    }

    public function edit(Quiz $quiz)
    {
        $quiz['questions'] = $quiz->questions;

        return view('questions.edit', [
            'auth_token' => Auth::user()->token->token,
            'quiz' => $quiz
        ]);
    }
}
