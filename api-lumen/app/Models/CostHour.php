<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CostHour extends Model
{
    use HasFactory;

    protected $table = 'weeklyhours';

    protected $fillable = [
        'idUser', 'userName', 'costHour', 'workLoad', 'currency', 'borrado'
    ];

}
