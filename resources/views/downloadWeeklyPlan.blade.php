<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>{{ $courseCode }}</title>
    <style>
        table {
            width: 100%;
            border-collapse: collapse;
        }
        th, td {
            border: 1px solid black;
            padding-top: 3px; /* Top padding */
            padding-right: 5px; /* Right padding */
            padding-bottom: 3px; /* Bottom padding */
            padding-left: 6px; /* Left padding */
            font-size: 14px;
        }

        .times-new-roman {
            font-family: "Times New Roman", Georgia, serif;
        }
        .arial-font {
            font-family: Arial, sans-serif;
        }
    </style>
</head>
<?php
$courseHere = \App\Models\Course::where('CourseCode', $courseCode)->first();
//dd($courseHere);
$cc = $courseHere->Faculty;
//dd($cc);
?>
<body style="margin-top: 10mm; margin-right: 10mm; margin-bottom: 10mm; margin-left: 10mm;">
    <table>
        <tbody>
            <tr>
                <td colspan="7" style="text-align: center; border-bottom: none; font-size: 19px;">Hajee Mohammad Danesh Science and Technology University, Dinajpur</td>
            </tr>
            <tr>
                <td colspan="7" style="text-align: center; border-bottom: none; border-top: none; font-size: 19px;">{{$courseHere->Department}}</td>
            </tr>
            <tr>
                <td colspan="7" style="text-align: left; border-bottom: none; border-top: none; font-size: 17px;">Academic Session: {{$courseHere->AcademicSession}}</td>
            </tr>
            <tr>
                <td colspan="7" style="text-align: left; border-bottom: none; border-top: none; font-size: 17px;">Degree: {{$courseHere->Degree}}</td>
            </tr>
            <tr>
                <td colspan="4" style="text-align: left; border-bottom: none; border-top: none; border-right: none; font-size: 17px;">Course Title: {{$courseHere->CourseTitle}}</td>
                <td colspan="3" style="text-align: left; border-bottom: none; border-top: none; border-left: none; font-size: 17px;">Course Code: {{$courseHere->CourseCode}}</td>
            </tr>
            <tr>
                <td colspan="7" style="text-align: left; border-bottom: none; border-top: none; font-size: 17px;">Name of the Course Teacher: {{$courseHere->Instructor}}</td>
            </tr>
            <tr>
                <td colspan="7" style="text-align: center; border-top: none; padding-top: 20px; padding-bottom: 10px; font-size: 17px;">Weekly Lesson Plan</td>
            </tr>
            <tr>
                <td style="text-align: center; width: 15mm;"><i>Date and Week Covered</i></td>
                <td style="text-align: center; width: 60mm;"><i>Topics</i></td>
                <td style="text-align: center; width: 35mm;"><i>Specific Outcomes (What Student will achieve in terms of knowlwdge, skills, and abilities KSA)</i></td>
                <td style="text-align: center; width: 40mm;"><i>Teaching Strategies and Suggested Activities (in relation to each topic or lesson)</i></td>
                <td style="text-align: center; width: 45mm;"><i>Teaching Aids/Tools/Materials (Books, Online Resources, Multimedia, Pictures, Reports, Charts, Newspapers, handouts, etc.)</i></td>
                <td style="text-align: center;"><i>Assessment Technique</i></td>
                <td style="text-align: center;"><i>Alignment with CLOs</i></td>
            </tr>
            @foreach ($weeklyPlans as $weeklyPlan)
            <tr>
                <td>Week-{{ $weeklyPlan->Week }}</td>
                <td>{{ $weeklyPlan->Topics }}</td>
                <td>{{ $weeklyPlan->SpecificOutcomes }}</td>
                <td>{{ $weeklyPlan->teaching_strategy }}</td>
                <td>{{ $weeklyPlan->teaching_aid }}</td>
                <td>{{ $weeklyPlan->assessment_strategy }}</td>
                <td>{{ $weeklyPlan->mapping }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>    
</body>
</html>
