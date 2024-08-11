import { Inertia } from '@inertiajs/inertia';
import { router } from '@inertiajs/react'
import TextInput from '@/Components/TextInput';
import { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, Link, useForm } from '@inertiajs/react';

import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import NumberInput from '@/Components/NumberInput';
import TextArea from '@/Components/TextArea';
import WeeklyPlanCard from '@/Components/WeeklyPlanCard';

export default function WeeklyLessonPlanEdit({ message, auth }) {

    const { courseLearningOutcomes, courseCode, success, courseContents, weeklyPlans, selectedWP } = usePage().props;
    console.log(weeklyPlans);
    const [Week, setWeek] = useState('');
    const [Topics, setTopic] = useState('');
    const [SpecificOutcomes, setSpecificOutcome] = useState('');
    //const [content, setContent] = useState('');
    const [teachingStrategies, setTeachingStrategies] = useState([]);
    const [teachingAids, setTeachingAids] = useState([]);
    const [assessmentStrategies, setAssessmentStrategies] = useState([]);
    const [mappings, setMappings] = useState([]);


    const { data, setData, post, processing, errors, reset } = useForm({
        Week: selectedWP.Week,
        Topics: selectedWP.Topics,
        SpecificOutcomes: selectedWP.SpecificOutcomes,
        //content: '',
        teaching_strategy: '',
        teachingAids: '',
        assessment_strategy: '',
        mapping: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            CourseCode: selectedWP.CourseCode,
            Week: data.Week,
            Topics: data.Topics,
            SpecificOutcomes: data.SpecificOutcomes,
            teaching_strategy: teachingStrategies.join(', '),
            teaching_aid: teachingAids.join(', '),
            assessment_strategy: assessmentStrategies.join(', '),
            mapping: mappings.join(', ')
        };
        router.post(route('UpdateWeeklyLessonPlan', { wp: selectedWP.id }), formData);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Add OBE Syllabus</h2>}
        >

            <Head title="Workspace" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 flex justify-center">
                                <div>
                                    <header>
                                        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Weekly Lesson Plan</h2>
                                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                            Add Weekly Lesson Plan of {selectedWP.CourseCode} from here.
                                        </p>
                                    </header>
                                    <form onSubmit={handleSubmit} className="mt-6 space-y-6 max-w-xl">
                                        <div>
                                            <InputLabel htmlFor="CourseCode" value="Course Code" />

                                            <TextInput
                                                id="CourseCode"
                                                name="CourseCode"
                                                value={selectedWP.CourseCode}
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
                                                value={data.Week}
                                                className="mt-1 block w-full"
                                                autoComplete="Week"
                                                onChange={(e) => setData('Week',e.target.value)}
                                                required
                                            />

                                            <InputError message={errors.Week} className="mt-2" />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="Topics" value="Topic" />
                                            <TextArea
                                                id="Topics"
                                                name="Topics"
                                                value={data.Topics}
                                                className="mt-1 block w-full"
                                                autoComplete="Topics"
                                                onChange={(e) => setData('Topics',e.target.value)}
                                                required
                                            />
                                            <InputError message={errors.Topics} className="mt-2" />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="SpecificOutcomes" value="SpecificOutcomes" />
                                            <TextArea
                                                id="SpecificOutcomes"
                                                name="SpecificOutcomes"
                                                value={data.SpecificOutcomes}
                                                className="mt-1 block w-full"
                                                autoComplete="SpecificOutcomes"
                                                onChange={(e) => setData('SpecificOutcomes',e.target.value)}
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
                                                            <td>
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
                                                            <td>
                                                                <label className="inline-flex items-center">
                                                                    <input type="checkbox" className="form-checkbox" value="Power point presentation" onChange={(e) => e.target.checked ? setTeachingStrategies([...teachingStrategies, e.target.value]) : setTeachingStrategies(teachingStrategies.filter(strategy => strategy !== e.target.value))} />
                                                                    <span className="ml-2">Power point presentation</span>
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

                                                <label className="inline-flex items-center">
                                                    <input type="checkbox" className="form-checkbox" value="Book" onChange={(e) => e.target.checked ? setTeachingAids([...teachingAids, e.target.value]) : setTeachingAids(teachingAids.filter(strategy => strategy !== e.target.value))} />
                                                    <span className="ml-2">Book</span>
                                                </label>
                                                <br />
                                                <label className="inline-flex items-center">
                                                    <input type="checkbox" className="form-checkbox" value="Online Resources" onChange={(e) => e.target.checked ? setTeachingAids([...teachingAids, e.target.value]) : setTeachingAids(teachingAids.filter(strategy => strategy !== e.target.value))} />
                                                    <span className="ml-2">Online Resources</span>
                                                </label>
                                                <br />
                                                <label className="inline-flex items-center">
                                                    <input type="checkbox" className="form-checkbox" value="Multimedia" onChange={(e) => e.target.checked ? setTeachingAids([...teachingAids, e.target.value]) : setTeachingAids(teachingAids.filter(strategy => strategy !== e.target.value))} />
                                                    <span className="ml-2">Multimedia</span>
                                                </label>
                                                <br />
                                                <label className="inline-flex items-center">
                                                    <input type="checkbox" className="form-checkbox" value="Pictures" onChange={(e) => e.target.checked ? setTeachingAids([...teachingAids, e.target.value]) : setTeachingAids(teachingAids.filter(strategy => strategy !== e.target.value))} />
                                                    <span className="ml-2">Pictures</span>
                                                </label>
                                                <br />
                                                <label className="inline-flex items-center">
                                                    <input type="checkbox" className="form-checkbox" value="Reports" onChange={(e) => e.target.checked ? setTeachingAids([...teachingAids, e.target.value]) : setTeachingAids(teachingAids.filter(strategy => strategy !== e.target.value))} />
                                                    <span className="ml-2">Reports</span>
                                                </label>
                                                <br />
                                                <label className="inline-flex items-center">
                                                    <input type="checkbox" className="form-checkbox" value="Charts" onChange={(e) => e.target.checked ? setTeachingAids([...teachingAids, e.target.value]) : setTeachingAids(teachingAids.filter(strategy => strategy !== e.target.value))} />
                                                    <span className="ml-2">Charts</span>
                                                </label>
                                                <br />
                                                <label className="inline-flex items-center">
                                                    <input type="checkbox" className="form-checkbox" value="Newspapers" onChange={(e) => e.target.checked ? setTeachingAids([...teachingAids, e.target.value]) : setTeachingAids(teachingAids.filter(strategy => strategy !== e.target.value))} />
                                                    <span className="ml-2">Newspapers</span>
                                                </label>
                                                <br />
                                                <label className="inline-flex items-center">
                                                    <input type="checkbox" className="form-checkbox" value="Handouts" onChange={(e) => e.target.checked ? setTeachingAids([...teachingAids, e.target.value]) : setTeachingAids(teachingAids.filter(strategy => strategy !== e.target.value))} />
                                                    <span className="ml-2">Handouts</span>
                                                </label>
                                                <label className="inline-flex items-center">
                                                    <input type="checkbox" className="form-checkbox" value="Others" onChange={(e) => e.target.checked ? setTeachingAids([...teachingAids, e.target.value]) : setTeachingAids(teachingAids.filter(strategy => strategy !== e.target.value))} />
                                                    <span className="ml-2">Others</span>
                                                </label>

                                            </div>
                                        </div>
                                        <div>
                                            <InputLabel value="Assessment Strategy" />
                                            <div className="mt-2 space-y-2">
                                                <label className="inline-flex items-center">
                                                    <input type="checkbox" className="form-checkbox" value="MCQ" onChange={(e) => e.target.checked ? setAssessmentStrategies([...assessmentStrategies, e.target.value]) : setAssessmentStrategies(assessmentStrategies.filter(strategy => strategy !== e.target.value))} />
                                                    <span className="ml-2">MCQ</span>
                                                </label>
                                                <br />
                                                <label className="inline-flex items-center">
                                                    <input type="checkbox" className="form-checkbox" value="Quiz" onChange={(e) => e.target.checked ? setAssessmentStrategies([...assessmentStrategies, e.target.value]) : setAssessmentStrategies(assessmentStrategies.filter(strategy => strategy !== e.target.value))} />
                                                    <span className="ml-2">Quiz</span>
                                                </label>
                                                <br />
                                                <label className="inline-flex items-center">
                                                    <input type="checkbox" className="form-checkbox" value="Assignment" onChange={(e) => e.target.checked ? setAssessmentStrategies([...assessmentStrategies, e.target.value]) : setAssessmentStrategies(assessmentStrategies.filter(strategy => strategy !== e.target.value))} />
                                                    <span className="ml-2">Assignment</span>
                                                </label>
                                                <br />
                                                <label className="inline-flex items-center">
                                                    <input type="checkbox" className="form-checkbox" value="Presentation" onChange={(e) => e.target.checked ? setAssessmentStrategies([...assessmentStrategies, e.target.value]) : setAssessmentStrategies(assessmentStrategies.filter(strategy => strategy !== e.target.value))} />
                                                    <span className="ml-2">Presentation</span>
                                                </label>
                                                <br />
                                                <label className="inline-flex items-center">
                                                    <input type="checkbox" className="form-checkbox" value="Final Examination" onChange={(e) => e.target.checked ? setAssessmentStrategies([...assessmentStrategies, e.target.value]) : setAssessmentStrategies(assessmentStrategies.filter(strategy => strategy !== e.target.value))} />
                                                    <span className="ml-2">Final Examination</span>
                                                </label>
                                                <br />
                                                <label className="inline-flex items-center">
                                                    <input type="checkbox" className="form-checkbox" value="Others" onChange={(e) => e.target.checked ? setTeachingStrategies([...teachingStrategies, e.target.value]) : setTeachingStrategies(teachingStrategies.filter(strategy => strategy !== e.target.value))} />
                                                    <span className="ml-2">Others</span>
                                                </label>
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
                                                Update Weekly Plan
                                            </PrimaryButton>
                                        </div>
                                    </form>
                                </div>


                                <div>
                                    <header>
                                        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Editing Weekly Lesson Plan</h2>
                                        <p className="mt-1 mb-2 text-sm text-gray-600 dark:text-gray-400">
                                            You've selected following Week's Lesson Plans to edit.
                                        </p>
                                    </header>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-1 gap-6 lg:gap-8 flex justify-center">
                                        
                                                <WeeklyPlanCard
                                                    week={selectedWP.Week}
                                                    topic={selectedWP.Topics}
                                                    spo={selectedWP.SpecificOutcomes}
                                                    teaching_strategy={selectedWP.teaching_strategy}
                                                    teaching_aid={selectedWP.teaching_aid}
                                                    assessment_strategy={selectedWP.assessment_strategy}
                                                    clos={selectedWP.mapping}
                                                    wpid={selectedWP.id}
                                                    route={route('EditWeeklyLessonPlan', { wp: selectedWP.id })}
                                                    showbuttons="no"
                                                />
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
