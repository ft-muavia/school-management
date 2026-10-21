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
    }
}
