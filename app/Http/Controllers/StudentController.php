<?php

namespace App\Http\Controllers;

use App\Models\SchoolClass;
use App\Models\Student;
use App\Models\Subject;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StudentController extends Controller
{
    /**
     * Display a listing of the resource with filters.
     */
    public function index(Request $request)
    {
        $query = Student::with(['schoolClass', 'subjects']);

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('father_name', 'like', "%{$search}%")
                  ->orWhere('admission_number', 'like', "%{$search}%")
                  ->orWhere('phone', 'like', "%{$search}%")
                  ->orWhere('address', 'like', "%{$search}%");
            });
        }

        if ($request->filled('class_id')) {
            $query->where('school_class_id', $request->class_id);
        }

        if ($request->filled('fee_status') && in_array($request->fee_status, ['paid', 'pending'])) {
            $query->where('fee_status', $request->fee_status);
        }

        $students = $query->latest()->paginate(10)->withQueryString();
        $classes = SchoolClass::orderBy('name')->get();
        $subjects = Subject::orderBy('name')->get();

        // Summary statistics
        $stats = [
            'total_students' => Student::count(),
            'paid_students' => Student::where('fee_status', 'paid')->count(),
            'pending_students' => Student::where('fee_status', 'pending')->count(),
            'total_pending_amount' => Student::where('fee_status', 'pending')->sum('monthly_fee'),
            'total_classes' => SchoolClass::count(),
        ];

        return Inertia::render('Students/Index', [
            'students' => $students,
            'classes' => $classes,
            'subjects' => $subjects,
            'filters' => $request->only(['search', 'class_id', 'fee_status']),
            'stats' => $stats,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Students/Create', [
            'classes' => SchoolClass::orderBy('name')->get(),
            'subjects' => Subject::orderBy('name')->get(),
            'suggestedAdmissionNumber' => 'SCH-' . date('Y') . '-' . str_pad((Student::max('id') ?? 0) + 1, 4, '0', STR_PAD_LEFT),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'admission_number' => 'required|string|max:50|unique:students,admission_number',
            'name' => 'required|string|max:100',
            'father_name' => 'required|string|max:100',
            'age' => 'nullable|integer|min:3|max:50',
            'date_of_birth' => 'nullable|date',
            'gender' => 'required|in:male,female,other',
            'address' => 'required|string|max:500',
            'phone' => 'nullable|string|max:20',
            'school_class_id' => 'required|exists:school_classes,id',
            'group_stream' => 'required|in:CS,BIO,ARTS',
            'monthly_fee' => 'required|numeric|min:0',
            'fee_status' => 'required|in:paid,pending',
            'admission_date' => 'nullable|date',
            'remarks' => 'nullable|string|max:1000',
            'subject_ids' => 'nullable|array',
            'subject_ids.*' => 'exists:subjects,id',
        ]);

        $subjectIds = $validated['subject_ids'] ?? [];
        unset($validated['subject_ids']);

        $student = Student::create($validated);

        if (!empty($subjectIds)) {
            $student->subjects()->sync($subjectIds);
        }

        return redirect()->route('students.index')->with('success', 'Student registered successfully!');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Student $student)
    {
        $student->load(['schoolClass', 'subjects']);

        return Inertia::render('Students/Edit', [
            'student' => $student,
            'classes' => SchoolClass::orderBy('name')->get(),
            'subjects' => Subject::orderBy('name')->get(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Student $student)
    {
        $validated = $request->validate([
            'admission_number' => 'required|string|max:50|unique:students,admission_number,' . $student->id,
            'name' => 'required|string|max:100',
            'father_name' => 'required|string|max:100',
            'age' => 'nullable|integer|min:3|max:50',
            'date_of_birth' => 'nullable|date',
            'gender' => 'required|in:male,female,other',
            'address' => 'required|string|max:500',
            'phone' => 'nullable|string|max:20',
            'school_class_id' => 'required|exists:school_classes,id',
            'group_stream' => 'required|in:CS,BIO,ARTS',
            'monthly_fee' => 'required|numeric|min:0',
            'fee_status' => 'required|in:paid,pending',
            'admission_date' => 'nullable|date',
            'remarks' => 'nullable|string|max:1000',
            'subject_ids' => 'nullable|array',
            'subject_ids.*' => 'exists:subjects,id',
        ]);

        $subjectIds = $validated['subject_ids'] ?? [];
        unset($validated['subject_ids']);

        $student->update($validated);
        $student->subjects()->sync($subjectIds);

        return redirect()->route('students.index')->with('success', 'Student details updated successfully!');
    }

    /**
     * Quick update or toggle for fee status.
     */
    public function toggleFeeStatus(Request $request, Student $student)
    {
        if ($request->has('fee_status') && in_array($request->fee_status, ['paid', 'pending'])) {
            $newStatus = $request->fee_status;
        } else {
            $newStatus = $student->fee_status === 'paid' ? 'pending' : 'paid';
        }

        $student->update(['fee_status' => $newStatus]);

        return redirect()->back()->with('success', "Fee status updated to {$newStatus}!");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Student $student)
    {
        $student->delete();
        return redirect()->route('students.index')->with('success', 'Student record deleted successfully!');
    }
}
