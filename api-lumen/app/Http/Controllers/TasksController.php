<?php

namespace App\Http\Controllers;

use Exception;
use Laravel\Lumen\Routing\Controller as BaseController;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\Tasks;
use Illuminate\Support\Facades\DB;

class TasksController extends BaseController
{
    public function all(Request $request, $id = null)
    {
        $request["id"] = $id;

        $this->validate($request, [
            "filter" => "array",
            "limit" => "numeric",
            "offset" => "numeric",
        ]);

        $offset = $request->input("offset");
        $limit = $request->input("limit");
        $filters = $request->input("filter");

        try {
            $tasks = Tasks::join('projects', 'tasks.idProject', '=', 'projects.id')
                ->select(
                    'tasks.id',
                    'tasks.idProject',
                    'tasks.name',
                    'tasks.description',
                    'tasks.comments',
                    'tasks.duration',
                    'tasks.type',
                    'tasks.status',
                    'tasks.active',
                    'projects.name as projectName'
                )
                ->selectRaw('IFNULL(tasks.users, "[]") AS users');

            $count = Tasks::select("*");

            $tasks = $tasks->offset(empty($offset) ? 0 : $offset);
            $tasks = $tasks->limit(empty($limit) ? 15 : $limit);

            if (count($filters) > 0) {
                foreach ($filters as $filter) {

                    $key = array_keys($filter)[0];
                    $value = $filter[$key];

                    switch ($key) {
                        case "projectName":
                            $tasks = $tasks->whereRaw("projects.name LIKE ?", "%$value%");
                            break;
                        case "name":
                            $tasks = $tasks->whereRaw("tasks.name LIKE ?", "%$value%");
                            break;
                        case "description":
                            var_dump($value);
                            $tasks = $tasks->whereRaw("tasks.description LIKE ?", "%$value%");
                            break;
                    }
                }
            }

            if (!empty($id)) {
                $this->validate($request, ["id" => "numeric|exists:tasks,id"]);
                $tasks = $tasks->whereRaw("tasks.id = ?", $id);
                $count = $count->whereRaw("tasks.id = ?", $id);
            }

            $tasks = $tasks->get();
            $count = $count->get();

            $countTasks = strval(count($count));

            return array("response" => array(
                "count" => "$countTasks",
                "task" => $tasks
            ));
        } catch (Exception $e) {
            return (new Response(array("Error" => BAD_REQUEST, "Operation" => "tasks all"), 500));
        }
    }

    public function project($id)
    {
        try {
            if (empty($id)) {
                return (new Response(array("Error" => ID_INVALID, "Operation" => "tasks projecs id"), 500));
            }

            $response = Tasks::join('projects', 'tasks.idProject', '=', 'projects.id')->select('tasks.*', 'projects.name as projectName')->where('idProject', $id)->get();
            return array('response' => $response);
        }catch(Exception $e){
            return (new Response(array("Error" => BAD_REQUEST, "Operation" => "tasks projecs id"), 500));
        }
    }

    public function delete(Request $request)
    {
        $this->validate($request, ["id" => "required"]);

        $id = $request->input("id");

        try {
            $tasks = Tasks::where('id', $id)->where('active', 1)->first();

            if (!$tasks) {
                return (new Response(array("Error" => ID_INVALID, "Operation" => "tasks delete id invalid"), 500));
            }

            return Tasks::where('id', $id)->update(["active" => 0]);
        } catch (Exception $e) {
            return (new Response(array("Error" => BAD_REQUEST, "Operation" => "tasks delete id invalid"), 500));
        }
    }

    public function undelete(Request $request)
    {
        $this->validate($request, ["id" => "required"]);

        $id = $request->input("id");

        try {
            $tasks = Tasks::where('id', $id)->where('active', 0)->first();

            if (!$tasks) {
                return (new Response(array("Error" => ID_INVALID, "Operation" => "tasks undelete id invalid"), 500));
            }

            return Tasks::where('id', $id)->update(["active" => 1]);
        } catch (Exception $e) {
            return (new Response(array("Error" => BAD_REQUEST, "Operation" => "tasks undelete id invalid"), 500));
        }
    }

    public function userId($id, Request $request)
    {

        $request["id"] = $id;

        $this->validate($request, [
            "filter" => "array",
            "limit" => "numeric",
            "offset" => "numeric",
            "id" => "exists:users"
        ]);

        $offset = $request->input("offset");
        $limit = $request->input("limit");
        $filters = $request->input("filter");

        try {
            $model_like = '%{"idUser":"' . $id . '"}%'; //LIKE TO JSON USERS
            $tasks = Tasks::join('projects', 'tasks.idProject', '=', 'projects.id')->select('tasks.*', 'projects.name as projectName');

            $tasks = $tasks->offset(empty($offset) ? 0 : $offset);
            $tasks = $tasks->limit(empty($limit) ? 15 : $limit);

            if (count($filters) > 0) {
                foreach ($filters as $filter) {
                    $key = array_keys($filter)[0];
                    $value = $filter[$key];

                    switch ($key) {
                        case "projectName":
                            $tasks = $tasks->whereRaw("projects.name LIKE ?", "%$value%");
                            break;
                        case "name":
                            $tasks = $tasks->whereRaw("tasks.name LIKE ?", "%$value%");
                            break;
                        case "description":
                            $tasks = $tasks->whereRaw("tasks.description LIKE ?", "%$value%");
                            break;
                    }
                }
            }

            $tasks = $tasks->where('users', 'LIKE', $model_like)->get();
            $countTasks = strval(count($tasks));

            return array("response" => array(
                "count" => $countTasks,
                "task" => $tasks
            ));
        } catch (Exception $e) {
            return (new Response(array("Error" => BAD_REQUEST, "Operation" => "tasks undelete id invalid"), 500));
        }
    }

