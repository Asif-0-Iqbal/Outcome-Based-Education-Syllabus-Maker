import { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, Link, useForm } from '@inertiajs/react';

import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import NumberInput from '@/Components/NumberInput';
import TextArea from '@/Components/TextArea';
import CustomDropdown from '@/Components/CustomDropdown';

import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo, faSquareCheck, faInfo } from '@fortawesome/free-solid-svg-icons';

export default function AddTeacher({ message, auth }) {
    const { faculties, departments, teacherCourses, teacherCoursesChairman } = usePage().props;

    const [notification, setNotification] = useState(null);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        banglaName: '',
        gender: '',
        dateOfBirth: '',
        mobile: '',
        nationality: 'Bangladeshi',
        department: '',
        faculty: '',
        designation: '',
        role: 'teacher',
    });

    const genders = ['Male', 'Female', 'Other'];
    const designations = ['Lecturer', 'Assistant Professor', 'Associate Professor', 'Professor'];

    const submit = async (e) => {
        e.preventDefault();
        await post(route('createTeacher'));
        setNotification('Teacher Added Successfully!');
        setTimeout(() => {
            setNotification(null);
        }, 3000);
        reset();
    };


    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Create Teacher</h2>}
        >
            <Head title="Workspace" />


            {auth.user.role === "admin" ? (
                <>
                    <div className="py-12">
                        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                            <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                                <div className="p-6 text-gray-900 dark:text-gray-100">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 flex justify-center">

                                        <div>
                                            {notification && (
                                                <div className="mb-5 text-green-900 dark:text-green-100">
                                                    <FontAwesomeIcon icon={faSquareCheck} style={{ color: "#FFD43B", }} />
                                                    &nbsp;{notification}
                                                </div>
                                            )}
                                            <header>
                                                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                                                    Add Teacher
                                                    <span
                                                        className="ml-2"
                                                        data-tooltip-id='tooltip'
                                                        data-tooltip-content={`If you select existing course and a teacher, it will update the distribution instead of creating new one.`}
                                                    >
                                                        <FontAwesomeIcon icon={faCircleInfo} />
                                                    </span>
                                                    <Tooltip id='tooltip' effect="solid" place="top" style={{ fontSize: '12px' }} />
                                                </h2>

                                                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                                    Distribute Course to Teacher so that they can start uploading OBE syllabus.
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

                                                <div>
                                                    <InputLabel htmlFor="banglaName" value="banglaName" />

                                                    <TextInput
                                                        id="banglaName"
                                                        name="banglaName"
                                                        value={data.banglaName}
                                                        className="mt-1 block w-full"
                                                        autoComplete="banglaName"
                                                        onChange={(e) => setData('banglaName', e.target.value)}
                                                        required
                                                    />

                                                    <InputError message={errors.banglaName} className="mt-2" />
                                                </div>

                                                <div>
                                                    <InputLabel htmlFor="email" value="email" />

                                                    <TextInput
                                                        id="email"
                                                        name="email"
                                                        value={data.email}
                                                        className="mt-1 block w-full"
                                                        autoComplete="email"
                                                        onChange={(e) => setData('email', e.target.value)}
                                                        required
                                                    />

                                                    <InputError message={errors.email} className="mt-2" />
                                                </div>

                                                <div>
                                                    <InputLabel htmlFor="mobile" value="mobile" />

                                                    <TextInput
                                                        id="mobile"
                                                        name="mobile"
                                                        value={data.mobile}
                                                        className="mt-1 block w-full"
                                                        autoComplete="mobile"
                                                        onChange={(e) => setData('mobile', e.target.value)}
                                                        required
                                                    />

                                                    <InputError message={errors.mobile} className="mt-2" />
                                                </div>

                                                <div className="mt-4">
                                                    <InputLabel htmlFor="gender" value="gender" />

                                                    <select
                                                        id="gender"
                                                        name="gender"
                                                        value={data.gender}
                                                        className='mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm'
                                                        onChange={(e) => setData('gender', e.target.value)}
                                                        required
                                                    >
                                                        <option value="">Select gender</option>
                                                        {genders.map((gender, index) => (
                                                            <option key={index} value={gender}>
                                                                {gender}
                                                            </option>
                                                        ))}
                                                    </select>

                                                    <InputError message={errors.gender} className="mt-2" />
                                                </div>

                                                <div>
                                                    <InputLabel htmlFor="nationality" value="nationality" />

                                                    <TextInput
                                                        id="nationality"
                                                        name="nationality"
                                                        value={data.nationality}
                                                        className="mt-1 block w-full"
                                                        autoComplete="nationality"
                                                        onChange={(e) => setData('nationality', e.target.value)}
                                                        required
                                                    />

                                                    <InputError message={errors.nationality} className="mt-2" />
                                                </div>

                                                <div>
                                                    <InputLabel htmlFor="role" value="role" />

                                                    <TextInput
                                                        id="role"
                                                        name="role"
                                                        value={data.role}
                                                        className="mt-1 block w-full"
                                                        autoComplete="role"
                                                        onChange={(e) => setData('role', e.target.value)}
                                                        disabled
                                                    />

                                                    <InputError message={errors.role} className="mt-2" />
                                                </div>


                                                <div className="mt-4">
                                                    <InputLabel htmlFor="department" value="Select department" />

                                                    <select
                                                        id="department"
                                                        name="department"
                                                        value={data.department}
                                                        className='mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm'
                                                        onChange={(e) => setData('department', e.target.value)}
                                                    >
                                                        <option value="">Select department</option>
                                                        {departments.map((department) => (
                                                            <option key={department.name} value={department.name}>
                                                                {department.name}
                                                            </option>
                                                        ))}
                                                    </select>

                                                    <InputError message={errors.department} className="mt-2" />
                                                </div>

                                                <div className="mt-4">
                                                    <InputLabel htmlFor="faculty" value="Select faculty" />

                                                    <select
                                                        id="faculty"
                                                        name="faculty"
                                                        value={data.faculty}
                                                        className='mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm'
                                                        onChange={(e) => setData('faculty', e.target.value)}
                                                    >
                                                        <option value="">Select faculty</option>
                                                        {faculties.map((faculty) => (
                                                            <option key={faculty.name} value={faculty.name}>
                                                                {faculty.name}
                                                            </option>
                                                        ))}
                                                    </select>

                                                    <InputError message={errors.faculty} className="mt-2" />
                                                </div>

                                                <div className="mt-4">
                                                    <InputLabel htmlFor="designation" value="designation" />

                                                    <select
                                                        id="designation"
                                                        name="designation"
                                                        value={data.designation}
                                                        className='mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm'
                                                        onChange={(e) => setData('designation', e.target.value)}
                                                        required
                                                    >
                                                        <option value="">Select designation</option>
                                                        {designations.map((designation, index) => (
                                                            <option key={index} value={designation}>
                                                                {designation}
                                                            </option>
                                                        ))}
                                                    </select>

                                                    <InputError message={errors.designation} className="mt-2" />
                                                </div>



                                                <div className="flex items-center justify-end mt-4">
                                                    <PrimaryButton className="ms-4" disabled={processing}>
                                                        Create Teacher
                                                    </PrimaryButton>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </>
            ) : (
                <>

                </>
            )}
        </AuthenticatedLayout >
    );
}