import { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';

import PrimaryButton from '@/Components/PrimaryButton';
import ExtraButton from '@/Components/ExtraButton';

export default function SuccessPage({ message, auth }) {
    const { courseCode } = usePage().props;
    console.log(message);
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Success</h2>}
        >
            <Head title="Success!" />

            <div className="max-w-7xl mx-auto p-6 lg:p-8">

                <div className="mt-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 flex justify-center">
                        <div className="scale-100 p-6 bg-white dark:bg-gray-800/50 dark:bg-gradient-to-bl from-gray-700/50 via-transparent dark:ring-1 dark:ring-inset dark:ring-white/5 rounded-lg shadow-2xl shadow-gray-500/20 dark:shadow-none flex motion-safe:hover:scale-[1.01] transition-all duration-250 focus:outline focus:outline-2 focus:outline-red-500">
                            {auth.user.role === "admin" ? (
                                <>
                                    <div className="flex items-center">
                                        <div>
                                            <h2 className="mt-2 text-xl font-semibold text-gray-900 dark:text-white">
                                                User Added
                                            </h2>
                                            <div className="flex items-center gap-4 mt-4"></div>

                                            <Link
                                                href={route('workspace')}>
                                                <PrimaryButton>
                                                    Back
                                                </PrimaryButton>
                                            </Link>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="flex items-center">
                                        <div>
                                            <h2 className="mt-2 text-xl font-semibold text-gray-900 dark:text-white">
                                                {courseCode} Course Added
                                            </h2>
                                            <div className="flex items-center gap-4 mt-4"></div>

                                            <Link
                                                href={route('workspace')}>
                                                <PrimaryButton>
                                                    Back
                                                </PrimaryButton>
                                            </Link>
                                            &nbsp; &nbsp;
                                            <Link
                                                href={route('workspace')}>
                                                <PrimaryButton>
                                                    Add Syllabus for {courseCode}
                                                </PrimaryButton>
                                            </Link>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}