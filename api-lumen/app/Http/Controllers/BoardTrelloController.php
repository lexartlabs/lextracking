<?php

namespace App\Http\Controllers;

use Laravel\Lumen\Routing\Controller as BaseController;
use App\Models\TrelloBoard;
use Exception;
use Illuminate\Http\Request;

class BoardTrelloController extends BaseController
{
    public function all($id = null)
    {
        try{
            if(!empty($id)){
                return TrelloBoard::where('id', $id)->first();
            }
            return TrelloBoard::paginate(15);
        }catch(Exceptio $e){
            return (new Response(array("Error" => BAD_REQUEST, "Operation" => "tracks trello boards all"), 500));
        }
    }

    public function new(Request $request)
    {
        $this->validate($request, [
            "tablero_id" => "required|unique:trelloboard",
            "proyecto_id" => "required|exists:projects,id",
            "url" => "required",
            "activo" => "required|numeric",
            "dateCreate" => "required|date",
            "dateUpdated" => "required|date",
            "active" => "required|numeric",
        ]);

        $board = $request->only([
            "tablero_id",
            "proyecto_id",
            "url",
            "activo",
            "dateCreate",
            "dateUpdated",
            "active",
        ]);

        try{
            return TrelloBoard::create($board);
        }catch(Exception $e){
            return (new Response(array("Error" => BAD_REQUEST, "Operation" => "tracks trello boards new"), 500));
        }
    }
}


