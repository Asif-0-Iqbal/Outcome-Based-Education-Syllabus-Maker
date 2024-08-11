import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, Link, useForm } from '@inertiajs/react';

import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import InputLabel2 from '@/Components/InputLabel2';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import NumberInput from '@/Components/NumberInput';
import TextArea from '@/Components/TextArea';
import CustomDropdown from '@/Components/CustomDropdown';

import JournalCard from '@/Components/JournalCard';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faTachometerAlt, faCog, faEnvelope, faTimes, faFileImport, faPenNib, faFilePen, faSpinner } from '@fortawesome/free-solid-svg-icons';

export default function AuthorBoard({ message, auth }) {
    const { faculties, departments, teacherCourses, teacherCoursesChairman, teachers, users } = usePage().props;

    const [notification, setNotification] = useState(null);
    const [activeTab, setActiveTab] = useState('dashboard-content');
    const [activeStep, setActiveStep] = useState(0);
    const [classifications, setClassifications] = useState([]);

    const { data, setData, post, processing, errors, reset } = useForm({
        type: '',
        classification: '',
        reviewer_pref: '',
        language_option: '',
        comments: '',
        title: '',
        abstract: '',
        keywords: '',
        file: '',
    });

    const types = ['Type 1', 'Type 2'];
    const language_options = ['Yes', 'No', 'Not Applicable'];

    const handleTabClick = (e, tabId) => {
        e.preventDefault();

        // Hide all tab contents
        document.querySelectorAll('.tab-content').forEach(tabContent => {
            tabContent.classList.add('hidden');
        });

        // Show the selected tab content
        document.getElementById(tabId).classList.remove('hidden');

        // Remove active class from all tab links
        document.querySelectorAll('.tab-link').forEach(link => {
            link.classList.remove('active');
        });

        // Add active class to the clicked tab link
        e.target.classList.add('active');

        // Update activeTab state
        setActiveTab(tabId);
    };

    const handleNext = () => {
        setActiveStep(prevStep => prevStep + 1);
    };

    const handlePrev = () => {
        setActiveStep(prevStep => prevStep - 1);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const formData = {
            //CourseCode: courseCode,
            //content: content,
            classification: classifications.join(', '),
            //assessment_strategy: assessmentStrategies.join(', '),
            //mapping: mappings.join(', ')
        };
        //router.post(route('coursecontent.upload', { courseCode: courseCode }), formData);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Journal</h2>}
        >
            <Head title="Journals ;)" />

            <div className="max-w-7xl mx-auto p-6 lg:p-8">
                <div className="mt-6">
                    <div className="md:flex">
                        <ul className="flex-column space-y space-y-4 text-sm font-medium text-gray-500 dark:text-gray-400 md:me-4 mb-4 md:mb-0" id="tab-container">
                            <li>
                                <a href="#" onClick={(e) => handleTabClick(e, 'dashboard-content')} className={`tab-link inline-flex items-center px-4 py-3 rounded-lg w-full ${activeTab === 'dashboard-content' ? 'active bg-blue-700 text-white' : 'bg-gray-50 hover:text-gray-900 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white'}`}>
                                    <FontAwesomeIcon icon={faTachometerAlt} className="w-4 h-4 me-2" />
                                    Dashboard
                                </a>
                            </li>
                            <li>
                                <a href="#" onClick={(e) => handleTabClick(e, 'submit_new-content')} className={`tab-link inline-flex items-center px-4 py-3 rounded-lg w-full ${activeTab === 'submit_new-content' ? 'active bg-blue-700 text-white' : 'bg-gray-50 hover:text-gray-900 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white'}`}>
                                    <FontAwesomeIcon icon={faFileImport} className="w-4 h-4 me-2" />
                                    Submit New Menuscript
                                </a>
                            </li>
                            <li>
                                <a href="#" onClick={(e) => handleTabClick(e, 'incomplete-content')} className={`tab-link inline-flex items-center px-4 py-3 rounded-lg w-full ${activeTab === 'incomplete-content' ? 'active bg-blue-700 text-white' : 'bg-gray-50 hover:text-gray-900 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white'}`}>
                                    <FontAwesomeIcon icon={faCog} className="w-4 h-4 me-2" />
                                    Incomplete Submissions
                                </a>
                            </li>
                            <li>
                                <a href="#" onClick={(e) => handleTabClick(e, 'for_approval-content')} className={`tab-link inline-flex items-center px-4 py-3 rounded-lg w-full ${activeTab === 'for_approval-content' ? 'active bg-blue-700 text-white' : 'bg-gray-50 hover:text-gray-900 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white'}`}>
                                    <FontAwesomeIcon icon={faPenNib} className="w-4 h-4 me-2" />
                                    Submissions Waiting for Editor Approval
                                </a>
                            </li>
                            <li>
                                <a href="#" onClick={(e) => handleTabClick(e, 'need_revision-content')} className={`tab-link inline-flex items-center px-4 py-3 rounded-lg w-full ${activeTab === 'need_revision-content' ? 'active bg-blue-700 text-white' : 'bg-gray-50 hover:text-gray-900 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white'}`}>
                                    <FontAwesomeIcon icon={faFilePen} className="w-4 h-4 me-2" />
                                    Submissions Need Revision
                                </a>
                            </li>
                            <li>
                                <a href="#" onClick={(e) => handleTabClick(e, 'processed-content')} className={`tab-link inline-flex items-center px-4 py-3 rounded-lg w-full ${activeTab === 'processed-content' ? 'active bg-blue-700 text-white' : 'bg-gray-50 hover:text-gray-900 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white'}`}>
                                    <FontAwesomeIcon icon={faSpinner} className="w-4 h-4 me-2" />
                                    Submissions Being Processed
                                </a>
                            </li>
                            <li>
                                <a href="#" onClick={(e) => handleTabClick(e, 'declined-content')} className={`tab-link inline-flex items-center px-4 py-3 rounded-lg w-full ${activeTab === 'declined-content' ? 'active bg-blue-700 text-white' : 'bg-gray-50 hover:text-gray-900 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white'}`}>
                                    <FontAwesomeIcon icon={faTimes} className="w-4 h-4 me-2" />
                                    Declined Papers
                                </a>
                            </li>
                        </ul>
                        <div className="p-6 bg-gray-50 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg w-full" id="tab-content">
                            <div id="dashboard-content" className="tab-content">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Dashboard</h3>
                                <p className="mb-2">A place where you are watching the papers you have interacted with. The papers' statuses are shown also.</p>
                                <p>A brief of your paper-work history.</p>
                                <div className="mt-5">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 flex justify-center">
                                        <JournalCard
                                            user={auth.user}
                                            badgeContent="Accepted"
                                            title="Paper 1"
                                        />

                                        <JournalCard
                                            user={auth.user}
                                            badgeContent="Declined"
                                            title="Paper 1"
                                        />

                                        <JournalCard
                                            user={auth.user}
                                            badgeContent="Accepted"
                                            title="Paper 1"
                                        />

                                        <JournalCard
                                            user={auth.user}
                                            badgeContent="Declined"
                                            title="Paper 1"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div id="submit_new-content" className="hidden tab-content">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Submit New Menuscript</h3>
                                <p className="mb-2">This is some placeholder content for the Profile tab's associated content. Clicking another tab will toggle the visibility of this one for the next.</p>

                                {/* Stepper */}

                                <ol class="flex items-center w-full text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base">
                                    <li className={`flex md:w-full items-center ${activeStep >= 0 ? 'text-blue-600 dark:text-blue-500' : ''} sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700`}>
                                        <span class="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
                                            <span class={`flex items-center justify-center w-6 h-6 border ${activeStep >= 0 ? 'border-blue-600 dark:border-blue-500' : 'border-gray-600 dark:border-gray-500'}  rounded-full shrink-0 mr-2`}>
                                                1
                                            </span>
                                            <span class="text-xs">Article Type</span>
                                        </span>
                                    </li>
                                    <li className={`flex md:w-full items-center ${activeStep >= 1 ? 'text-blue-600 dark:text-blue-500' : ''} sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700`}>
                                        <span class="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
                                            <span class={`flex items-center justify-center w-6 h-6 border ${activeStep >= 1 ? 'border-blue-600 dark:border-blue-500' : 'border-gray-600 dark:border-gray-500'}  rounded-full shrink-0 mr-2`}>
                                                2
                                            </span>
                                            <span class="text-xs">Classification</span>
                                        </span>
                                    </li>
                                    <li className={`flex md:w-full items-center ${activeStep >= 2 ? 'text-blue-600 dark:text-blue-500' : ''} sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700`}>
                                        <span class="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
                                            <span class={`flex items-center justify-center w-6 h-6 border ${activeStep >= 2 ? 'border-blue-600 dark:border-blue-500' : 'border-gray-600 dark:border-gray-500'}  rounded-full shrink-0 mr-2`}>
                                                3
                                            </span>
                                            <span class="text-xs">Reviewer Preferences</span>
                                        </span>
                                    </li>
                                    <li className={`flex md:w-full items-center ${activeStep >= 3 ? 'text-blue-600 dark:text-blue-500' : ''} sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700`}>
                                        <span class="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
                                            <span class={`flex items-center justify-center w-6 h-6 border ${activeStep >= 3 ? 'border-blue-600 dark:border-blue-500' : 'border-gray-600 dark:border-gray-500'}  rounded-full shrink-0 mr-2`}>
                                                4
                                            </span>
                                            <span class="text-xs">Comments</span>
                                        </span>
                                    </li>
                                    <li className={`flex md:w-full items-center ${activeStep >= 4 ? 'text-blue-600 dark:text-blue-500' : ''} sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700`}>
                                        <span class="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
                                            <span class={`flex items-center justify-center w-6 h-6 border ${activeStep >= 4 ? 'border-blue-600 dark:border-blue-500' : 'border-gray-600 dark:border-gray-500'}  rounded-full shrink-0 mr-2`}>
                                                5
                                            </span>
                                            <span class="text-xs">Menuscript Data</span>
                                        </span>
                                    </li>
                                    <li className={`flex items-center ${activeStep >= 5 ? 'text-blue-600 dark:text-blue-500' : ''}`}>
                                        <span class={`flex items-center justify-center w-6 h-6 border ${activeStep >= 5 ? 'border-blue-600 dark:border-blue-500' : 'border-gray-600 dark:border-gray-500'}  rounded-full shrink-0 mr-2`}>
                                            6
                                        </span>
                                        <span class="text-xs">File Upload</span>
                                    </li>
                                </ol>

                                <div className='grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 flex justify-center'>
                                    {/* Form */}
                                    <form onSubmit={handleFormSubmit}>
                                        {/* Step 1 */}
                                        {activeStep === 0 && (
                                            <div>
                                                <div className="mt-4 mb-5">
                                                    <InputLabel2 htmlFor="type" value="Select Article Type" />

                                                    <select
                                                        id="type"
                                                        name="type"
                                                        value={data.type}
                                                        className='mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm'
                                                        onChange={(e) => setData('type', e.target.value)}
                                                        required
                                                    >
                                                        <option value="">Select Type</option>
                                                        {types.map((type, index) => (
                                                            <option key={index} value={type}>
                                                                {type}
                                                            </option>
                                                        ))}
                                                    </select>

                                                    <InputError message={errors.type} className="mt-2" />
                                                </div>
                                                <PrimaryButton onClick={handleNext}>Next</PrimaryButton>
                                            </div>
                                        )}

                                        {/* Step 2 */}
                                        {activeStep === 1 && (
                                            <div>
                                                <div className='mt-4 mb-5'>
                                                    <InputLabel2 value="Classification" />
                                                    <div className="mt-2 space-y-2">
                                                        <label className="inline-flex items-center">
                                                            <input type="checkbox" className="form-checkbox" value="Lecture" onChange={(e) => e.target.checked ? setClassifications([...classifications, e.target.value]) : setClassifications(classifications.filter(classification => classification !== e.target.value))} />
                                                            <span className="ml-2">Lecture</span>
                                                        </label>
                                                        <br />
                                                        <label className="inline-flex items-center">
                                                            <input type="checkbox" className="form-checkbox" value="Lecture" onChange={(e) => e.target.checked ? setClassifications([...classifications, e.target.value]) : setClassifications(classifications.filter(classification => classification !== e.target.value))} />
                                                            <span className="ml-2">Lecture</span>
                                                        </label>
                                                        <br />
                                                        <label className="inline-flex items-center">
                                                            <input type="checkbox" className="form-checkbox" value="Lecture" onChange={(e) => e.target.checked ? setClassifications([...classifications, e.target.value]) : setClassifications(classifications.filter(classification => classification !== e.target.value))} />
                                                            <span className="ml-2">Lecture</span>
                                                        </label>
                                                        <br />
                                                        <label className="inline-flex items-center">
                                                            <input type="checkbox" className="form-checkbox" value="Lecture" onChange={(e) => e.target.checked ? setClassifications([...classifications, e.target.value]) : setClassifications(classifications.filter(classification => classification !== e.target.value))} />
                                                            <span className="ml-2">Lecture</span>
                                                        </label>
                                                        <br />
                                                        <label className="inline-flex items-center">
                                                            <input type="checkbox" className="form-checkbox" value="Lecture" onChange={(e) => e.target.checked ? setClassifications([...classifications, e.target.value]) : setClassifications(classifications.filter(classification => classification !== e.target.value))} />
                                                            <span className="ml-2">Lecture</span>
                                                        </label>
                                                    </div>
                                                </div>
                                                <PrimaryButton onClick={handlePrev}>Previous</PrimaryButton>&nbsp;
                                                <PrimaryButton onClick={handleNext}>Next</PrimaryButton>
                                            </div>
                                        )}

                                        {/* Step 3 */}
                                        {activeStep === 2 && (
                                            <div>
                                                <div className="mt-4 mb-5">
                                                    <InputLabel2 htmlFor="reviewer_pref" value="Reviewer Preference" />

                                                    <select
                                                        id="reviewer_pref"
                                                        name="reviewer_pref"
                                                        value={data.reviewer_pref}
                                                        className='mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm'
                                                        onChange={(e) => setData('reviewer_pref', e.target.value)}
                                                        required
                                                    >
                                                        <option value="">Select Teacher</option>
                                                        {teachers.map((teacher) => (
                                                            <option key={teacher.email} value={teacher.email}>
                                                                {users.find(user => user.email === teacher.email)?.name || teacher.email}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    <InputError message={errors.reviewer_pref} className="mt-2" />
                                                </div>

                                                <div className="mb-5">
                                                    <InputLabel2 htmlFor="language_option" value="If English is not your first language, has your paper been edited by a native English speaker?" />

                                                    <select
                                                        id="language_option"
                                                        name="language_option"
                                                        value={data.language_option}
                                                        className='mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm'
                                                        onChange={(e) => setData('language_option', e.target.value)}
                                                        required
                                                    >
                                                        <option value="">Select a language_option</option>
                                                        {language_options.map((language_option, index) => (
                                                            <option key={index} value={language_option}>
                                                                {language_option}
                                                            </option>
                                                        ))}
                                                    </select>

                                                    <InputError message={errors.gender} className="mt-2" />
                                                </div>
                                                <PrimaryButton onClick={handlePrev}>Previous</PrimaryButton>&nbsp;
                                                <PrimaryButton onClick={handleNext}>Next</PrimaryButton>
                                            </div>
                                        )}

                                        {/* Step 4 */}
                                        {activeStep === 3 && (
                                            <div>
                                                <div className="mt-4 mb-5">

                                                    <InputLabel2 htmlFor="comments" value="Comments" />

                                                    <TextArea
                                                        id="comments"
                                                        name="comments"
                                                        value={data.comments}
                                                        className="mt-1 block w-full"
                                                        autoComplete="comments"
                                                        onChange={(e) => setData('comments', e.target.value)}
                                                        required
                                                    />

                                                    <InputError message={errors.comments} className="mt-2" />

                                                </div>
                                                <PrimaryButton onClick={handlePrev}>Previous</PrimaryButton>&nbsp;
                                                <PrimaryButton onClick={handleNext}>Next</PrimaryButton>
                                            </div>
                                        )}

                                        {/* Step 5 */}
                                        {activeStep === 4 && (
                                            <div>
                                                <div className="mt-4 mb-5">
                                                    <InputLabel2 htmlFor="title" value="Title" />

                                                    <TextInput
                                                        id="title"
                                                        name="title"
                                                        value={data.title}
                                                        className="mt-1 block w-full"
                                                        autoComplete="title"
                                                        onChange={(e) => setData('title', e.target.value)}
                                                        required
                                                    />

                                                    <InputError message={errors.title} className="mt-2" />
                                                </div>

                                                <div className="mt-4 mb-5">

                                                    <InputLabel2 htmlFor="abstract" value="Abstract" />

                                                    <TextArea
                                                        id="abstract"
                                                        name="abstract"
                                                        value={data.abstract}
                                                        className="mt-1 block w-full"
                                                        autoComplete="abstract"
                                                        onChange={(e) => setData('abstract', e.target.value)}
                                                        required
                                                    />

                                                    <InputError message={errors.abstract} className="mt-2" />

                                                </div>

                                                <div className="mt-4 mb-5">

                                                    <InputLabel2 htmlFor="keywords" value="Keywords" />

                                                    <TextArea
                                                        id="keywords"
                                                        name="keywords"
                                                        value={data.keywords}
                                                        className="mt-1 block w-full"
                                                        autoComplete="keywords"
                                                        onChange={(e) => setData('keywords', e.target.value)}
                                                        required
                                                    />

                                                    <InputError message={errors.keywords} className="mt-2" />

                                                </div>
                                                <PrimaryButton onClick={handlePrev}>Previous</PrimaryButton>&nbsp;
                                                <PrimaryButton onClick={handleNext}>Next</PrimaryButton>
                                            </div>
                                        )}

                                        {activeStep === 5 && (
                                            <div>
                                                <div className="mt-4 mb-5">
                                                    <InputLabel2 htmlFor="file" value="Upload File" />
                                                    <input
                                                        type="file"
                                                        id="file"
                                                        name="file"
                                                        className="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm"
                                                        onChange={(e) => setData('files', e.target.files[0])}
                                                        required
                                                    />
                                                    <InputError message={errors.file} className="mt-2" />
                                                </div>
                                                {/* Form fields for step 3 */}
                                                {/* Previous and Submit buttons */}
                                                <PrimaryButton onClick={handlePrev}>Previous</PrimaryButton>&nbsp;
                                                <PrimaryButton type="submit">Submit</PrimaryButton>
                                            </div>
                                        )}
                                    </form>
                                </div>

                            </div>
                            <div id="incomplete-content" className="hidden tab-content">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Settings Tab</h3>
                                <p className="mb-2">This is some placeholder content for the Settings tab's associated content. Clicking another tab will toggle the visibility of this one for the next.</p>
                                <p>The tab JavaScript swaps classes to control the content visibility and styling.</p>
                            </div>
                            <div id="for_approval-content" className="hidden tab-content">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Contact Tab</h3>
                                <p className="mb-2">This is some placeholder content for the Contact tab's associated content. Clicking another tab will toggle the visibility of this one for the next.</p>
                                <p>The tab JavaScript swaps classes to control the content visibility and styling.</p>
                            </div>
                            <div id="need_revision-content" className="hidden tab-content">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Disabled Tab</h3>
                                <p className="mb-2">This is some placeholder content for the Disabled tab's associated content. Clicking another tab will toggle the visibility of this one for the next.</p>
                                <p>The tab JavaScript swaps classes to control the content visibility and styling.</p>
                            </div>

                            <div id="processed-content" className="hidden tab-content">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Disabled Tab</h3>
                                <p className="mb-2">This is some placeholder content for the Disabled tab's associated content. Clicking another tab will toggle the visibility of this one for the next.</p>
                                <p>The tab JavaScript swaps classes to control the content visibility and styling.</p>
                            </div>
                            <div id="declined-content" className="hidden tab-content">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Disabled Tab</h3>
                                <p className="mb-2">This is some placeholder content for the Disabled tab's associated content. Clicking another tab will toggle the visibility of this one for the next.</p>
                                <p>The tab JavaScript swaps classes to control the content visibility and styling.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
