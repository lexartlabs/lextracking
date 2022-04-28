<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserExceptions extends Model
{
    use HasFactory;

    protected $table = 'user_exceptions';

    protected $fillable = ['user_exceptions_id', 'user_id', 'day', 'title', 'start', 'end', 'created_at', 'updated_at', 'deleted_at'];
}
