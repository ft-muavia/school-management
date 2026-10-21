<?php

namespace App\Http\Controllers;

use App\Models\SchoolClass;
use App\Models\Subject;
use App\Models\Teacher;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TeacherController extends Controller
{
    /**
     * Display a listing of teachers as cards with search and filter.
     */
    public function index(Request $request)
    {
        $query = Teacher::with(['inchargeClass', 'teachingClasses', 'subjects']);

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('qualification', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('phone', 'like', "%{$search}%");
            });
        }

        if ($request->filled('incharge_class_id')) {
            $query->where('incharge_class_id', $request->incharge_class_id);
        }

        $teachers = $query->latest()->get();
        $classes = SchoolClass::orderBy('name')->get();
        $subjects = Subject::orderBy('name')->get();

        $stats = [
            'total_teachers' => Teacher::count(),
            'total_incharges' => Teacher::whereNotNull('incharge_class_id')->count(),
            'total_classes' => SchoolClass::count(),
        ];

        return Inertia::render('Teachers/Index', [
            'teachers' => $teachers,
            'classes' => $classes,
            'subjects' => $subjects,
            'filters' => $request->only(['search', 'incharge_class_id']),
            'stats' => $stats,
        ]);
    }

    /**
     * Store a newly created teacher.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'email' => 'nullable|email|max:100',
            'phone' => 'nullable|string|max:20',
            'qualification' => 'required|string|max:150',
            'experience' => 'nullable|string|max:50',
            'gender' => 'required|in:male,female,other',
            'address' => 'nullable|string|max:500',
            'incharge_class_id' => 'nullable|exists:school_classes,id',
            'salary' => 'nullable|numeric|min:0',
            'joining_date' => 'nullable|date',
            'avatar_color' => 'nullable|string|max:30',
            'bio' => 'nullable|string|max:1000',
            'teaching_class_ids' => 'nullable|array',
            'teaching_class_ids.*' => 'exists:school_classes,id',
            'subject_ids' => 'nullable|array',
            'subject_ids.*' => 'exists:subjects,id',
        ]);

        $teachingClassIds = $validated['teaching_class_ids'] ?? [];
        $subjectIds = $validated['subject_ids'] ?? [];
        unset($validated['teaching_class_ids'], $validated['subject_ids']);

        $colors = ['indigo', 'blue', 'emerald', 'purple', 'rose', 'amber', 'teal'];
        $validated['avatar_color'] = $validated['avatar_color'] ?? $colors[array_rand($colors)];

        $teacher = Teacher::create($validated);

        if (!empty($teachingClassIds)) {
            $teacher->teachingClasses()->sync($teachingClassIds);
        }

        if (!empty($subjectIds)) {
            $teacher->subjects()->sync($subjectIds);
        }

        return redirect()->route('teachers.index')->with('success', 'Teacher profile created successfully!');
    }

    /**
     * Update an existing teacher.
     */
    public function update(Request $request, Teacher $teacher)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'email' => 'nullable|email|max:100',
            'phone' => 'nullable|string|max:20',
            'qualification' => 'required|string|max:150',
            'experience' => 'nullable|string|max:50',
            'gender' => 'required|in:male,female,other',
            'address' => 'nullable|string|max:500',
            'incharge_class_id' => 'nullable|exists:school_classes,id',
            'salary' => 'nullable|numeric|min:0',
            'joining_date' => 'nullable|date',
            'avatar_color' => 'nullable|string|max:30',
            'bio' => 'nullable|string|max:1000',
            'teaching_class_ids' => 'nullable|array',
            'teaching_class_ids.*' => 'exists:school_classes,id',
            'subject_ids' => 'nullable|array',
            'subject_ids.*' => 'exists:subjects,id',
        ]);

        $teachingClassIds = $validated['teaching_class_ids'] ?? [];
        $subjectIds = $validated['subject_ids'] ?? [];
        unset($validated['teaching_class_ids'], $validated['subject_ids']);

        $teacher->update($validated);
        $teacher->teachingClasses()->sync($teachingClassIds);
        $teacher->subjects()->sync($subjectIds);

        return redirect()->route('teachers.index')->with('success', 'Teacher profile updated successfully!');
    }

    /**
     * Delete teacher profile.
     */
    public function destroy(Teacher $teacher)
    {
        $teacher->delete();
        return redirect()->route('teachers.index')->with('success', 'Teacher profile removed successfully!');
    }
}
