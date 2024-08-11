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

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css';

export default function ExamCommittee({ message, auth }) {
    const { courses, teachers, proposals, users } = usePage().props;
    //console.log(courseObjectives);

    const { data, setData, post, processing, errors, reset } = useForm({
        CourseCode: '',
        ExamYear: '',
        Regular_Short: '',
        Chairman: '',
        Member1: '',
        Member2: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('storeProposal'));
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this course objective?')) {
            router.delete(route('deleteCourseObjective', { co: id }));
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
                            <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                                <div className="p-6 text-gray-900 dark:text-gray-100">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 flex justify-center">

                                        <div>
                                            <header>
                                                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                                                    Exam Committee and Proposal
                                                    
                                                    <span
                                                        className="ml-2"
                                                        data-tooltip-id='tooltip'
                                                        data-tooltip-content="If you add existing Course, &#10;Exam Year and Exam type (Regular/short), &#10;it will update the committe for that course &#10;instead of creating new proposal."
                                                    >
                                                        <FontAwesomeIcon icon={faCircleInfo} />
                                                    </span>
                                                    <Tooltip id='tooltip' effect="solid" place="top" style={{ fontSize: '10px' }}/>

                                                </h2>

                                                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                                    Add Exam Committee from here.
                                                </p>

                                            </header>
                                            <form onSubmit={submit} className="mt-6 space-y-6">
                                                <div className="mt-4">
                                                    <InputLabel htmlFor="CourseCode" value="Select Course" />

                                                    <select
                                                        id="CourseCode"
                                                        name="CourseCode"
                                                        value={data.CourseCode}
                                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                                                        onChange={(e) => setData('CourseCode', e.target.value)}
                                                        isFocused={true}
                                                        required
                                                    >
                                                        <option value="">Select Course</option>
                                                        {courses.map((course) => (
                                                            <option
                                                                key={course.CourseCode}
                                                                value={course.CourseCode}
                                                                className='mt-5'
                                                            >
                                                                {course.CourseCode}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    <InputError message={errors.CourseCode} className="mt-2" />
                                                </div>

                                                <div>
                                                    <InputLabel htmlFor="ExamYear" value="Exam Year" />

                                                    <TextInput
                                                        id="ExamYear"
                                                        name="ExamYear"
                                                        value={data.ExamYear}
                                                        className="mt-1 block w-full"
                                                        autoComplete="ExamYear"
                                                        onChange={(e) => setData('ExamYear', e.target.value)}
                                                        required
                                                    />

                                                    <InputError message={errors.ExamYear} className="mt-2" />
                                                </div>

                                                <div className="mt-4">
                                                    <InputLabel htmlFor="Regular_Short" value="Regular_Short" />

                                                    <select
                                                        id="Regular_Short"
                                                        name="Regular_Short"
                                                        value={data.Regular_Short}
                                                        className='mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm'
                                                        onChange={(e) => setData('Regular_Short', e.target.value)}
                                                        required
                                                    >
                                                        <option value="">Select Option</option>
                                                        <option value="Regular">Regular</option>
                                                        <option value="Short">Short</option>
                                                    </select>

                                                    <InputError message={errors.Regular_Short} className="mt-2" />
                                                </div>

                                                <div className="mt-4">
                                                    <InputLabel htmlFor="Chairman" value="Committee Chairman" />

                                                    <select
                                                        id="Chairman"
                                                        name="Chairman"
                                                        value={data.Chairman}
                                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                                                        onChange={(e) => setData('Chairman', e.target.value)}
                                                        required
                                                    >
                                                        <option value="">Select Committee Chairman</option>
                                                        {teachers.map((teacher) => (
                                                            <option key={teacher.email} value={teacher.email}>
                                                                {users.find(user => user.email === teacher.email)?.name || teacher.email}
                                                            </option>
                                                        ))}
                                                    </select>

                                                    <InputError message={errors.Chairman} className="mt-2" />
                                                </div>

                                                <div className="mt-4">
                                                    <InputLabel htmlFor="Member1" value="Select Member1" />

                                                    <select
                                                        id="Member1"
                                                        name="Member1"
                                                        value={data.Member1}
                                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                                                        onChange={(e) => setData('Member1', e.target.value)}
                                                        required
                                                    >
                                                        <option value="">Select Member1</option>
                                                        {teachers.map((teacher) => (
                                                            <option key={teacher.email} value={teacher.email}>
                                                                {users.find(user => user.email === teacher.email)?.name || teacher.email}
                                                            </option>
                                                        ))}
                                                    </select>

                                                    <InputError message={errors.Member1} className="mt-2" />
                                                </div>

                                                <div className="mt-4">
                                                    <InputLabel htmlFor="Member2" value="Select Member2" />

                                                    <select
                                                        id="Member2"
                                                        name="Member2"
                                                        value={data.Member2}
                                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                                                        onChange={(e) => setData('Member2', e.target.value)}
                                                        required
                                                    >
                                                        <option value="">Select Member2</option>
                                                        {teachers.map((teacher) => (
                                                            <option key={teacher.email} value={teacher.email}>
                                                                {users.find(user => user.email === teacher.email)?.name || teacher.email}
                                                            </option>
                                                        ))}
                                                    </select>

                                                    <InputError message={errors.email} className="mt-2" />
                                                </div>

                                                <div className="flex items-center justify-end mt-4">
                                                    <PrimaryButton className="ms-4" disabled={processing}>
                                                        Add Committee
                                                    </PrimaryButton>
                                                </div>
                                            </form>
                                        </div>
                                        <div>
                                            <header>
                                                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Created Proposals</h2>

                                                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                                    Here is a list of proposals you've introduced.
                                                </p>

                                            </header>
                                            <table className="mt-5 min-w-full divide-y divide-gray-200 dark:divide-gray-700 table-auto">
                                                <thead>
                                                    <tr className="bg-gray-50 dark:bg-gray-800">
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Course Code</th>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Exam Year</th>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Regular/ Short</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700">
                                                    {proposals && proposals.length > 0 ? (
                                                        proposals.map((proposal, index) => (
                                                            <tr key={index} className={index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-800' : 'bg-white'}>
                                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-400">{proposal.CourseCode}</td>
                                                                <td className="px-6 py-4 whitespace-wrap text-sm text-gray-900 dark:text-gray-400 break-all">{proposal.ExamYear}</td>
                                                                <td className="px-6 py-4 whitespace-wrap text-sm text-gray-900 dark:text-gray-400 break-all">{proposal.Regular_Short}</td>

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