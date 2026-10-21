import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';

export default function Welcome({ auth, canLogin, classes = [], totalTeachers = 0, totalStudents = 0 }) {
    const [selectedTab, setSelectedTab] = useState('criteria');

    // Sports program breakdown by class group
    const sportsPrograms = [
        {
            classGroup: 'Primary (Class 1 to 5)',
            ageGroup: 'Ages 5 - 10',
            sports: ['Kid Gymnastics', 'Mini Cricket', 'Relay Races', 'Football Fun', 'Indoor Chess & Scrabble'],
            schedule: '2 Days a Week (Mon & Wed)',
            ground: 'Junior AstroTurf & Indoor Hall',
            badge: 'bg-emerald-100 text-emerald-800',
        },
        {
            classGroup: 'Middle School (Class 6 to 8)',
            ageGroup: 'Ages 11 - 13',
            sports: ['Cricket (Tape & Hardball)', 'Football / Soccer', 'Table Tennis', 'Badminton', 'Track Athletics (100m, 200m)'],
            schedule: '3 Days a Week (Tue, Thu, Sat)',
            ground: 'Main Sports Complex & Badminton Court',
            badge: 'bg-blue-100 text-blue-800',
        },
        {
            classGroup: 'High School (Class 9, 10 & Matric)',
            ageGroup: 'Ages 14 - 17',
            sports: ['Competitive Cricket League', 'Basketball Tournament', 'Football Championship', 'Volleyball', 'Martial Arts & Taekwondo'],
            schedule: 'Daily Evening Practice & Inter-School Matches',
            ground: 'Full Size Grass Cricket Ground & Basketball Court',
            badge: 'bg-purple-100 text-purple-800',
        },
    ];

    // School facilities
    const facilities = [
        {
            title: 'Modern Science & Physics Lab',
            desc: 'Fully equipped laboratories for Physics, Chemistry, and Biology experiments with safety apparatus and expert supervision.',
            icon: (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            ),
        },
        {
            title: 'High-Tech Computer & IT Lab',
            desc: 'Modern PCs with high-speed internet, coding workshops (Python, Scratch, Web Basics), and digital projection screens.',
            icon: (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            ),
        },
        {
            title: 'Air-Conditioned Smart Classrooms',
            desc: 'Ergonomic seating, multimedia projectors, proper ventilation, and digital learning boards for maximum focus.',
            icon: (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
            ),
        },
        {
            title: 'Comprehensive Library & Study Hall',
            desc: 'Over 5,000 curriculum reference books, Islamic studies, encyclopedia volumes, and peaceful reading corners.',
            icon: (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            ),
        },
        {
            title: 'Hygienic Cafeteria & Clean Water',
            desc: 'Certified reverse osmosis (RO) drinking filtration plant and healthy fresh snacks inspected daily for hygiene.',
            icon: (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18z" />
            ),
        },
        {
            title: 'Full Campus CCTV & Safe Transport',
            desc: '24/7 security guard presence, 64 HD CCTV surveillance cameras, biometric entry, and pick-and-drop vans available.',
            icon: (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            ),
        },
    ];

    // Admission Criteria Steps
    const criteriaSteps = [
        {
            step: '01',
            title: 'Age Eligibility Criteria',
            desc: 'Primary classes (Ages 5 - 10), Middle School (Ages 11 - 13), High School / Matric (Ages 14 - 16). Form B / Birth certificate required.',
        },
        {
            step: '02',
            title: 'Required Documentation',
            desc: 'Student Form-B (CNIC), Father/Guardian CNIC copy, 4 Passport-size photos with blue background, and previous School Leaving Certificate (SLC).',
        },
        {
            step: '03',
            title: 'Admission Assessment Test',
            desc: 'Basic entrance evaluation in English, Mathematics, and Urdu for classes 6th to 10th to assess academic baseline and subject pairing.',
        },
        {
            step: '04',
            title: 'Fee Payment & Confirmation',
            desc: 'Submission of admission fee & first month tuition fee at school accounts counter or online bank deposit. Official Roll Number is issued immediately.',
        },
    ];

    return (
        <div className="min-h-screen bg-slate-50 text-gray-800">
            <Head title="Welcome - School Admission & Campus Facilities" />

            {/* Top Navigation Bar */}
            <header className="bg-white/90 backdrop-blur-md sticky top-0 z-40 border-b border-gray-100 shadow-xs">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-black text-xl shadow-md">
                            S
                        </div>
                        <div>
                            <span className="font-extrabold text-xl text-gray-900 tracking-tight block">
                                Crescent Public School
                            </span>
                            <span className="text-[11px] text-gray-500 font-medium">
                                Excellence in Academics & Character
                            </span>
                        </div>
                    </div>

                    <nav className="flex items-center space-x-3">
                        <a href="#criteria" className="hidden md:inline-block text-sm font-semibold text-gray-600 hover:text-indigo-600 px-3 py-2">
                            Admission Criteria
                        </a>
                        <a href="#facilities" className="hidden md:inline-block text-sm font-semibold text-gray-600 hover:text-indigo-600 px-3 py-2">
                            Campus Facilities
                        </a>
                        <a href="#sports" className="hidden md:inline-block text-sm font-semibold text-gray-600 hover:text-indigo-600 px-3 py-2">
                            Sports by Class
                        </a>

                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-indigo-700 shadow-sm transition"
                            >
                                Open Dashboard &rarr;
                            </Link>
                        ) : (
                            <div className="flex items-center space-x-2">
                                <Link
                                    href={route('login')}
                                    className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-indigo-700 shadow-sm transition"
                                >
                                    Staff / Admin Login
                                </Link>
                            </div>
                        )}
                    </nav>
                </div>
            </header>

            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-b from-indigo-950 via-slate-900 to-indigo-900 text-white py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-5xl mx-auto text-center space-y-6">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
                        🎓 Admissions Open for Session 2026 - 2027
                    </span>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
                        Inspiring Young Minds, <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-sky-300 to-emerald-300">
                            Building Tomorrow's Leaders.
                        </span>
                    </h1>
                    <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
                        Explore our transparent admission criteria, Olympic-standard sports grounds, state-of-the-art science labs, and qualified faculty for every class level.
                    </p>

                    <div className="flex flex-wrap justify-center gap-4 pt-4">
                        <a
                            href="#criteria"
                            className="px-6 py-3.5 bg-emerald-500 text-slate-950 font-bold text-sm rounded-xl hover:bg-emerald-400 transition shadow-lg shadow-emerald-500/20"
                        >
                            View Admission Criteria
                        </a>
                        <a
                            href="#sports"
                            className="px-6 py-3.5 bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold text-sm rounded-xl hover:bg-white/20 transition"
                        >
                            Explore Sports & Classes
                        </a>
                    </div>

                    {/* Quick Stats Banner */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-10 border-t border-white/10 max-w-4xl mx-auto">
                        <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                            <div className="text-3xl font-extrabold text-white">100%</div>
                            <div className="text-xs text-indigo-200 mt-1">Matric Board Result</div>
                        </div>
                        <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                            <div className="text-3xl font-extrabold text-white">{totalTeachers > 0 ? totalTeachers : 25}+</div>
                            <div className="text-xs text-indigo-200 mt-1">Qualified Teachers</div>
                        </div>
                        <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                            <div className="text-3xl font-extrabold text-white">8+</div>
                            <div className="text-xs text-indigo-200 mt-1">Sports & Activities</div>
                        </div>
                        <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                            <div className="text-3xl font-extrabold text-white">15:1</div>
                            <div className="text-xs text-indigo-200 mt-1">Student-Teacher Ratio</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 1: Admission Criteria */}
            <section id="criteria" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                        Step-by-Step Procedure
                    </span>
                    <h2 className="text-3xl font-extrabold text-gray-900 mt-3">
                        School Admission Criteria & Eligibility
                    </h2>
                    <p className="text-sm text-gray-500 mt-2">
                        Everything you need to know before registering your child for the new session.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {criteriaSteps.map((step, idx) => (
                        <div
                            key={idx}
                            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition relative group"
                        >
                            <span className="text-4xl font-black text-indigo-100 group-hover:text-indigo-200 transition">
                                {step.step}
                            </span>
                            <h3 className="text-base font-bold text-gray-900 mt-2 mb-2">
                                {step.title}
                            </h3>
                            <p className="text-xs text-gray-600 leading-relaxed">
                                {step.desc}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Admission Fee Schedule Box */}
                <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 border border-indigo-100 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <h4 className="text-lg font-bold text-indigo-950">
                            Have Questions Regarding Admission or Age Limit?
                        </h4>
                        <p className="text-xs text-indigo-700 mt-1 max-w-xl">
                            Our admission office is open from Monday to Saturday, 8:00 AM to 2:00 PM. Parents are welcome to visit with their child for a free campus tour and assessment session.
                        </p>
                    </div>
                    <div className="shrink-0 flex items-center space-x-3">
                        <span className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-xs font-bold">
                            Helpline: 042-111-222-333
                        </span>
                    </div>
                </div>
            </section>

            {/* Section 2: Sports by Class (Kis Class Main Sports Hoty Hain) */}
            <section id="sports" className="py-16 bg-white border-y border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-2xl mx-auto mb-12">
                        <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                            Physical Education & Athletics
                        </span>
                        <h2 className="text-3xl font-extrabold text-gray-900 mt-3">
                            Sports Curriculum & Class Distribution
                        </h2>
                        <p className="text-sm text-gray-500 mt-2">
                            Check which sports are offered for each class, practice timings, and ground facilities.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {sportsPrograms.map((prog, idx) => (
                            <div
                                key={idx}
                                className="bg-slate-50 rounded-2xl border border-gray-200 overflow-hidden flex flex-col justify-between hover:border-indigo-400 hover:shadow-lg transition-all duration-200"
                            >
                                <div className="p-6">
                                    <div className="flex items-center justify-between mb-3">
                                        <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${prog.badge}`}>
                                            {prog.ageGroup}
                                        </span>
                                        <span className="text-xs text-gray-400 font-medium">Sports Module</span>
                                    </div>

                                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                                        {prog.classGroup}
                                    </h3>
                                    <p className="text-xs text-gray-500 mb-5">
                                        Ground: <strong className="text-gray-700">{prog.ground}</strong>
                                    </p>

                                    <div className="space-y-2">
                                        <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block">
                                            Included Games & Sports:
                                        </span>
                                        <div className="space-y-1.5">
                                            {prog.sports.map((sp, sIdx) => (
                                                <div key={sIdx} className="flex items-center text-xs text-gray-700 bg-white p-2 rounded-lg border border-gray-100 font-medium">
                                                    <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2"></span>
                                                    {sp}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="p-4 bg-gray-100/70 border-t border-gray-200 text-xs text-gray-600 flex items-center justify-between">
                                    <span className="font-semibold text-gray-800">Weekly Schedule:</span>
                                    <span className="font-mono text-indigo-700 font-medium">{prog.schedule}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Section 3: Facilities Provided by School */}
            <section id="facilities" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <span className="text-xs font-bold uppercase tracking-wider text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
                        Campus Life & Infrastructure
                    </span>
                    <h2 className="text-3xl font-extrabold text-gray-900 mt-3">
                        Facilities Provided to Every Student
                    </h2>
                    <p className="text-sm text-gray-500 mt-2">
                        We invest in top-tier laboratories, technology, study spaces, and student safety.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {facilities.map((fac, idx) => (
                        <div
                            key={idx}
                            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition flex flex-col justify-between"
                        >
                            <div>
                                <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        {fac.icon}
                                    </svg>
                                </div>
                                <h3 className="text-base font-bold text-gray-900 mb-2">
                                    {fac.title}
                                </h3>
                                <p className="text-xs text-gray-600 leading-relaxed">
                                    {fac.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Available Classes Overview */}
            <section className="py-12 bg-slate-900 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
                    <h3 className="text-2xl font-bold">Currently Enrolling For Following Grades</h3>
                    <div className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto">
                        {classes.length > 0 ? (
                            classes.map((cls) => (
                                <span
                                    key={cls.id}
                                    className="px-3.5 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-indigo-200"
                                >
                                    {cls.name} {cls.section ? `(${cls.section})` : ''}
                                </span>
                            ))
                        ) : (
                            ['Class 6', 'Class 7', 'Class 8', 'Class 9 (Science)', 'Class 10 (Science)', 'Matric'].map((c, i) => (
                                <span key={i} className="px-3.5 py-1.5 rounded-xl bg-white/10 text-xs font-semibold text-indigo-200">
                                    {c}
                                </span>
                            ))
                        )}
                    </div>
                    <p className="text-xs text-slate-400">
                        Interested in enrolling? Visit the school admission counter or contact our administration.
                    </p>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-slate-950 text-slate-400 py-10 px-4 sm:px-6 lg:px-8 border-t border-slate-800 text-xs">
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p>© 2026 Crescent Public School Management System. All rights reserved.</p>
                    <div className="flex items-center space-x-6">
                        <a href="#criteria" className="hover:text-white transition">Admission Criteria</a>
                        <a href="#facilities" className="hover:text-white transition">Facilities</a>
                        <a href="#sports" className="hover:text-white transition">Sports Activities</a>
                        <Link href={route('login')} className="text-indigo-400 font-bold hover:text-indigo-300">
                            Staff Login
                        </Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
