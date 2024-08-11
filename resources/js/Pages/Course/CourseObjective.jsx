import { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, Link, useForm } from '@inertiajs/react';
import { router } from '@inertiajs/react'
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import NumberInput from '@/Components/NumberInput';
import TextArea from '@/Components/TextArea';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash, faArrowLeft } from '@fortawesome/free-solid-svg-icons';


export default function CourseObjective({ message, auth }) {
    const { courseObjectives, courseCode, success } = usePage().props;
    console.log(courseObjectives);

    const { data, setData, post, processing, errors, reset } = useForm({
        CourseCode: '',
        CO_ID: '',
        CO_Description: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('set-syllabus-route.co', { courseCode: courseCode }));
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this course objective?')) {
            router.delete(route('deleteCourseObjective', { co: id }));
        }
    };


    // Quill modules configuration
    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['link', 'image'],
            ['clean']
        ],
    };
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Add OBE Syllabus</h2>}
        >
            <Head title="Workspace" />


            {auth.user.role === "admin" ? (
                <>

                </>
            ) : (
                <>
                    <div className="py-12">
                        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                            <Link
                                href={route('courseView', { courseCode: courseCode })}>
                                <SecondaryButton className="mb-2">
                                    <FontAwesomeIcon icon={faArrowLeft} />
                                    &nbsp;Back
                                </SecondaryButton>
                            </Link>
                            <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                                <div className="p-6 text-gray-900 dark:text-gray-100">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 flex justify-center">

                                        <div>
                                            <header>
                                                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Course Objectives (CO)</h2>

                                                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                                    Add Course Objectives (COs) for {courseCode} from here.
                                                </p>

                                            </header>
                                            <form onSubmit={submit} className="mt-6 space-y-6">
                                                <div>
                                                    <InputLabel htmlFor="CourseCode" value="Course Code" />

                                                    <TextInput
                                                        id="CourseCode"
                                                        name="CourseCode"
                                                        value={courseCode}
                                                        className="mt-1 block w-full"
                                                        autoComplete="CourseCode"
                                                        onChange={(e) => setData('CourseCode', e.target.value)}
                                                        required
                                                        disabled
                                                    />

                                                    <InputError message={errors.CourseCode} className="mt-2" />
                                                </div>

                                                <div>
                                                    <InputLabel htmlFor="CO_ID" value="Course Objective ID" />

                                                    <TextInput
                                                        id="CO_ID"
                                                        name="CO_ID"
                                                        value={data.CO_ID}
                                                        className="mt-1 block w-full"
                                                        autoComplete="CO_ID"
                                                        isFocused={true}
                                                        onChange={(e) => setData('CO_ID', e.target.value)}
                                                        required
                                                        placeholder="Example: CO 1"
                                                    />

                                                    <InputError message={errors.CO_ID} className="mt-2" />
                                                </div>

                                                <div>
                                                    <InputLabel htmlFor="CO_Description" value="Description" />

                                                    <TextArea
                                                        id="CO_Description"
                                                        name="CO_Description"
                                                        value={data.CO_Description}
                                                        className="mt-1 block w-full"
                                                        autoComplete="CO_Description"
                                                        onChange={(e) => setData('CO_Description', e.target.value)}
                                                        required
                                                    />

                                                    <InputError message={errors.CO_Description} className="mt-2" />
                                                </div>



                                                <div className="flex items-center justify-end mt-4">
                                                    <PrimaryButton className="ms-4" disabled={processing}>
                                                        Add Course Objective
                                                    </PrimaryButton>
                                                </div>
                                            </form>
                                        </div>
                                        <div>
                                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 table-auto">
                                                <thead>
                                                    <tr className="bg-gray-50 dark:bg-gray-800">
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">CO ID</th>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">CO Description</th>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Edit</th>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Delete</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700">
                                                    {courseObjectives && courseObjectives.length > 0 ? (
                                                        courseObjectives.map((objective, index) => (
                                                            <tr key={index} className={index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-800' : 'bg-white'}>
                                                                <td className="px-6 py-4 whitespace-wrap text-sm text-gray-900 dark:text-gray-400 ">{objective.CO_ID}</td>
                                                                <td className="px-6 py-4 whitespace-wrap text-sm text-gray-900 dark:text-gray-400 ">{objective.CO_Description}</td>
                                                                <td className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                                                    <Link href={route('EditCourseObjective', { co: objective.id })}>
                                                                        <FontAwesomeIcon icon={faEdit} size="lg" className="text-green-500 hover:text-green-700 dark:text-green-400 dark:hover:text-green-600" />
                                                                    </Link>    
                                                                </td>

                                                                <td className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">

                                                                    <button onClick={() => handleDelete(objective.id)}>
                                                                        <FontAwesomeIcon icon={faTrash} size="lg" className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-600" />
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        ))
                                                    ) : (
                                                        <tr>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-400" colSpan="2">No course objectives found.</td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
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