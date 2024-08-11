import React, { useEffect, useState } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

export default function AddTeacher({ className = '' }) {
    const [notification, setNotification] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const user = usePage().props.auth.user;
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        department: '',
        faculty: '',
        designation: '',
        role: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const departments = ['Department of Computer Science and Engineering', 'Department of Electronics and Electrical Engineering', 'Department of Electronics and Communication Engineering'];
    const faculties = ['Faculty of Computer Science and Engineering'];
    const designations = ['Lecturer', 'Assistant Professor', 'Associate Professor', 'Professor'];

    const submit = async (e) => {
        e.preventDefault();

        await post(route('register'));
        setNotification('User Added successfully!');
    };

    

    return (
        <section className={className}>
            <Head title="Add Teacher" />
            {notification && <div className="mb-5 text-green-900 dark:text-green-100"><FontAwesomeIcon icon={faUser} style={{color: "#FFD43B",}} />&nbsp;{notification}</div>}
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">User Adding</h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Add Teachers/ new Admin from here.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">                
                <div>
                    <InputLabel htmlFor="name" value="Name" />

                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />

                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="faculty" value="Faculty" />

                    <select
                        id="faculty"
                        name="faculty"
                        value={data.faculty}
                        className='mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm'
                        onChange={(e) => setData('faculty', e.target.value)}
                        required
                    >
                        <option value="">Select Faculty</option>
                        {faculties.map((faculty, index) => (
                            <option key={index} value={faculty}>
                                {faculty}
                            </option>
                        ))}
                    </select>

                    <InputError message={errors.faculty} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="department" value="Department" />

                    <select
                        id="department"
                        name="department"
                        value={data.department}
                        className='mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm'
                        onChange={(e) => setData('department', e.target.value)}
                        required
                    >
                        <option value="">Select Department</option>
                        {departments.map((department, index) => (
                            <option key={index} value={department}>
                                {department}
                            </option>
                        ))}
                    </select>

                    <InputError message={errors.department} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="designation" value="Designation" />

                    <select
                        id="designation"
                        name="designation"
                        value={data.designation}
                        className='mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm'
                        onChange={(e) => setData('designation', e.target.value)}
                        required
                    >
                        <option value="">Select Designation</option>
                        {designations.map((designation, index) => (
                            <option key={index} value={designation}>
                                {designation}
                            </option>
                        ))}
                    </select>

                    <InputError message={errors.designation} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="role" value="Role" />

                    <select
                        id="role"
                        name="role"
                        value={data.role}
                        className='mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm'
                        onChange={(e) => setData('role', e.target.value)}
                        required
                    >
                        <option value="">Select Role</option>
                        <option value="admin">Admin</option>
                        <option value="teacher">Teacher</option>
                    </select>

                    <InputError message={errors.designation} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password_confirmation" value="Confirm Password" />

                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        required
                    />

                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div>

                <div className="flex items-center justify-end mt-4">
                    <PrimaryButton className="ms-4" disabled={processing}>
                        Register
                    </PrimaryButton>
                </div>
            </form>
        </section>
    );
}
