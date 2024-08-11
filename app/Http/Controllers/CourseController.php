<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

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

class CourseController extends Controller
{
    //
    public function add(): Response
    {
        //$departments = Department::all();
        //$faculties = Faculty::all();
        $user = User::find(session()->get('user'))->first(); 
        $user_email = $user->email;
        //dd($user_email);
        $courses = \App\Models\Course::where('AddedBy', $user_email)->get();
        $teacherCourses = \App\Models\TeacherCourse::where('email', $user_email)->get();
        
        $addedCourses = \App\Models\AddedCourses::where('email', $user_email)->get();
        $departments = \App\Models\Department::all();
        $faculties = \App\Models\Faculty::all();
        //dd($addedCourses);
        return Inertia::render('Workspace', [
            'courses' => $courses,
            'teacherCourses' => $teacherCourses,
            'addedCourses' => $addedCourses,
            'departments' => $departments,
            'faculties' => $faculties
        ]);
    }
    

    public function addOBE(): Response
    {
        //$departments = Department::all();
        //$faculties = Faculty::all();
        $user = User::find(session()->get('user'))->first(); 
        $user_email = $user->email;
        //dd($user_email);
        $courses = \App\Models\Course::where('AddedBy', $user_email)->get();
        $teacherCourses = \App\Models\TeacherCourse::where('email', $user_email)->get();
        
        $addedCourses = \App\Models\AddedCourses::where('email', $user_email)->get();
        $departments = \App\Models\Department::all();
        $faculties = \App\Models\Faculty::all();
        //dd($addedCourses);
        return Inertia::render('WorkspaceChairman', [
            'courses' => $courses,
            'teacherCourses' => $teacherCourses,
            'addedCourses' => $addedCourses,
            'departments' => $departments,
            'faculties' => $faculties
        ]);
    }

    public function store(Request $request)
    {        
        $user = User::find(session()->get('user'))->first();
        //dd($request);
        //$user_email = $user->email;
        if ($user) {
            $user_email = $user->email;
            //dd($user_email); // This will display the email address
        } else {
            // Handle the case when the user is not found
            //dd("$user_email not found");
        }
        $course = Course::create([
            'CourseCode' => $request->CourseCode,
            'CourseTitle' => $request->CourseTitle,
            'Faculty' => $request->Faculty,
            'Department' => $request->Department,
            'Degree' => $request->Degree,
            'Credit' => $request->Credit,
            'ContactHourPerWeek' => $request->ContactHourPerWeek,
            'Level' => $request->Level,
            'Semester' => $request->Semester,
            'AcademicSession' => $request->AcademicSession,
            'Type' => $request->Type,
            'Type_T_S' => $request->Type_T_S,
            'TotalMarks' => 50.0 * ($request->Credit),
            'Prerequisites' => $request->Prerequisites,
            'Summary' => $request->Summary,
            'AddedBy' => $user_email,
        ]);

        /*$courseUser = TeacherCourse::create([
            'CourseCode' => $request->CourseCode,
            'email' => $user_email,
        ]);*/
        $courseUser = AddedCourses::create([
            'CourseCode' => $request->CourseCode,
            'email' => $user_email,
        ]);

        
        \Illuminate\Support\Facades\Session::put('CourseCode', $request->CourseCode);
        //return redirect()->back()->with('success', 'Course created successfully!'); 
        //return redirect(RouteServiceProvider::WORKSPACE);
        //return Inertia::render('UserAdding/UserAddSuccess');
        //return redirect()->route('success');
        return redirect()->back();
    }

    
    public function EditCourse($id): Response
    {
        $course = \App\Models\Course::where('id', $id)->first();
        //dd($course);
        $courseCode = $course->CourseCode;
        return Inertia::render('Course/EditAddedCourse', [
            'course' => $course,
            'courseCode' => $courseCode,
        ]);
    }

