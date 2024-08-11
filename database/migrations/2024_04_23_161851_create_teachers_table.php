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
        Schema::create('teachers', function (Blueprint $table) {
            $table->id();
            $table->string('email');
            $table->string('department');
            $table->string('faculty');
            $table->string('designation');
            $table->string('careerObjective')->nullable();
            $table->string('researchInterest')->nullable();
            $table->string('education')->nullable();
            $table->string('professionalExperiences')->nullable();
            $table->string('publications')->nullable();
            $table->string('awardsAndScholarships')->nullable();
            $table->string('projects')->nullable();
            $table->string('socialNetworks')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('teachers');
    }
};
