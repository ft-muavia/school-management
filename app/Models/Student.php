<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory;

    protected $fillable = [
        'admission_number',
        'name',
        'father_name',
        'age',
        'date_of_birth',
        'gender',
        'address',
        'phone',
        'school_class_id',
        'group_stream',
        'monthly_fee',
        'fee_status',
        'admission_date',
        'remarks',
    ];

    public function schoolClass()
    {
        return $this->belongsTo(SchoolClass::class, 'school_class_id');
    }

    public function subjects()
    {
        return $this->belongsToMany(Subject::class, 'student_subject');
    }
}
