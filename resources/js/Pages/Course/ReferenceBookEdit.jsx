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

import SecondaryButton from '@/Components/SecondaryButton';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

export default function ReferenceBookEdit({ message, auth }) {
    const { selectedBook } = usePage().props;
    //console.log(referencebooks);

    const { data, setData, post, processing, errors, reset } = useForm({
        CourseCode: selectedBook.CourseCode,
        Sl_No: selectedBook.Sl_No,
        BookName: selectedBook.BookName,
        Author: selectedBook.Author,
        File: null, // New state for file upload
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('UpdateReferenceBook', { book: selectedBook.id }));
    };


    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this course objective?')) {
            router.delete(route('deleteReferenceBook', { book: id }));
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
                                                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Reference Books</h2>

                                                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                                    Editing a reference book.
                                                </p>
                                            </header>
                                            <form onSubmit={submit} className="mt-6 space-y-6" encType="multipart/form-data">
                                                <div>
                                                    <InputLabel htmlFor="CourseCode" value="Course Code" />

                                                    <TextInput
                                                        id="CourseCode"
                                                        name="CourseCode"
                                                        value={data.CourseCode}
                                                        className="mt-1 block w-full"
                                                        autoComplete="CourseCode"
                                                        onChange={(e) => setData('CourseCode', e.target.value)}
                                                        required
                                                        disabled
                                                    />

                                                    <InputError message={errors.CourseCode} className="mt-2" />
                                                </div>

                                                <div>
                                                    <InputLabel htmlFor="Sl_No" value="Sl_No" />

                                                    <NumberInput
                                                        id="Sl_No"
                                                        name="Sl_No"
                                                        value={data.Sl_No}
                                                        className="mt-1 block w-full"
                                                        autoComplete="Sl_No"
                                                        isFocused={true}
                                                        onChange={(e) => setData('Sl_No', e.target.value)}
                                                        required
                                                        placeholder="Example: 1"
                                                    />

                                                    <InputError message={errors.Sl_No} className="mt-2" />
                                                </div>

                                                <div>
                                                    <InputLabel htmlFor="BookName" value="BookName" />

                                                    <TextInput
                                                        id="BookName"
                                                        name="BookName"
                                                        value={data.BookName}
                                                        className="mt-1 block w-full"
                                                        autoComplete="BookName"
                                                        onChange={(e) => setData('BookName', e.target.value)}
                                                        required
                                                    />

                                                    <InputError message={errors.BookName} className="mt-2" />
                                                </div>

                                                <div>
                                                    <InputLabel htmlFor="Author" value="Author, Edition and other info" />

                                                    <TextInput
                                                        id="Author"
                                                        name="Author"
                                                        value={data.Author}
                                                        className="mt-1 block w-full"
                                                        autoComplete="Author"
                                                        onChange={(e) => setData('Author', e.target.value)}
                                                        required
                                                    />

                                                    <InputError message={errors.Author} className="mt-2" />
                                                </div>
                                                {/* 
                                                <div>
                                                    <InputLabel htmlFor="File" value="Upload PDF File" />
                                                    <input
                                                        type="file"
                                                        id="File"
                                                        name="File"
                                                        className="mt-1 block w-full"
                                                        onChange={(e) => setData('File', e.target.files[0])} // Store selected file in component state
                                                        required
                                                    />
                                                    <InputError message={errors.File} className="mt-2" />
                                                </div>
                                                */}

                                                <div className="flex items-center justify-end mt-4">
                                                    <PrimaryButton className="ms-4" disabled={processing}>
                                                        Update Reference Book
                                                    </PrimaryButton>
                                                </div>
                                            </form>
                                        </div>
                                        <div>
                                            <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Selected Reference Book</h2>
                                            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                                {selectedBook.BookName} is selected to be updated.
                                            </p>
                                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                                <thead>
                                                    <tr className="bg-gray-50 dark:bg-gray-800">
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">BookName</th>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Author, Edition and other info</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700">
                                                    <tr className='bg-gray-50 dark:bg-gray-800'>
                                                        <td className="px-6 py-4 whitespace-wrap text-sm text-gray-900 dark:text-gray-400">{selectedBook.BookName}</td>
                                                        <td className="px-6 py-4 whitespace-wrap text-sm text-gray-900 dark:text-gray-400">{selectedBook.Author}</td>
                                                        {/*<td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                                    <a href={route('referencebooks.download', { courseCode: courseCode, id: book.id })} className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-700">Download</a>
                                                        </td>*/}
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <Link href={route('referencebooks', { courseCode: selectedBook.CourseCode })}>
                                                <button className="text-green-500 hover:text-green-700 dark:text-green-400 dark:hover:text-green-600">
                                                    Go to all Reference Books
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