import { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, Link, useForm } from '@inertiajs/react';

import { router } from '@inertiajs/react'
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import NumberInput from '@/Components/NumberInput';
import TextArea from '@/Components/TextArea';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import SecondaryButton from '@/Components/SecondaryButton';

export default function CourseLearningOutcomes({ message, auth }) {
    const { courseLearningOutcomes, courseCode } = usePage().props;
    //console.log(courseLearningOutcomes);

    const { data, setData, post, processing, errors, reset } = useForm({
        CourseCode: '',
        CLO_ID: '',
        CLO_Description: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('store.clo', { courseCode: courseCode }));
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this course objective?')) {
            router.delete(route('deleteCLO', { clo: id }));
        }
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
                                                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Course Learnng Outcome (CLO)</h2>

                                                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                                    Add Course Learnng Outcome (CLO) for {courseCode} from here.
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
                                                    <InputLabel htmlFor="CLO_ID" value="Course Learning Outcome (CLO) ID" />

                                                    <TextInput
                                                        id="CLO_ID"
                                                        name="CLO_ID"
                                                        value={data.CLO_ID}
                                                        className="mt-1 block w-full"
                                                        autoComplete="CLO_ID"
                                                        isFocused={true}
                                                        onChange={(e) => setData('CLO_ID', e.target.value)}
                                                        required
                                                        placeholder="Example: CLO 1"
                                                    />

                                                    <InputError message={errors.CLO_ID} className="mt-2" />
                                                </div>

                                                <div>
                                                    <InputLabel htmlFor="CO_Description" value="Description" />

                                                    <TextArea
                                                        id="CLO_Description"
                                                        name="CLO_Description"
                                                        value={data.CLO_Description}
                                                        className="mt-1 block w-full"
                                                        autoComplete="CLO_Description"
                                                        onChange={(e) => setData('CLO_Description', e.target.value)}
                                                        required
                                                    />

                                                    <InputError message={errors.CLO_Description} className="mt-2" />
                                                </div>

                                                <div className="flex items-center justify-end mt-4">
                                                    <PrimaryButton className="ms-4" disabled={processing}>
                                                        Add Course Learning Outcome
                                                    </PrimaryButton>
                                                </div>
                                            </form>
                                        </div>
                                        <div>
                                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                                <thead>
                                                    <tr className="bg-gray-50 dark:bg-gray-800">
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">CLO ID</th>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">CLO Description</th>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Edit</th>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Delete</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700">
                                                    {courseLearningOutcomes && courseLearningOutcomes.length > 0 ? (
                                                        courseLearningOutcomes.map((outcome, index) => (
                                                            <tr key={index} className={index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-800' : 'bg-white dark:bg-gray-800'}>
                                                                <td className="px-6 py-4 whitespace-wrap text-sm text-gray-900 dark:text-gray-400">{outcome.CLO_ID}</td>
                                                                <td className="px-6 py-4 whitespace-wrap text-sm text-gray-900 dark:text-gray-400">{outcome.CLO_Description}</td>
                                                                <td className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                                                    <Link href={route('EditCLO', { clo: outcome.id })}>
                                                                        <FontAwesomeIcon icon={faEdit} size="lg" className="text-green-500 hover:text-green-700 dark:text-green-400 dark:hover:text-green-600" />
                                                                    </Link>
                                                                </td>

                                                                <td className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">

                                                                    <button onClick={() => handleDelete(outcome.id)}>
                                                                        <FontAwesomeIcon icon={faTrash} size="lg" className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-600" />
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        ))
                                                    ) : (
                                                        <tr>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-400" colSpan="2">No course learning outcome found.</td>
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