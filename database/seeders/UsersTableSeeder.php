<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        DB::table('users')->insert([
            [
                'name' => 'John Doe',
                'email' => 'john@example.com',
                'role' => 'admin',
                'banglaName' => 'জন ডো',
                'password' => Hash::make('admin'),
                'gender' => 'Male',
                'mobile' => '0123456789',
                'nationality' => 'Bangladeshi',
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);
    }
}
