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
        Schema::create('students', function (Blueprint $table) {
            $table->id();
            $table->string('sid');            
            $table->string('email');
            $table->string('faculty');
            $table->string('degree');
            $table->string('session');
            $table->string('level');
            $table->string('semester');
            $table->string('section');
            $table->string('hall');
            $table->string('residentialStatus');
            $table->string('boardScholarship');
            $table->string('financialStatus');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('students');
    }
};
