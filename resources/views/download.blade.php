<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>

    <title>{{ $course->CourseTitle }}</title>
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
$cc = $courseHere->Faculty;
?>
<body style="margin-top: 10mm; margin-right: 10mm; margin-bottom: 10mm; margin-left: 20mm;">
    <table>
        <tbody>
            <tr>
                <td><i>Level {{$courseHere->Level}}</i></td>
                <td><i>Semester {{$courseHere->Semester}}</i></td>
                <td colspan="3" style="text-align: right;"><i>Academic Session</i></td>
                <td><i>{{$courseHere->AcademicSession}}</i></td>
            </tr>
            <tr>
                <td><i>Course Code</i></td>
                <td><i>{{$courseHere->CourseCode}}</i></td>
                <td><i>Course Title</i></td>
                <td><i>{{$courseHere->CourseTitle}}</i></td>
                <td><i>Course Type</i></td>
                <td><i>{{$courseHere->Type}}</i></td>
            </tr>
            <tr>
                <td><i>Credit Value</i></td>
                <td><i>{{$courseHere->Credit}}</i></td>
                <td><i>Contact Hours</i></td>
                <td><i>{{$courseHere->ContactHourPerWeek}} H/W</i></td>
                <td><i>Total Marks</i></td>
                <td><i>{{$courseHere->TotalMarks}}</i></td>
            </tr>
            
        </tbody>
    </table>
    <table>
        <tbody>
            <tr>
                <td style="width: 120px; border-top: none;"><i>Course Instructor</i></td>
                <td style="width: 150px; border-top: none;"><i>{{$courseHere->Instructor}}</i></td>
                <td style="width: 100px; border-top: none;"><i>Prerequisites</i></td>
                <td style="border-top: none;"><i>{{$courseHere->Prerequisites}}</i></td>
            </tr>
        </tbody>
    </table>
    <table style="margin-top: 10px;">
        <tbody>
            <tr>
                <td colspan="2" style="padding-bottom: 10px;">i. &nbsp; Summary of the Course/ Course Description</td>
            </tr>
            <tr>
                <td colspan="2">{{$course->Summary}}</td>
            </tr>
            <tr>
                <td colspan="2" style="padding-bottom: 10px;">ii. &nbsp; Course Objectives (CO) <br/> This course will help students</td>
            </tr>
            @foreach ($courseObjectives as $objective)
            <tr>
                <td style="text-align: center; width: 85px;">{{ $objective->CO_ID }}</td>
                <td style="">{{ $objective->CO_Description }}</td>
            </tr>
            @endforeach
            <tr>
                <td colspan="2" style="padding-bottom: 10px;">iii. &nbsp; Course Learning Outcomes (CLO) <br/>Upon completion of this course, students should be able to</td>
            </tr>
            @foreach ($courseLearningOutcomes as $outcome)
            <tr>
                <td style="text-align: center;">{{ $outcome->CLO_ID }}</td>
                <td >{{ $outcome->CLO_Description }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>
    <div class="times-new-roman">
    <table>        
        <tbody>
            <tr>
                <td colspan="13" style="padding-bottom: 10px; border-top: none;">iv. &nbsp; Mapping/ Alignment PLO vs CLO</td>
            </tr>
            <tr>
                <td rowspan="2" style="width: 210px;">Course Learning Outcomes (CLOs)</td>
                <td colspan="12" style="text-align: center;">Program Learning Outcomes (PLOs)</td>
            </tr>
            <tr>
                @for ($i = 1; $i <= 12; $i++)
                <td>{{ $i }}</td>
                @endfor
            </tr>
            @php
                $clos = [];
                foreach ($PLOvsCLOs as $relationship) {
                    $cloID = $relationship->CLO_ID;
                    if (!isset($clos[$cloID])) {
                        $clos[$cloID] = [];
                    }
                    $clos[$cloID][] = $relationship->PLO_No;
                }
            @endphp

            @foreach ($clos as $cloID => $plos)
            <tr>
                <td>{{ $cloID }}</td>
                @for ($i = 1; $i <= 12; $i++)
                <td>
                    @if (in_array("PLO $i", $plos))
                    <div style="font-family: DejaVu Sans, sans-serif; text-align: center;">√</div><!-- Display tick mark if CLO is aligned with this PLO -->
                    @endif
                </td>
                @endfor
            </tr>
            @endforeach
        </tbody>
    </table>
            </div>

    <table style="margin-top: 10px;">
        <tbody>
            <tr>
                <td colspan="4" style="padding-bottom: 10px;">v. &nbsp; Mapping/ Alignment of Course Content, Teaching Strategy, Assessment Strategy & CLOs</td>
            </tr>
            <tr>
                <td style="font-size: 8px; text-align: center; width: 280px;">Course Content/ Topic</td>
                <td style="font-size: 8px; text-align: center;">Teaching Strategy</td>
                <td style="font-size: 8px; text-align: center;">Assessment Strategy</td>
                <td style="font-size: 8px; text-align: center;">Mapping with CLOs</td>
            </tr>
            @foreach ($courseContents as $contents)
            <tr>
                <td>{{ $contents->content }}</td>
                <td>{{ $contents->teaching_strategy }}</td>
                <td>{{ $contents->assessment_strategy }}</td>
                <td>{{ $contents->mapping }}</td>
            </tr>
            @endforeach
            <tr>
                <td colspan="4" style="padding-bottom: 10px;">v. &nbsp; Reference Books:</td>
            </tr>            
            @foreach ($referencebooks as $book)
            <tr>
                <td colspan="4">&nbsp;&nbsp;&nbsp;&nbsp;{{ $book->Sl_No }}. &nbsp;{{ $book->BookName }} by {{ $book->Author }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>
</body>
</html>
