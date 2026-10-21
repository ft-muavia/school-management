<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('school_classes', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // e.g. Class 1, Class 10, Matric, FSC
            $table->string('section')->nullable(); // e.g. A, B, Green
            $table->timestamps();
        });

        Schema::create('subjects', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // e.g. Mathematics, English, Physics
            $table->string('code')->nullable(); // e.g. MATH-101
            $table->timestamps();
        });

        Schema::create('students', function (Blueprint $table) {
            $table->id();
            $table->string('admission_number')->unique();
            $table->string('name');
            $table->string('father_name');
            $table->integer('age')->nullable();
            $table->date('date_of_birth')->nullable();
            $table->string('gender')->default('male'); // male, female, other
            $table->text('address');
            $table->string('phone')->nullable();
            $table->foreignId('school_class_id')->constrained('school_classes')->onDelete('cascade');
            $table->decimal('monthly_fee', 10, 2)->default(0.00);
            $table->enum('fee_status', ['paid', 'pending'])->default('pending');
            $table->date('admission_date')->nullable();
            $table->text('remarks')->nullable();
            $table->timestamps();
        });

        // Pivot table for Student <-> Subject
        Schema::create('student_subject', function (Blueprint $table) {
            $table->id();
            $table->foreignId('student_id')->constrained('students')->onDelete('cascade');
            $table->foreignId('subject_id')->constrained('subjects')->onDelete('cascade');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('student_subject');
        Schema::dropIfExists('students');
        Schema::dropIfExists('subjects');
        Schema::dropIfExists('school_classes');
    }
};
