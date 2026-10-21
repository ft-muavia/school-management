<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('teachers', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->nullable();
            $table->string('phone')->nullable();
            $table->string('qualification'); // e.g., M.Sc. Mathematics, M.Phil Physics, B.Ed
            $table->string('experience')->nullable(); // e.g., 5 Years, 8 Years
            $table->string('gender')->default('male');
            $table->text('address')->nullable();
            $table->foreignId('incharge_class_id')->nullable()->constrained('school_classes')->nullOnDelete(); // Class Incharge
            $table->decimal('salary', 10, 2)->default(0.00);
            $table->date('joining_date')->nullable();
            $table->string('avatar_color')->default('indigo'); // UI badge/card color styling
            $table->text('bio')->nullable();
            $table->timestamps();
        });

        // Pivot table for which classes a teacher teaches
        Schema::create('school_class_teacher', function (Blueprint $table) {
            $table->id();
            $table->foreignId('teacher_id')->constrained('teachers')->onDelete('cascade');
            $table->foreignId('school_class_id')->constrained('school_classes')->onDelete('cascade');
            $table->timestamps();
        });

        // Pivot table for which subjects a teacher teaches
        Schema::create('subject_teacher', function (Blueprint $table) {
            $table->id();
            $table->foreignId('teacher_id')->constrained('teachers')->onDelete('cascade');
            $table->foreignId('subject_id')->constrained('subjects')->onDelete('cascade');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('subject_teacher');
        Schema::dropIfExists('school_class_teacher');
        Schema::dropIfExists('teachers');
    }
};
