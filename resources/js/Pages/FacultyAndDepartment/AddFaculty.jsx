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

export default function AddFaculty({ message, auth }) {
    const { courses, teachers, teacherCourses, teacherCoursesChairman } = usePage().props;

    const [notification, setNotification] = useState(null);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        dean: '',
        deanMessage: '',
    });

    const submit = async (e) => {
        e.preventDefault();
        await post(route('createFaculty'));
        setNotification('Faculty Added Successfully!');
        setTimeout(() => {
            setNotification(null);
        }, 3000);
        reset();
    };

    const handleCourseSelect = (selectedOption) => {
        setData(prevData => ({
            ...prevData,
            CourseCode: selectedOption, // Update selected course in form data
        }));
    };


    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Add OBE Syllabus</h2>}
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
                                                    Create Faculty
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

                                                <div className="mt-4">
                                                    <InputLabel htmlFor="dean" value="Select Teacher" />

                                                    <select
                                                        id="dean"
                                                        name="dean"
                                                        value={data.dean}
                                                        className='mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm'
                                                        onChange={(e) => setData('dean', e.target.value)}
                                                    >
                                                        <option value="">Select Dean</option>
                                                        {teachers.map((teacher) => (
                                                            <option key={teacher.email} value={teacher.email}>
                                                                {teacher.name}
                                                            </option>
                                                        ))}
                                                    </select>

                                                    <InputError message={errors.email} className="mt-2" />
                                                </div>

                                                <div>
                                                    <InputLabel htmlFor="deanMessage" value="Prerequisites" />

                                                    <TextArea
                                                        id="deanMessage"
                                                        name="deanMessage"
                                                        value={data.deanMessage}
                                                        className="mt-1 block w-full"
                                                        autoComplete="deanMessage"
                                                        onChange={(e) => setData('deanMessage', e.target.value)}
                                                    />

                                                    <InputError message={errors.Prerequisites} className="mt-2" />
                                                </div>


                                                <div className="flex items-center justify-end mt-4">
                                                    <PrimaryButton className="ms-4" disabled={processing}>
                                                        Create Faculty
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