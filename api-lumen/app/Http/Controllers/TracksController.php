<?php

namespace App\Http\Controllers;

use App\Models\CostHour;
use Laravel\Lumen\Routing\Controller as BaseController;
use App\Models\Tracks;
use Exception;
use Illuminate\Http\Request;
use App\Http\Controllers\CostHourController;
use App\Http\Controllers\AuthController;
use Illuminate\Http\Response;
use App\Models\TrelloTasks;
use App\Models\Tasks;
use Illuminate\Support\Facades\DB;
use TrelloTask;
use App\Models\User;

class TracksController extends BaseController
{
    public function all($id = null)
    {
        try{
            $tracks = Tracks::where('idUser', $id)->get();
            foreach($tracks as $track){
                $track = $this->trackResponse($track);
            }

            return $tracks;
        }catch(Exception $e){
            return (new Response(array("Error" => BAD_REQUEST, "Operation" => "tracks all"), 500));
        }
    }

    public function current(Request $request)
    {

        $this->validate($request, [
            "startTime" => "string",
            "endTime" => "string",
        ]);

        $user_id = AuthController::current()->id;

        try{
            $tracks = $this->all($user_id);

            return $tracks;
        }catch(Exception $e){
            return (new Response(array("Error" => BAD_REQUEST, "Operation" => "tracks all"), 500));
        }
    }

    public function currentUserDate(Request $request)
    {

        $this->validate($request, [
            "startDate" => "required",
            "endDate" => "required"
        ]);

        $user_id = AuthController::current()->id;

        $startDate = $request->input("startDate");
        $endDate = $request->input("endDate");

        try{
            $tracks = Tracks::where('idUser', $user_id)->whereBetween("startTime", [$startDate, $endDate])->get();
            foreach($tracks as $track){
                $track = $this->trackResponse($track);
            }

            return $tracks;
        }catch(Exception $e){
            return (new Response(array("Error" => BAD_REQUEST, "Operation" => "tracks all"), 500));
        }
    }

    public function trackResponse($track)
    {   
        $id_task = $track->idTask;
        $typeTrack = $track->typeTrack;

        $task = null;

        if($typeTrack == "trello") {
            $task = TrelloTasksController::all($id_task);
        }

        if($typeTrack == "manual") {
            $task = TasksController::all($id_task);
        }

        $track->taskName = $task->name;
        $track->projectName = $task->project;

        $track->duration = $this->duracionDiff($track->startTime, $track->endTime);
        $costHout = new CostHourController();
        $track->trackCost = $costHout->costHour($track->duration, $track->idUser);
        return $track;
    }

    public function duracionDiff($start, $end)
    {
        $date1=new \DateTime($start); //2022-02-04 15:21:19
        $date2=new \DateTime($end);
        
        return $date2->diff($date1, true)->format("%H:%I:%S");;
    }

    public function new(Request $request)
    {
        $this->validate($request,[
            "currency" => "",
            "idProyecto" => "required|numeric|exists:projects,id",
            "idTask" => "required|numeric",
            "idUser" => "required|numeric|exists:users,id",
            "name" => "required",
            "startTime" => "required|date",
            "typeTrack" => "required",
        ]);

        $idTask = $request->input("idTask");
        $currency = $request->input("currency");
        $idProyecto = $request->input("idProyecto");
        $idUser = $request->input("idUser");
        $name = $request->input("name");
        $startTime = $request->input("startTime");
        $typeTrack = $request->input("typeTrack");
        
        if($typeTrack == "manual"){
            $task_manual = Tasks::where('id', $idTask)->first();

            if(!$task_manual){
                $task_trello = TrelloTasks::where('id', $idTask)->first();

                if(!$task_trello){
                    return (new Response(array("Error" => TASK_INVALID, "Operation" => "tracks new"), 500));
                }
            }
        }

        try{
            $track = $this->arrayTracks($currency, $idProyecto, $idTask, $idUser, $name, $startTime, $typeTrack);

            return Tracks::create($track);
        }catch(Exception $e){
            return (new Response(array("Error" => BAD_REQUEST, "Operation" => "tracks new"), 500));
        }
    }

    public function update(Request $request)
    {
        $this->validate($request,[
            "duracion" => "required|regex:/(\d+\:\d+)/",
            "endTime" => "required|date",
            "id" => "required|numeric",
        ]);

        try{

            $duracion = 0;
            $endTime = $request->input("endTime");
            $id = $request->input("id");

            return Tracks::where("id", $id)->update(["duracion" => $duracion, "endTime" => $endTime]);
        }catch(Exception $e){
            return (new Response(array("Error" => BAD_REQUEST, "Operation" => "track update"), 500));
        }
    }

    public function arrayTracks($currency, $idProyecto, $idTask, $idUser, $name, $startTime, $typeTrack)
    {
        return array(
            "currency" => $currency,
            "idProyecto" => $idProyecto,
            "idTask" => $idTask,
            "idUser" => $idUser,
            "name" => $name,
            "startTime" => $startTime,
            "typeTrack" => $typeTrack
        );
    }

    public function currentUserLastTrack()
    {
        $user_id = AuthController::current()->id;

        $tracks = Tracks::where('idUser', $user_id)->orderBy("startTime", 'desc')->get();
            
        if(count($tracks) > 0){
            
            return array("response" => $tracks[0]);
        }
        return $tracks;  

        try{
            
        }catch(Exception $e){
            return (new Response(array("Error" => BAD_REQUEST, "Operation" => "tracks current last"), 500));
        }
    }

    public function calendar($id, $fecha)
    {   
        try{
            $user = User::where('id', $id)->first();
            
            if(!$user){
                return (new Response(array("Error" => ID_INVALID, "Operation" => "tracks current calendar"), 400));
            }

            return array('response' => DB::select("SELECT id AS id_track, name AS title, startTime AS start, endTime AS end FROM tracks WHERE idUser = ".$id." AND Month(startTime) = Month('".$fecha."') AND Year(startTime) = Year('".$fecha."')"));
        }catch(Exception $e){
            return (new Response(array("Error" => BAD_REQUEST, "Operation" => "tracks current calendar"), 500));
        }
    }

    public function currentCalendar($fecha)
    {
        $user_id = AuthController::current()->id;
        
        return $this->calendar($user_id, $fecha);
    }

    public function currentMonth(Request $request) {

        $this->validate($request, [
            "idMonth" => "required|numeric",
            "year" => "required|numeric"
        ]);

        $user_id = AuthController::current()->id;
        $idMonth = $request->input("idMonth");
        $year = $request->input("year");
        
        
        try{
            $tracks = DB::select("SELECT SUM(trackCost) AS salary FROM tracks WHERE month(endTime) = $idMonth AND year(endTime) = $year AND tracks.idUser = $user_id AND tracks.trackCost IS NOT NULL");
            $tracks[0]->salary = $tracks[0]->salary == null ? 0 : $tracks[0]->salary;

            return array('response' => $tracks);
        }catch(Exception $e){
            return (new Response(array("Error" => BAD_REQUEST, "Operation" => "tracks current calendar"), 500));
        }
    }
}


