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


class RefbookController extends Controller
{
    //
    public function storereferencebooks(Request $request, $courseCode)
    {
        //dd($request->CourseCode);
        $request->validate([
            'CourseCode' => 'required',
            'Sl_No' => 'required',
            'BookName' => 'required',
            'Author' => 'required',
            'File' => 'required|file|mimes:pdf|max:2048', // Validate file input
        ]);

        if ($request->hasFile('File')) {
            // Generate a unique file name
            $fileName = time() . '_' . $request->file('File')->getClientOriginalName();
            //dd($fileName);
            
            // Store the uploaded file in the specified directory ('public/reference_books')
            $filePath = $request->file('File')->storeAs('public/reference_books', $fileName);
            
            // Remove 'public/' from the file path to store in the database
            $filePath = str_replace('public/', '', $filePath);
        } else {
            // File not present in request
            return redirect()->back()->withErrors(['File' => 'Please upload a PDF file.']);
        }
 
        $referencebook = \App\Models\Refbook::create([
            'CourseCode' => $request->CourseCode,
            'Sl_No' => $request->Sl_No,
            'BookName' => $request->BookName,
            'Author' => $request->Author,
            'File' => $filePath, // Store file path in the database
        ]);

        $referencebooks = \App\Models\Refbook::where('CourseCode', $courseCode)->get();
        return Inertia::render('Course/ReferenceBooks', [
            'courseCode' => $courseCode,
            'referencebooks' => $referencebooks,
        ]);
    }

    /*public function downloadReferenceBook($courseCode, $id)
    {
        $referenceBook = \App\Models\Refbook::findOrFail($id);
        $filePath_ = $referenceBook->File;
        //dd($filePath);
        // Extract the filename from the file path
        $filename = basename($filePath_);
        //dd($filename);
        // Manually append the rest of the path
        $filePath = 'C:/inetpub/wwwroot/ToServer/ToServer-main/public/storage/public/reference_books/' . $filename;
        //return response()->download(storage_path($filePath));
        return Storage::download($filePath);
        /*if (Storage::disk('public')->exists($filePath)) {
            return response()->download(storage_path('app/' . $filePath));
        } else {
            abort(404, 'File not found');
        }
    }*/

    public function downloadReferenceBook($courseCode, $id)
    {
        $referenceBook = \App\Models\Refbook::findOrFail($id);
        $filePath = $referenceBook->File;

        // Construct the full file path
        $fullFilePath = 'C:/inetpub/wwwroot/ToServer/ToServer-main/public/storage/public/reference_books/' . basename($filePath);

        if (file_exists($fullFilePath)) {
            return response()->file($fullFilePath);
        } else {
            abort(404, 'File not found');
        }
    }

}
