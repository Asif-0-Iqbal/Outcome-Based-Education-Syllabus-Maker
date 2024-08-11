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

import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo, faSquareCheck, faInfo, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export default function CourseObjective({ message, auth }) {
    const { course } = usePage().props;
    console.log(course);

    const { data, setData, post, processing, errors, reset } = useForm({
        CourseCode: course.CourseCode,
        Prerequisites: course.Prerequisites,
        Summary: course.Summary,
    });

    const submit = (e) => {
        e.preventDefault(); 
        post(route('storeBasicEdits', { courseCode: course.CourseCode }));
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
                                href={route('courseView', { courseCode: course.CourseCode })}>
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
                                                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                                                    Basic Info of {course.CourseCode}
                                                    <span
                                                        className="ml-2"
                                                        data-tooltip-id='tooltip'
                                                        data-tooltip-content={`To update, just write again and click the button`}
                                                    >
                                                        <FontAwesomeIcon icon={faCircleInfo} />
                                                    </span>
                                                    <Tooltip id='tooltip' effect="solid" place="top" style={{ fontSize: '12px' }} />

                                                </h2>

                                                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                                    Edit Basic Info of {course.CourseCode} from here.
                                                </p>
                                            </header>
                                            <form onSubmit={submit} className="mt-6 space-y-6">
                                                <div>
                                                    <InputLabel htmlFor="CourseCode" value="Course Code" />

                                                    <TextInput
                                                        id="CourseCode"
                                                        name="CourseCode"
                                                        value={course.CourseCode}
                                                        className="mt-1 block w-full"
                                                        autoComplete="CourseCode"
                                                        onChange={(e) => setData('CourseCode', e.target.value)}
                                                        required
                                                        disabled
                                                    />

                                                    <InputError message={errors.CourseCode} className="mt-2" />
                                                </div>

                                                <div>
                                                    <InputLabel htmlFor="Prerequisites" value="Prerequisites" />

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
                                                    <InputLabel htmlFor="Summary" value="Summary" />

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

                                                <div className="flex items-center justify-end mt-4">
                                                    <PrimaryButton className="ms-4" disabled={processing}>
                                                        Save
                                                    </PrimaryButton>
                                                </div>
                                            </form>
                                        </div>
                                        <div>
                                            <header>
                                                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Selected Course Objective</h2>
                                                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                                    {course.CourseCode} is selected to be updated.
                                                </p>
                                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 mt-5 table-auto">
                                                    <thead>
                                                        <tr className="bg-gray-50 dark:bg-gray-800">
                                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Prerequisites</th>
                                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Summary</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700">
                                                        <tr className={'bg-gray-50 dark:bg-gray-800'}>
                                                            <td className="px-6 py-4 whitespace-wrap text-sm text-gray-900 dark:text-gray-400">{course.Prerequisites}</td>
                                                            <td className="px-6 py-4 whitespace-wrap text-sm text-gray-900 dark:text-gray-400">{course.Summary}</td>
                                                        </tr>

                                                    </tbody>
                                                </table>
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