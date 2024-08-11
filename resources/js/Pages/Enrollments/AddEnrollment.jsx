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

export default function AddEnrollment({ message, auth }) {
    const { faculties, degrees, teacherCourses, teacherCoursesChairman } = usePage().props;

    const [notification, setNotification] = useState(null);

    const { data, setData, post, processing, errors, reset } = useForm({
        degree: '',
        level: '',
        semester: '',
        totalCreditHour: '',
        creditHourFee: '',
        otherFees: '',
        start_date: '',
        end_date: '',
        notice: '',
    });
    const levels = ['1', '2', '3', '4', '5'];
    const semesters = ['I', 'II'];

    const submit = async (e) => {
        e.preventDefault();
        await post(route('createEnrollment'));
        setNotification('Teacher Added Successfully!');
        setTimeout(() => {
            setNotification(null);
        }, 3000);
        reset();
    };


    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Create Enrollment</h2>}
        >
            <Head title="Workspace" />


            {auth.user.role === "teacher" ? (
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
                                                    Create Enrollment
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
                                                    Create Enrollment
                                                </p>
                                            </header>
                                            <form onSubmit={submit} className="mt-6 space-y-6">

                                                <div className="mt-4">
                                                    <InputLabel htmlFor="degree" value="Select degree" />

                                                    <select
                                                        id="degree"
                                                        name="degree"
                                                        value={data.degree}
                                                        className='mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm'
                                                        onChange={(e) => setData('degree', e.target.value)}
                                                    >
                                                        <option value="">Select degree</option>
                                                        {degrees.map((degree) => (
                                                            <option key={degree.name} value={degree.name}>
                                                                {degree.name}
                                                            </option>
                                                        ))}
                                                    </select>

                                                    <InputError message={errors.department} className="mt-2" />
                                                </div>

                                                <div className="mt-4">
                                                    <InputLabel htmlFor="level" value="level" />

                                                    <select
                                                        id="level"
                                                        name="level"
                                                        value={data.level}
                                                        className='mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm'
                                                        onChange={(e) => setData('level', e.target.value)}
                                                        required
                                                    >
                                                        <option value="">Select level</option>
                                                        {levels.map((level, index) => (
                                                            <option key={index} value={level}>
                                                                {level}
                                                            </option>
                                                        ))}
                                                    </select>

                                                    <InputError message={errors.level} className="mt-2" />
                                                </div>

                                                <div className="mt-4">
                                                    <InputLabel htmlFor="semester" value="semester" />

                                                    <select
                                                        id="semester"
                                                        name="semester"
                                                        value={data.semester}
                                                        className='mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm'
                                                        onChange={(e) => setData('semester', e.target.value)}
                                                        required
                                                    >
                                                        <option value="">Select semester</option>
                                                        {semesters.map((semester, index) => (
                                                            <option key={index} value={semester}>
                                                                {semester}
                                                            </option>
                                                        ))}
                                                    </select>

                                                    <InputError message={errors.semester} className="mt-2" />
                                                </div>

                                                <div>
                                                    <InputLabel htmlFor="totalCreditHour" value="totalCreditHour" />

                                                    <NumberInput
                                                        id="totalCreditHour"
                                                        name="totalCreditHour"
                                                        value={data.totalCreditHour}
                                                        className="mt-1 block w-full"
                                                        autoComplete="totalCreditHour"
                                                        onChange={(e) => setData('totalCreditHour', e.target.value)}
                                                        required
                                                    />

                                                    <InputError message={errors.totalCreditHour} className="mt-2" />
                                                </div>

                                                <div>
                                                    <InputLabel htmlFor="creditHourFee" value="creditHourFee" />

                                                    <NumberInput
                                                        id="creditHourFee"
                                                        name="creditHourFee"
                                                        value={data.creditHourFee}
                                                        className="mt-1 block w-full"
                                                        autoComplete="creditHourFee"
                                                        onChange={(e) => setData('creditHourFee', e.target.value)}
                                                        required
                                                    />

                                                    <InputError message={errors.creditHourFee} className="mt-2" />
                                                </div>

                                                <div>
                                                    <InputLabel htmlFor="otherFees" value="otherFees" />

                                                    <NumberInput
                                                        id="otherFees"
                                                        name="otherFees"
                                                        value={data.otherFees}
                                                        className="mt-1 block w-full"
                                                        autoComplete="otherFees"
                                                        onChange={(e) => setData('otherFees', e.target.value)}
                                                        required
                                                    />

                                                    <InputError message={errors.otherFees} className="mt-2" />
                                                </div>

                                                <div className="mt-4">
                                                    <InputLabel htmlFor="start_date" value="Start Date" />
                                                    <input
                                                        id="start_date"
                                                        name="start_date"
                                                        type="date"
                                                        value={data.start_date}
                                                        className="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm"
                                                        onChange={(e) => setData('start_date', e.target.value)}
                                                        required
                                                    />
                                                    <InputError message={errors.start_date} className="mt-2" />
                                                </div>

                                                <div className="mt-4">
                                                    <InputLabel htmlFor="end_date" value="End Date" />
                                                    <input
                                                        id="end_date"
                                                        name="end_date"
                                                        type="date"
                                                        value={data.end_date}
                                                        className="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm"
                                                        onChange={(e) => setData('end_date', e.target.value)}
                                                        required
                                                    />
                                                    <InputError message={errors.end_date} className="mt-2" />
                                                </div>

                                                <div>
                                                    <InputLabel htmlFor="notice" value="Notice Message" />

                                                    <TextInput
                                                        id="notice"
                                                        name="notice"
                                                        value={data.notice}
                                                        className="mt-1 block w-full"
                                                        autoComplete="notice"
                                                        isFocused={true}
                                                        onChange={(e) => setData('notice', e.target.value)}
                                                        required
                                                    />

                                                    <InputError message={errors.notice} className="mt-2" />
                                                </div>

                                                <div className="flex items-center justify-end mt-4">
                                                    <PrimaryButton className="ms-4" disabled={processing}>
                                                        Create Enrollment
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