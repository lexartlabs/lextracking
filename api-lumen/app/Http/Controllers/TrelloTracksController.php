<?php

namespace App\Http\Controllers;

use Laravel\Lumen\Routing\Controller as BaseController;
use App\Models\TrelloTracks;
use Exception;
use Illuminate\Http\Request;

class TrelloTracksController extends BaseController
{
    public function all($id = null)
    {
        try{
            if(!empty($id)){
                return TrelloTracks::where('id', $id)->first();
            }
            return TrelloTracks::paginate(15);
        }catch(Exceptio $e){
            return (new Response(array("Error" => BAD_REQUEST, "Operation" => "tracks all"), 500));
        }
    }

    public function new(Request $request)
    {
        $this->validate($request, [
            "card_id" => "required",
            "id_project" => "required|numeric",
            "idProyecto" => "required|numeric",
            "id_board" => "required",
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
            return TrelloTracks::create($track);
        }catch(Exception $e){

        }
    }
}


