import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function TeachersIndex({ teachers = [], classes = [], subjects = [], filters = {}, stats = {} }) {
    const [search, setSearch] = useState(filters.search || '');
    const [inchargeClassFilter, setInchargeClassFilter] = useState(filters.incharge_class_id || '');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTeacher, setEditingTeacher] = useState(null);

    // Form setup for adding / editing a teacher
    const { data, setData, post, put, reset, processing, errors } = useForm({
        name: '',
        email: '',
        phone: '',
        qualification: '',
        experience: '',
        gender: 'male',
        address: '',
        incharge_class_id: '',
        salary: 50000,
        joining_date: new Date().toISOString().split('T')[0],
        bio: '',
        avatar_color: 'indigo',
        teaching_class_ids: [],
        subject_ids: [],
    });

    const openCreateModal = () => {
        reset();
        setEditingTeacher(null);
        setIsModalOpen(true);
    };

    const openEditModal = (teacher) => {
        setEditingTeacher(teacher);
        setData({
            name: teacher.name || '',
            email: teacher.email || '',
            phone: teacher.phone || '',
            qualification: teacher.qualification || '',
            experience: teacher.experience || '',
            gender: teacher.gender || 'male',
            address: teacher.address || '',
            incharge_class_id: teacher.incharge_class_id || '',
            salary: teacher.salary || 0,
            joining_date: teacher.joining_date || '',
            bio: teacher.bio || '',
            avatar_color: teacher.avatar_color || 'indigo',
            teaching_class_ids: teacher.teaching_classes ? teacher.teaching_classes.map((c) => c.id) : [],
            subject_ids: teacher.subjects ? teacher.subjects.map((s) => s.id) : [],
        });
        setIsModalOpen(true);
    };

    const handleTeachingClassToggle = (id) => {
        if (data.teaching_class_ids.includes(id)) {
            setData('teaching_class_ids', data.teaching_class_ids.filter((cId) => cId !== id));
        } else {
            setData('teaching_class_ids', [...data.teaching_class_ids, id]);
        }
    };

    const handleSubjectToggle = (id) => {
        if (data.subject_ids.includes(id)) {
            setData('subject_ids', data.subject_ids.filter((sId) => sId !== id));
        } else {
            setData('subject_ids', [...data.subject_ids, id]);
        }
    };

    const submit = (e) => {
        e.preventDefault();
        if (editingTeacher) {
            put(route('teachers.update', editingTeacher.id), {
                onSuccess: () => setIsModalOpen(false),
            });
        } else {
            post(route('teachers.store'), {
                onSuccess: () => {
                    setIsModalOpen(false);
                    reset();
                },
            });
        }
    };

    const deleteTeacher = (id, name) => {
        if (confirm(`Are you sure you want to delete "${name}" from teachers?`)) {
            router.delete(route('teachers.destroy', id));
        }
    };

    const handleFilter = (e) => {
        e && e.preventDefault();
        router.get(
            route('teachers.index'),
            {
                search: search || undefined,
                incharge_class_id: inchargeClassFilter || undefined,
            },
            { preserveState: true, replace: true }
        );
    };

    const handleReset = () => {
        setSearch('');
        setInchargeClassFilter('');
        router.get(route('teachers.index'));
    };

    const colorClasses = {
        indigo: 'from-indigo-500 to-indigo-700 text-indigo-700 bg-indigo-50 border-indigo-200',
        purple: 'from-purple-500 to-purple-700 text-purple-700 bg-purple-50 border-purple-200',
        blue: 'from-blue-500 to-blue-700 text-blue-700 bg-blue-50 border-blue-200',
        emerald: 'from-emerald-500 to-emerald-700 text-emerald-700 bg-emerald-50 border-emerald-200',
        rose: 'from-rose-500 to-rose-700 text-rose-700 bg-rose-50 border-rose-200',
        amber: 'from-amber-500 to-amber-700 text-amber-700 bg-amber-50 border-amber-200',
        teal: 'from-teal-500 to-teal-700 text-teal-700 bg-teal-50 border-teal-200',
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-bold leading-tight text-gray-800">
                            Faculty & Teachers
                        </h2>
                        <p className="text-sm text-gray-500">
                            Teacher qualifications, class incharge status, and taught classes & subjects.
                        </p>
                    </div>
                    <button
                        onClick={openCreateModal}
                        className="inline-flex items-center justify-center px-4 py-2 bg-indigo-600 border border-transparent rounded-lg font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 active:bg-indigo-800 shadow-sm"
                    >
                        + Add New Teacher
                    </button>
                </div>
            }
        >
            <Head title="Teachers Faculty" />

            <div className="py-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
                    
                    {/* Faculty Overview Stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                            <div>
                                <p className="text-xs font-semibold text-gray-500 uppercase">Total Faculty</p>
                                <p className="text-3xl font-extrabold text-gray-900 mt-1">{stats.total_teachers ?? 0}</p>
                                <p className="text-xs text-indigo-600 mt-1">Active staff members</p>
                            </div>
                            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            </div>
                        </div>

                        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                            <div>
                                <p className="text-xs font-semibold text-gray-500 uppercase">Class Incharges</p>
                                <p className="text-3xl font-extrabold text-purple-600 mt-1">{stats.total_incharges ?? 0}</p>
                                <p className="text-xs text-purple-600 mt-1">Assigned as Class Incharge</p>
                            </div>
                            <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                </svg>
                            </div>
                        </div>

                        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                            <div>
                                <p className="text-xs font-semibold text-gray-500 uppercase">Classes Covered</p>
                                <p className="text-3xl font-extrabold text-emerald-600 mt-1">{stats.total_classes ?? 0}</p>
                                <p className="text-xs text-emerald-600 mt-1">Available school levels</p>
                            </div>
                            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Filter and Search Bar */}
                    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                        <form onSubmit={handleFilter} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                                    Search Teacher Name / Qualification / Email
                                </label>
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="e.g. Usman, M.Sc, Physics..."
                                    className="w-full text-sm rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                                    Filter by Class Incharge
                                </label>
                                <select
                                    value={inchargeClassFilter}
                                    onChange={(e) => setInchargeClassFilter(e.target.value)}
                                    className="w-full text-sm rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                                >
                                    <option value="">All Incharges</option>
                                    {classes.map((c) => (
                                        <option key={c.id} value={c.id}>
                                            Incharge of: {c.name} {c.section ? `(${c.section})` : ''}
                                        </option>
                                    ))}
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

                    {/* Teacher Cards Grid */}
                    {teachers.length === 0 ? (
                        <div className="bg-white rounded-2xl p-12 text-center border border-gray-100">
                            <svg className="w-16 h-16 mx-auto text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                            <h3 className="text-lg font-bold text-gray-700">No Teachers Found</h3>
                            <p className="text-gray-400 text-sm mt-1">Try resetting filters or click "+ Add New Teacher" to add faculty.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {teachers.map((teacher) => {
                                const initials = teacher.name
                                    .replace(/^(Prof\.|Sir|Ms\.|Mrs\.|Mr\.|Dr\.)\s+/i, '')
                                    .split(' ')
                                    .map((n) => n[0])
                                    .slice(0, 2)
                                    .join('')
                                    .toUpperCase();

                                return (
                                    <div
                                        key={teacher.id}
                                        className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col justify-between"
                                    >
                                        <div>
                                            {/* Top Banner & Avatar */}
                                            <div className="bg-gradient-to-r from-slate-800 to-indigo-900 p-5 text-white relative">
                                                <div className="flex items-start justify-between">
                                                    <div className="flex items-center space-x-3">
                                                        <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center font-bold text-xl text-white border border-white/20 shadow-inner">
                                                            {initials || 'TR'}
                                                        </div>
                                                        <div>
                                                            <h3 className="text-lg font-bold leading-tight">
                                                                {teacher.name}
                                                            </h3>
                                                            <p className="text-xs text-indigo-200 mt-0.5">
                                                                {teacher.experience || 'Faculty Member'}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Incharge Badge */}
                                                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                                                    <span className="text-xs text-gray-300 font-medium">Class Incharge:</span>
                                                    {teacher.incharge_class ? (
                                                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-amber-400 text-amber-950 shadow-sm">
                                                            ★ Incharge: {teacher.incharge_class.name} {teacher.incharge_class.section ? `(${teacher.incharge_class.section})` : ''}
                                                        </span>
                                                    ) : (
                                                        <span className="text-xs text-gray-400 italic">
                                                            No Incharge Class
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Card Body Details */}
                                            <div className="p-5 space-y-4 text-sm">
                                                {/* Qualification (Highlighted) */}
                                                <div>
                                                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                                                        Degree & Qualification
                                                    </span>
                                                    <div className="mt-1 flex items-center text-indigo-950 font-semibold bg-indigo-50/70 p-2.5 rounded-xl border border-indigo-100/60">
                                                        <svg className="w-5 h-5 text-indigo-600 mr-2 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                                        </svg>
                                                        <span>{teacher.qualification}</span>
                                                    </div>
                                                </div>

                                                {/* Classes Taught (Kis class ko teach kr raha hai) */}
                                                <div>
                                                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                                                        Classes Taught (Teaches In)
                                                    </span>
                                                    <div className="flex flex-wrap gap-1.5">
                                                        {teacher.teaching_classes && teacher.teaching_classes.length > 0 ? (
                                                            teacher.teaching_classes.map((cls) => (
                                                                <span
                                                                    key={cls.id}
                                                                    className="inline-flex items-center px-2.5 py-0.5 rounded-lg text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100"
                                                                >
                                                                    {cls.name} {cls.section ? `(${cls.section})` : ''}
                                                                </span>
                                                            ))
                                                        ) : (
                                                            <span className="text-xs text-gray-400 italic">No classes assigned yet</span>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Subjects Taught */}
                                                <div>
                                                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                                                        Teaching Subjects
                                                    </span>
                                                    <div className="flex flex-wrap gap-1.5">
                                                        {teacher.subjects && teacher.subjects.length > 0 ? (
                                                            teacher.subjects.map((sub) => (
                                                                <span
                                                                    key={sub.id}
                                                                    className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-emerald-50 text-emerald-800 border border-emerald-100"
                                                                >
                                                                    {sub.name}
                                                                </span>
                                                            ))
                                                        ) : (
                                                            <span className="text-xs text-gray-400 italic">No subjects specified</span>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Contact Details */}
                                                <div className="pt-2 border-t border-gray-100 grid grid-cols-2 gap-2 text-xs text-gray-600">
                                                    <div>
                                                        <span className="text-gray-400 block">Phone:</span>
                                                        <span className="font-medium text-gray-800">{teacher.phone || 'N/A'}</span>
                                                    </div>
                                                    <div>
                                                        <span className="text-gray-400 block">Email:</span>
                                                        <span className="font-medium text-gray-800 truncate block" title={teacher.email}>
                                                            {teacher.email || 'N/A'}
                                                        </span>
                                                    </div>
                                                </div>

                                                {teacher.bio && (
                                                    <p className="text-xs text-gray-500 italic bg-gray-50 p-2 rounded-lg">
                                                        "{teacher.bio}"
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        {/* Actions Footer */}
                                        <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                                            <span className="text-xs font-bold text-gray-500">
                                                PKR {Number(teacher.salary).toLocaleString()}/mo
                                            </span>
                                            <div className="space-x-3">
                                                <button
                                                    onClick={() => openEditModal(teacher)}
                                                    className="text-xs font-semibold text-indigo-600 hover:text-indigo-800"
                                                >
                                                    Edit Details
                                                </button>
                                                <button
                                                    onClick={() => deleteTeacher(teacher.id, teacher.name)}
                                                    className="text-xs font-semibold text-red-600 hover:text-red-800"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>

            {/* Add / Edit Teacher Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl max-w-2xl w-full p-6 md:p-8 shadow-2xl relative animate-fade-in max-h-[90vh] overflow-y-auto">
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 text-xl font-bold"
                        >
                            &times;
                        </button>

                        <div className="border-b pb-3 mb-5">
                            <h3 className="text-xl font-bold text-gray-800">
                                {editingTeacher ? `Edit Profile: ${editingTeacher.name}` : 'Add New Faculty Teacher'}
                            </h3>
                            <p className="text-xs text-gray-500">
                                Set qualifications, incharge class, and teaching classes & subjects.
                            </p>
                        </div>

                        <form onSubmit={submit} className="space-y-5 text-sm">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                                        Teacher Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Prof. Tariq Mahmood"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className="w-full text-sm rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                                        required
                                    />
                                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                                        Degree / Qualification *
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="e.g. M.Sc. Mathematics, B.Ed"
                                        value={data.qualification}
                                        onChange={(e) => setData('qualification', e.target.value)}
                                        className="w-full text-sm rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                                        required
                                    />
                                    {errors.qualification && <p className="text-red-500 text-xs mt-1">{errors.qualification}</p>}
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                                        Class Incharge (Kis Class Ka Incharge Hai?)
                                    </label>
                                    <select
                                        value={data.incharge_class_id}
                                        onChange={(e) => setData('incharge_class_id', e.target.value)}
                                        className="w-full text-sm rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 font-medium"
                                    >
                                        <option value="">None (Not an Incharge)</option>
                                        {classes.map((c) => (
                                            <option key={c.id} value={c.id}>
                                                Incharge of: {c.name} {c.section ? `(${c.section})` : ''}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                                        Experience
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="e.g. 7 Years Experience"
                                        value={data.experience}
                                        onChange={(e) => setData('experience', e.target.value)}
                                        className="w-full text-sm rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                                        Phone Number
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="e.g. 0300-1234567"
                                        value={data.phone}
                                        onChange={(e) => setData('phone', e.target.value)}
                                        className="w-full text-sm rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        placeholder="teacher@school.com"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        className="w-full text-sm rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                                        Monthly Salary (PKR)
                                    </label>
                                    <input
                                        type="number"
                                        min="0"
                                        step="1000"
                                        value={data.salary}
                                        onChange={(e) => setData('salary', e.target.value)}
                                        className="w-full text-sm rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                                        Gender
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
                                </div>
                            </div>

                            {/* Classes Taught Selection */}
                            <div className="pt-2 border-t">
                                <label className="block text-xs font-bold text-gray-700 uppercase mb-2">
                                    Classes Taught (Kis Kis Class Ko Parhata Hai?)
                                </label>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                    {classes.map((cls) => {
                                        const isSelected = data.teaching_class_ids.includes(cls.id);
                                        return (
                                            <label
                                                key={cls.id}
                                                className={`flex items-center space-x-2 p-2.5 rounded-lg border cursor-pointer transition ${
                                                    isSelected
                                                        ? 'border-blue-600 bg-blue-50 text-blue-900 font-semibold'
                                                        : 'border-gray-200 hover:bg-gray-50 text-gray-700'
                                                }`}
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={isSelected}
                                                    onChange={() => handleTeachingClassToggle(cls.id)}
                                                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                                />
                                                <span className="text-xs">
                                                    {cls.name} {cls.section ? `(${cls.section})` : ''}
                                                </span>
                                            </label>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Subjects Taught Selection */}
                            <div className="pt-2 border-t">
                                <label className="block text-xs font-bold text-gray-700 uppercase mb-2">
                                    Subjects Taught
                                </label>
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                                    {subjects.map((sub) => {
                                        const isSelected = data.subject_ids.includes(sub.id);
                                        return (
                                            <label
                                                key={sub.id}
                                                className={`flex items-center space-x-2 p-2 rounded-lg border cursor-pointer transition ${
                                                    isSelected
                                                        ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-semibold'
                                                        : 'border-gray-200 hover:bg-gray-50 text-gray-700'
                                                }`}
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={isSelected}
                                                    onChange={() => handleSubjectToggle(sub.id)}
                                                    className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                                                />
                                                <span className="text-xs">{sub.name}</span>
                                            </label>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Bio / Remarks */}
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                                    Short Biography / Notes
                                </label>
                                <textarea
                                    rows="2"
                                    placeholder="Specialization, achievements, or duties..."
                                    value={data.bio}
                                    onChange={(e) => setData('bio', e.target.value)}
                                    className="w-full text-sm rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                                ></textarea>
                            </div>

                            {/* Modal Actions */}
                            <div className="pt-4 border-t flex items-center justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-xs font-semibold hover:bg-gray-200"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-5 py-2 bg-indigo-600 text-white rounded-lg text-xs font-semibold hover:bg-indigo-700 disabled:opacity-50"
                                >
                                    {editingTeacher ? 'Update Teacher' : 'Save Teacher Profile'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
