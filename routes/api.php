<?php


use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\OptionController;
use App\Http\Controllers\API\QuestionController;
use App\Http\Controllers\API\QuizController;
use App\Http\Controllers\API\ImageController;
use App\Http\Controllers\GoogleAuthController;
use Illuminate\Support\Facades\Route;

Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'
], function ($router) {
    Route::post('login', [AuthController::class, 'login']);
    Route::post('register', [AuthController::class, 'register']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('refresh', [AuthController::class, 'refresh']);
    Route::post('me', [AuthController::class, 'me']);
    Route::post('google/verify', [GoogleAuthController::class, 'verify']);
});

Route::group(['middleware' => 'auth:api'], function () {
    // quiz
    Route::post('quiz/store', [QuizController::class, 'store']);
    Route::get('quizzes', [QuizController::class, 'index']);
    Route::post('quiz/{quiz}/set-serial/{serial?}', [QuizController::class, 'setSerial']);
    Route::delete('quiz/{quiz}/delete', [QuizController::class, 'delete']);
    Route::post('quiz/{quiz}/store-image/{image}', [QuizController::class, 'store_image']);
    Route::post('quiz/{quiz}/edit', [QuizController::class, 'edit']);
    // question
    Route::post('quiz/{quiz}/question/store', [QuestionController::class, 'store']);
    Route::get('quiz/{quiz}/questions', [QuestionController::class, 'quiz_index']);
    Route::post('question/{question}/set-serial/{serial?}', [QuestionController::class, 'setSerial']);
    Route::delete('question/{question}/delete', [QuestionController::class, 'delete']);
    Route::post('question/{question}/store-image/{image}', [QuestionController::class, 'store_image']);
    Route::post('question/{question}/edit', [QuestionController::class, 'edit']);
    // option
    Route::post('question/{question}/option/store', [OptionController::class, 'store']);
    Route::get('question/{question}/options', [OptionController::class, 'question_index']);
    Route::post('option/{option}/set-serial/{serial?}', [OptionController::class, 'setSerial']);
    Route::delete('option/{option}/delete', [OptionController::class, 'delete']);
    Route::post('option/{option}/store-image/{image}', [OptionController::class, 'store_image']);
    Route::post('option/{option}/edit', [OptionController::class, 'edit']);
    // image
    Route::post('image/store', [ImageController::class, 'store']);
    Route::delete('image/{image}/delete', [ImageController::class, 'delete']);
});

Route::get('sample', function() {
    return json_encode("Hello");
});

