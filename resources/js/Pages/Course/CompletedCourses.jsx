import { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, Link } from '@inertiajs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import { router } from '@inertiajs/react'


export default function CompletedCourses({ message, auth }) {
    const { completedCourses } = usePage().props;
    console.log(completedCourses);


    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Workspace</h2>}
        >
            <Head title="Completed Courses for OBE Syllabus" />
            <>
                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6 text-gray-900 dark:text-gray-100">
                                <div className="grid grid-cols-2 md:grid-cols-2 gap-6 lg:gap-8 flex justify-center">
                                    <div>
                                        <p>Hello, The following Courses are completed: </p>
                                        {completedCourses && completedCourses.length > 0 ? (
                                            completedCourses.map(course => (
                                                <li key={course.CourseCode} className="py-3 flex items-center justify-between">
                                                    <span className="text-gray-600 dark:text-gray-400">{course.CourseCode}</span>
                                                    <a href={route('download', { courseCode: course.CourseCode })} className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Preview OBE Syllabus for {courseCode}</a>
                                                                &nbsp;
                                                                <a href={route('downloadWeeklyPlan', { courseCode: course.CourseCode })} className="inline-block bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded">Preview Weekly Plan</a>
                                                                &nbsp; <br /><br />
                                                </li>
                                            ))
                                        ) : (
                                            <li className="py-3 text-gray-600 dark:text-gray-400">No courses added yet.</li>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        </AuthenticatedLayout >
    );
}