import { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, Link } from '@inertiajs/react';
import Form from './Course/Form';
import AddTeacher from './UserAdding/AddTeacher';
import Register from './Auth/Register';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import { router } from '@inertiajs/react'


export default function Workspace({ message, auth }) {
    const { courses, departments, faculties, teacherCourses, addedCourses } = usePage().props;
    console.log(addedCourses);

    //const isChairman = departments.some(department => department.chairman === auth.user.id);

    let isChairman = false;
    let deptName = '';
    let facultyName = '';

    // Check if the user is a chairman
    departments.forEach(department => {
        if (department.chairman == auth.user.email) {
            isChairman = true;
            deptName = department.name;
            facultyName = department.faculty;            
        }
    });

    console.log(facultyName);


    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this course?')) {
            router.delete(route('deleteCourse', { id: id }));
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Workspace</h2>}
        >
            <Head title="Workspace" />


            {auth.user.role === "admin" ? (
                <>
                    <div className="py-12">
                        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                            <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                                <div className="p-6 text-gray-900 dark:text-gray-100">
                                    <div className="grid grid-cols-2 md:grid-cols-2 gap-6 lg:gap-8 flex justify-center">
                                        <div>
                                            <AddTeacher
                                                className="max-w-xl" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div className="py-12">
                        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                            <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                                <div className="p-6 text-gray-900 dark:text-gray-100">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 flex justify-center">
                                        {isChairman ? (
                                            <>
                                                <div>
                                                    <Form
                                                        className="max-w-xl"
                                                        dept={deptName}
                                                        faculty={facultyName}
                                                    />
                                                </div>
                                                <div>
                                                    <header>
                                                        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Courses You've Added</h2>
                                                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                                            The following courses are added by you:
                                                        </p>
                                                    </header>
                                                    <ul className="mt-4 divide-y divide-gray-200 dark:divide-gray-700">
                                                        {courses && courses.length > 0 ? (
                                                            courses.map(course => (
                                                                <li key={course.CourseCode} className="py-3 flex items-center justify-between">
                                                                    <span className="text-gray-600 dark:text-gray-400">{course.CourseCode}</span>
                                                                    <span className="ml-2">
                                                                        <Link href={route('EditCourse', { id: course.id })}>
                                                                            <FontAwesomeIcon icon={faEdit} className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-600" />
                                                                        </Link>
                                                                    </span>

                                                                    <span className="ml-2">

                                                                        <button onClick={() => handleDelete(course.id)}>
                                                                            <FontAwesomeIcon icon={faTrash} className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-600" />
                                                                        </button>
                                                                    </span>
                                                                    <Link href={route('courseView', { courseCode: course.CourseCode })}>
                                                                        <button className="text-green-500 hover:text-green-700 dark:text-green-400 dark:hover:text-green-600">
                                                                            <FontAwesomeIcon icon={faEye} className="text-green-500 hover:text-green-700 dark:text-green-400 dark:hover:text-green-600" />
                                                                        </button>
                                                                    </Link>
                                                                </li>
                                                            ))
                                                        ) : (
                                                            <li className="py-3 text-gray-600 dark:text-gray-400">No courses added yet.</li>
                                                        )}
                                                    </ul>

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
                                                                    <Link href={route('courseView', { courseCode: course.CourseCode })}>
                                                                        <button className="text-green-500 hover:text-green-700 dark:text-green-400 dark:hover:text-green-600">
                                                                            <FontAwesomeIcon icon={faEye} className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-600" /> View Course
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