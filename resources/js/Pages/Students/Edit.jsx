import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function StudentEdit({ student, classes = [], subjects = [] }) {
    const initialSubjectIds = student.subjects ? student.subjects.map((s) => s.id) : [];

    const { data, setData, put, processing, errors } = useForm({
        admission_number: student.admission_number || '',
        name: student.name || '',
        father_name: student.father_name || '',
        age: student.age || '',
        date_of_birth: student.date_of_birth || '',
        gender: student.gender || 'male',
        address: student.address || '',
        phone: student.phone || '',
        school_class_id: student.school_class_id || '',
        monthly_fee: student.monthly_fee || 0,
        fee_status: student.fee_status || 'pending',
        admission_date: student.admission_date || '',
        remarks: student.remarks || '',
        subject_ids: initialSubjectIds,
    });

    const handleSubjectToggle = (id) => {
        if (data.subject_ids.includes(id)) {
            setData('subject_ids', data.subject_ids.filter((sId) => sId !== id));
        } else {
            setData('subject_ids', [...data.subject_ids, id]);
        }
    };

    const handleSelectAllSubjects = () => {
        if (data.subject_ids.length === subjects.length) {
            setData('subject_ids', []);
        } else {
            setData('subject_ids', subjects.map((s) => s.id));
        }
    };

    const submit = (e) => {
        e.preventDefault();
        put(route('students.update', student.id));
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold leading-tight text-gray-800">
                            Edit Student: {student.name}
                        </h2>
                        <p className="text-sm text-gray-500">
                            Admission #: {student.admission_number}
                        </p>
                    </div>
                    <Link
                        href={route('students.index')}
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-xs font-semibold hover:bg-gray-200 transition"
                    >
                        &larr; Back to Students
                    </Link>
                </div>
            }
        >
            <Head title={`Edit Student - ${student.name}`} />

            <div className="py-8">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    <form onSubmit={submit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 space-y-6">
                        
                        {/* Section 1: Basic Student Information */}
                        <div>
                            <h3 className="text-base font-bold text-gray-900 border-b pb-2 mb-4">
                                1. Personal Information
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                                        Admission / Roll # *
                                    </label>
                                    <input
                                        type="text"
                                        value={data.admission_number}
                                        onChange={(e) => setData('admission_number', e.target.value)}
                                        className="w-full text-sm rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                                        required
                                    />
                                    {errors.admission_number && (
                                        <p className="text-red-500 text-xs mt-1">{errors.admission_number}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                                        Student Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className="w-full text-sm rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                                        required
                                    />
                                    {errors.name && (
                                        <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                                        Father's Name *
                                    </label>
                                    <input
                                        type="text"
                                        value={data.father_name}
                                        onChange={(e) => setData('father_name', e.target.value)}
                                        className="w-full text-sm rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                                        required
                                    />
                                    {errors.father_name && (
                                        <p className="text-red-500 text-xs mt-1">{errors.father_name}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                                        Age (Years)
                                    </label>
                                    <input
                                        type="number"
                                        min="3"
                                        max="50"
                                        value={data.age}
                                        onChange={(e) => setData('age', e.target.value)}
                                        className="w-full text-sm rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                    {errors.age && (
                                        <p className="text-red-500 text-xs mt-1">{errors.age}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                                        Date of Birth
                                    </label>
                                    <input
                                        type="date"
                                        value={data.date_of_birth}
                                        onChange={(e) => setData('date_of_birth', e.target.value)}
                                        className="w-full text-sm rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                    {errors.date_of_birth && (
                                        <p className="text-red-500 text-xs mt-1">{errors.date_of_birth}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                                        Gender *
                                    </label>
                                    <select
                                        value={data.gender}
                                        onChange={(e) => setData('gender', e.target.value)}
                                        className="w-full text-sm rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                                    >
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                    </select>
                                    {errors.gender && (
                                        <p className="text-red-500 text-xs mt-1">{errors.gender}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Section 2: Contact & Address */}
                        <div>
                            <h3 className="text-base font-bold text-gray-900 border-b pb-2 mb-4">
                                2. Residential Address & Contact Details
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                                        Phone / Guardian Contact
                                    </label>
                                    <input
                                        type="text"
                                        value={data.phone}
                                        onChange={(e) => setData('phone', e.target.value)}
                                        className="w-full text-sm rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                    {errors.phone && (
                                        <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                                        Admission Date
                                    </label>
                                    <input
                                        type="date"
                                        value={data.admission_date}
                                        onChange={(e) => setData('admission_date', e.target.value)}
                                        className="w-full text-sm rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                    {errors.admission_date && (
                                        <p className="text-red-500 text-xs mt-1">{errors.admission_date}</p>
                                    )}
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                                        Home Address (Kahan rehta hai) *
                                    </label>
                                    <textarea
                                        rows="2"
                                        value={data.address}
                                        onChange={(e) => setData('address', e.target.value)}
                                        className="w-full text-sm rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                                        required
                                    ></textarea>
                                    {errors.address && (
                                        <p className="text-red-500 text-xs mt-1">{errors.address}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Section 3: Class & Fee Details */}
                        <div>
                            <h3 className="text-base font-bold text-gray-900 border-b pb-2 mb-4">
                                3. Academic Class & Fee Information
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                                        Admitted Class *
                                    </label>
                                    <select
                                        value={data.school_class_id}
                                        onChange={(e) => setData('school_class_id', e.target.value)}
                                        className="w-full text-sm rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                                        required
                                    >
                                        <option value="">Select Class</option>
                                        {classes.map((c) => (
                                            <option key={c.id} value={c.id}>
                                                {c.name} {c.section ? `(${c.section})` : ''}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.school_class_id && (
                                        <p className="text-red-500 text-xs mt-1">{errors.school_class_id}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                                        Monthly Fee (PKR) *
                                    </label>
                                    <input
                                        type="number"
                                        min="0"
                                        step="50"
                                        value={data.monthly_fee}
                                        onChange={(e) => setData('monthly_fee', e.target.value)}
                                        className="w-full text-sm rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                                        required
                                    />
                                    {errors.monthly_fee && (
                                        <p className="text-red-500 text-xs mt-1">{errors.monthly_fee}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                                        Fee Status (Paid / Pending) *
                                    </label>
                                    <select
                                        value={data.fee_status}
                                        onChange={(e) => setData('fee_status', e.target.value)}
                                        className="w-full text-sm rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 font-medium"
                                    >
                                        <option value="pending">Pending (Unpaid)</option>
                                        <option value="paid">Paid (Cleared)</option>
                                    </select>
                                    {errors.fee_status && (
                                        <p className="text-red-500 text-xs mt-1">{errors.fee_status}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Section 4: Subjects Selection */}
                        <div>
                            <div className="flex items-center justify-between border-b pb-2 mb-4">
                                <h3 className="text-base font-bold text-gray-900">
                                    4. Subjects Enrolled
                                </h3>
                                <button
                                    type="button"
                                    onClick={handleSelectAllSubjects}
                                    className="text-xs font-semibold text-indigo-600 hover:text-indigo-800"
                                >
                                    {data.subject_ids.length === subjects.length ? 'Deselect All' : 'Select All'}
                                </button>
                            </div>
                            <p className="text-xs text-gray-500 mb-3">
                                Select or update the subjects for this student:
                            </p>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                                {subjects.map((sub) => {
                                    const isSelected = data.subject_ids.includes(sub.id);
                                    return (
                                        <label
                                            key={sub.id}
                                            className={`flex items-center space-x-2 p-3 rounded-lg border cursor-pointer transition ${
                                                isSelected
                                                    ? 'border-indigo-600 bg-indigo-50 text-indigo-900 font-semibold'
                                                    : 'border-gray-200 hover:bg-gray-50 text-gray-700'
                                            }`}
                                        >
                                            <input
                                                type="checkbox"
                                                checked={isSelected}
                                                onChange={() => handleSubjectToggle(sub.id)}
                                                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                            />
                                            <span className="text-xs">
                                                {sub.name}
                                                {sub.code && <span className="block text-[10px] text-gray-500">{sub.code}</span>}
                                            </span>
                                        </label>
                                    );
                                })}
                            </div>
                            {errors.subject_ids && (
                                <p className="text-red-500 text-xs mt-1">{errors.subject_ids}</p>
                            )}
                        </div>

                        {/* Section 5: Remarks */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                                Additional Remarks / Notes
                            </label>
                            <textarea
                                rows="2"
                                value={data.remarks}
                                onChange={(e) => setData('remarks', e.target.value)}
                                className="w-full text-sm rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                            ></textarea>
                        </div>

                        {/* Submit Actions */}
                        <div className="pt-4 border-t flex items-center justify-end space-x-3">
                            <Link
                                href={route('students.index')}
                                className="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 text-sm font-semibold hover:bg-gray-50 transition"
                            >
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="px-6 py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 shadow-sm transition disabled:opacity-50"
                            >
                                {processing ? 'Updating...' : 'Save & Update Student'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
