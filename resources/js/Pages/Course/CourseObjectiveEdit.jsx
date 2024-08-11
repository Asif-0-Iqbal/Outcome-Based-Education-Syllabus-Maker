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

export default function CourseObjective({ message, auth }) {
    const { courseObjective } = usePage().props; 
    console.log(courseObjective);

    const { data, setData, post, processing, errors, reset } = useForm({
        CourseCode: courseObjective.CourseCode,
        CO_ID: courseObjective.CO_ID,
        CO_Description: courseObjective.CO_Description,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('UpdateCourseObjective', { co: courseObjective.id }));
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
                            <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                                <div className="p-6 text-gray-900 dark:text-gray-100">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 flex justify-center">

                                        <div>
                                            <header>
                                                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Course Objectives (CO)</h2>

                                                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                                    Add Course Objectives (COs) for {courseObjective.CourseCode} from here.
                                                </p>
                                            </header>
                                            <form onSubmit={submit} className="mt-6 space-y-6">
                                                <div>
                                                    <InputLabel htmlFor="CourseCode" value="Course Code" />

                                                    <TextInput
                                                        id="CourseCode"
                                                        name="CourseCode"
                                                        value={courseObjective.CourseCode}
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
                                                        Update Course Objective
                                                    </PrimaryButton>
                                                </div>
                                            </form>
                                        </div>
                                        <div>
                                            <header>
                                                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Selected Course Objective</h2>
                                                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                                    {courseObjective.CO_ID} is selected to be updated.
                                                </p>
                                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 mt-5">
                                                    <thead>
                                                        <tr className="bg-gray-50 dark:bg-gray-800">
                                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">CO ID</th>
                                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">CO Description</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700">
                                                        <tr className={'bg-gray-50 dark:bg-gray-800'}>
                                                            <td className="px-6 py-4 whitespace-wrap text-sm text-gray-900 dark:text-gray-400">{courseObjective.CO_ID}</td>
                                                            <td className="px-6 py-4 whitespace-wrap text-sm text-gray-900 dark:text-gray-400">{courseObjective.CO_Description}</td>
                                                        </tr>

                                                    </tbody>
                                                </table>
                                                <Link href={route('courseObjectiveView', { courseCode: courseObjective.CourseCode })}>
                                                    <button className="text-green-500 hover:text-green-700 dark:text-green-400 dark:hover:text-green-600">
                                                        Go to all COs
                                                    </button>
                                                </Link>
                                            </header>
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