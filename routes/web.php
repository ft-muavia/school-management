<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
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
});

require __DIR__.'/auth.php';
