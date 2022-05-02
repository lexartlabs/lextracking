<?php

namespace App\Http\Controllers;

use Exception;
use Laravel\Lumen\Routing\Controller as BaseController;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\Projects;
use Illuminate\Support\Facades\DB;
use Project;

class ProjectsController extends BaseController
{
    public function all($id = null)
    {

        try {
            if (!empty($id)) {
                return array('response' => Projects::join('clients', 'projects.idClient', '=', 'clients.id')->select('projects.*', 'clients.name as clientName')->where('projects.id', $id)->first());
            }

            $projects = Projects::join('clients', 'projects.idClient', '=', 'clients.id')->select('projects.*', 'clients.name as clientName')->get();

            return array('response' => $projects);
        } catch (Exception $e) {
            return (new Response(array("Error" => BAD_REQUEST, "Operation" => "projects all"), 500));
        }
    }

    public function client($id)
    {
        try {
            if (!$id) {
                return (new Response(array("Error" => ID_INVALID, "Operation" => "projects client id"), 500));
            }

            return Projects::join('clients', 'projects.idClient', '=', 'clients.id')->select('projects.*', 'clients.name as clientName')->where("idClient", $id)->get();
        } catch (Exception $e) {
            return (new Response(array("Error" => BAD_REQUEST, "Operation" => "projects client id"), 500));
        }
    }

    public function update(Request $request)
    {
        $tracked = $request->input('tracked');
        $filter = $request->input('filter');
        $id = $request->input('id');
        $cost = $request->input('cost');
        $user = $request->input();

        try {
            if ($tracked) {
                if ($filter == 'rest' || $filter == 'update') {
                    $c = DB::table('projects')
                        ->select("totalCost")
                        ->where('id', '=', $id);

                    $totalCost = $cost - $c[0]['totalCost'];

                    $b = DB::table('projects')
                        ->where('id', $id)
                        ->update(['tracked' => $tracked, 'totalCost' => $totalCost]);

                    if (empty($b)) {
                        return array("response" => 'OK');
                    } else {
                        return array("Error" => "Error al actualizar el Proyecto.");
                    }
                } elseif ($filter == 'TotalUpdate') {
                    $u = DB::table('projects')
                        ->where('id', $id)
                        ->update(['tracked' => $tracked, 'totalCost' => $cost]);

                    if (empty($u)) {
                        return array("response" => 'OK');
                    } else {
                        return array("Error" => "Error al actualizar el Proyecto.");
                    }
                } else {
                    $d = Projects::where('id', $id)
                        ->update([
                            'name' => $user['name'],
                            'idClient' => $user['idClient'],
                            'description' => $user['description'],
                            'comments' => $user['comments'],
                            'duration' => $user['duration'],
                            'presupuesto' => $user['presupuesto'],
                            'active' => $user['active'],
                        ]);


                    // CALLBACK
                    if (empty($d)) {
                        return array("response" => 'OK');
                    } else {
                        return array("Error" => "Error al actualizar el Proyecto.");
                    }
                }
            }
        } catch (Exception $e) {
            return (new Response(array("Error" => BAD_REQUEST, "Operation" => "update a project"), 500));
        }
    }

    public function new(Request $request) 
    {
        $request["tracked"] = "0:0:0";
        $request["presupuesto"] = $request->input("presupuesto") ? $request->input("presupuesto") : "0";

        $this->validate($request, [
            "active" => "required",
            "description" => "required",
            "duration" => "required",
            "idClient" => "required|exists:clients,id",
            "name" => "required|string",
            "presupuesto" => "numeric",
        ]);

        $projectData = $request->only(["active", "comments", "description", "duration", "idClient", "name", "tracked", "presupuesto"]);
        try{
            $project = Projects::create($projectData);

            return array("response" => $project);
        }catch(Exception $e) {
            return (new Response(array("Error" => BAD_REQUEST, "Operation" => "projects new"), 500));
        }
    } 
}
