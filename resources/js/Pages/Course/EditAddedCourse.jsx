import { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, Link } from '@inertiajs/react';
import Form from './Form';
//import AddTeacher from './UserAdding/AddTeacher';
//import Register from './Auth/Register';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';



export default function Workspace({ message, auth }) {
    const { courses, departments, faculties, teacherCourses, addedCourses, course } = usePage().props;
    console.log(course);

    //const isChairman = departments.some(department => department.chairman === auth.user.id);
    /*
        let isChairman = false;
        let deptName = '';
        let facultyName = '';
    
        // Check if the user is a chairman
        departments.forEach(department => {
            if (department.chairman == auth.user.id) {
                isChairman = true;
                deptName = department.name;
                faculties.forEach(faculty => {
                    if (department.faculty == faculty.id) {
                        facultyName = faculty.name;
                    }
                });
            }
        });
    
        console.log(facultyName);
    */
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Workspace</h2>}
        >
            <Head title="Workspace" />


            {auth.user.role === "admin" ? (
                <>
                </>
            ) : (
                <>
                    <div className="py-12">
                        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                            <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                                <div className="p-6 text-gray-900 dark:text-gray-100">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 flex justify-center">
                                        {true ? (
                                            <>
                                                <div>
                                                    <Form
                                                        className="max-w-xl"
                                                        course={course}
                                                    />
                                                </div>
                                                <div>
                                                    <header>
                                                        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Selected Course</h2>
                                                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                                            {course.CourseCode} is selected to be updated.
                                                        </p>
                                                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 mt-5 table-auto">
                                                            <thead>
                                                                <tr className="bg-gray-50 dark:bg-gray-800">
                                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Point</th>
                                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Description</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700">
                                                                <tr className={'bg-gray-50 dark:bg-gray-800'}>
                                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-400">Course Code</td>
                                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-400">{course.CourseCode}</td>
                                                                </tr>
                                                                <tr className={'bg-gray-50 dark:bg-gray-800'}>
                                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-400">Course Title</td>
                                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-400">{course.CourseTitle}</td>
                                                                </tr>
                                                                <tr className={'bg-gray-50 dark:bg-gray-800'}>
                                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-400">Department</td>
                                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-400">{course.Department}</td>
                                                                </tr>
                                                                <tr className={'bg-gray-50 dark:bg-gray-800'}>
                                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-400">Faculty</td>
                                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-400">{course.Faculty}</td>
                                                                </tr>
                                                                <tr className={'bg-gray-50 dark:bg-gray-800'}>
                                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-400">Credit</td>
                                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-400">{course.Credit}</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                        <Link href={route('workspace')}>
                                                            <button className="mt-5 text-green-500 hover:text-green-700 dark:text-green-400 dark:hover:text-green-600">
                                                                Go to Add Courses
                                                            </button>
                                                        </Link>
                                                    </header>
                                                </div>
                                            </>) : (
                                            <>
                                                <div>
                                                    <header>
                                                        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Courses Distributed to you</h2>
                                                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                                            The following courses are distributed to you:
                                                        </p>
                                                    </header>
                                                    <ul className="mt-4 divide-y divide-gray-200 dark:divide-gray-700">
                                                        {teacherCourses && teacherCourses.length > 0 ? (
                                                            teacherCourses.map(course => (
                                                                <li key={course.CourseCode} className="py-3 flex items-center justify-between">
                                                                    <span className="text-gray-600 dark:text-gray-400">{course.CourseCode}</span>
                                                                    <span className="ml-2">
                                                                        <FontAwesomeIcon icon={faEdit} className="text-blue-500" />
                                                                    </span>
                                                                    <Link href={route('courseView', { courseCode: course.CourseCode })}>
                                                                        <button className="text-green-500 hover:text-green-700 dark:text-green-400 dark:hover:text-green-600">
                                                                            <FontAwesomeIcon icon={faEye} className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-600" />
                                                                        </button>
                                                                    </Link>
                                                                </li>
                                                            ))
                                                        ) : (
                                                            <li className="py-3 text-gray-600 dark:text-gray-400">No courses added yet.</li>
                                                        )}
                                                    </ul>

                                                </div>
                                            </>)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </AuthenticatedLayout >
    );
}