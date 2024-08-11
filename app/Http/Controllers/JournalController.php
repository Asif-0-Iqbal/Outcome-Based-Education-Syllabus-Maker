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
use App\Models\Course;
use App\Models\TeacherCourse;
use App\Models\AddedCourses;
use App\Models\CourseObjective;
use App\Models\CourseLearningOutcome;

use Barryvdh\DomPDF\Facade\Pdf;

class JournalController extends Controller
{
    //AddPaperPage
    public function AddPaperPage(): Response
    {
        $teachers = \App\Models\Teacher::all();
        $users = \App\Models\User::where('role', 'teacher')->get();
        
        return Inertia::render('Journals/AuthorBoard', [
            'teachers' => $teachers,          
            'users' => $users,
        ]);
    }

    public function AddPaper(): Response
    {
        $teachers = \App\Models\Teacher::all();
        $users = \App\Models\User::where('role', 'teacher')->get();
        
        return Inertia::render('Journals/AuthorBoard', [
            'teachers' => $teachers,          
            'users' => $users,
        ]);
    }
}
