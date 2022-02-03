<?php

namespace App\Http\Controllers;

use Exception;
use Laravel\Lumen\Routing\Controller as BaseController;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\Tasks;

class TasksController extends BaseController
{
    public function all($id = null) 
    {
        try{
            if(!empty($id)){
               return Tasks::where('id', $id)->first(); 
            }
            return Tasks::all();
        }catch(Exception $e){
            return (new Response(array("Error" => BAD_REQUEST, "Operation" => "tasks all"), 500));
        }
    }

    public function project($id)
    {
        try{
            if(empty($id)){
                return (new Response(array("Error" => ID_INVALID, "Operation" => "tasks projecs id"), 500));
            }

            return Tasks::where('idProject', $id)->get();
        }catch(Exception $e){
            return (new Response(array("Error" => BAD_REQUEST, "Operation" => "tasks projecs id"), 500));
        }
    }

    public function delete($id)
    {
        try{
            if(!$id){
                return (new Response(array("Error" => ID_INVALID, "Operation" => "tasks delete id"), 500));
            }

            $project = Tasks::where('id', $id)->where('active', 1)->first();

            if(!$project){
                return (new Response(array("Error" => ID_INVALID, "Operation" => "tasks delete id"), 500));
            }

            return Tasks::where('id', $id)->update(["active" => 0])->get();
        }catch(Exception $e){
            return (new Response(array("Error" => BAD_REQUEST, "Operation" => "tasks delete id"), 500));
        }
    }
}
