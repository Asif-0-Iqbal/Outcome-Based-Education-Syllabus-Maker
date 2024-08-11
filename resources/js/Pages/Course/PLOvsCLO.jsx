import { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, Link, useForm } from '@inertiajs/react';

import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import NumberInput from '@/Components/NumberInput';
import TextArea from '@/Components/TextArea';
import { router } from '@inertiajs/react';

import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import PLOshowing from '@/Components/PLOshowing';

export default function PLOvsCLOPage({ message, auth }) {
    const { courseLearningOutcomes, programLearningOutcomes, courseCode, PLOvsCLOs } = usePage().props;
    console.log(PLOvsCLOs);

    const [selectedCLO, setSelectedCLO] = useState('');
    const [tooltipContent, setTooltipContent] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        CourseCode: '',
        CLO_ID: '',
        PLO_No: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('store.plovsclo', { courseCode: courseCode }));
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this course objective?')) {
            router.delete(route('deletePLOvsCLO', { plovsclo: id }));
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Add OBE Syllabus</h2>}
        >
            <Head title="Workspace" />

            {auth.user.role === "admin" ? (
                <></>
            ) : (
                <>
                    <div className="py-12">
                        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">

                            <Link
                                href={route('courseView', { courseCode: courseCode })}>
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
                                                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Mapping/ Alignment PLO vs CLO</h2>
                                                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                                    Select CLO and Associated PLO. If You have one CLO associated with multiple PLO, then repeat the process.
                                                </p>
                                            </header>
                                            <form onSubmit={submit} className="mt-6 space-y-6">
                                                <div>
                                                    <InputLabel htmlFor="CourseCode" value="Course Code" />
                                                    <TextInput
                                                        id="CourseCode"
                                                        name="CourseCode"
                                                        value={courseCode}
                                                        className="mt-1 block w-full"
                                                        autoComplete="CourseCode"
                                                        onChange={(e) => setData('CourseCode', e.target.value)}
                                                        required
                                                        disabled
                                                    />
                                                    <InputError message={errors.CourseCode} className="mt-2" />
                                                </div>

                                                <div className="mt-4">
                                                    <InputLabel htmlFor="CLO_ID" value="CLO_ID" />
                                                    <select
                                                        id="CLO_ID"
                                                        name="CLO_ID"
                                                        value={data.CLO_ID}
                                                        className='mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm'
                                                        onChange={(e) => setData('CLO_ID', e.target.value)}
                                                        required
                                                    >
                                                        <option value="">Select CLO</option>
                                                        {courseLearningOutcomes.map((courseLearningOutcome) => (
                                                            <option
                                                                key={courseLearningOutcome.CLO_ID}
                                                                value={courseLearningOutcome.CLO_ID}
                                                                className='mt-5'
                                                            >
                                                                {data.CLO_ID === courseLearningOutcome.CLO_ID ? (
                                                                    courseLearningOutcome.CLO_ID
                                                                ) : (
                                                                    `${courseLearningOutcome.CLO_ID}: ${courseLearningOutcome.CLO_Description}`
                                                                )}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    <InputError message={errors.faculty} className="mt-2" />
                                                </div>

                                                <div className="mt-4">
                                                    <InputLabel htmlFor="PLO_No" value="PLO_No" />
                                                    <select
                                                        id="PLO_No"
                                                        name="PLO_No"
                                                        value={data.PLO_No}
                                                        className='mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm'
                                                        onChange={(e) => setData('PLO_No', e.target.value)}
                                                        required
                                                    >
                                                        <option value="">Select PLO</option>
                                                        {programLearningOutcomes.map((programLearningOutcome) => (
                                                            <option key={programLearningOutcome.PLO_No} value={programLearningOutcome.PLO_No}>
                                                                {data.PLO_No === programLearningOutcome.PLO_No ? (
                                                                    programLearningOutcome.PLO_No
                                                                ) : (
                                                                    `${programLearningOutcome.PLO_No}`
                                                                )}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    <InputError message={errors.faculty} className="mt-2" />
                                                </div>

                                                <div className="flex justify-between mt-4">
                                                    <SecondaryButton
                                                        className="mr-4"
                                                        type="button"
                                                        onClick={() => setIsModalOpen(true)}
                                                    >
                                                        PLO Details
                                                    </SecondaryButton>
                                                    <PrimaryButton
                                                        className="ml-auto"
                                                        disabled={processing}
                                                    >
                                                        Map CLO and PLO
                                                    </PrimaryButton>
                                                </div>
                                            </form>
                                        </div>
                                        <div>
                                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                                <thead>
                                                    <tr className="bg-gray-50 dark:bg-gray-800">
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">CLO ID</th>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">PLO No</th>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Delete</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700">
                                                    {PLOvsCLOs && PLOvsCLOs.length > 0 ? (
                                                        PLOvsCLOs.map((PLOvsCLO, index) => (
                                                            <tr key={index} className={index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-800' : 'bg-gray-60 dark:bg-gray-900'}>
                                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-400">{PLOvsCLO.CLO_ID}</td>
                                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-400">{PLOvsCLO.PLO_No}</td>
                                                                <td className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                                                    <button onClick={() => handleDelete(PLOvsCLO.id)}>
                                                                        <FontAwesomeIcon icon={faTrash} size="lg" className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-600" />
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        ))
                                                    ) : (
                                                        <tr>
                                                            <td className="bg-gray-50 dark:bg-gray-800 px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-400" colSpan="2">No mapping found.</td>
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

            <PLOshowing show={isModalOpen} onClose={() => setIsModalOpen(false)} maxWidth="2xl">
                <div className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">PLO Details</h2>
                    <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">PLO details are here.</p>
                    <div className="max-h-96 overflow-y-auto"> {/* Set max-height for the table container */}
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead>
                                <tr className="bg-gray-50 dark:bg-gray-800">
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">No.</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Description</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700">
                                {programLearningOutcomes && programLearningOutcomes.length > 0 ? (
                                    programLearningOutcomes.map((programLearningOutcome, index) => (
                                        <tr key={index} className={index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-800' : 'bg-gray-60 dark:bg-gray-900'}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-400">{programLearningOutcome.PLO_No}</td>
                                            <td className="px-6 py-4 whitespace-wrap text-sm text-gray-900 dark:text-gray-400">{programLearningOutcome.PLO_Description}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td className="bg-gray-50 dark:bg-gray-800 px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-400" colSpan="2">No PLO found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </PLOshowing>
        </AuthenticatedLayout>
    );
}
