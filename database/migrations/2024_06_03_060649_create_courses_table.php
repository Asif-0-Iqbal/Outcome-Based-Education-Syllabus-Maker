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
        Schema::create('courses', function (Blueprint $table) {
            $table->id();
            $table->string('CourseCode');  
            $table->text('CourseTitle');
            $table->string('Faculty');      
            $table->string('Department');       
            $table->string('Degree');          
            $table->float('Credit');          
            $table->float('ContactHourPerWeek');          
            $table->string('Level');          
            $table->string('Semester');         
            $table->string('AcademicSession');          
            $table->string('Type');
            $table->string('Type_T_S'); 
            $table->string('TotalMarks')->nullable();   
            $table->string('Instructor')->nullable(); 
            $table->text('Prerequisites')->nullable(); 
            $table->text('Summary')->nullable(); 
            $table->string('AddedBy')->nullable();  
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('courses');
    }
};
