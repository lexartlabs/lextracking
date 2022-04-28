<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserHours extends Model
{
    use HasFactory;

    protected $table = 'users_hours';

    protected $fillable = ['user_hour_id', 'user_id', 'day', 'title', 'start', 'end', 'created_at', 'updated_at', 'deleted_at'];
}
