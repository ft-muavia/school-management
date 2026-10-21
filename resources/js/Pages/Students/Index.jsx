import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

export default function StudentsIndex({ students, classes = [], subjects = [], filters = {}, stats = {} }) {
    const [search, setSearch] = useState(filters.search || '');
    const [classId, setClassId] = useState(filters.class_id || '');
    const [feeStatus, setFeeStatus] = useState(filters.fee_status || '');
    const [selectedStudent, setSelectedStudent] = useState(null);

    const handleFilter = (e) => {
        e && e.preventDefault();
        router.get(
            route('students.index'),
            {
                search: search || undefined,
                class_id: classId || undefined,
                fee_status: feeStatus || undefined,
            },
            { preserveState: true, replace: true }
        );
    };

    const handleReset = () => {
        setSearch('');
        setClassId('');
        setFeeStatus('');
        router.get(route('students.index'));
    };

    const toggleFee = (id) => {
        router.patch(route('students.toggleFee', id), {}, { preserveScroll: true });
    };

    const deleteStudent = (id, name) => {
        if (confirm(`Are you sure you want to delete the student record for "${name}"?`)) {
            router.delete(route('students.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-bold leading-tight text-gray-800">
                            Student Management
                        </h2>
                        <p className="text-sm text-gray-500">
                            Complete student records, enrolled subjects, parent details, and fee tracking.
                        </p>
                    </div>
                    <Link
                        href={route('students.create')}
                        className="inline-flex items-center justify-center px-4 py-2 bg-indigo-600 border border-transparent rounded-lg font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 active:bg-indigo-800 shadow-sm"
                    >
                        + Register New Student
                    </Link>
                </div>
            }
        >
            <Head title="Students" />

            <div className="py-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
                    {/* Top Stats Overview */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                            <span className="text-xs text-gray-500 uppercase font-semibold">Total Students</span>
                            <div className="text-2xl font-bold text-gray-800">{stats.total_students ?? 0}</div>
                        </div>
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                            <span className="text-xs text-gray-500 uppercase font-semibold">Fees Cleared</span>
                            <div className="text-2xl font-bold text-emerald-600">{stats.paid_students ?? 0}</div>
                        </div>
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                            <span className="text-xs text-gray-500 uppercase font-semibold">Fees Pending</span>
                            <div className="text-2xl font-bold text-amber-600">{stats.pending_students ?? 0}</div>
                        </div>
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                            <span className="text-xs text-gray-500 uppercase font-semibold">Pending Amount</span>
                            <div className="text-2xl font-bold text-red-600">
                                PKR {Number(stats.total_pending_amount ?? 0).toLocaleString()}
                            </div>
                        </div>
                    </div>

                    {/* Filter and Search Bar */}
                    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                        <form onSubmit={handleFilter} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                                    Search Name / Roll # / Father
                                </label>
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="e.g. Ali, SCH-2026-001..."
                                    className="w-full text-sm rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                                    Filter by Class
                                </label>
                                <select
                                    value={classId}
                                    onChange={(e) => setClassId(e.target.value)}
                                    className="w-full text-sm rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                                >
                                    <option value="">All Classes</option>
                                    {classes.map((c) => (
                                        <option key={c.id} value={c.id}>
                                            {c.name} {c.section ? `(${c.section})` : ''}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                                    Fee Status
                                </label>
                                <select
                                    value={feeStatus}
                                    onChange={(e) => setFeeStatus(e.target.value)}
                                    className="w-full text-sm rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                                >
                                    <option value="">All Statuses</option>
                                    <option value="paid">Paid</option>
                                    <option value="pending">Pending</option>
                                </select>
                            </div>

                            <div className="flex items-end space-x-2">
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-2.5 bg-indigo-600 text-white font-semibold text-sm rounded-lg hover:bg-indigo-700 transition"
                                >
                                    Apply Filter
                                </button>
                                <button
                                    type="button"
                                    onClick={handleReset}
                                    className="px-4 py-2.5 bg-gray-100 text-gray-600 font-semibold text-sm rounded-lg hover:bg-gray-200 transition"
                                >
                                    Reset
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Students Table */}
                    <div className="bg-white shadow-sm rounded-xl overflow-hidden border border-gray-100">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200 text-sm">
                                <thead className="bg-gray-50 text-gray-600 font-semibold uppercase text-xs">
                                    <tr>
                                        <th className="px-6 py-3.5 text-left">Roll / Adm #</th>
                                        <th className="px-6 py-3.5 text-left">Student Info</th>
                                        <th className="px-6 py-3.5 text-left">Father's Name</th>
                                        <th className="px-6 py-3.5 text-left">Class</th>
                                        <th className="px-6 py-3.5 text-left">Subjects Enrolled</th>
                                        <th className="px-6 py-3.5 text-left">Fee Status</th>
                                        <th className="px-6 py-3.5 text-left">Address</th>
                                        <th className="px-6 py-3.5 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {students.data.length === 0 ? (
                                        <tr>
                                            <td colSpan="8" className="px-6 py-12 text-center text-gray-400">
                                                No students found matching your criteria.
                                            </td>
                                        </tr>
                                    ) : (
                                        students.data.map((student) => (
                                            <tr key={student.id} className="hover:bg-gray-50 transition">
                                                <td className="px-6 py-4 font-mono font-medium text-gray-700">
                                                    {student.admission_number}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="font-semibold text-gray-900">{student.name}</div>
                                                    <div className="text-xs text-gray-500">
                                                        Age: {student.age ? `${student.age} yrs` : 'N/A'} • {student.gender}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 font-medium text-gray-700">
                                                    {student.father_name}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                        {student.school_class?.name} {student.school_class?.section ? `(${student.school_class?.section})` : ''}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex flex-wrap gap-1 max-w-xs">
                                                        {student.subjects?.map((sub) => (
                                                            <span
                                                                key={sub.id}
                                                                className="text-xs bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-md font-medium"
                                                            >
                                                                {sub.name}
                                                            </span>
                                                        ))}
                                                        {(!student.subjects || student.subjects.length === 0) && (
                                                            <span className="text-xs text-gray-400 italic">No subjects assigned</span>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="space-y-1">
                                                        <div className="font-semibold text-gray-800 text-xs">
                                                            PKR {Number(student.monthly_fee).toLocaleString()}
                                                        </div>
                                                        <button
                                                            onClick={() => toggleFee(student.id)}
                                                            title="Click to toggle fee status"
                                                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold cursor-pointer transition ${
                                                                student.fee_status === 'paid'
                                                                    ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                                                                    : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                                                            }`}
                                                        >
                                                            {student.fee_status === 'paid' ? '✓ Paid' : '⏳ Pending'}
                                                        </button>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-xs text-gray-600 max-w-xs truncate" title={student.address}>
                                                    {student.address}
                                                </td>
                                                <td className="px-6 py-4 text-right space-x-2 whitespace-nowrap">
                                                    <button
                                                        onClick={() => setSelectedStudent(student)}
                                                        className="text-xs font-semibold text-blue-600 hover:text-blue-800"
                                                    >
                                                        Details
                                                    </button>
                                                    <Link
                                                        href={route('students.edit', student.id)}
                                                        className="text-xs font-semibold text-indigo-600 hover:text-indigo-800"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <button
                                                        onClick={() => deleteStudent(student.id, student.name)}
                                                        className="text-xs font-semibold text-red-600 hover:text-red-800"
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination links */}
                        {students.links && students.links.length > 3 && (
                            <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
                                <div className="text-xs text-gray-500">
                                    Showing {students.from ?? 0} to {students.to ?? 0} of {students.total} students
                                </div>
                                <div className="flex gap-1">
                                    {students.links.map((link, idx) => (
                                        <Link
                                            key={idx}
                                            href={link.url || '#'}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                            className={`px-3 py-1 text-xs rounded border ${
                                                link.active
                                                    ? 'bg-indigo-600 text-white border-indigo-600'
                                                    : link.url
                                                    ? 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                                                    : 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                                            }`}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Quick Detail Modal */}
            {selectedStudent && (
                <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl relative animate-fade-in">
                        <button
                            onClick={() => setSelectedStudent(null)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-lg font-bold"
                        >
                            &times;
                        </button>
                        <div className="border-b pb-4 mb-4">
                            <span className="text-xs font-mono font-semibold text-indigo-600 uppercase">
                                {selectedStudent.admission_number}
                            </span>
                            <h3 className="text-xl font-bold text-gray-800">{selectedStudent.name}</h3>
                            <p className="text-xs text-gray-500">
                                Enrolled in: {selectedStudent.school_class?.name} ({selectedStudent.school_class?.section})
                            </p>
                        </div>

                        <div className="space-y-3 text-sm">
                            <div className="grid grid-cols-2 gap-2">
                                <div>
                                    <span className="text-xs text-gray-400 block">Father's Name</span>
                                    <span className="font-semibold text-gray-800">{selectedStudent.father_name}</span>
                                </div>
                                <div>
                                    <span className="text-xs text-gray-400 block">Age / Gender</span>
                                    <span className="font-semibold text-gray-800">
                                        {selectedStudent.age ?? 'N/A'} yrs • {selectedStudent.gender}
                                    </span>
                                </div>
                                <div>
                                    <span className="text-xs text-gray-400 block">Phone / Contact</span>
                                    <span className="font-semibold text-gray-800">{selectedStudent.phone || 'N/A'}</span>
                                </div>
                                <div>
                                    <span className="text-xs text-gray-400 block">Admission Date</span>
                                    <span className="font-semibold text-gray-800">{selectedStudent.admission_date || 'N/A'}</span>
                                </div>
                            </div>

                            <div className="pt-2">
                                <span className="text-xs text-gray-400 block">Address (Kahan rehta hai)</span>
                                <p className="bg-gray-50 p-2.5 rounded-lg text-gray-700 font-medium mt-1">
                                    {selectedStudent.address}
                                </p>
                            </div>

                            <div className="pt-2">
                                <span className="text-xs text-gray-400 block mb-1">Subjects (Konsy hain)</span>
                                <div className="flex flex-wrap gap-1.5">
                                    {selectedStudent.subjects?.map((sub) => (
                                        <span key={sub.id} className="text-xs bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded font-medium">
                                            {sub.name} {sub.code ? `(${sub.code})` : ''}
                                        </span>
                                    ))}
                                    {(!selectedStudent.subjects || selectedStudent.subjects.length === 0) && (
                                        <span className="text-xs text-gray-400">None assigned</span>
                                    )}
                                </div>
                            </div>

                            <div className="pt-2 border-t mt-4 flex items-center justify-between">
                                <div>
                                    <span className="text-xs text-gray-400 block">Monthly Fee</span>
                                    <span className="font-bold text-gray-800 text-base">
                                        PKR {Number(selectedStudent.monthly_fee).toLocaleString()}
                                    </span>
                                </div>
                                <div>
                                    <span className="text-xs text-gray-400 block text-right">Fee Status</span>
                                    <span
                                        className={`inline-flex px-3 py-1 rounded-full text-xs font-bold ${
                                            selectedStudent.fee_status === 'paid'
                                                ? 'bg-emerald-100 text-emerald-800'
                                                : 'bg-amber-100 text-amber-800'
                                        }`}
                                    >
                                        {selectedStudent.fee_status === 'paid' ? 'PAID' : 'PENDING'}
                                    </span>
                                </div>
                            </div>

                            {selectedStudent.remarks && (
                                <div className="pt-2">
                                    <span className="text-xs text-gray-400 block">Remarks / Notes</span>
                                    <p className="text-xs text-gray-600 italic">{selectedStudent.remarks}</p>
                                </div>
                            )}
                        </div>

                        <div className="mt-6 flex justify-end space-x-2">
                            <Link
                                href={route('students.edit', selectedStudent.id)}
                                className="px-4 py-2 bg-indigo-600 text-white text-xs font-semibold rounded-lg hover:bg-indigo-700"
                            >
                                Edit Student
                            </Link>
                            <button
                                onClick={() => setSelectedStudent(null)}
                                className="px-4 py-2 bg-gray-100 text-gray-700 text-xs font-semibold rounded-lg hover:bg-gray-200"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