    public function UpdateCourse(Request $request, $id): RedirectResponse {
        // Use $courseCode to perform actions, such as fetching data from the database or any other processing
        // Return a response or render a view as needed
        //dd($request->input('CO_ID'));
        $course = \App\Models\Course::where('id', $id)->first();
        $courseAdder = \App\Models\AddedCourses::where('CourseCode', $course->CourseCode)->first();
        //dd($course->CourseCode);
        $course->CourseCode = $request->CourseCode;
        $course->CourseTitle = $request->CourseTitle;
        $course->Faculty = $request->Faculty;
        $course->Department = $request->Department;
        $course->Degree = $request->Degree;
        $course->Credit = $request->Credit;
        $course->ContactHourPerWeek = $request->ContactHourPerWeek;
        $course->Level = $request->Level;
        $course->Semester = $request->Semester;
        $course->AcademicSession = $request->AcademicSession;
        $course->Type = $request->Type;
        $course->Type_T_S = $request->Type_T_S;
        $course->TotalMarks = 50.0 * ($request->Credit);
        $course->Prerequisites = $request->Prerequisites;
        $course->Summary = $request->Summary;
        $course->save();
        $courseAdder->CourseCode = $request->CourseCode;
        $courseAdder->save();
        return back();
    }

    public function deleteCourse(Request $request, $id): RedirectResponse{
        $course = \App\Models\Course::where('id', $id)->first();
        $teacherCourses = \App\Models\TeacherCourse::where('CourseCode', $course->CourseCode)->first();
        $course->delete();
        if($teacherCourses){
            $teacherCourses->delete();
        }
        
        return back();
    }
    

    public function editBasicInfo($courseCode): Response
    {
        $course = \App\Models\Course::where('CourseCode', $courseCode)->first();
        return Inertia::render('Course/EditBasicInfo', [
            'course' => $course,
            'courseCode' => $courseCode,
        ]);
    }

    public function storeBasicInfo(Request $request, $courseCode): RedirectResponse
    {
        $course = \App\Models\Course::where('CourseCode', $courseCode)->first();
        $course->Prerequisites = $request->Prerequisites;
        $course->Summary = $request->Summary;
        $course->save();
        return back();
    }
    public function success(): Response
    {
        //$departments = Department::all();
        //$faculties = Faculty::all();
        $courseCode = \Illuminate\Support\Facades\Session::get('CourseCode');
        //dd($courseCode);
        return Inertia::render('UserAdding/UserAddSuccess',[
            'courseCode' => $courseCode,
        ]);
    }

    public function courseView($courseCode): Response {
        $course = \App\Models\Course::where('CourseCode', $courseCode)->first();
        
        $completed = \App\Models\Completed::where('CourseCode', $courseCode)->first();
        $courseTitle = $course->CourseTitle;
        $departments = \App\Models\Department::all();
        return Inertia::render('Course/CourseView',[
            'courseCode' => $courseCode,
            'courseTitle' => $courseTitle, // Pass the courseTitle to the frontend
            'course' => $course,
            'departments' => $departments,
            'completed' => $completed,
        ]);
    }

    public function markAsCompleted($courseCode): RedirectResponse {
        $markAsCompletedCourses = \App\Models\Completed::create([
            'CourseCode' => $courseCode,
            'Status' => "completed",
        ]);
        return back();
    }

    

    public function PLOvsCLOPage($courseCode): Response {
        // Use $courseCode to perform actions, such as fetching data from the database or any other processing
        // Return a response or render a view as needed
        //dd($courseCode);
        
        $courseLearningOutcomes = \App\Models\CourseLearningOutcome::where('CourseCode', $courseCode)->get();
        
        $programLearningOutcomes = \App\Models\ProgramLearningOutcome::all();
        
        $PLOvsCLOs = \App\Models\PLOvsCLO::where('CourseCode', $courseCode)->get();
        return Inertia::render('Course/PLOvsCLO',[
            'courseCode' => $courseCode,
            'courseLearningOutcomes' => $courseLearningOutcomes,
            'programLearningOutcomes' => $programLearningOutcomes,
            
            'PLOvsCLOs' => $PLOvsCLOs,
        ]);
    }

