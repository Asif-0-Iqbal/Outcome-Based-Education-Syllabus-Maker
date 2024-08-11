<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;


use App\Models\User;
use App\Models\Usernew;
use App\Models\Teacher;
use App\Models\EnrollmentNotice;
use App\Models\Enrollment;
use App\Models\Student;
use App\Models\Address;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class EnrollmentController extends Controller
{
    //
    public function CreateEnrollmentPage(): Response {
        
        $degrees = \App\Models\Degree::all();
        
        return Inertia::render('Enrollments/AddEnrollment',[
            'degrees' => $degrees,            
        ]);
    }

    public function addEnrollment(Request $request): RedirectResponse
    {
        $notice = EnrollmentNotice::create([
            'degree' => $request->degree,
            'level' => $request->level,
            'semester' => $request->semester,
            'message' => $request->message,
        ]);

        $enrollment = Enrollment::create([
            'degree' => $request->degree,
            'level' => $request->level,
            'semester' => $request->semester,
            'totalCreditHour' => $request->totalCreditHour,
            'creditHourFee' => $request->creditHourFee,
            'totalCreditFee' => ($request->totalCreditHour) * ($request->creditHourFee),
            'otherFees' => $request->otherFees,
            'totalSemesterFee' => (($request->totalCreditHour) * ($request->creditHourFee)) + ($request->otherFees),
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
            'notice' => $notice->id,
        ]);
        
        return back();
    }

    public function gotoPaymentPage($uid) 
    {
        $userC = User::where('id', $uid)->firstOrFail();
        $stuC = Student::where('email', $userC->email)->firstOrFail();
        //return view('exampleHosted', compact('userC', 'stuC'));
        return view('exampleHosted') -> with([
            'userC' => $userC, 
            'stuC' => $stuC
        ]);
    }

    public function successPage() 
    {
        return view('paysuccess');
    }

    
}
