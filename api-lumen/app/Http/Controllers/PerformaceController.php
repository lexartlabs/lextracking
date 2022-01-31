<?php

namespace App\Http\Controllers;

use App\Models\Performance;
use Exception;
use Laravel\Lumen\Routing\Controller as BaseController;


class PerformaceController extends BaseController
{
    public function performanceByUserId($id)
    {
        try{
            $performace = Performance::where('idUser', $id)->first();

            if(!$performace) {
                return (new Response(array("Error" => PERFORMANCE_NOT, "Operation" => "user"), 400));
            }

            return json_encode($performace);
        }catch (Exception $e){
            return (new Response(array("Error" => BAD_REQUEST, "Operation" => "user"), 500));
        }
    }

    public function allPerformance()
    {
        try{
            $performaces = Performance::all();

            return json_encode($performaces);
        }catch(Exception $e) {
            return (new Response(array("Error" => BAD_REQUEST, "Operation" => "user"), 500));
        }
    }

    public function savePerformance()
    {

    }
}
