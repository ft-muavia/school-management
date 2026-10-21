<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    $classes = \App\Models\SchoolClass::orderBy('name')->get();
    $totalTeachers = \App\Models\Teacher::count();
    $totalStudents = \App\Models\Student::count();

    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'classes' => $classes,
        'totalTeachers' => $totalTeachers,
        'totalStudents' => $totalStudents,
    ]);
});

Route::get('/dashboard', function () {
    $stats = [
        'total_students' => \App\Models\Student::count(),
        'paid_students' => \App\Models\Student::where('fee_status', 'paid')->count(),
        'pending_students' => \App\Models\Student::where('fee_status', 'pending')->count(),
        'total_pending_fee' => \App\Models\Student::where('fee_status', 'pending')->sum('monthly_fee'),
        'total_classes' => \App\Models\SchoolClass::count(),
        'total_subjects' => \App\Models\Subject::count(),
        'total_teachers' => \App\Models\Teacher::count(),
    ];

    $recentStudents = \App\Models\Student::with(['schoolClass', 'subjects'])
        ->latest()
        ->take(5)
        ->get();

    return Inertia::render('Dashboard', [
        'stats' => $stats,
        'recentStudents' => $recentStudents,
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // School Management: Student Routes
    Route::resource('students', \App\Http\Controllers\StudentController::class);
    Route::patch('students/{student}/toggle-fee', [\App\Http\Controllers\StudentController::class, 'toggleFeeStatus'])->name('students.toggleFee');

    // School Management: Teacher Routes
    Route::resource('teachers', \App\Http\Controllers\TeacherController::class);
});

require __DIR__.'/auth.php';
