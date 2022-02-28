<?php

namespace App\Http\Controllers;

use Laravel\Lumen\Routing\Controller as BaseController;
use App\Models\TrelloTasks;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Response;

class TrelloTasksController extends BaseController
{
    public function all($id = null)
    {
        
        try{
            if(!empty($id)){
                $trellos = DB::select('SELECT TrelloBoard.*, Projects.name AS projectName FROM TrelloBoard INNER JOIN Projects ON TrelloBoard.proyecto_id=Projects.id WHERE TrelloBoard.id = '.$id.' AND active= 1');

                $array_trello = array();
                foreach($trellos as $trello){
                    $trello->id = strval($trello->id);
                    $trello->proyecto_id = strval($trello->proyecto_id);
                    $trello->active = strval($trello->active);
    
                    array_push($array_trello, $trello);
                }

                return array('response' => $array_trello);
            }
            $trellos = DB::select('SELECT TrelloBoard.*, Projects.name AS projectName FROM TrelloBoard INNER JOIN Projects ON TrelloBoard.proyecto_id=Projects.id AND active= 1');
            
            $array_trello = array();
            foreach($trellos as $trello){
                $trello->id = strval($trello->id);
                $trello->proyecto_id = strval($trello->proyecto_id);
                $trello->active = strval($trello->active);

                array_push($array_trello, $trello);
            }
            
            return array('response' => $array_trello);
        }catch(Exceptio $e){
            return (new Response(array("Error" => BAD_REQUEST, "Operation" => "tracks trello all"), 500));
        }
    }

    public function allOld(){
        try{
            return array('response' => TrelloTasks::where('active', 1)->get());
        }catch(Exception $e){
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

    public function taskNewFrontOld(Request $request)
    {
        $this->validate($request, [
            "card_id" => "required",
            "id" => "required",
            "idProyecto" => "required|numeric",
            "idTask" => "required",
            "id_project" => "required|numeric",
            "idboard" => "required",
            "isPlayable" => "required",
            "longIdCard" => "required",
            "members" => "array",
            "name" => "required|string",
            "project" => "required",
        ]);

        $card_id = $request->input("card_id");
        $id = $request->input("id"); //Old route is not used in future good new frontend should remove this
        $idProyecto = $request->input("idProyecto");
        $idTask = $request->input("idTask"); //Old route is not used in future good new frontend should remove this
        $id_project = $request->input("id_project");
        $id_board = $request->input("idboard");
        $isPlayable = $request->input("isPlayable"); //Old route is not used in future good new frontend should remove this
        $longIdCard = $request->input("longIdCard"); //Old route is not used in future good new frontend should remove this
        $members = $request->input("members");   //Old route is not used in future good new frontend should remove this
        $name = $request->input("name");
        $project = $request->input("project");

        $card_id = $request->input('card_id');

            $task = TrelloTasks::where('card_id', $card_id)->first();
            
            if(!empty($task)){
                
                DB::update("UPDATE TrelloTask SET name = '$name', project = '$project', description = '', status = '' WHERE card_id='$card_id'");
                return array('response' => "OK");
            }
            
            $insert = DB::insert("INSERT INTO TrelloTask (id_project, idProyecto, id_board, card_id, name, project, description, comments, duration, users, dateCreate, dateUpdate, startDate, endDate, status, client) VALUES ('$id_project', '$idProyecto', '$id_board', '$card_id', '$name', '$project', '', 'nulo', '00:00:00', 'user', NOW(), NOW(), NOW(), NOW(), '', '')");
            
            return array('response' => $insert);

        try{
            
        }catch(Exception $e){
            return (new Response(array("Error" => BAD_REQUEST, "Operation" => "tracks trello task new"), 500));
        }
    }
}


