<?php

namespace App\Http\Controllers;

use Laravel\Lumen\Routing\Controller as BaseController;
use App\Models\Tracks;

class TracksController extends BaseController
{
    public function all($id = null)
    {
        try{
            if(!empty($id)){
                return Tracks::where('id', $id)->first();
            }

            return Tracks::paginate(15);
        }catch(Exceptio $e){
            return (new Response(array("Error" => BAD_REQUEST, "Operation" => "tracks all"), 500));
        }
    }
}
