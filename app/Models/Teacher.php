<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Teacher extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'phone',
        'qualification',
        'experience',
        'gender',
        'address',
        'incharge_class_id',
        'salary',
        'joining_date',
        'avatar_color',
        'bio',
    ];

    // Class incharge relationship
    public function inchargeClass()
    {
        return $this->belongsTo(SchoolClass::class, 'incharge_class_id');
    }

    // Classes this teacher teaches
    public function teachingClasses()
    {
        return $this->belongsToMany(SchoolClass::class, 'school_class_teacher');
    }

    // Subjects this teacher teaches
    public function subjects()
    {
        return $this->belongsToMany(Subject::class, 'subject_teacher');
    }
}
