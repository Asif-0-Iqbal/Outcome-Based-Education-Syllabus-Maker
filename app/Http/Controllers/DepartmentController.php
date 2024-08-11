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
use App\Models\CourseObjective;
use App\Models\CourseLearningOutcome;

use Barryvdh\DomPDF\Facade\Pdf;

class DepartmentController extends Controller
{
    //
    public function CreateDeptPage(): Response {
        
        $teachers = \App\Models\User::all();
        $faculties = \App\Models\Faculty::all();
        
        return Inertia::render('FacultyAndDepartment/AddDepartment',[
            'teachers' => $teachers,            
            'faculties' => $faculties,            
        ]);
    }

    public function CreateDept(Request $request)
    {               
        
        $faculty = \App\Models\Department::create([
            'name' => $request->name,
            'code' => $request->code,
            'chairman' => $request->chairman,
            'chairmanMessage' => $request->chairmanMessage,
            'faculty' => $request->faculty,
        ]);
        
        return back();
    }
}
