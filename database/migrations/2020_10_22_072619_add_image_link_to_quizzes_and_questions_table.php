<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddImageLinkToQuizzesAndQuestionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('quizzes', function (Blueprint $table) {
            $table->foreignId('image_id')->unique()->nullable()->constrained('images');
            $table->foreignId('base_badge_image_id')->unique()->nullable()->constrained('images');
        });

        Schema::table('questions', function (Blueprint $table) {
            $table->foreignId('image_id')->unique()->nullable()->constrained('images');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('quizzes_and_questions', function (Blueprint $table) {
            //
        });
    }
}
