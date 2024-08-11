import { useState, useEffect, useRef } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, Link, useForm } from '@inertiajs/react';
import { router } from '@inertiajs/react'
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import NumberInput from '@/Components/NumberInput';
import TextArea from '@/Components/TextArea';
import '@fortawesome/fontawesome-free/css/all.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import katex from 'katex';
import 'katex/dist/katex.min.css';
window.katex = katex;
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css';

export default function Questions({ message, auth }) {
    const { que, courseCode, success, courseLearningOutcomes } = usePage().props;
    console.log(que);

    const { data, setData, post, processing, errors, reset } = useForm({
        Satisfies_CLO_or_Not: '',
        Comments: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('uploadModeration', { que_id: que.id }));
    };



    // Quill modules configuration
    const modules = {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'script': 'sub' }, { 'script': 'super' }],
            [{ 'list': 'bullet' }],
            ['link', 'image'],
            ['formula'],
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
                            <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                                <div className="p-6 text-gray-900 dark:text-gray-100">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 flex justify-center">

                                        <div>
                                            <header>
                                                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Add Moderations</h2>

                                                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                                    Add your valuable comments to moderate the question from here.
                                                </p>

                                            </header>
                                            <form onSubmit={submit} className="mt-6 space-y-6">

                                                <div>
                                                    <InputLabel htmlFor="Satisfies_CLO_or_Not" value="Satisfies_CLO_or_Not" />

                                                    <TextInput
                                                        id="Satisfies_CLO_or_Not"
                                                        name="Satisfies_CLO_or_Not"
                                                        value={data.Satisfies_CLO_or_Not}
                                                        className="mt-1 block w-full"
                                                        autoComplete="Satisfies_CLO_or_Not"
                                                        isFocused={true}
                                                        onChange={(e) => setData('Satisfies_CLO_or_Not', e.target.value)}
                                                        placeholder="Yes/ No/ NA"
                                                        required
                                                    />

                                                    <InputError message={errors.Satisfies_CLO_or_Not} className="mt-2" />
                                                </div>
                                                <div>
                                                    <InputLabel htmlFor="Comments" value="Comments (optional)" />

                                                    <TextArea
                                                        id="Comments"
                                                        name="Comments"
                                                        value={data.Comments}
                                                        className="mt-1 block w-full"
                                                        autoComplete="CO_Description"
                                                        onChange={(e) => setData('Comments', e.target.value)}
                                                    />

                                                    <InputError message={errors.Comments} className="mt-2" />
                                                </div>

                                                <div className="flex items-center justify-end mt-4">
                                                    <PrimaryButton className="ms-4" disabled={processing}>
                                                        Add Moderations
                                                    </PrimaryButton>
                                                </div>
                                            </form>
                                        </div>
                                        <div>
                                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 table-auto">
                                                <thead>
                                                    <tr className="bg-gray-50 dark:bg-gray-800">
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Section & No.</th>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Question</th>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Satisfies CLO?</th>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Comments</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700">
                                                    <tr>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-400">Section-{que.Section}; {que.NO_123}. {que.NO_ABC}</td>
                                                        <td className="px-6 py-4 whitespace-wrap text-sm text-gray-900 dark:text-gray-400 break-all">
                                                            <div dangerouslySetInnerHTML={{ __html: que.Question }} />
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-400">{que.Satisfies_CLO_or_Not}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-400">{que.Comments}</td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                            <Link href={route('questionModerationView')}>
                                                <button className="text-green-500 hover:text-green-700 dark:text-green-400 dark:hover:text-green-600">
                                                    Go to all Proposals
                                                </button>
                                            </Link>
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