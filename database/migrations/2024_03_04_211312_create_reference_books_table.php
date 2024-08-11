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
        Schema::create('reference_books', function (Blueprint $table) {
            $table->id();
            $table->string('CourseCode');  
            $table->string('Sl_No');
            $table->string('BookName'); 
            $table->string('Author'); 
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reference_books');
    }
};
