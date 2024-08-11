<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>

    
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" integrity="sha384-n8MVd4RsNIU0tAv4ct0nTaAbDJwPJzDEaqSD1odI+WdtXRGWt2kTvGFasHpSy3SV" crossorigin="anonymous">

<!-- The loading of KaTeX is deferred to speed up page rendering -->
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js" integrity="sha384-XjKyOOlGwcjNTAIQHIpgOno0Hl1YQqzUOEleOLALmuqehneUG+vnGctmUb0ZY0l8" crossorigin="anonymous"></script>

<!-- To automatically render math in text elements, include the auto-render extension: -->
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/auto-render.min.js" integrity="sha384-+VBxd3r6XgURycqtZ117nYw44OOcIax56Z4dCRWbxyPt0Koah1uHoK0o4+/RRE05" crossorigin="anonymous"
    onload="renderMathInElement(document.body);"></script>

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
        /* Hide the print button when printing */
        @media print {
            #print-button {
                display: none;
            }
        }

        /* Adjust margins and other styles for printing */
        @media print {
            @page {
                size: A4 landscape;
                margin: 10mm; /* Adjust margins as needed */
                margin-bottom: 20mm;
                margin-top: 20mm;
            }
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
<button id="print-button" onclick="printPage()">Print</button>

    <table>
        <tbody>
            <tr>
                <td colspan="6" style="text-align: center; border-bottom: none; font-size: 19px;">Hajee Mohammad Danesh Science and Technology University, Dinajpur</td>
            </tr>
            <tr>
                <td colspan="6" style="text-align: center; border-bottom: none; border-top: none; font-size: 19px;">{{$courseHere->Department}}</td>
            </tr>
            <tr>
                <td colspan="6" style="text-align: center; border-bottom: none; border-top: none; font-size: 19px;">{{$courseHere->Faculty}}</td>
            </tr>
            <tr>
                <td colspan="6" style="text-align: center; border-bottom: none; border-top: none; font-size: 19px;"><i>Question Moderation Form for Final Exam/Term Final Exam</i></td>
            </tr>
            <tr>
                <td colspan="6" style="text-align: left; border-bottom: none; border-top: none; font-size: 17px;">
                Course Title: ...{{$courseHere->CourseTitle}}....... Course Code: ...{{$courseHere->CourseCode}}...... Session: ...{{$proposal->ExamYear}}...... Term/Semester: {{$courseHere->Level}}/{{$courseHere->Semester}} 
                </td>
            </tr>
            <tr>
                <td colspan="6" style="text-align: left; border-top: none; font-size: 17px;">
                Course Teacher: ...{{$courseHere->Instructor}} 
                </td>
            </tr>
            <tr>
                <td colspan="4" style="text-align: center; font-size: 17px;">Section 1</td>
                <td colspan="2" style="text-align: center; font-size: 17px;">Section 2</td>
            </tr>
            <tr>
                <td colspan="4" style="text-align: center; font-size: 17px;">To be completed by Course Teacher</td>
                <td colspan="2" style="text-align: center; font-size: 17px;">To be completed by Moderator(s)</td>
            </tr>
            <tr>
                <td style="font-size: 10px; text-align: center; width: 10mm;">No.</td>
                <td style="font-size: 10px; text-align: center; width: 20mm;">CLOs</td>
                <td style="font-size: 10px; text-align: center; width: 90mm;">Questions</td>
                <td style="font-size: 10px; text-align: center; width: 30mm;">Bloom's Taxonomy</td>
                <td style="font-size: 10px; text-align: center; width: 30mm;">Question(s) addresses the CLO Satisfactorily (Yes/No/NA)</td>
                <td style="font-size: 10px; text-align: center;">Comments</td>
            </tr>            
            <tr>
                <td colspan="6" style="text-align: center; border-top: none; font-size: 19px;">Part A</td>
            </tr>
            @foreach ($ques as $que)
                @if ($que->Section == 'A')
                    <tr>
                        <td>{{ $que->NO_123 }}.{{ $que->NO_ABC }}.</td>
                        <td>{{ $que->ConnectedCLO }}</td>
                        <td>{!! $que->Question !!}</td>
                        <td>{{ $que->Bloom_Taxonomy }}</td>
                        <td>{{ $que->Satisfies_CLO_or_Not }}</td>
                        <td>{{ $que->Comments }}</td>
                    </tr>
                @endif
            @endforeach
                      
            <tr>
                <td colspan="6" style="text-align: center; border-top: none; font-size: 19px;">Part B</td>
            </tr>
            @foreach ($ques as $que)
                @if ($que->Section == 'B')
                    <tr>
                        <td>{{ $que->NO_123 }}.{{ $que->NO_ABC }}.</td>
                        <td>{{ $que->ConnectedCLO }}</td>
                        <td>{!! $que->Question !!}</td>
                        <td>{{ $que->Bloom_Taxonomy }}</td>
                        <td>{{ $que->Satisfies_CLO_or_Not }}</td>
                        <td>{{ $que->Comments }}</td>
                    </tr>
                @endif
            @endforeach
        </tbody>
    </table> 

    
    <!-- JavaScript to handle PDF download -->
    <script>
        function printPage() {
            window.print();
        }
    </script>
</body>
</html>
