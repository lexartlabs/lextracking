<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Weeklyhours extends Model
{
    use HasFactory;

    protected $table = 'weeklyhours';
    public $timestamps = false;

    protected $fillable = ['id', 'idUser', 'userName', 'costHour', 'workLoad', 'currency', 'borrado'];

}
