import { Inertia } from '@inertiajs/inertia';
import { router } from '@inertiajs/react'
import TextInput from '@/Components/TextInput';
import { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, Link, useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import NumberInput from '@/Components/NumberInput';
import TextArea from '@/Components/TextArea';
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css';
import CC_Card from '@/Components/CC_Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export default function CourseContentForm({ message, auth }) {
    const { courseLearningOutcomes, courseCode, success, courseContents } = usePage().props;
    console.log(courseLearningOutcomes);
    const [content, setContent] = useState('');
    const [teachingStrategies, setTeachingStrategies] = useState([]);
    const [assessmentStrategies, setAssessmentStrategies] = useState([]);
    const [mappings, setMappings] = useState([]);


    const { data, setData, post, processing, errors, reset } = useForm({
        content: '',
        teaching_strategy: '',
        assessment_strategy: '',
        mapping: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            CourseCode: courseCode,
            content: content,
            teaching_strategy: teachingStrategies.join(', '),
            assessment_strategy: assessmentStrategies.join(', '),
            mapping: mappings.join(', ')
        };
        router.post(route('coursecontent.upload', { courseCode: courseCode }), formData);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Add OBE Syllabus</h2>}
        >

            <Head title="Workspace" />
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
                                        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Mapping/ Alignment of Course Content & CLOs</h2>
                                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                            Add Mapping/ Alignment of Course Content, Teaching Strategy, Assessment Strategy & CLOs from here.
                                        </p>
                                    </header>
                                    <form onSubmit={handleSubmit} className="mt-6 space-y-6 max-w-xl">
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
                                        <div>
                                            <InputLabel htmlFor="content" value="Content" />
                                            <TextArea
                                                id="content"
                                                value={content}
                                                className="mt-1 block w-full"
                                                onChange={(e) => setContent(e.target.value)}
                                                required
                                            />
                                            <InputError message={errors.content} className="mt-2" />
                                        </div>
                                        <div>
                                            <InputLabel value="Teaching Strategy" />
                                            <div className="mt-2 space-y-2">
                                                <table>
                                                    <tbody>
                                                        <tr>
                                                            <td className="pr-10">
                                                                <label className="inline-flex items-center">
                                                                    <input type="checkbox" className="form-checkbox" value="Lecture" onChange={(e) => e.target.checked ? setTeachingStrategies([...teachingStrategies, e.target.value]) : setTeachingStrategies(teachingStrategies.filter(strategy => strategy !== e.target.value))} />
                                                                    <span className="ml-2">Lecture</span>
                                                                </label>
                                                            </td>
                                                            <td className="pl-5">
                                                                <label className="inline-flex items-center">
                                                                    <input type="checkbox" className="form-checkbox" value="Demonstration" onChange={(e) => e.target.checked ? setTeachingStrategies([...teachingStrategies, e.target.value]) : setTeachingStrategies(teachingStrategies.filter(strategy => strategy !== e.target.value))} />
                                                                    <span className="ml-2">Demonstration</span>
                                                                </label>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <label className="inline-flex items-center">
                                                                    <input type="checkbox" className="form-checkbox" value="Discussion" onChange={(e) => e.target.checked ? setTeachingStrategies([...teachingStrategies, e.target.value]) : setTeachingStrategies(teachingStrategies.filter(strategy => strategy !== e.target.value))} />
                                                                    <span className="ml-2">Discussion</span>
                                                                </label>
                                                            </td>
                                                            <td className="pl-5">
                                                                <label className="inline-flex items-center">
                                                                    <input type="checkbox" className="form-checkbox" value="Group Discussion" onChange={(e) => e.target.checked ? setTeachingStrategies([...teachingStrategies, e.target.value]) : setTeachingStrategies(teachingStrategies.filter(strategy => strategy !== e.target.value))} />
                                                                    <span className="ml-2">Group Discussion</span>
                                                                </label>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <label className="inline-flex items-center">
                                                                    <input type="checkbox" className="form-checkbox" value="Power point presentation" onChange={(e) => e.target.checked ? setTeachingStrategies([...teachingStrategies, e.target.value]) : setTeachingStrategies(teachingStrategies.filter(strategy => strategy !== e.target.value))} />
                                                                    <span className="ml-2">Multimedia presentation</span>
                                                                </label>
                                                            </td>
                                                            <td className="pl-5">
                                                                <label className="inline-flex items-center">
                                                                    <input type="checkbox" className="form-checkbox" value="Question & Answer" onChange={(e) => e.target.checked ? setTeachingStrategies([...teachingStrategies, e.target.value]) : setTeachingStrategies(teachingStrategies.filter(strategy => strategy !== e.target.value))} />
                                                                    <span className="ml-2">Question & Answer</span>
                                                                </label>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <label className="inline-flex items-center">
                                                                    <input type="checkbox" className="form-checkbox" value="Others" onChange={(e) => e.target.checked ? setTeachingStrategies([...teachingStrategies, e.target.value]) : setTeachingStrategies(teachingStrategies.filter(strategy => strategy !== e.target.value))} />
                                                                    <span className="ml-2">Others</span>
                                                                </label>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        <div>
                                            <InputLabel value="Assessment Strategy" />
                                            <div className="mt-2 space-y-2">
                                                <table>
                                                    <tbody>
                                                        <tr>
                                                            <td className="pr-10">
                                                                <label className="inline-flex items-center">
                                                                    <input type="checkbox" className="form-checkbox" value="MCQ" onChange={(e) => e.target.checked ? setAssessmentStrategies([...assessmentStrategies, e.target.value]) : setAssessmentStrategies(assessmentStrategies.filter(strategy => strategy !== e.target.value))} />
                                                                    <span className="ml-2">MCQ</span>
                                                                </label>
                                                            </td>
                                                            <td className="pl-5">
                                                                <label className="inline-flex items-center">
                                                                    <input type="checkbox" className="form-checkbox" value="Quiz" onChange={(e) => e.target.checked ? setAssessmentStrategies([...assessmentStrategies, e.target.value]) : setAssessmentStrategies(assessmentStrategies.filter(strategy => strategy !== e.target.value))} />
                                                                    <span className="ml-2">Quiz</span>
                                                                </label>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <label className="inline-flex items-center">
                                                                    <input type="checkbox" className="form-checkbox" value="Assignment" onChange={(e) => e.target.checked ? setAssessmentStrategies([...assessmentStrategies, e.target.value]) : setAssessmentStrategies(assessmentStrategies.filter(strategy => strategy !== e.target.value))} />
                                                                    <span className="ml-2">Assignment</span>
                                                                </label>
                                                            </td>
                                                            <td className="pl-5">
                                                                <label className="inline-flex items-center">
                                                                    <input type="checkbox" className="form-checkbox" value="Presentation" onChange={(e) => e.target.checked ? setAssessmentStrategies([...assessmentStrategies, e.target.value]) : setAssessmentStrategies(assessmentStrategies.filter(strategy => strategy !== e.target.value))} />
                                                                    <span className="ml-2">Presentation</span>
                                                                </label>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <label className="inline-flex items-center">
                                                                    <input type="checkbox" className="form-checkbox" value="Report Writing" onChange={(e) => e.target.checked ? setAssessmentStrategies([...assessmentStrategies, e.target.value]) : setAssessmentStrategies(assessmentStrategies.filter(strategy => strategy !== e.target.value))} />
                                                                    <span className="ml-2">Report Writing</span>
                                                                </label>
                                                            </td>
                                                            <td className="pl-5">
                                                                <label className="inline-flex items-center">
                                                                    <input type="checkbox" className="form-checkbox" value="Viva Voce" onChange={(e) => e.target.checked ? setAssessmentStrategies([...assessmentStrategies, e.target.value]) : setAssessmentStrategies(assessmentStrategies.filter(strategy => strategy !== e.target.value))} />
                                                                    <span className="ml-2">Viva Voce</span>
                                                                </label>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <label className="inline-flex items-center">
                                                                    <input type="checkbox" className="form-checkbox" value="Class Participation" onChange={(e) => e.target.checked ? setAssessmentStrategies([...assessmentStrategies, e.target.value]) : setAssessmentStrategies(assessmentStrategies.filter(strategy => strategy !== e.target.value))} />
                                                                    <span className="ml-2">Class Participation</span>
                                                                </label>
                                                            </td>
                                                            <td className="pl-5">
                                                                <label className="inline-flex items-center">
                                                                    <input type="checkbox" className="form-checkbox" value="Mid Semester Examination" onChange={(e) => e.target.checked ? setAssessmentStrategies([...assessmentStrategies, e.target.value]) : setAssessmentStrategies(assessmentStrategies.filter(strategy => strategy !== e.target.value))} />
                                                                    <span className="ml-2">Mid Semester Examination</span>
                                                                </label>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <label className="inline-flex items-center">
                                                                    <input type="checkbox" className="form-checkbox" value="Final Examination" onChange={(e) => e.target.checked ? setAssessmentStrategies([...assessmentStrategies, e.target.value]) : setAssessmentStrategies(assessmentStrategies.filter(strategy => strategy !== e.target.value))} />
                                                                    <span className="ml-2">Final Examination</span>
                                                                </label>
                                                            </td>
                                                            <td className="pl-5">
                                                                <label className="inline-flex items-center">
                                                                    <input type="checkbox" className="form-checkbox" value="Others" onChange={(e) => e.target.checked ? setTeachingStrategies([...teachingStrategies, e.target.value]) : setTeachingStrategies(teachingStrategies.filter(strategy => strategy !== e.target.value))} />
                                                                    <span className="ml-2">Others</span>
                                                                </label>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>

                                        <div>
                                            <InputLabel value="Mapping with CLOs" /> 
                                            {courseLearningOutcomes.map((outcome) => (
                                                <div key={outcome.CLO_ID} className="mt-2 space-y-2">
                                                    <label className="inline-flex items-center">
                                                        <input
                                                            type="checkbox"
                                                            className="form-checkbox"
                                                            value={outcome.CLO_ID}
                                                            onChange={(e) => e.target.checked ? setMappings([...mappings, e.target.value]) : setMappings(mappings.filter(strategy => strategy !== e.target.value))}
                                                        />
                                                        <span
                                                            className="ml-2"
                                                            data-tooltip-id={`tooltip-${outcome.CLO_ID}`}
                                                            data-tooltip-content={outcome.CLO_Description}
                                                        >
                                                            {outcome.CLO_ID}
                                                        </span>
                                                        <Tooltip id={`tooltip-${outcome.CLO_ID}`} effect="solid" place="top" />

                                                    </label>
                                                    <br />
                                                </div>
                                            ))}
                                        </div>
                                        <div className="flex items-center justify-end mt-4">
                                            <PrimaryButton className="ms-4" type="submit">
                                                Add Course Content
                                            </PrimaryButton>
                                        </div>
                                    </form>
                                </div>


                                <div>
                                    <header>
                                        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Added Contents & Mappings</h2>
                                        <p className="mt-1 mb-2 text-sm text-gray-600 dark:text-gray-400">
                                            Added Mapping/ Alignment of Course Content, Teaching Strategy, Assessment Strategy & CLOs is here.
                                        </p>
                                    </header>

                                    <div className="grid grid-cols-1 md:grid-cols-1 gap-6 lg:gap-8 flex justify-center">
                                        {courseContents && courseContents.length > 0 ? (
                                            courseContents.map((contents, index) => (
                                                <CC_Card
                                                    sequence={index + 1}
                                                    content={contents.content}
                                                    teaching_strategy={contents.teaching_strategy}
                                                    assessment_strategy={contents.assessment_strategy}
                                                    clos={contents.mapping}
                                                    content_id={contents.id}
                                                    link={route('EditCourseContent', { ccid: contents.id })}
                                                    showbuttons="yes"
                                                />
                                            ))
                                        ) : (
                                            <></>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
