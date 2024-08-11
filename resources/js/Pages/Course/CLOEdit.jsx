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

export default function CLOEdit({ message, auth }) {
    const { selectedCLO } = usePage().props;
    //console.log(courseObjective);

    const { data, setData, post, processing, errors, reset } = useForm({
        CourseCode: selectedCLO.CourseCode,
        CLO_ID: selectedCLO.CLO_ID,
        CLO_Description: selectedCLO.CLO_Description,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('UpdateCLO', { clo: selectedCLO.id }));
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
                                                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Edit CLO</h2>

                                                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                                    Edit CLO from here.
                                                </p>
                                            </header>
                                            <form onSubmit={submit} className="mt-6 space-y-6">
                                                <div>
                                                    <InputLabel htmlFor="CourseCode" value="Course Code" />

                                                    <TextInput
                                                        id="CourseCode"
                                                        name="CourseCode"
                                                        value={selectedCLO.CourseCode}
                                                        className="mt-1 block w-full"
                                                        autoComplete="CourseCode"
                                                        onChange={(e) => setData('CourseCode', e.target.value)}
                                                        required
                                                        disabled
                                                    />

                                                    <InputError message={errors.CourseCode} className="mt-2" />
                                                </div>

                                                <div>
                                                    <InputLabel htmlFor="CLO_ID" value="Course Objective ID" />

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
                                                    <InputLabel htmlFor="CLO_Description" value="Description" />

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
                                                        Update Course Learning Outcome (CLO)
                                                    </PrimaryButton>
                                                </div>
                                            </form>
                                        </div>
                                        <div>
                                            <header>
                                                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Selected Course Learning Outcome (CLO)</h2>
                                                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                                    {selectedCLO.CLO_ID} is selected to be updated.
                                                </p>
                                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 mt-5">
                                                    <thead>
                                                        <tr className="bg-gray-50 dark:bg-gray-800">
                                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">CLO ID</th>
                                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">CLO Description</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700">
                                                        <tr className={'bg-gray-50 dark:bg-gray-800'}>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-400">{selectedCLO.CLO_ID}</td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-400">{selectedCLO.CLO_Description}</td>
                                                        </tr>

                                                    </tbody>
                                                </table>
                                                <Link href={route('CLOView', { courseCode: selectedCLO.CourseCode })}>
                                                    <button className="text-green-500 hover:text-green-700 dark:text-green-400 dark:hover:text-green-600">
                                                        Go to all CLOs
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