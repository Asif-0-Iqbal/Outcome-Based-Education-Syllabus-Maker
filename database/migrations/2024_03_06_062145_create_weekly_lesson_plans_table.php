<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('weekly_lesson_plans', function (Blueprint $table) {
            $table->id();
            $table->string('CourseCode'); 
            $table->string('Week');  
            $table->text('Topics');   
            $table->text('SpecificOutcomes');   
            $table->string('teaching_strategy');   
            $table->string('teaching_aid');  
            $table->string('assessment_strategy');
            $table->string('mapping');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('weekly_lesson_plans');
    }
};
