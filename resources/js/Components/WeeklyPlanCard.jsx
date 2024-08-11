import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const WeeklyPlanCard = ({ week, topic, spo, teaching_strategy, teaching_aid, assessment_strategy, clos, link, showbuttons, wpid }) => {
    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this course objective?')) {
            router.delete(route('deleteWeeklyLessonPlan', { wp: id }));
        }
    };

    return (
        <div className="scale-100 p-6 bg-white dark:bg-gray-800/50 dark:bg-gradient-to-bl from-gray-700/50 via-transparent dark:ring-1 dark:ring-inset dark:ring-white/5 rounded-lg shadow-2xl shadow-gray-500/20 dark:shadow-none flex flex-col motion-safe:hover:scale-[1.01] transition-all duration-250 focus:outline focus:outline-2 focus:outline-red-500">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Week-{week}
                </h2>
                {showbuttons === "yes" && (
                    <div className="flex space-x-5">
                        <Link href={link}>
                            <FontAwesomeIcon icon={faEdit} size="lg" className="text-green-500 hover:text-green-700 dark:text-green-400 dark:hover:text-green-600" />
                        </Link>
                        <button onClick={() => handleDelete(wpid)}>
                            <FontAwesomeIcon icon={faTrash} size="lg" className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-600" />
                        </button>
                    </div>
                )}
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 table-auto">
                    <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700">
                        <tr className="bg-gray-50 dark:bg-gray-800">
                            <td className="px-6 py-4 whitespace-wrap text-sm text-gray-900 dark:text-gray-400 border-r border-gray-200 dark:border-gray-700">Topics</td>
                            <td className="px-6 py-4 whitespace-wrap text-sm text-gray-900 dark:text-gray-400">{topic}</td>
                        </tr>
                        <tr className="bg-gray-50 dark:bg-gray-800">
                            <td className="px-6 py-4 whitespace-wrap text-sm text-gray-900 dark:text-gray-400 border-r border-gray-200 dark:border-gray-700">Specific Outcomes</td>
                            <td className="px-6 py-4 whitespace-wrap text-sm text-gray-900 dark:text-gray-400">{spo}</td>
                        </tr>
                        <tr className="bg-gray-50 dark:bg-gray-800">
                            <td className="px-6 py-4 whitespace-wrap text-sm text-gray-900 dark:text-gray-400 border-r border-gray-200 dark:border-gray-700">Teaching Strategies</td>
                            <td className="px-6 py-4 whitespace-wrap text-sm text-gray-900 dark:text-gray-400">{teaching_strategy}</td>
                        </tr>
                        <tr className="bg-gray-50 dark:bg-gray-800">
                            <td className="px-6 py-4 whitespace-wrap text-sm text-gray-900 dark:text-gray-400 border-r border-gray-200 dark:border-gray-700">Teaching Aids/ Tools</td>
                            <td className="px-6 py-4 whitespace-wrap text-sm text-gray-900 dark:text-gray-400">{teaching_aid}</td>
                        </tr>
                        <tr className="bg-gray-50 dark:bg-gray-800">
                            <td className="px-6 py-4 whitespace-wrap text-sm text-gray-900 dark:text-gray-400 border-r border-gray-200 dark:border-gray-700">Assessment Strategies</td>
                            <td className="px-6 py-4 whitespace-wrap text-sm text-gray-900 dark:text-gray-400">{assessment_strategy}</td>
                        </tr>
                        <tr className="bg-gray-50 dark:bg-gray-800">
                            <td className="px-6 py-4 whitespace-wrap text-sm text-gray-900 dark:text-gray-400 border-r border-gray-200 dark:border-gray-700">Alignment with CLOs</td>
                            <td className="px-6 py-4 whitespace-wrap text-sm text-gray-900 dark:text-gray-400">{clos}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

WeeklyPlanCard.propTypes = {
    week: PropTypes.string.isRequired,
    topic: PropTypes.string.isRequired,
    spo: PropTypes.string.isRequired,
    teaching_strategy: PropTypes.string.isRequired,
    teaching_aid: PropTypes.string.isRequired,
    assessment_strategy: PropTypes.string.isRequired,
    clos: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    showbuttons: PropTypes.oneOf(['yes', 'no']).isRequired,
    wpid: PropTypes.string.isRequired,
};

export default WeeklyPlanCard;
