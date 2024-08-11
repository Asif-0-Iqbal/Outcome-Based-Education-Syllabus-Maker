<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class DepartmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $depts = [
            [
                'name'=>'Computer Science and Engineering',
                'code'=>'CSE',
                'chairman'=>'nitu.hstu@gmail.com',
                'chairmanMessage'=>'Hello, I am chairman ;)',
                'faculty'=>'Computer Science and Engineering'
            ],
            [
                'name'=>'Electronics and Electrical Engineering',
                'code'=>'EEE',
                'chairman'=>'nitu.hstu@gmail.com',
                'chairmanMessage'=>'Hello, I am chairman ;)',
                'faculty'=>'Computer Science and Engineering'
            ],
            [
                'name'=>'Electronics and Communication Engineering',
                'code'=>'ECE',
                'chairman'=>'nitu.hstu@gmail.com',
                'chairmanMessage'=>'Hello, I am chairman ;)',
                'faculty'=>'Computer Science and Engineering'
            ]
        ];

        DB::table('departments')->insert($depts);
    }
}
