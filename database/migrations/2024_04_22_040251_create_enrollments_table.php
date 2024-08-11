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
        Schema::create('enrollments', function (Blueprint $table) {
            $table->id();
            $table->string('degree');
            $table->string('level');
            $table->string('semester');
            $table->integer('totalCreditHour');
            $table->integer('creditHourFee');
            $table->integer('totalCreditFee')->nullable();
            $table->integer('otherFees');
            $table->integer('totalSemesterFee')->nullable();
            $table->date('start_date'); // Add the start_date field
            $table->date('end_date');
            $table->string('notice');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('enrollments');
    }
};
