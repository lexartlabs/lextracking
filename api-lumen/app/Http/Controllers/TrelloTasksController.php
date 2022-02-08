<?php

namespace App\Http\Controllers;

use Laravel\Lumen\Routing\Controller as BaseController;
use App\Models\TrelloTasks;
use Exception;
use Illuminate\Http\Request;

class TrelloTasksController extends BaseController
{
    public function all($id = null)
    {
        try{
            if(!empty($id)){
                return TrelloTasks::where('id', $id)->first();
            }
            return TrelloTasks::paginate(15);
        }catch(Exceptio $e){
            return (new Response(array("Error" => BAD_REQUEST, "Operation" => "tracks trello all"), 500));
        }
    }

    public function new(Request $request)
    {
        $this->validate($request, [
            "card_id" => "required",
            "id_project" => "required|numeric|exists:projects,id",
            "idProyecto" => "required|numeric|exists:projects,id",
            "id_board" => "required|exists:trelloboard,tablero_id",
            "name" => "required",
            "project" => "required",
            "description" => "",
            "comments" => "required",
            "duration" => "required|regex:/(\d+\:\d+)/",
            "users" => "required",
            "type" => "required",
            "dateCreate" => "required|date",
            "dateUpdate" => "required|date",
            "startDate" => "required|date",
            "endDate" => "required|date",
            "status" => "required|numeric",
            "client" => "required|numeric",
            "active" => "required|numeric",
        ]);

        $track = $request->only(
            "card_id",
            "id_project" ,
            "idProyecto",
            "id_board",
            "name",
            "project",
            "description",
            "comments",
            "duration",
            "users",
            "type",
            "dateCreate",
            "dateUpdate",
            "startDate",
            "endDate",
            "status",
            "client",
            "active"
        );
        
        try{
            return TrelloTasks::create($track);
        }catch(Exception $e){
            return (new Response(array("Error" => BAD_REQUEST, "Operation" => "tracks trello new"), 500));
        }
    }
}