    public function currentUser(Request $request)
    {
        $user_id = AuthController::current()->id;

        if (!$user_id) {
            return (new Response(array("Error" => ID_INVALID, "Operation" => "tasks current user id"), 500));
        }

        return $this->userId($user_id, $request);
    }

    public function update(Request $request)
    {
        $this->validate($request, [
            "name" => "required|string",
            "idProject" => "required|numeric|exists:projects,id",
            "description" => "string",
            "comments" => "string|string",
            "duration" => "required|string",
            "users" => "required|array",
            "status" => "required|string",
            "startDate" => "required|date_format:Y-m-d",
            "endDate" => "required|date_format:Y-m-d|after:startDate",
            "id" => "required"
        ]);

        $name = $request->input("name");
        $idProject = $request->input("idProject");
        $description = $request->input("description");
        $comments = $request->input("comments");
        $users = $request->input("users");
        $status = $request->input("status");
        $startDate = $request->input("startDate");
        $duration = $request->input("duration");
        $endDate = $request->input("endDate");
        $id = $request->input("id");

        try {
            $tasks = Tasks::where('id', $id);

            if (!$tasks) {
                return (new Response(array("Error" => ID_INVALID, "Operation" => "tasks invalid id"), 500));
            }

            $update = $this->returnArrayTasks($name, $idProject, $description, $comments, $users, $status, $startDate, $endDate, $duration, $id);

            return Tasks::where('id', $id)->update($update);
        } catch (Exception $e) {
            return (new Response(array("Error" => BAD_REQUEST, "Operation" => "tasks undelete id invalid"), 500));
        }
    }

    public function create(Request $request)
    {
        $this->validate($request, [
            "name" => "required|string",
            "idProject" => "required|numeric|exists:projects,id",
            "description" => "string",
            "comments" => "string|string",
            "duration" => "required|string",
            "users" => "required|array",
            "status" => "required|string",
            "startDate" => "required|date_format:Y-m-d",
            "endDate" => "required|date_format:Y-m-d|after:startDate"
        ]);

        $name = $request->input("name");
        $idProject = $request->input("idProject");
        $description = $request->input("description");
        $comments = $request->input("comments");
        $duration = $request->input("duration");
        $users = $request->input("users");
        $status = $request->input("status");
        $startDate = $request->input("startDate");
        $endDate = $request->input("endDate");

        try {
            $create = $this->returnArrayTasks($name, $idProject, $description, $comments, $users, $status, $startDate, $endDate, $duration);
            return Tasks::create($create);
        } catch (Exception $e) {
            return (new Response(array("Error" => BAD_REQUEST, "Operation" => "tasks undelete id invalid"), 500));
        }
    }

    public function returnArrayTasks($name, $idProject, $description, $comments, $users, $status, $startDate, $endDate, $duration, $id = null)
    {
        if (empty($id)) {
            return array(
                "name" => $name,
                "idProject" => $idProject,
                "description" => $description,
                "comments" => $comments,
                "users" => json_encode($users),
                "status" => $status,
                "startDate" => $startDate,
                "duration" => $duration,
                "endDate" => $endDate,
            );
        }

        return array(
            "name" => $name,
            "idProject" => $idProject,
            "description" => $description,
            "comments" => $comments,
            "users" => json_encode($users),
            "status" => $status,
            "startDate" => $startDate,
            "endDate" => $endDate,
            "duration" => $duration,
            "id" => $id,
        );
    }

    public function getTasksByUserFilter(Request $request, $idUser)
    {
		$filter = "";
        $limit  = $request->input('limit');
        $offset  = $request->input('offset');
        $filter_params  = $request->input('filter');
        $user = '%{"idUser":"'.$idUser.'"}%';

        // Filters
        if (count($filter_params) > 0) {
			foreach ($filter_params as $key => $value) {
				$keyName = array_keys($filter_params[$key])[0];
				if($keyName == "projectName"){
					$filter .= " AND projects.name LIKE '%".$value[$keyName]."%'";
				}else if($keyName == "name"){
					$filter .= " AND tasks.name LIKE '%".$value[$keyName]."%'";
				}
				else if($keyName == "description"){
					$filter .= " AND tasks.description LIKE '%".$value[$keyName]."%'";
				}
			}
		}

        $d = Tasks::join('projects', 'tasks.idProject', '=', 'projects.id')
            ->select('tasks.*', 'projects.name AS projectName')
            ->where("tasks.users", 'LIKE', $user)
            ->where('projects.active', '=', 1)
            ->where("tasks.active", '=', 1)
            ->orderByRaw("projectName");

        if(!empty($filter)) {
            $d->whereRaw($filter);
        }

        $d_count = $d->get();

        if (!empty($offset) && isset($offset)) {
            $d->offset($offset);
        }
        if (!empty($limit) && isset($limit)) {
            $d->limit($limit);
        }

        $d = $d->get();

		// CALLBACK
		if(!empty($d)){
			return (new Response(array("response" => array("task"=>$d, "count"=>count($d_count)))));
		} else {
			return (new Response(array("Error" => "Error: no existen tareas.")));
		}
    }
}
