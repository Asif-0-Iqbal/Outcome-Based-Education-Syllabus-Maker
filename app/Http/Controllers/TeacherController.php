<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;



use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Teacher;
use App\Models\Faculty;
use App\Models\Department;

class TeacherController extends Controller
{
    //
    public function CreateTeacherPage(): Response {
        
        $departments = \App\Models\Department::all();
        $faculties = \App\Models\Faculty::all();
        
        return Inertia::render('AddTeacher/AddTeacher',[
            'departments' => $departments,            
            'faculties' => $faculties,            
        ]);
    }
}
