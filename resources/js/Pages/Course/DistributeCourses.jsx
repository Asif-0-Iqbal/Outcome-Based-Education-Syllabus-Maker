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

export default function PLOvsCLOPage({ message, auth }) {
    const { courses, teachers, teacherCourses, teacherCoursesChairman, users } = usePage().props;

    const [notification, setNotification] = useState(null);
    const [selectedCLO, setSelectedCLO] = useState('');
    const [tooltipContent, setTooltipContent] = useState('');
    const [selectedCourse, setSelectedCourse] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [dropdownKey, setDropdownKey] = useState(0);

    const filteredCourses = courses.filter(course =>
        course.CourseCode.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const { data, setData, post, processing, errors, reset } = useForm({
        CourseCode: '',
        email: '',
    });

    const submit = async (e) => {
        e.preventDefault();
        await post(route('courseDistribution.store'));
        setNotification('Course is distributed successfully!');
        setTimeout(() => {
            setNotification(null);
        }, 3000);
        reset();
        setDropdownKey(prevKey => prevKey + 1);
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

                </>
            ) : (
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
                                                    Distribute Course to Teacher
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

                                                <div className="mt-4">
                                                    <InputLabel
                                                        htmlFor="CourseCode"
                                                        value="Select Course"
                                                        data-tooltip-id='tooltip'
                                                        data-tooltip-content={`Select one or write something to filter results`}
                                                    />
                                                    <Tooltip id='tooltip' effect="solid" place="top" style={{ fontSize: '12px' }} />
                                                    <CustomDropdown
                                                        id="CourseCode"
                                                        name="CourseCode"
                                                        options={courses.map(course => course.CourseCode)}
                                                        initialSelectedOption={data.CourseCode} // Pass initial selected course
                                                        onSelect={handleCourseSelect} // Handle selection of course
                                                        key={dropdownKey}
                                                    />
                                                    <InputError message={errors.CourseCode} className="mt-2" />
                                                </div>

                                                <div className="mt-4">
                                                    <InputLabel htmlFor="email" value="Select Teacher" />

                                                    <select
                                                        id="email"
                                                        name="email"
                                                        value={data.email}
                                                        className='mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm'
                                                        onChange={(e) => setData('email', e.target.value)}
                                                        required
                                                    >
                                                        <option value="">Select Teacher</option>
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
                                                        Distribute Course
                                                    </PrimaryButton>
                                                </div>
                                            </form>
                                        </div>
                                        <div>
                                            <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                                                Distributed Courses
                                                <span
                                                    className="ml-2"
                                                    data-tooltip-id='tooltip'
                                                    data-tooltip-content="If you select existing course and a teeacher, <br>it will update the distribution instead of creating new one."
                                                >
                                                    <FontAwesomeIcon icon={faCircleInfo} />
                                                </span>
                                                <Tooltip id='tooltip' effect="solid" place="top" style={{ fontSize: '12px' }} />
                                            </h2>
                                            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                                Here is a list of distributed courses.
                                            </p>
                                            <table className="mt-5 min-w-full divide-y divide-gray-200 dark:divide-gray-700 table-auto">
                                                <thead>
                                                    <tr className="bg-gray-50 dark:bg-gray-800">
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Course Code</th>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Teacher</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700">
                                                    {teacherCourses && teacherCourses.length > 0 ? (
                                                        teacherCourses.map((teacherCourse, index) => (
                                                            <tr key={index} className={index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-800' : 'bg-white dark:bg-gray-800'}>
                                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-400">{teacherCourse.CourseCode}</td>
                                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-400">{teacherCourse.email}</td>
                                                            </tr>
                                                        ))
                                                    ) : (
                                                        <tr>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-400 dark:bg-gray-800" colSpan="2">No course distributions found.</td>
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