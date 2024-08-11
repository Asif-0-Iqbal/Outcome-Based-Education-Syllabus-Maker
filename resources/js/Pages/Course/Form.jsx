import { useState, useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import NumberInput from '@/Components/NumberInput';
import TextArea from '@/Components/TextArea';
import { Head, Link, useForm, usePage } from '@inertiajs/react';

import { Transition } from '@headlessui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

export default function Form({ success, className = '', dept, faculty, course }) {
    const [notification, setNotification] = useState(null);
    const user = usePage().props.auth.user;

    //console.log(faculty);
    //console.log(dept);

    const initialCourseValues = course
        ? {
            CourseCode: course.CourseCode,
            CourseTitle: course.CourseTitle,
            Faculty: course.Faculty,
            Department: course.Department,
            Degree: course.Degree,
            Credit: course.Credit,
            ContactHourPerWeek: course.ContactHourPerWeek,
            Level: course.Level,
            Semester: course.Semester,
            AcademicSession: course.AcademicSession,
            Type: course.Type,
            Type_T_S: course.Type_T_S,
            Prerequisites: course.Prerequisites,
            Summary: course.Summary,
        }
        : {
            CourseCode: '',
            CourseTitle: '',
            Faculty: faculty,
            Department: dept,
            Degree: '',
            Credit: '',
            ContactHourPerWeek: '',
            Level: '',
            Semester: '',
            AcademicSession: '',
            Type: '',
            Type_T_S: '',
            Prerequisites: '',
            Summary: '',
        };

    const { data, setData, post, processing, errors, reset } = useForm(initialCourseValues);


    //const [successMessage, setSuccessMessage] = useState('');

    //const departments = ['Department of Computer Science and Engineering', 'Department of Electronics and Electrical Engineering', 'Department of Electronics and Communication Engineering'];
    //const faculties = ['Faculty of Computer Science and Engineering'];
    const degrees = ['B.Sc. (Engineering) in Computer Science and Engineering', 'B.Sc. (Engineering) in Electronic and Communication Engineering', 'B.Sc. (Engineering) in Electrical and Electronic Engineering'];
    const levels = ['1', '2', '3', '4', '5'];
    const semesters = ['I', 'II'];
    const academicSessions = ['January-June', 'July-December'];

    const submit = async (e) => {
        e.preventDefault();
        if (course) {
            await post(route('UpdateCourse', { id: course.id }));
            setNotification('Course updated successfully!');
        } else {
            await post(route('course.store'));
            setNotification('Course added successfully!');
        }
    };

    /*const [successMessage, setSuccessMessage] = useState('');

    const submit = async (e) => {
        e.preventDefault();
        try {
            const response = await post(route('course.store'));
            if (response.success) {
                setSuccessMessage(response.success);
                // Optionally reset the form after successful submission
                reset();
            }
        } catch (error) {
            // Handle error
        }
    };*/

    return (
        <section className={className}>
            <Head title="Dashboard" />
            {notification && <div className="mb-5 notification"><FontAwesomeIcon icon={faBell} style={{ color: "#FFD43B", }} />&nbsp;{notification}</div>}
            <div >

                {course ? (
                    <header>
                        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Edit Course Info</h2>

                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        Edit Course Info from here.
                        </p>
                    </header>
                ) : (
                    <header>
                        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Add a Course</h2>

                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                            Add courses and OBE syllabus from here.
                        </p>
                    </header>
                )}



                <form onSubmit={submit} className="mt-6 space-y-6">
                    <div>
                        <InputLabel htmlFor="CourseCode" value="Course Code" />

                        <TextInput
                            id="CourseCode"
                            name="CourseCode"
                            value={data.CourseCode}
                            className="mt-1 block w-full"
                            autoComplete="CourseCode"
                            isFocused={true}
                            onChange={(e) => setData('CourseCode', e.target.value)}
                            required
                        />

                        <InputError message={errors.CourseCode} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="CourseTitle" value="Course Title" />

                        <TextInput
                            id="CourseTitle"
                            name="CourseTitle"
                            value={data.CourseTitle}
                            className="mt-1 block w-full"
                            autoComplete="CourseTitle"
                            onChange={(e) => setData('CourseTitle', e.target.value)}
                            required
                        />

                        <InputError message={errors.CourseTitle} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="Faculty" value="Faculty" />

                        <TextInput
                            id="Faculty"
                            name="Faculty"
                            value={data.Faculty}
                            className="mt-1 block w-full"
                            autoComplete="Faculty"
                            onChange={(e) => setData('Faculty', e.target.value)}
                            required
                        />

                        <InputError message={errors.CourseCode} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="Department" value="Department" />

                        <TextInput
                            id="Department"
                            name="Department"
                            value={data.Department}
                            className="mt-1 block w-full"
                            autoComplete="Department"
                            onChange={(e) => setData('Department', e.target.value)}
                            required
                        />

                        <InputError message={errors.Department} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="Degree" value="Degree" />

                        <select
                            id="Degree"
                            name="Degree"
                            value={data.Degree}
                            className='mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm'
                            onChange={(e) => setData('Degree', e.target.value)}
                            required
                        >
                            <option value="">Select Degree</option>
                            {degrees.map((degree, index) => (
                                <option key={index} value={degree}>
                                    {degree}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <InputLabel htmlFor="Credit" value="Credit" />

                        <NumberInput
                            id="Credit"
                            name="Credit"
                            value={data.Credit}
                            className="mt-1 block w-full"
                            autoComplete="Credit"
                            onChange={(e) => setData('Credit', e.target.value)}
                            required
                        />

                        <InputError message={errors.Credit} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="ContactHourPerWeek" value="ContactHourPerWeek" />

                        <NumberInput
                            id="ContactHourPerWeek"
                            name="ContactHourPerWeek"
                            value={data.ContactHourPerWeek}
                            className="mt-1 block w-full"
                            autoComplete="ContactHourPerWeek"
                            onChange={(e) => setData('ContactHourPerWeek', e.target.value)}
                            required
                        />

                        <InputError message={errors.ContactHourPerWeek} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="Level" value="Level" />

                        <select
                            id="Level"
                            name="Level"
                            value={data.Level}
                            className='mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm'
                            onChange={(e) => setData('Level', e.target.value)}
                            required
                        >
                            <option value="">Select Level</option>
                            {levels.map((level, index) => (
                                <option key={index} value={level}>
                                    {level}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="Semester" value="Semester" />

                        <select
                            id="Semester"
                            name="Semester"
                            value={data.Semester}
                            className='mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm'
                            onChange={(e) => setData('Semester', e.target.value)}
                            required
                        >
                            <option value="">Select Semester</option>
                            {semesters.map((semester, index) => (
                                <option key={index} value={semester}>
                                    {semester}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="AcademicSession" value="Academic Session" />

                        <select
                            id="AcademicSession"
                            name="AcademicSession"
                            value={data.AcademicSession}
                            className='mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm'
                            onChange={(e) => setData('AcademicSession', e.target.value)}
                            required
                        >
                            <option value="">Select Academic Session</option>
                            {academicSessions.map((academicSession, index) => (
                                <option key={index} value={academicSession}>
                                    {academicSession}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="Type" value="Core/ Not-Core" />

                        <select
                            id="Type"
                            name="Type"
                            value={data.Type}
                            className='mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm'
                            onChange={(e) => setData('Type', e.target.value)}
                            required
                        >
                            <option value="">Select Core/ Not-Core</option>
                            <option value="Core">Core</option>
                            <option value="Not-Core">Not-Core</option>
                        </select>
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="Type_T_S" value="Theory/ Sessional" />

                        <select
                            id="Type_T_S"
                            name="Type_T_S"
                            value={data.Type_T_S}
                            className='mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm'
                            onChange={(e) => setData('Type_T_S', e.target.value)}
                            required
                        >
                            <option value="">Select Theory/ Sessional</option>
                            <option value="Theory">Theory</option>
                            <option value="Sessional">Sessional</option>
                        </select>
                    </div>

                    <div>
                        <InputLabel htmlFor="Prerequisites" value="Prerequisites (optional)" />

                        <TextArea
                            id="Prerequisites"
                            name="Prerequisites"
                            value={data.Prerequisites}
                            className="mt-1 block w-full"
                            autoComplete="Prerequisites"
                            onChange={(e) => setData('Prerequisites', e.target.value)}
                        />

                        <InputError message={errors.Prerequisites} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="Summary" value="Summary (optional)" />

                        <TextArea
                            id="Summary"
                            name="Summary"
                            value={data.Summary}
                            className="mt-1 block w-full"
                            autoComplete="Summary"
                            onChange={(e) => setData('Summary', e.target.value)}
                        />

                        <InputError message={errors.Summary} className="mt-2" />
                    </div>


                    <div className="text-green-600 dark:text-green-400 mt-2">
                        {success}
                    </div>



                    <div className="flex items-center justify-end mt-4">
                        {course ? (
                            <PrimaryButton className="ms-4" disabled={processing}>
                                Update Course
                            </PrimaryButton>
                        ) : (
                            <PrimaryButton className="ms-4" disabled={processing}>
                                Add Course
                            </PrimaryButton>
                        )}

                    </div>
                </form>

            </div>
        </section>
    );
}