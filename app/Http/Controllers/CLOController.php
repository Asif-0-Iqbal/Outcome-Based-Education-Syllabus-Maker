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

class CLOController extends Controller
{
    //
    public function CLOPage($courseCode): Response {
        // Use $courseCode to perform actions, such as fetching data from the database or any other processing
        // Return a response or render a view as needed
        //dd($courseCode);
        $courseLearningOutcomes = \App\Models\CourseLearningOutcome::where('CourseCode', $courseCode)->get();
        return Inertia::render('Course/CourseLearningOutcome',[
            'courseCode' => $courseCode,
            'courseLearningOutcomes' => $courseLearningOutcomes,
        ]);
    }

    public function storeCourseLearningOutcome(Request $request, $courseCode)
    {                
        $courseLearningOutcome = CourseLearningOutcome::create([ 
            'CourseCode' => $courseCode,
            'CLO_ID' => $request->CLO_ID,
            'CLO_Description' => $request->CLO_Description,
        ]);
        /*$courseLearningOutcomes = \App\Models\CourseLearningOutcome::where('CourseCode', $courseCode)->get();
        
        return Inertia::render('Course/CourseLearningOutcome',[
            'courseCode' => $courseCode,
            'courseLearningOutcomes' => $courseLearningOutcomes,
        ]);*/
        //return redirect()->back()->with('courseObjectives', $courseObjectives);
        
        return back();
    }

    public function EditCLO($clo): Response {
        // Use $courseCode to perform actions, such as fetching data from the database or any other processing
        // Return a response or render a view as needed
        //dd($courseCode);
        $selectedCLO = \App\Models\CourseLearningOutcome::where('id', $clo)->first();
        return Inertia::render('Course/CLOEdit',[
            'selectedCLO' => $selectedCLO,
        ]);
    }

    public function UpdateCLO(Request $request, $clo): RedirectResponse {
        // Use $courseCode to perform actions, such as fetching data from the database or any other processing
        // Return a response or render a view as needed
        //dd($request->input('CO_ID'));
        $selectedCLO = \App\Models\CourseLearningOutcome::where('id', $clo)->first();
        $selectedCLO->CLO_ID = $request->CLO_ID;
        $selectedCLO->CLO_Description = $request->CLO_Description;
        $selectedCLO->save();
        return back();
    }

    public function deleteCLO(Request $request, $clo): RedirectResponse{
        $selectedCLO = \App\Models\CourseLearningOutcome::where('id', $clo)->first();
        $selectedCLO->delete();
        return back();
    }
}
