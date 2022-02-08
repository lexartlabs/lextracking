<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TrelloTracks extends Model
{
    use HasFactory;

    protected $table = 'trellotask';
    public $timestamps = false;

    protected $fillable = [
        'id', 'card_id', 'id_project', 'idProyecto', 'id_board', 'name',
         'project', 'description', 'comments', 'duration', 'users',
         'type', 'dateCreate', 'dateUpdate', 'startDate', 'endDate', 'status', 'client', 'active'
    ];

}
