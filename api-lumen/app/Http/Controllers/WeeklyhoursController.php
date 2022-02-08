<?php

namespace App\Http\Controllers;

use Laravel\Lumen\Routing\Controller as BaseController;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\Weeklyhours;
use App\Http\Controllers\AuthController;
use WeeklyHour;

class WeeklyhoursController extends BaseController
{
    public function all($id = null)
    {
        try{
            if(!empty($id)){
                $weeklyhours = Weeklyhours::where('id', $id)->first();

                return $weeklyhours;
            }
            $weeklyhours = Weeklyhours::paginate(15);

            return $weeklyhours;
        }catch(Exceptio $e){
            return (new Response(array("Error" => BAD_REQUEST, "Operation" => "weeklyhours all"), 500));
        }
    }

    public function user($id)
    {
        if($id){
            try{
                return Weeklyhours::where('idUser', $id)->first();
            }catch(Exception $e){
                return (new Response(array("Error" => BAD_REQUEST, "Operation" => "weeklyhours user id"), 500));
            }
        }

        return (new Response(array("Error" => ID_INVALID, "Operation" => "weeklyhours user id"), 400));
    }

    public function current()
    {
        $user = AuthController::current();
        $id = $user->id;
        
        return $this->user($id);
    }

    public function update(Request $request)
    {
        $this->validate($request, [
            "idUser" => "required|numeric",
            "userName" => "required",
            "costHour" => "required|numeric",
            "workLoad" => "required|numeric",
            "currency" => "required",
            "borrado" => "required|numeric",
            "id" => "required|numeric"
        ]);

        $weeklyhours = $request->only([
            "idUser",
            "userName",
            "costHour",
            "workLoad",
            "currency",
            "borrado",
        ]);

        try{
            $id = $request->input("id");
            $weeklyhours = WeeklyHours::where('id', $id)->first();

            if(!$weeklyhours){
                return (new Response(array("Error" => ID_INVALID, "Operation" => "weeklyhours update"), 400));
            }

            return WeeklyHours::where('id', $id)->update('idUser', $weeklyhours->idUser)
                ->update("userName", $weeklyhours->userName)
                ->update("costHour", $weeklyhours->costHour)
                ->update("workLoad", $weeklyhours->workLoad)
                ->update("currency", $weeklyhours->currency)
                ->update("borrado", $weeklyhours->borrado);
        }catch(Exception $e){
            return (new Response(array("Error" => BAD_REQUEST, "Operation" => "weeklyhours update"), 500));
        }
    }

    public function new(Request $request)
    {
        $this->validate($request, [
            "idUser" => "required|numeric|exists:users,id|unique:weeklyhours",
            "userName" => "required",
            "costHour" => "required|numeric",
            "workLoad" => "required|numeric",
            "currency" => "required",
            "borrado" => "required|numeric",
        ]);

        $weeklyhours = $request->only([
            "idUser",
            "userName",
            "costHour",
            "workLoad",
            "currency",
            "borrado",
        ]);

        try{
            return WeeklyHours::create($weeklyhours);
        }catch(Exception $e){
            return (new Response(array("Error" => BAD_REQUEST, "Operation" => "weeklyhours new"), 500));
        }
    }
}


