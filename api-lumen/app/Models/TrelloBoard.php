<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TrelloBoard extends Model
{
    use HasFactory;

    protected $table = 'trelloboard';
    public $timestamps = false;

    protected $fillable = [
        'id', 'tablero_id', 'proyecto_id', 'url', 'activo', 'dateCreate', 'dateUpdate', 'active'
    ];
}
