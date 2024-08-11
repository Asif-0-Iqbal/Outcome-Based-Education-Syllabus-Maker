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
        Schema::create('exam_proposals', function (Blueprint $table) {
            $table->id();
            $table->string('CourseCode'); 
            $table->string('ExamYear');   
            $table->string('Regular_Short');  
            $table->string('Internal1')->nullable();    
            $table->string('Internal2')->nullable();    
            $table->string('Scrutinizer')->nullable();
            $table->string('External1')->nullable();    
            $table->string('External2')->nullable();     
            $table->string('External3')->nullable();    
            $table->string('ExamCommittee')->nullable();  
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('exam_proposals');
    }
};
