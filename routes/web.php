<?php

use App\Http\Controllers\OptionController;
use App\Http\Controllers\QuestionController;
use App\Http\Controllers\QuizController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

Route::group(['middleware' => 'auth'], function () {
    // quiz
    Route::get('quiz/store', [QuizController::class, 'store']);
    Route::get('', [QuizController::class, 'index']);
    Route::get('quiz/{quiz}/edit', [QuizController::class, 'edit']);
    // questions
    Route::get('quiz/{quiz}/questions/store', [QuestionController::class, 'store']);
    Route::get('quiz/{quiz}/questions', [QuestionController::class, 'index']);
    Route::get('quiz/{quiz}/questions/edit', [QuestionController::class, 'edit']);
    // options
    Route::get('quiz/{quiz}/question/{question}/options', [OptionController::class, 'index']);
});


Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
