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


class QuestionController extends Controller
{
    //
    public function getque($courseCode): Response {
        // Use $courseCode to perform actions, such as fetching data from the database or any other processing
        // Return a response or render a view as needed
        //dd($courseCode);
        $ques = \App\Models\Question::where('CourseCode', $courseCode)->get();
        $courseLearningOutcomes = \App\Models\CourseLearningOutcome::where('CourseCode', $courseCode)->get();
        return Inertia::render('Course/Que',[
            'courseCode' => $courseCode,
            'ques' => $ques,
            'courseLearningOutcomes' => $courseLearningOutcomes
        ]);
    }

    public function storeque(Request $request, $courseCode)
    {              
        //dd($request);  
        $que = \App\Models\Question::create([
            'CourseCode' => $courseCode,
            'ExamYear' => $request->ExamYear,
            'Regular_Short' => $request->Regular_Short,
            'Section' => $request->Section,
            'NO_123' => $request->NO_123,
            'NO_ABC' => $request->NO_ABC,
            'Question' => $request->Question,
            'ConnectedCLO' => $request->ConnectedCLO,
            'Bloom_Taxonomy' => $request->Bloom_Taxonomy,
        ]);
        //$ques = \App\Models\Question::where('CourseCode', $courseCode)->get();
        
        /*return Inertia::render('Course/CourseObjective',[
            'courseCode' => $courseCode,
            'courseObjectives' => $courseObjectives,
        ]);*/
        //return redirect()->back()->with('courseObjectives', $courseObjectives);
        /*return Redirect::route('courseObjectiveView',[
            'courseCode' => $courseCode,
            'ques' => $ques,
        ]);*/
        return back();
    }

    public function EditQuestion($queno): Response {
        // Use $courseCode to perform actions, such as fetching data from the database or any other processing
        // Return a response or render a view as needed
        //dd($courseCode);
        $que = \App\Models\Question::where('id', $queno)->first();
        $cc = $que->CourseCode;
        $courseLearningOutcomes = \App\Models\CourseLearningOutcome::where('CourseCode', $cc)->get();
        return Inertia::render('Course/QueEdit',[
            'que' => $que,
            'courseLearningOutcomes' => $courseLearningOutcomes,
        ]);
    }

    public function UpdateQuestion(Request $request, $queno): RedirectResponse {
        // Use $courseCode to perform actions, such as fetching data from the database or any other processing
        // Return a response or render a view as needed
        //dd($request->input('CO_ID'));
        //dd($request);
        $que = \App\Models\Question::where('id', $queno)->first();
        //dd($que);
        $que->CourseCode = $request->CourseCode;
        $que->ExamYear = $request->ExamYear;
        $que->Regular_Short = $request->Regular_Short;
        $que->Section = $request->Section;
        $que->NO_123 = $request->NO_123;
        $que->NO_ABC = $request->NO_ABC;
        $que->Question = $request->Question;
        $que->ConnectedCLO = $request->ConnectedCLO;
        $que->Bloom_Taxonomy = $request->Bloom_Taxonomy;
        $que->save();
        return back();
    }

    public function deleteQuestion(Request $request, $queno): RedirectResponse{
        $que = \App\Models\Question::findOrFail($queno);
        //$cc = $courseObjective->CourseCode;
        $que->delete(); 
    
        
        //$courseObjectives = \App\Models\CourseObjective::where('CourseCode', $cc)->get();
        /*return Inertia::render('Course/CourseObjective',[
            'courseCode' => $cc,
            'courseObjectives' => $courseObjectives,
        ]);*/
        /*return Redirect::route('courseObjectiveView',[
            'courseCode' => $cc,
            'courseObjectives' => $courseObjectives,
        ]);*/
        return back()->with('success', 'deleted');
    }

    public function moderationView(): Response {
        $user = User::find(session()->get('user'))->first(); 
        $user_email = $user->email;
        //dd($user_email);
        $committees = \App\Models\ExamCommittee::where('Chairman', $user_email)->orWhere('Member1', $user_email)->orWhere('Member2', $user_email)->pluck('id');
        $proposals = \App\Models\ExamProposal::whereIn('ExamCommittee', $committees)->get();
        //dd($proposals);
        return Inertia::render('QuestionModeration/View',[
            'proposals' => $proposals,
        ]);
    }

    public function queForModeration($p_id): Response {
        // Use $courseCode to perform actions, such as fetching data from the database or any other processing
        // Return a response or render a view as needed
        //dd($p_id);
        $proposal = \App\Models\ExamProposal::where('id', $p_id)->first();
        $courseCode = $proposal->CourseCode;
        $ques = \App\Models\Question::where('CourseCode', $proposal->CourseCode)->where('ExamYear', $proposal->ExamYear)->where('Regular_Short', $proposal->Regular_Short)->get();
        return Inertia::render('QuestionModeration/QueForModeration',[
            'ques' => $ques,
        ]);
    }

    public function moderateQue($que_id): Response {
        // Use $courseCode to perform actions, such as fetching data from the database or any other processing
        // Return a response or render a view as needed
        //dd($courseCode);
        $que = \App\Models\Question::where('id', $que_id)->first();
        return Inertia::render('QuestionModeration/ModerationForm',[
            'que' => $que,
        ]);
    }

    public function uploadModeration(Request $request, $que_id): RedirectResponse {
        // Use $courseCode to perform actions, such as fetching data from the database or any other processing
        // Return a response or render a view as needed
        //dd($request->input('CO_ID'));
        
        $user = User::find(session()->get('user'))->first(); 
        $user_email = $user->email;
        $que = \App\Models\Question::where('id', $que_id)->first();
        $que->Satisfies_CLO_or_Not = $request->Satisfies_CLO_or_Not;
        $que->Comments = $request->Comments;
        $que->Moderated_By = $user_email;
        $que->save();
        return back();
    }


    public function downloadModerationForm( $p_id )
    {
        $proposal = \App\Models\ExamProposal::where('id', $p_id)->first();
        $courseCode = $proposal->CourseCode;
        $ques = \App\Models\Question::where('CourseCode', $proposal->CourseCode)->where('ExamYear', $proposal->ExamYear)->where('Regular_Short', $proposal->Regular_Short)->get();
        
        //$course = \App\Models\Course::where('CourseCode', $courseCode)->first();
        //$weeklyPlans = \App\Models\WeeklyLessonPlan::where('CourseCode', $courseCode)->get();
        //dd($course);
        $data = [
            'proposal' => $proposal, 
            'courseCode' => $courseCode,
            'ques' => $ques,
        ];
        //dd($data);
        $html = view('downloadModerationForm', $data)->render();
        $pdf = PDF::loadHTML($html)->setPaper('a4', 'landscape')->setOptions(['defaultFont' => 'sans-serif']);
        
        //return $pdf->stream('ModerationForm.pdf');
        //return view('download') -> with(['title'=>$courseCode]);
        return view('downloadModerationForm') -> with([
            'proposal' => $proposal, 
            'courseCode' => $courseCode,
            'ques' => $ques,
        ]);
        /*$html2 = view()->make('downloadModerationForm', $data)->render();
        //$pdf = new TCPDF;
        PDF::SetTitle('Hello World');
        PDF::AddPage();
        PDF::writeHTML($html2,true, false, true, false, "");
        PDF::Output(public_path('demo.pdf'), 'F');
        return response()->download(public_path('demo.pdf'));*/
    }
    
}
