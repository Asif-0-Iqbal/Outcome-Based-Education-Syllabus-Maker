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

export default function AddStudent({ message, auth }) {
    const { faculties, degrees, teacherCourses, teacherCoursesChairman } = usePage().props;

    const [notification, setNotification] = useState(null);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        banglaName: '',
        gender: '',
        dateOfBirth: '',
        mobile: '',
        nationality: 'Bangladeshi',
        degree: '',
        faculty: '',
        designation: '',
        role: 'student',
        sid: '',
        session: '',
        level: '',
        semester: '',
        section: '',
        hall: '',
        residentialStatus: '',
        boardScholarship: '',
        financialStatus: '',
    });

    const genders = ['Male', 'Female', 'Other'];
    const levels = ['1', '2', '3', '4', '5'];
    const semesters = ['I', 'II'];
    const sections = ['A', 'B', 'C'];
    const halls = ['hall1', 'hall2'];
    const residentialStatuses = ['residential', 'non-residential'];
    const boardScholarships = ['general', 'talentpool', 'none'];

    const submit = async (e) => {
        e.preventDefault();
        await post(route('createStudent'));
        setNotification('Student Added Successfully!');
        setTimeout(() => {
            setNotification(null);
        }, 3000);
        reset();
    };


    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Create Student</h2>}
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
                                                    Add Student
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
                                                    Add Student
                                                </p>
                                            </header>
                                            <form onSubmit={submit} className="mt-6 space-y-6">


                                                <div>
                                                    <InputLabel htmlFor="sid" value="sid" />

                                                    <TextInput
                                                        id="sid"
                                                        name="sid"
                                                        value={data.sid}
                                                        className="mt-1 block w-full"
                                                        autoComplete="sid"
                                                        isFocused={true}
                                                        onChange={(e) => setData('sid', e.target.value)}
                                                        required
                                                    />

                                                    <InputError message={errors.sid} className="mt-2" />
                                                </div>

                                                <div>
                                                    <InputLabel htmlFor="name" value="Name" />

                                                    <TextInput
                                                        id="name"
                                                        name="name"
                                                        value={data.name}
                                                        className="mt-1 block w-full"
                                                        autoComplete="name"
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

                                                <div>
                                                    <InputLabel htmlFor="session" value="session" />

                                                    <TextInput
                                                        id="session"
                                                        name="session"
                                                        value={data.session}
                                                        className="mt-1 block w-full"
                                                        autoComplete="session"
                                                        onChange={(e) => setData('session', e.target.value)}
                                                        required
                                                    />

                                                    <InputError message={errors.session} className="mt-2" />
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

                                                <div className="mt-4">
                                                    <InputLabel htmlFor="section" value="section" />

                                                    <select
                                                        id="section"
                                                        name="section"
                                                        value={data.section}
                                                        className='mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm'
                                                        onChange={(e) => setData('section', e.target.value)}
                                                        required
                                                    >
                                                        <option value="">Select section</option>
                                                        {sections.map((section, index) => (
                                                            <option key={index} value={section}>
                                                                {section}
                                                            </option>
                                                        ))}
                                                    </select>

                                                    <InputError message={errors.section} className="mt-2" />
                                                </div>

                                                <div className="mt-4">
                                                    <InputLabel htmlFor="hall" value="hall" />

                                                    <select
                                                        id="hall"
                                                        name="hall"
                                                        value={data.hall}
                                                        className='mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm'
                                                        onChange={(e) => setData('hall', e.target.value)}
                                                        required
                                                    >
                                                        <option value="">Select hall</option>
                                                        {halls.map((hall, index) => (
                                                            <option key={index} value={hall}>
                                                                {hall}
                                                            </option>
                                                        ))}
                                                    </select>

                                                    <InputError message={errors.hall} className="mt-2" />
                                                </div>

                                                <div className="mt-4">
                                                    <InputLabel htmlFor="residentialStatus" value="residentialStatus" />

                                                    <select
                                                        id="residentialStatus"
                                                        name="residentialStatus"
                                                        value={data.residentialStatus}
                                                        className='mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm'
                                                        onChange={(e) => setData('residentialStatus', e.target.value)}
                                                        required
                                                    >
                                                        <option value="">Select residentialStatus</option>
                                                        {residentialStatuses.map((residentialStatus, index) => (
                                                            <option key={index} value={residentialStatus}>
                                                                {residentialStatus}
                                                            </option>
                                                        ))}
                                                    </select>

                                                    <InputError message={errors.residentialStatus} className="mt-2" />
                                                </div>

                                                <div className="mt-4">
                                                    <InputLabel htmlFor="boardScholarship" value="boardScholarship" />

                                                    <select
                                                        id="boardScholarship"
                                                        name="boardScholarship"
                                                        value={data.boardScholarship}
                                                        className='mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm'
                                                        onChange={(e) => setData('boardScholarship', e.target.value)}
                                                        required
                                                    >
                                                        <option value="">Select boardScholarship</option>
                                                        {boardScholarships.map((boardScholarship, index) => (
                                                            <option key={index} value={boardScholarship}>
                                                                {boardScholarship}
                                                            </option>
                                                        ))}
                                                    </select>

                                                    <InputError message={errors.boardScholarship} className="mt-2" />
                                                </div>

                                                <div>
                                                    <InputLabel htmlFor="financialStatus" value="পিতার বাৎসরিক আয়ঃ (টাকায়)" />

                                                    <TextInput
                                                        id="financialStatus"
                                                        name="financialStatus"
                                                        value={data.financialStatus}
                                                        className="mt-1 block w-full"
                                                        autoComplete="financialStatus"
                                                        onChange={(e) => setData('financialStatus', e.target.value)}
                                                        required
                                                    />

                                                    <InputError message={errors.financialStatus} className="mt-2" />
                                                </div>


                                                <div className="flex items-center justify-end mt-4">
                                                    <PrimaryButton className="ms-4" disabled={processing}>
                                                        Create Student
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