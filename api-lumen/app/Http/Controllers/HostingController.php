<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\Hosting;
use Laravel\Lumen\Routing\Controller as BaseController;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class HostingController extends BaseController
{
    public function all(Request $request, $id = null)
    {
        try{
            $hostings = Hosting::select();

            if(!empty($id)){
                $request["id"] = $id;
    
                $this->validate($request, [
                    "id" => "exists:hosting,id"
                ]);

                $hosting = $hostings->where("id", $id)->where("borrado", 0)->first();

                $hosting->contact = json_decode($hosting->contact);
                $hosting->products = json_decode($hosting->products);

                return array("response" => $hosting);
            }

            $hostings = $hostings->where("borrado", 0)->get();

            foreach($hostings as $hosting) {
                $hosting->contact = json_decode($hosting->contact);
                $hosting->products = json_decode($hosting->products);
            }

            return array("response" => $hostings);
        }catch(Exception $e) {
            return (new Response(array("Error" => BAD_REQUEST, "Operation" => "hostings all"), 500));
        }
    }
}


