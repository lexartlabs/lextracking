<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Clients extends Model
{
    use HasFactory;
    public $timestamps = false;

    protected $table = 'Bills';

    protected $fillable = ['idClient', 'idUser', 'concept', 'amount', 'currency', 'active', 'date', 'description', 'hoursTotal', 'hoursPayable', 'status'];
}
