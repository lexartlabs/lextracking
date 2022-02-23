<?php

namespace App\Http\Controllers;

use App\Models\Performance;
use Exception;
use Laravel\Lumen\Routing\Controller as BaseController;
use Illuminate\Http\Response;
use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;


class PerformanceController extends BaseController
{
    public function userId($id, $idMonth, $year)
    {
        try{
            $performance = Performance::where('idUser', $id)->where('idMonth', $idMonth)->where('year', $year)->get();
            if(!$performance) {
                return (new Response(array("Error" => PERFORMANCE_NOT, "Operation" => "performance"), 400));
            }

            return array('response' => $performance);
        }catch (Exception $e){
            return (new Response(array("Error" => BAD_REQUEST, "Operation" => "performance"), 500));
        }
    }

    public function all()
    {
        try{
            $performance = Performance::all();
            return json_encode($performance);
        }catch(Exception $e) {
            return (new Response(array("Error" => BAD_REQUEST, "Operation" => "performance"), 500));
        }
    }

    public function current(Request $request)
    {
        $this->validate($request, [
            "idMonth" => "required|numeric",
            "year" => "required|numeric"
        ]);

        $user_id = AuthController::current()->id;
        $idMonth = $request->input("idMonth");
        $year = $request->input("year");
        
        return $this->userId($user_id, $idMonth, $year);
    }

    public function save(Request $request)
    {
        $this->validate($request, [
            "idUser" => "required|numeric|exists:users,id",
            "year" => "required|numeric",
            "idMonth" => "required|numeric",
            "month" => "required",
            "salary" => "required|numeric",
            "costHour" => "required|numeric",
        ]);

        try{
            $performance = $request->only(["idUser", "year", "idMonth", "month", "salary", "costHour"]);

            return Performance::create($performance);
        }catch(Exception $e){
            return (new Response(array("Error" => BAD_REQUEST, "Operation" => "performance new"), 500));
        }

    }
}
