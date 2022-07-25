<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Clients extends Model
{
    use HasFactory;
    public $timestamps = false;

    protected $table = 'Bills';

    protected $fillable = ['billNumber', 'borrado', 'concept', 'date', 'expirationTime', 'name', 'price', 'rut'];
}
