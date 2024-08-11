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
        Schema::create('questions', function (Blueprint $table) {
            $table->id();
            $table->string('CourseCode');  
            $table->string('ExamYear');
            $table->string('Regular_Short'); 
            $table->string('Section'); 
            $table->string('NO_123'); 
            $table->string('NO_ABC')->nullable(); 
            $table->text('Question'); 
            $table->text('ConnectedCLO'); 
            $table->string('Bloom_Taxonomy'); 
            $table->string('Satisfies_CLO_or_Not')->nullable(); 
            $table->text('Comments')->nullable(); 
            $table->string('Moderated_By')->nullable(); 
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('questions');
    }
};