    public function storePLOvsCLO(Request $request, $courseCode)
    {                
        $PLOvsCLO = \App\Models\PLOvsCLO::create([            
            'CourseCode' => $courseCode,
            'CLO_ID' => $request->CLO_ID,
            'PLO_No' => $request->PLO_No,
        ]);
        /*
        $PLOvsCLOs = \App\Models\PLOvsCLO::where('CourseCode', $courseCode)->get();
        $courseLearningOutcomes = \App\Models\CourseLearningOutcome::where('CourseCode', $courseCode)->get();
        
        $programLearningOutcomes = \App\Models\ProgramLearningOutcome::all();
        //dd($PLOvsCLOs);
        
        return Inertia::render('Course/PLOvsCLO',[
            'courseCode' => $courseCode,
            'courseLearningOutcomes' => $courseLearningOutcomes,
            'programLearningOutcomes' => $programLearningOutcomes,
            'PLOvsCLOs' => $PLOvsCLOs,
        ]);
        //return redirect()->back()->with('courseObjectives', $courseObjectives);
        */
        return back();
    }

    public function CourseContent($courseCode): Response
    {
        //$departments = Department::all();
        //$faculties = Faculty::all();
        //$courseCode = \Illuminate\Support\Facades\Session::get('CourseCode');
        //dd($courseCode);
        $courseContents = \App\Models\CourseContent::where('CourseCode', $courseCode)->get();
        $courseLearningOutcomes = \App\Models\CourseLearningOutcome::where('CourseCode', $courseCode)->get();
        //dd($courseLearningOutcomes);
        return Inertia::render('Course/CourseContent',[
            'courseCode' => $courseCode,
            'courseLearningOutcomes' => $courseLearningOutcomes,
            'courseContents' => $courseContents,
        ]);
    }
    

    public function storeCourseContent(Request $request, $courseCode)
    {
        $validatedData = $request->validate([
            'CourseCode' => 'required|string',
            'content' => 'required|string',
            'teaching_strategy' => 'nullable|string',
            'assessment_strategy' => 'nullable|string',
            'mapping' => 'nullable|string',
        ]);

        // Create a new course content instance
        $courseContent = \App\Models\CourseContent::create([
            'CourseCode' => $validatedData['CourseCode'],
            'content' => $validatedData['content'],
            'teaching_strategy' => $validatedData['teaching_strategy'] ?? null,
            'assessment_strategy' => $validatedData['assessment_strategy'] ?? null,
            'mapping' => $validatedData['mapping'] ?? null,
        ]);

        //dd($courseContent);
        /*
        $success = "Course content created successfully.";
        $courseContents = \App\Models\CourseContent::where('CourseCode', $courseCode)->get();

        //return redirect()->back()->with('success', 'Course content created successfully.');
        $courseLearningOutcomes = \App\Models\CourseLearningOutcome::where('CourseCode', $courseCode)->get();
        return Inertia::render('Course/CourseContent',[
            'courseCode' => $courseCode,
            'courseLearningOutcomes' => $courseLearningOutcomes,
            'courseContents' => $courseContents,
        ]);*/
        return back();
    }

    public function EditCourseContent($ccid): Response {
        // Use $courseCode to perform actions, such as fetching data from the database or any other processing
        // Return a response or render a view as needed
        //dd($courseCode);
        
        $selectedCC = \App\Models\CourseContent::where('id', $ccid)->first();
        $courseLearningOutcomes = \App\Models\CourseLearningOutcome::where('CourseCode', $selectedCC->CourseCode)->get();
        return Inertia::render('Course/CourseContentEdit',[
            'selectedCC' => $selectedCC,
            'courseLearningOutcomes' => $courseLearningOutcomes
        ]);
    }

    public function UpdateCourseContent(Request $request, $ccid): RedirectResponse {
        // Use $courseCode to perform actions, such as fetching data from the database or any other processing
        // Return a response or render a view as needed
        //dd($request->content);
        //$selectedCC = \App\Models\CourseContent::where('id', $ccid)->first();
        $selectedCC = \App\Models\CourseContent::findOrFail($ccid);
        $selectedCC->CourseCode = $request->CourseCode;
        $selectedCC->content = $request->content;
        $selectedCC->teaching_strategy = $request->teaching_strategy;
        $selectedCC->assessment_strategy = $request->assessment_strategy;
        $selectedCC->mapping = $request->mapping;
        $selectedCC->save();
        return back();
    }

