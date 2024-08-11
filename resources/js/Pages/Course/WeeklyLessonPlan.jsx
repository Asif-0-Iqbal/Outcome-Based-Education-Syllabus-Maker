import { Inertia } from '@inertiajs/inertia';
import { router } from '@inertiajs/react'
import TextInput from '@/Components/TextInput';
import { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, Link, useForm } from '@inertiajs/react';
import SecondaryButton from '@/Components/SecondaryButton';

import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import NumberInput from '@/Components/NumberInput';
import TextArea from '@/Components/TextArea';
import WeeklyPlanCard from '@/Components/WeeklyPlanCard';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export default function WeeklyLessonPlan({ message, auth }) {

    const { courseLearningOutcomes, courseCode, success, courseContents, weeklyPlans } = usePage().props;
    console.log(weeklyPlans);
    const [Week, setWeek] = useState('');
    const [Topics, setTopic] = useState('');
    const [SpecificOutcomes, setSpecificOutcome] = useState('');
    //const [content, setContent] = useState('');
    const [teachingStrategies, setTeachingStrategies] = useState([]);
    const [teachingAids, setTeachingAids] = useState([]);
    const [assessmentStrategies, setAssessmentStrategies] = useState([]);
    const [mappings, setMappings] = useState([]);
    const [otherTeachingStrategy, setOtherTeachingStrategy] = useState('');
    const [otherTeachingAid, setOtherTeachingAid] = useState('');
    const [otherAssessmentStrategy, setOtherAssessmentStrategy] = useState('');


    const { data, setData, post, processing, errors, reset } = useForm({
        Week: '',
        Topics: '',
        SpecificOutcomes: '',
        //content: '',
        teaching_strategy: '',
        teachingAids: '',
        assessment_strategy: '',
        mapping: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            CourseCode: courseCode,
            Week: Week,
            Topics: Topics,
            SpecificOutcomes: SpecificOutcomes,
            teaching_strategy: teachingStrategies.join(', '),
            teaching_aid: teachingAids.join(', '),
            assessment_strategy: assessmentStrategies.join(', '),
            mapping: mappings.join(', ')
        };
        router.post(route('weeklyPlan.upload', { courseCode: courseCode }), formData);
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
                                        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Weekly Lesson Plan</h2>
                                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                            Add Weekly Lesson Plan of {courseCode} from here.
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
                                            <InputLabel htmlFor="Week" value="Week no." />

                                            <NumberInput
                                                id="Week"
                                                name="Week"
                                                value={Week}
                                                className="mt-1 block w-full"
                                                autoComplete="Week"
                                                onChange={(e) => setWeek(e.target.value)}
                                                required
                                            />

                                            <InputError message={errors.Week} className="mt-2" />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="Topics" value="Topic" />
                                            <TextArea
                                                id="Topics"
                                                value={Topics}
                                                className="mt-1 block w-full"
                                                onChange={(e) => setTopic(e.target.value)}
                                                required
                                            />
                                            <InputError message={errors.Topics} className="mt-2" />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="SpecificOutcomes" value="SpecificOutcomes" />
                                            <TextArea
                                                id="SpecificOutcomes"
                                                value={SpecificOutcomes}
                                                className="mt-1 block w-full"
                                                onChange={(e) => setSpecificOutcome(e.target.value)}
                                                required
                                            />
                                            <InputError message={errors.SpecificOutcomes} className="mt-2" />
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
                                            <InputLabel value="Teaching Aid" />
                                            <div className="mt-2 space-y-2">
                                                <table>
                                                    <tbody>
                                                        <tr>
                                                            <td className="pr-10">
                                                                <label className="inline-flex items-center">
                                                                    <input type="checkbox" className="form-checkbox" value="Textbook" onChange={(e) => e.target.checked ? setTeachingAids([...teachingAids, e.target.value]) : setTeachingAids(teachingAids.filter(strategy => strategy !== e.target.value))} />
                                                                    <span className="ml-2">Textbook</span>
                                                                </label>
                                                            </td>
                                                            <td className="pl-5">
                                                                <label className="inline-flex items-center">
                                                                    <input type="checkbox" className="form-checkbox" value="Reference Book" onChange={(e) => e.target.checked ? setTeachingAids([...teachingAids, e.target.value]) : setTeachingAids(teachingAids.filter(strategy => strategy !== e.target.value))} />
                                                                    <span className="ml-2">Reference Book</span>
                                                                </label>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <label className="inline-flex items-center">
                                                                    <input type="checkbox" className="form-checkbox" value="Online Resources" onChange={(e) => e.target.checked ? setTeachingAids([...teachingAids, e.target.value]) : setTeachingAids(teachingAids.filter(strategy => strategy !== e.target.value))} />
                                                                    <span className="ml-2">Online Resource</span>
                                                                </label>
                                                            </td>
                                                            <td  className="pl-5">
                                                                <label className="inline-flex items-center">
                                                                    <input type="checkbox" className="form-checkbox" value="Multimedia" onChange={(e) => e.target.checked ? setTeachingAids([...teachingAids, e.target.value]) : setTeachingAids(teachingAids.filter(strategy => strategy !== e.target.value))} />
                                                                    <span className="ml-2">Multimedia</span>
                                                                </label>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <label className="inline-flex items-center">
                                                                    <input type="checkbox" className="form-checkbox" value="Reports" onChange={(e) => e.target.checked ? setTeachingAids([...teachingAids, e.target.value]) : setTeachingAids(teachingAids.filter(strategy => strategy !== e.target.value))} />
                                                                    <span className="ml-2">Report</span>
                                                                </label>
                                                            </td>
                                                            <td className="pl-5">
                                                                <label className="inline-flex items-center">
                                                                    <input type="checkbox" className="form-checkbox" value="Charts" onChange={(e) => e.target.checked ? setTeachingAids([...teachingAids, e.target.value]) : setTeachingAids(teachingAids.filter(strategy => strategy !== e.target.value))} />
                                                                    <span className="ml-2">Chart</span>
                                                                </label>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <label className="inline-flex items-center">
                                                                    <input type="checkbox" className="form-checkbox" value="Newspapers" onChange={(e) => e.target.checked ? setTeachingAids([...teachingAids, e.target.value]) : setTeachingAids(teachingAids.filter(strategy => strategy !== e.target.value))} />
                                                                    <span className="ml-2">Newspaper</span>
                                                                </label>
                                                            </td>
                                                            <td className="pl-5">
                                                                <label className="inline-flex items-center">
                                                                    <input type="checkbox" className="form-checkbox" value="Handouts" onChange={(e) => e.target.checked ? setTeachingAids([...teachingAids, e.target.value]) : setTeachingAids(teachingAids.filter(strategy => strategy !== e.target.value))} />
                                                                    <span className="ml-2">Handout</span>
                                                                </label>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <label className="inline-flex items-center">
                                                                    <input type="checkbox" className="form-checkbox" value="Others" onChange={(e) => e.target.checked ? setTeachingAids([...teachingAids, e.target.value]) : setTeachingAids(teachingAids.filter(strategy => strategy !== e.target.value))} />
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
                                            <InputLabel value="Mapping" />
                                            {courseLearningOutcomes.map((outcome) => (
                                                <div key={outcome.CLO_ID} className="mt-2 space-y-2">
                                                    <label className="inline-flex items-center">
                                                        <input
                                                            type="checkbox"
                                                            className="form-checkbox"
                                                            value={outcome.CLO_ID}
                                                            onChange={(e) => e.target.checked ? setMappings([...mappings, e.target.value]) : setMappings(mappings.filter(strategy => strategy !== e.target.value))}
                                                        />
                                                        <span className="ml-2">{outcome.CLO_ID}</span>
                                                    </label>
                                                    <br />
                                                </div>
                                            ))}
                                        </div>
                                        <div className="flex items-center justify-end mt-4">
                                            <PrimaryButton className="ms-4" type="submit">
                                                Add Weekly Plan
                                            </PrimaryButton>
                                        </div>
                                    </form>
                                </div>


                                <div>
                                    <header>
                                        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Added Weekly Lesson Plan</h2>
                                        <p className="mt-1 mb-2 text-sm text-gray-600 dark:text-gray-400">
                                            You've added following Week's Lesson Plans.
                                        </p>
                                    </header>

                                    <div className="grid grid-cols-1 md:grid-cols-1 gap-6 lg:gap-8 flex justify-center">
                                        {weeklyPlans && weeklyPlans.length > 0 ? (
                                            weeklyPlans.map((wps, index) => (
                                                <WeeklyPlanCard
                                                    week={wps.Week}
                                                    topic={wps.Topics}
                                                    spo={wps.SpecificOutcomes}
                                                    teaching_strategy={wps.teaching_strategy}
                                                    teaching_aid={wps.teaching_aid}
                                                    assessment_strategy={wps.assessment_strategy}
                                                    clos={wps.mapping}
                                                    wpid={wps.id}
                                                    link={route('EditWeeklyLessonPlan', { wp: wps.id })}
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
