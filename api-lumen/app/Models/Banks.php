<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Banks extends Model
{
    use HasFactory;

    protected $table = 'banks';

    public $timestamps = false;

    protected $fillable = ['id', 'name', 'branchOffice', 'userId', 'type', 'currency', "identificationCard", "account", "priceUsd", "active", "borrado"];
}