    public function deleteCourseContent(Request $request, $cc): RedirectResponse{
        $selectedCC = \App\Models\CourseContent::where('id', $cc)->first();
        $selectedCC->delete();
        return back();
    }


    public function referencebooks($courseCode): Response {
        // Use $courseCode to perform actions, such as fetching data from the database or any other processing
        // Return a response or render a view as needed
        //dd($courseCode);
        $referencebooks = \App\Models\ReferenceBook::where('CourseCode', $courseCode)->get();
        return Inertia::render('Course/ReferenceBooks',[
            'courseCode' => $courseCode,
            'referencebooks' => $referencebooks,
        ]);
    }

    public function storereferencebooks(Request $request, $courseCode)
    {                
        $referencebook = \App\Models\ReferenceBook::create([          
            'CourseCode' => $courseCode,
            'Sl_No' => $request->Sl_No,
            'BookName' => $request->BookName,
            'Author' => $request->Author,
        ]);
        /*$referencebooks = \App\Models\ReferenceBook::where('CourseCode', $courseCode)->get();
        return Inertia::render('Course/ReferenceBooks',[
            'courseCode' => $courseCode,
            'referencebooks' => $referencebooks,
        ]);*/
        //return redirect()->back()->with('courseObjectives', $courseObjectives);
        return back();
    }

    public function EditReferenceBook($book): Response {
        // Use $courseCode to perform actions, such as fetching data from the database or any other processing
        // Return a response or render a view as needed
        //dd($courseCode);
        $selectedBook = \App\Models\ReferenceBook::where('id', $book)->first();
        return Inertia::render('Course/ReferenceBookEdit',[
            'selectedBook' => $selectedBook,
        ]);
    }

    public function UpdateReferenceBook(Request $request, $book): RedirectResponse {
        // Use $courseCode to perform actions, such as fetching data from the database or any other processing
        // Return a response or render a view as needed
        //dd($request->input('CO_ID'));
        $selectedBook = \App\Models\ReferenceBook::where('id', $book)->first();
        $selectedBook->Sl_No = $request->Sl_No;
        $selectedBook->BookName = $request->BookName;
        $selectedBook->Author = $request->Author;
        $selectedBook->save();
        return back();
    }

    public function deleteReferenceBook(Request $request, $book): RedirectResponse{
        $selectedCLO = \App\Models\ReferenceBook::where('id', $book)->first();
        $selectedCLO->delete();
        return back();
    }

    public function download( $courseCode )
    {
        $course = \App\Models\Course::where('CourseCode', $courseCode)->first();
        $courseObjectives = \App\Models\CourseObjective::where('CourseCode', $courseCode)->get();
        $courseLearningOutcomes = \App\Models\CourseLearningOutcome::where('CourseCode', $courseCode)->get();
        $courseContents = \App\Models\CourseContent::where('CourseCode', $courseCode)->get();
        $referencebooks = \App\Models\ReferenceBook::where('CourseCode', $courseCode)->get();
        $PLOvsCLOs = \App\Models\PLOvsCLO::where('CourseCode', $courseCode)->get();
        //dd($course);
        $data = [
            'course' => $course, 
            'courseCode' => $courseCode,
            'courseObjectives' => $courseObjectives,
            'courseLearningOutcomes' => $courseLearningOutcomes,
            'courseContents' => $courseContents,
            'referencebooks' => $referencebooks,
            'PLOvsCLOs' => $PLOvsCLOs,
        ];
        //dd($data);
        $pdf = PDF::loadView('download', $data)->setPaper('a4', 'portrait');
        
        return $pdf->stream($course->id.' '.$courseCode.'.pdf');
        //return view('download') -> with(['title'=>$courseCode]);
    }

    public function abc(): Response{
    
        //dd("DemoWord");
        $completedCourses = \App\Models\Completed::all();
        return Inertia::render('Course/CompletedCourses',[
            'completedCourses' => $completedCourses,
        ]);
    }
}
