<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Projects extends Model
{
    use HasFactory;

    protected $fillable = [
        'idClient', 'name', 'description', 'comments', 'duration', 'tracked', 'totalCost', 'presuposto'
    ];

}
