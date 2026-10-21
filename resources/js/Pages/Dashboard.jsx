import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ stats = {}, recentStudents = [] }) {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold leading-tight text-gray-800">
                            School Overview & Dashboard
                        </h2>
                        <p className="text-sm text-gray-500">
                            Welcome to the School Management System
                        </p>
                    </div>
                    <Link
                        href={route('students.create')}
                        className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-lg font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 active:bg-indigo-800 focus:outline-none transition ease-in-out duration-150 shadow-sm"
                    >
                        + New Student Admission
                    </Link>
                </div>
            }
        >
            <Head title="Dashboard" />

            <div className="py-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
                    {/* Stat Cards */}
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        {/* Total Students */}
                        <div className="bg-white overflow-hidden shadow-sm rounded-xl p-5 border border-gray-100 flex items-center justify-between">
                            <div>
                                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    Total Students
                                </p>
                                <p className="mt-1 text-3xl font-extrabold text-gray-900">
                                    {stats.total_students ?? 0}
                                </p>
                                <p className="mt-1 text-xs text-indigo-600 font-medium">
                                    Enrolled in school
                                </p>
                            </div>
                            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                        </div>

                        {/* Paid Fees */}
                        <div className="bg-white overflow-hidden shadow-sm rounded-xl p-5 border border-gray-100 flex items-center justify-between">
                            <div>
                                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    Fees Paid
                                </p>
                                <p className="mt-1 text-3xl font-extrabold text-emerald-600">
                                    {stats.paid_students ?? 0}
                                </p>
                                <p className="mt-1 text-xs text-emerald-600 font-medium">
                                    Students cleared
                                </p>
                            </div>
                            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>

                        {/* Pending Fees */}
                        <div className="bg-white overflow-hidden shadow-sm rounded-xl p-5 border border-gray-100 flex items-center justify-between">
                            <div>
                                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    Fees Pending
                                </p>
                                <p className="mt-1 text-3xl font-extrabold text-amber-600">
                                    {stats.pending_students ?? 0}
                                </p>
                                <p className="mt-1 text-xs text-amber-600 font-medium">
                                    Due: PKR {Number(stats.total_pending_fee || 0).toLocaleString()}
                                </p>
                            </div>
                            <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>

                        {/* Total Classes & Subjects */}
                        <div className="bg-white overflow-hidden shadow-sm rounded-xl p-5 border border-gray-100 flex items-center justify-between">
                            <div>
                                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    Classes & Subjects
                                </p>
                                <p className="mt-1 text-3xl font-extrabold text-gray-900">
                                    {stats.total_classes ?? 0}
                                </p>
                                <p className="mt-1 text-xs text-purple-600 font-medium">
                                    {stats.total_subjects ?? 0} Teaching subjects
                                </p>
                            </div>
                            <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Quick Navigation / Action Bar */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Link
                            href={route('students.index')}
                            className="p-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl shadow hover:shadow-md transition flex items-center justify-between group"
                        >
                            <div>
                                <h3 className="font-bold text-lg">View All Students</h3>
                                <p className="text-blue-100 text-sm">Search, filter by class & fee status</p>
                            </div>
                            <span className="text-2xl transform group-hover:translate-x-1 transition">&rarr;</span>
                        </Link>

                        <Link
                            href={route('students.create')}
                            className="p-5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl shadow hover:shadow-md transition flex items-center justify-between group"
                        >
                            <div>
                                <h3 className="font-bold text-lg">New Admission</h3>
                                <p className="text-emerald-100 text-sm">Register student with subjects & address</p>
                            </div>
                            <span className="text-2xl transform group-hover:translate-x-1 transition">&rarr;</span>
                        </Link>

                        <Link
                            href={route('students.index', { fee_status: 'pending' })}
                            className="p-5 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-xl shadow hover:shadow-md transition flex items-center justify-between group"
                        >
                            <div>
                                <h3 className="font-bold text-lg">Pending Fees</h3>
                                <p className="text-amber-100 text-sm">Track & update unpaid student dues</p>
                            </div>
                            <span className="text-2xl transform group-hover:translate-x-1 transition">&rarr;</span>
                        </Link>
                    </div>

                    {/* Recent Students Table */}
                    <div className="bg-white shadow-sm rounded-xl overflow-hidden border border-gray-100">
                        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                            <h3 className="text-lg font-bold text-gray-800">
                                Recently Registered Students
                            </h3>
                            <Link
                                href={route('students.index')}
                                className="text-sm font-semibold text-indigo-600 hover:text-indigo-800"
                            >
                                View full list &rarr;
                            </Link>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200 text-sm">
                                <thead className="bg-gray-50 text-gray-600 font-semibold uppercase text-xs">
                                    <tr>
                                        <th className="px-6 py-3 text-left">Roll / Adm #</th>
                                        <th className="px-6 py-3 text-left">Student & Father</th>
                                        <th className="px-6 py-3 text-left">Class</th>
                                        <th className="px-6 py-3 text-left">Subjects</th>
                                        <th className="px-6 py-3 text-left">Monthly Fee</th>
                                        <th className="px-6 py-3 text-left">Fee Status</th>
                                        <th className="px-6 py-3 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {recentStudents.length === 0 ? (
                                        <tr>
                                            <td colSpan="7" className="px-6 py-8 text-center text-gray-400">
                                                No students registered yet. Click "New Admission" to register the first student.
                                            </td>
                                        </tr>
                                    ) : (
                                        recentStudents.map((student) => (
                                            <tr key={student.id} className="hover:bg-gray-50 transition">
                                                <td className="px-6 py-4 font-mono font-medium text-gray-700">
                                                    {student.admission_number}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="font-semibold text-gray-900">{student.name}</div>
                                                    <div className="text-xs text-gray-500">S/D of: {student.father_name}</div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                        {student.school_class?.name} ({student.school_class?.section})
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex flex-wrap gap-1 max-w-xs">
                                                        {student.subjects?.slice(0, 3).map((sub) => (
                                                            <span key={sub.id} className="text-xs bg-gray-100 px-2 py-0.5 rounded text-gray-600">
                                                                {sub.name}
                                                            </span>
                                                        ))}
                                                        {student.subjects?.length > 3 && (
                                                            <span className="text-xs text-gray-500">
                                                                +{student.subjects.length - 3} more
                                                            </span>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 font-semibold text-gray-800">
                                                    PKR {Number(student.monthly_fee).toLocaleString()}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span
                                                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                                                            student.fee_status === 'paid'
                                                                ? 'bg-emerald-100 text-emerald-800'
                                                                : 'bg-amber-100 text-amber-800'
                                                        }`}
                                                    >
                                                        {student.fee_status === 'paid' ? 'Paid' : 'Pending'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right space-x-2">
                                                    <Link
                                                        href={route('students.edit', student.id)}
                                                        className="text-xs font-semibold text-indigo-600 hover:text-indigo-800"
                                                    >
                                                        Edit
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
