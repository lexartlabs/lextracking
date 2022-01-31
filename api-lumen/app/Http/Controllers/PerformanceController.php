<?php

namespace App\Http\Controllers;

use App\Models\Performance;
use Exception;
use Laravel\Lumen\Routing\Controller as BaseController;
use Illuminate\Http\Response;
use App\Http\Controllers\AuthController;


class PerformanceController extends BaseController
{
    public function userId($id)
    {
        try{
            $performance = Performance::where('idUser', $id)->first();
            if(!$performance) {
                return (new Response(array("Error" => PERFORMANCE_NOT, "Operation" => "performance"), 400));
            }

            return json_encode($performance);
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

    public function current()
    {
        $user = AuthController::current();
        $user_id = $user->id;

        return $this->userId($user_id);
    }

    public function save()
    {

    }
}
