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
use App\Models\CourseObjective;
use App\Models\CourseLearningOutcome;

use Illuminate\Support\Facades\Redirect;

use Barryvdh\DomPDF\Facade\Pdf;

class ExamProposalController extends Controller
{
    //
    public function proposalPage(): Response
    {
        $proposals = \App\Models\ExamProposal::all();
        $committees = \App\Models\ExamCommittee::all();
        //$course = \App\Models\Course::where('CourseCode', $courseCode)->first();

        $user = \App\Models\User::find(session()->get('user'))->first();
        $user_email = $user->email;
        $teacher = \App\Models\Teacher::where('email', $user_email)->first();
        $user_role = $user->role;
        //dd($user_role);
        $teacher_dept = $teacher->department;
        //dd($teacher_dept);
        $dept = \App\Models\Department::where('name', $teacher_dept)->first();
        $dept_code = $dept->code;
        //dd($dept_code);
        $courses = \App\Models\Course::all();
        
        $teachers = \App\Models\Teacher::where('department', $dept->name)->get();
        $users = \App\Models\User::where('role', 'teacher')->get();
        return Inertia::render('ExamProposal/ExamCommittee', [
            'courses' => $courses,
            'teachers' => $teachers,  
            'proposals' => $proposals,         
            'users' => $users,   
        ]);
    }

    public function storeProposal(Request $request): RedirectResponse
    {
        $committee = \App\Models\ExamCommittee::create([
            'Chairman' => $request->Chairman,
            'Member1' => $request->Member1,
            'Member2' => $request->Member2,
        ]);

        $findProposal = \App\Models\ExamProposal::where('CourseCode', $request->CourseCode)
        ->where('ExamYear', $request->ExamYear)
        ->where('Regular_Short', $request->Regular_Short)->first();

        // Create Model1 instance
        if($findProposal){
            $findProposal->CourseCode = $request->CourseCode;
            $findProposal->ExamYear = $request->ExamYear;
            $findProposal->Regular_Short = $request->Regular_Short;
            $findProposal->ExamCommittee = $committee->id;
            $findProposal->save();
        }
        else{
            $proposal = \App\Models\ExamProposal::create([
                'CourseCode' => $request->CourseCode,
                'ExamYear' => $request->ExamYear,
                'Regular_Short' => $request->Regular_Short,
                'ExamCommittee' => $committee->id // Use the ID of Address as the address
            ]);
        }
        

        return back();
    }
}
