<?php

namespace Database\Seeders;

use App\Models\SchoolClass;
use App\Models\Subject;
use App\Models\Student;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Default Admin User
        User::firstOrCreate(
            ['email' => 'admin@school.com'],
            [
                'name' => 'Admin Officer',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
            ]
        );

        // Standard School Classes
        $classes = [
            ['name' => 'Class 6', 'section' => 'A'],
            ['name' => 'Class 7', 'section' => 'A'],
            ['name' => 'Class 8', 'section' => 'A'],
            ['name' => 'Class 9', 'section' => 'Science'],
            ['name' => 'Class 10', 'section' => 'Science'],
            ['name' => 'Matric', 'section' => 'General'],
        ];

        $classModels = [];
        foreach ($classes as $c) {
            $classModels[] = SchoolClass::firstOrCreate(
                ['name' => $c['name'], 'section' => $c['section']]
            );
        }

        // Standard Subjects
        $subjects = [
            ['name' => 'Mathematics', 'code' => 'MATH-101'],
            ['name' => 'English', 'code' => 'ENG-101'],
            ['name' => 'Urdu', 'code' => 'URD-101'],
            ['name' => 'Islamiat', 'code' => 'ISL-101'],
            ['name' => 'Physics', 'code' => 'PHY-101'],
            ['name' => 'Chemistry', 'code' => 'CHEM-101'],
            ['name' => 'Biology', 'code' => 'BIO-101'],
            ['name' => 'Computer Science', 'code' => 'CS-101'],
            ['name' => 'Pakistan Studies', 'code' => 'PST-101'],
        ];

        $subjectModels = [];
        foreach ($subjects as $s) {
            $subjectModels[] = Subject::firstOrCreate(
                ['name' => $s['name']],
                ['code' => $s['code']]
            );
        }

        // Seed some starter sample students
        $sampleStudents = [
            [
                'admission_number' => 'SCH-2026-001',
                'name' => 'Ali Raza',
                'father_name' => 'Muhammad Aslam',
                'age' => 15,
                'date_of_birth' => '2011-05-14',
                'gender' => 'male',
                'address' => 'House #42, Street 5, Model Town, Lahore',
                'phone' => '0300-1234567',
                'school_class_id' => $classModels[4]->id, // Class 10
                'monthly_fee' => 4500.00,
                'fee_status' => 'pending',
                'admission_date' => '2026-03-01',
                'remarks' => 'Good in Mathematics and Physics',
                'subjects' => [0, 1, 2, 4, 5, 7], // indices of subjects
            ],
            [
                'admission_number' => 'SCH-2026-002',
                'name' => 'Fatima Noor',
                'father_name' => 'Tariq Mehmood',
                'age' => 14,
                'date_of_birth' => '2012-08-22',
                'gender' => 'female',
                'address' => 'Flat B-3, Gulshan Block, Johar Town, Lahore',
                'phone' => '0321-9876543',
                'school_class_id' => $classModels[3]->id, // Class 9
                'monthly_fee' => 4500.00,
                'fee_status' => 'paid',
                'admission_date' => '2026-03-05',
                'remarks' => 'Fee cleared via Bank deposit',
                'subjects' => [0, 1, 2, 4, 6], // indices of subjects
            ],
            [
                'admission_number' => 'SCH-2026-003',
                'name' => 'Hamza Khan',
                'father_name' => 'Akhtar Khan',
                'age' => 13,
                'date_of_birth' => '2013-02-10',
                'gender' => 'male',
                'address' => 'Street 9, Sector G-10, Islamabad',
                'phone' => '0333-5551122',
                'school_class_id' => $classModels[2]->id, // Class 8
                'monthly_fee' => 4000.00,
                'fee_status' => 'pending',
                'admission_date' => '2026-04-12',
                'remarks' => 'Parent requested 10 days extension for fee',
                'subjects' => [0, 1, 2, 3, 7],
            ]
        ];

        foreach ($sampleStudents as $st) {
            $subjIndices = $st['subjects'];
            unset($st['subjects']);

            $student = Student::firstOrCreate(
                ['admission_number' => $st['admission_number']],
                $st
            );

            $selectedSubjectIds = array_map(fn($idx) => $subjectModels[$idx]->id, $subjIndices);
            $student->subjects()->sync($selectedSubjectIds);
        }

        // Teachers Seeding
        $sampleTeachers = [
            [
                'name' => 'Prof. Muhammad Usman',
                'email' => 'usman.math@school.com',
                'phone' => '0301-7654321',
                'qualification' => 'M.Sc. Mathematics (PU), B.Ed',
                'experience' => '8 Years Experience',
                'gender' => 'male',
                'address' => 'House 14, Johar Town, Lahore',
                'incharge_class_id' => $classModels[4]->id, // Class 10
                'salary' => 65000.00,
                'joining_date' => '2020-08-15',
                'avatar_color' => 'indigo',
                'bio' => 'Senior Mathematics Department Head specializing in Algebra and Calculus for Matric and Senior classes.',
                'teaching_classes' => [3, 4, 5],
                'subjects' => [0], // Mathematics
            ],
            [
                'name' => 'Ms. Ayesha Siddiqa',
                'email' => 'ayesha.physics@school.com',
                'phone' => '0322-4433221',
                'qualification' => 'M.Phil Physics (QAU Islamabad)',
                'experience' => '6 Years Experience',
                'gender' => 'female',
                'address' => 'Street 7, F-8/2, Islamabad',
                'incharge_class_id' => $classModels[3]->id, // Class 9
                'salary' => 60000.00,
                'joining_date' => '2021-03-01',
                'avatar_color' => 'purple',
                'bio' => 'Passionate physics lecturer focusing on concept clarity and laboratory experiments.',
                'teaching_classes' => [3, 4],
                'subjects' => [4, 5], // Physics, Chemistry
            ],
            [
                'name' => 'Sir Salman Tariq',
                'email' => 'salman.cs@school.com',
                'phone' => '0345-1122334',
                'qualification' => 'BS Computer Science (FAST-NUCES)',
                'experience' => '4 Years Experience',
                'gender' => 'male',
                'address' => 'Plaza 4, Gulberg III, Lahore',
                'incharge_class_id' => null, // Not a class incharge, subject teacher
                'salary' => 55000.00,
                'joining_date' => '2023-01-10',
                'avatar_color' => 'emerald',
                'bio' => 'IT Instructor leading computer labs, Python basics, and ICT curriculum across middle and high school.',
                'teaching_classes' => [2, 3, 4, 5],
                'subjects' => [7], // Computer Science
            ],
            [
                'name' => 'Mrs. Farzana Batool',
                'email' => 'farzana.english@school.com',
                'phone' => '0300-9988776',
                'qualification' => 'M.A English Literature & Linguistics (GCU)',
                'experience' => '10 Years Experience',
                'gender' => 'female',
                'address' => 'Canal View Housing Scheme, Lahore',
                'incharge_class_id' => $classModels[2]->id, // Class 8
                'salary' => 70000.00,
                'joining_date' => '2019-02-12',
                'avatar_color' => 'blue',
                'bio' => 'Head of English Language & Literature, debate coach, and student mentor.',
                'teaching_classes' => [0, 1, 2, 3, 4],
                'subjects' => [1], // English
            ]
        ];

        foreach ($sampleTeachers as $tData) {
            $teachClasses = $tData['teaching_classes'];
            $teachSubjects = $tData['subjects'];
            unset($tData['teaching_classes'], $tData['subjects']);

            $teacher = \App\Models\Teacher::firstOrCreate(
                ['email' => $tData['email']],
                $tData
            );

            $mappedClassIds = array_map(fn($idx) => $classModels[$idx]->id, $teachClasses);
            $teacher->teachingClasses()->sync($mappedClassIds);

            $mappedSubjectIds = array_map(fn($idx) => $subjectModels[$idx]->id, $teachSubjects);
            $teacher->subjects()->sync($mappedSubjectIds);
        }
    }
}
