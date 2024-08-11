<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */

    public function store(LoginRequest $request): RedirectResponse
    {
        //dd($request);
        $request->authenticate();

        $request->session()->regenerate();
        $user = \App\Models\User::where('email',$request->get('email'))->first();
        \Illuminate\Support\Facades\Session::put('user', $user);
        \Illuminate\Support\Facades\Session::put('user_email', $user->email);
        return redirect()->intended(RouteServiceProvider::HOME); 
    }

    /*public function store(LoginRequest $request)
    {
        $user = \App\Models\Usernew::where('email',$request->get('email'))->first();

        if($user == null){
            return back()->withErrors(['email' => 'Invalid email']);
        }

        if (!Hash::check($request->get('password'), $user->password)){
            return back()->withErrors(['password' => 'Invalid password']);
        }

        else{
            $request->session()->put('user', $user);
            $request->session()->put('user_email', $user->email);
            
            return redirect()->intended(RouteServiceProvider::HOME);
        }
    }*/



    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
}
