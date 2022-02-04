<?php

namespace App\Http\Controllers;

use App\Models\CostHour;
use Laravel\Lumen\Routing\Controller as BaseController;
use App\Models\Tracks;
use Exception;
use Illuminate\Http\Request;
use App\Http\Controllers\CostHourController;
use App\Http\Controllers\AuthController;

class TracksController extends BaseController
{
    public function all($id = null)
    {
        try{
            if(!empty($id)){
                $track = Tracks::where('id', $id)->first();
                $track = $this->trackResponse($track);

                return $track;
            }
            $tracks = Tracks::paginate(15);

            foreach($tracks as $track){
                $track = $this->trackResponse($track);
            }

            return $tracks;
        }catch(Exceptio $e){
            return (new Response(array("Error" => BAD_REQUEST, "Operation" => "tracks all"), 500));
        }
    }

    public function current()
    {
        $user_id = AuthController::current()->id;

        try{
            $tracks = Tracks::where('idUser', $user_id)->get();
            foreach($tracks as $track){
                $track = $this->trackResponse($track);
            }

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
            "idProyecto" => "required|numeric",
            "idTask" => "required|numeric",
            "idUser" => "required|numeric",
            "name" => "required",
            "startTime" => "required",
            "typeTrack" => "required",
        ]);

        $currency = $request->input("currency");
        $idProyecto = $request->input("idProyecto");
        $idTask = $request->input("idTask");
        $idUser = $request->input("idUser");
        $name = $request->input("name");
        $startTime = $request->input("startTime");
        $typeTrack = $request->input("typeTrack");

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
            "duracion" => "required",
            "endTime" => "required",
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
}


