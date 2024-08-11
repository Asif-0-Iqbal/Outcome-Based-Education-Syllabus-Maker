<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Usernew;
use App\Models\Teacher;
use App\Models\Student;
use App\Models\Address;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        //dd($request);
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'department' => 'required|string',
            'faculty' => 'required|string',
            'designation' => 'required|string',
            'role' => 'required|string',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'department' => $request->department,
            'faculty' => $request->faculty,
            'designation' => $request->designation,
            'role' => $request->role,
            'password' => Hash::make($request->password),
        ]);

        //event(new Registered($user));

        //Auth::login($user);
        //notify()->success('Welcome to Laravel Notify ⚡️');

        //toast()->success('User added successfully.');

        //return redirect()->route('workspace');
        //return redirect()->back()->with('success', 'HaHaHa');
        //return response()->json(['message' => 'User added successfully']);
        
        //return Inertia::render('UserAdding/UserAddSuccess');
        return back();
    }

    public function addTeacher(Request $request): RedirectResponse
    {
        //dd($request);
        /*$request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'department' => 'required|string',
            'faculty' => 'required|string',
            'designation' => 'required|string',
            'role' => 'required|string',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);*/

        $address = Address::create([
            'email' => $request->email,
            'village' => $request->village,
            'union' => $request->union,
            'upazilla' => $request->upazilla,
            'district' => $request->district,
            'division' => $request->division,
            'postCode' => $request->postCode
        ]);

        $user = User::create([
            'uid' => $request->email,
            'email' => $request->email,
            'name' => $request->name,
            'banglaName' => $request->banglaName,
            'password' => Hash::make($request->mobile),
            'role' => $request->role,
            'gender' => $request->gender,
            'dateOfBirth' => $request->dateOfBirth,
            'mobile' => $request->mobile,
            'nationality' => $request->nationality,
            'address' => $address->email,
        ]);

        $teacher = Teacher::create([
            'email' => $request->email, // Assuming uid is the teacher ID
            'department' => $request->department,
            'faculty' => $request->faculty,
            'designation' => $request->designation
        ]);
        
        return back();
    }

    public function addStudent(Request $request): RedirectResponse
    {
        //dd($request);
        /*$request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'department' => 'required|string',
            'faculty' => 'required|string',
            'designation' => 'required|string',
            'role' => 'required|string',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);*/

        $address = Address::create([
            'email' => $request->email,
            'village' => $request->village,
            'union' => $request->union,
            'upazilla' => $request->upazilla,
            'district' => $request->district,
            'division' => $request->division,
            'postCode' => $request->postCode
        ]);

        $user = User::create([
            'uid' => $request->email,
            'email' => $request->email,
            'name' => $request->name,
            'banglaName' => $request->banglaName,
            'password' => Hash::make($request->mobile),
            'role' => $request->role,
            'gender' => $request->gender,
            'dateOfBirth' => $request->dateOfBirth,
            'mobile' => $request->mobile,
            'nationality' => $request->nationality,
            'address' => $address->email,
        ]);

        $student = Student::create([
            'sid' => $request->sid,
            'email' => $request->email, 
            'faculty' => $request->faculty,
            'degree' => $request->degree,
            'session' => $request->session,
            'level' => $request->level,
            'semester' => $request->semester,
            'section' => $request->section,
            'hall' => $request->hall,
            'residentialStatus' => $request->residentialStatus,
            'boardScholarship' => $request->boardScholarship,
            'financialStatus' => $request->financialStatus,
        ]);
        
        return back();
    }
}
