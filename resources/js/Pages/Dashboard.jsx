import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, Link } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import ExtraButton from '@/Components/PrimaryButton';

import DashboardCard from '@/Components/DashboardCard';
import DeleteUserForm from '@/Pages/Profile/Partials/DeleteUserForm';
import Modal from '@/Components/Modal';

export default function Dashboard({ auth }) {

    const { departments, committees, proposals, faculties, enrollments, students } = usePage().props;
    console.log(departments);
    let isChairman = false;
    let isDean = false;
    let inCommittee = false;
    let isEnrollment = false;
    let level = '';
    let semester = '';
    let degree = '';
    let detectedProposal;

    // Check if the user is a chairman
    departments.forEach(department => {
        if (department.chairman == auth.user.email) {
            isChairman = true;
        }
    });

    faculties.forEach(faculty => {
        if (faculty.dean == auth.user.email) {
            isDean = true;
        }
    });

    const student = students.find(student => student.email == auth.user.email);
    console.log(students);
    console.log(enrollments);
    if (auth.user.role == 'student' && student) {
        level = student.level;
        semester = student.semester;
        degree = student.degree;
    }

    enrollments.forEach(enrollment => {
        if (auth.user.role == 'student' &&
            enrollment.degree == degree &&
            enrollment.level == level &&
            enrollment.semester == semester) {
            const currentDate = new Date(); // Get current date
            const startDate = new Date(enrollment.start_date); // Convert start_date to Date object
            const endDate = new Date(enrollment.end_date); // Convert end_date to Date object

            if (currentDate >= startDate && currentDate <= endDate) {
                isEnrollment = true; // Set isEnrollment to true if current date is between start_date and end_date
            }
        }
    });

    committees.forEach(committee => {
        if (committee.Chairman == auth.user.email || committee.Member1 == auth.user.email || committee.Member2 == auth.user.email) {
            inCommittee = true;
            proposals.forEach(proposal => {
                if (proposal.committee == committee.id) {
                    detectedProposal = proposal;
                }
            });
        }
    });
    console.log(isChairman);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />


            <div className="max-w-7xl mx-auto p-6 lg:p-8">
                <div className="mt-16">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 flex justify-center">

                        {auth.user.role === "student" ? (
                            <>
                                {isEnrollment ? (
                                    <>
                                        <DashboardCard
                                            user={auth.user}
                                            route={route('gotoPaymentPage', { uid: auth.user.id })}
                                            imageSrc="./images/digital.svg"
                                            heading="HI"
                                            description="You can Create a Faculty of the system from here."
                                            buttonDescription="Enrollment"
                                        />

                                        <a href={route('gotoPaymentPage', { uid: auth.user.id })} className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Enrollment {auth.user.email}</a>
                                        &nbsp;


                                    </>
                                ) : (
                                    <>

                                    </>
                                )}
                                {/**
                                <DashboardCard
                                    user={auth.user}
                                    route={route('addPaper.page')}
                                    imageSrc="./images/digital.svg"
                                    heading="HSTU Journal"
                                    description="Work on journals from here."
                                    buttonDescription="Journal"
                                />
 */}
                            </>
                        ) : (
                            <>
                                {auth.user.role === "admin" ? (
                                    <>

                                        <DashboardCard
                                            user={auth.user}
                                            route={route('createFaculty.page')}
                                            imageSrc="./images/digital.svg"
                                            heading="Create a Faculty"
                                            description="You can Create a Faculty of the system from here."
                                            buttonDescription="Create a Faculty"
                                        />

                                        <DashboardCard
                                            user={auth.user}
                                            route={route('createDept.page')}
                                            imageSrc="./images/digital.svg"
                                            heading="Create a Department"
                                            description="You can Create a Department from here."
                                            buttonDescription="Create a Department"
                                        />

                                        <DashboardCard
                                            user={auth.user}
                                            route={route('createTeacher.page')}
                                            imageSrc="./images/teacher.png"
                                            heading="Add Teacher"
                                            description="You can add a user of the system from here."
                                            buttonDescription="Add Teacher"
                                        />

                                        <DashboardCard
                                            user={auth.user}
                                            route={route('createStudent.page')}
                                            imageSrc="./images/digital.svg"
                                            heading="Add Student"
                                            description="You can add a user of the system from here."
                                            buttonDescription="Add Student"
                                        />

                                        <DashboardCard
                                            user={auth.user}
                                            route={route('workspace')}
                                            imageSrc="./images/digital.svg"
                                            heading="Add Admin"
                                            description="You can add a user of the system from here."
                                            buttonDescription="Add Admin"
                                        />

                                        <DashboardCard
                                            user={auth.user}
                                            route={route('workspace')}
                                            imageSrc="./images/digital.svg"
                                            heading="Add Staff Member"
                                            description="You can add a user of the system from here."
                                            buttonDescription="Add Staff Member"
                                        />

                                        <DashboardCard
                                            user={auth.user}
                                            route={route('abc')}
                                            imageSrc="./images/digital.svg"
                                            heading="OBE Completed"
                                            description="You can see courses those are completed."
                                            buttonDescription="Completed Courses"
                                        />

                                    </>
                                ) : (
                                    <>
                                        {isChairman ? (
                                            <>
                                                <DashboardCard
                                                    user={auth.user}
                                                    route={route('workspace')}
                                                    imageSrc="./images/addCourse.png"
                                                    heading="Add courses"
                                                    description="Add a course easily from here that you can distribute to teachers further."
                                                    buttonDescription="Add Course"
                                                />

                                                <DashboardCard
                                                    user={auth.user}
                                                    route={route('courseDistribution.page')}
                                                    imageSrc="./images/management.png"
                                                    heading="Distribute a Course"
                                                    description="Distribute the courses you've added to the teachers of your department."
                                                    buttonDescription="Distribute Course"
                                                />


                                                <DashboardCard
                                                    user={auth.user}
                                                    route={route('workspaceChairman')}
                                                    imageSrc="./images/digital.svg"
                                                    heading="Courses And OBE Syllabus"
                                                    description="See courses distributed to you and start adding OBE syllabus from here."
                                                    buttonDescription="Workspace"
                                                />



                                                <DashboardCard
                                                    user={auth.user}
                                                    route={route('proposalPage')}
                                                    imageSrc="./images/committee.png"
                                                    heading="Exam Committee and Proposal"
                                                    description="Assign teachers to the exam committee of a course to integrate it into the exam proposal."
                                                    buttonDescription="Set Committee"
                                                />


                                                {inCommittee ? (
                                                    <>

                                                        <DashboardCard
                                                            user={auth.user}
                                                            route={route('questionModerationView')}
                                                            imageSrc="./images/writing.png"
                                                            heading="Moderate Questions"
                                                            description="As a member of the exam committee, you can moderate questions."
                                                            buttonDescription="Question Moderation"
                                                        />


                                                    </>
                                                ) : (
                                                    <>

                                                    </>
                                                )}
                                            </>
                                        ) : (
                                            <>
                                                <DashboardCard
                                                    user={auth.user}
                                                    route={route('workspace')}
                                                    imageSrc="./images/digital.svg"
                                                    heading="Courses And OBE Syllabus"
                                                    description="See courses distributed to you and start adding OBE syllabus from here."
                                                    buttonDescription="Workspace"
                                                />


                                                {/**
                                                <DashboardCard
                                                    user={auth.user}
                                                    route={route('workspace')}
                                                    imageSrc="./images/digital.svg"
                                                    heading="HSTU Journal"
                                                    description="Work on journals from here."
                                                    buttonDescription="Journal"
                                                />
 */}

                                                {inCommittee ? (
                                                    <>

                                                        <DashboardCard
                                                            user={auth.user}
                                                            route={route('questionModerationView')}
                                                            imageSrc="./images/writing.png"
                                                            heading="Moderate Questions"
                                                            description="As a member of the exam committee, you can moderate questions."
                                                            buttonDescription="Question Moderation"
                                                        />

                                                    </>
                                                ) : (
                                                    <>

                                                    </>
                                                )}

                                            </>
                                        )}

                                        {isDean ? (
                                            <>

                                                <DashboardCard
                                                    user={auth.user}
                                                    route={route('createEnrollment.page')}
                                                    imageSrc="./images/digital.svg"
                                                    heading="Create Enrollment"
                                                    description="See courses distributed to you and start adding OBE syllabus from here."
                                                    buttonDescription="Create Enrollment"
                                                />

                                            </>
                                        ) : (
                                            <>
                                            </>
                                        )}



                                    </>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>

        </AuthenticatedLayout >
    );
}
