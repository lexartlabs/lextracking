<?php

namespace App\Http\Controllers;

use Exception;
use Laravel\Lumen\Routing\Controller as BaseController;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\Projects;
use Project;

class ProjectsController extends BaseController
{
    public function all($id = null) 
    {
        
        try{
            if(!empty($id)){
               return Projects::join('clients', 'projects.idClient', '=', 'clients.id')->select('projects.*', 'clients.name as clientName')->where('projects.id', $id)->first(); 
            }

            return Projects::join('clients', 'projects.idClient', '=', 'clients.id')->select('projects.*', 'clients.name as clientName')->get();
        }catch(Exception $e){
            return (new Response(array("Error" => BAD_REQUEST, "Operation" => "projects all"), 500));
        }
    }

    public function client($id)
    {
        try{
            if(!$id){
                return (new Response(array("Error" => ID_INVALID, "Operation" => "projects client id"), 500));
            }

            return Projects::join('clients', 'projects.idClient', '=', 'clients.id')->select('projects.*', 'clients.name as clientName')->where("idClient", $id)->get();
        }catch(Exception $e) {
            return (new Response(array("Error" => BAD_REQUEST, "Operation" => "projects client id"), 500));
        }
    }
}
