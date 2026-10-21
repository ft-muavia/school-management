<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('students', function (Blueprint $table) {
            // CS (Computer Science), BIO (Biology / Pre-Medical), ARTS (General Arts)
            $table->string('group_stream')->default('CS')->after('school_class_id');
        });
    }

    public function down(): void
    {
        Schema::table('students', function (Blueprint $table) {
            $table->dropColumn('group_stream');
        });
    }
};
