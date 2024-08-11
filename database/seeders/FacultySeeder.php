<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class FacultySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $faculties = [
            [
                'name'=>'Computer Science and Engineering',
                'dean'=>'nitu.hstu@gmail.com',
                'deanMessage'=>'Hello, I am dean ;)'
            ]
        ];

        DB::table('faculties')->insert($faculties);
    }
}
