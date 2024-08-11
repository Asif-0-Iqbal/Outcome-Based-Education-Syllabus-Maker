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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('email');
            $table->string('avatar')->nullable();
            $table->string('name');
            $table->text('banglaName');
            $table->string('password');
            $table->string('role');
            $table->string('gender');
            $table->string('dateOfBirth')->nullable();
            $table->string('mobile');
            $table->string('nationality');
            $table->string('address')->nullable();
            $table->string('foregnAddress')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
