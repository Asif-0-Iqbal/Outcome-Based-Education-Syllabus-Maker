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
use App\Models\CourseObjective;
use App\Models\CourseLearningOutcome;

use Barryvdh\DomPDF\Facade\Pdf;

class FacultyController extends Controller
{
    //
    public function CreateFacultyPage(): Response {
        
        $teachers = \App\Models\Teacher::all();
        
        return Inertia::render('FacultyAndDepartment/AddFaculty',[
            'teachers' => $teachers,            
        ]);
    }

    public function CreateFaculty(Request $request)
    {               
        
        $faculty = \App\Models\Faculty::create([
            'name' => $request->name,
            'dean' => $request->dean,
            'deanMessage' => $request->deanMessage,
        ]);
        
        return back();
    }
}
