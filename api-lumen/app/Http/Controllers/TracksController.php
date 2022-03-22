<?php

namespace App\Http\Controllers;

use App\Models\CostHour;
use Laravel\Lumen\Routing\Controller as BaseController;
use App\Models\Tracks;
use Exception;
use Illuminate\Http\Request;
use App\Http\Controllers\CostHourController;
use App\Http\Controllers\AuthController;
use Illuminate\Http\Response;
use App\Models\TrelloTasks;
use App\Models\Tasks;
use Illuminate\Support\Facades\DB;
use TrelloTask;
use App\Models\User;
use App\Models\Weeklyhours;

class TracksController extends BaseController
{
    //Function all nao retorna uma em especifico somente a do usuario selecionado pelo id
    public function all(Request $request, $id = null)
    {
        $this->validate($request, [
            "startTime" => "required",
            "endTime" => "required"
        ]);

        $startTime = $request->input("startTime");
        $endTime = $request->input("endTime");

        $user_id = $id;
        $client_id = $request->input("idClient") ? $request->input("idClient") : null;
        $project_id = $request->input("idProject") ? $request->input("idProject") : null;


        try {
            $tracks = Tracks::select(
                "Tracks.*",
                DB::raw("Projects.name AS projectName"),
                DB::raw("Weeklyhours.costHour"),
                DB::raw("Tasks.name AS taskName"),
                DB::raw("Users.name AS userName"),
                DB::raw("Clients.name AS clientName"),
                DB::raw("TIMEDIFF(Tracks.endTime, Tracks.startTime) AS duration")
            )
                ->join("Tasks", DB::raw("Tracks.idTask"), "=", DB::raw("Tasks.id"))
                ->join("Users", DB::raw("Tracks.idUser"), "=", DB::raw("Users.id"))
                ->join("Projects", DB::raw("Projects.id"), "=", DB::raw("Tasks.idProject"))
                ->join("Clients", DB::raw("Clients.id"), "=", DB::raw("Projects.idClient"))
                ->join("Weeklyhours", "Weeklyhours.idUser", "=", "Tracks.idUser")
                ->whereRaw("(Tracks.startTime >= ?)", [$startTime])
                ->whereRaw("(Tracks.endTime <= ?)", [$endTime])
                ->whereRaw("(Tracks.typeTrack = ?)", ['manual'])
                ->whereRaw("(Tasks.active >= ?)", [1]);

            if (!empty($user_id)) {
                $tracks = $tracks->whereRaw("(Tracks.idUser) = ?", [$user_id]);

                if (!empty($client_id)) {
                    $tracks = $tracks->whereRaw("(Projects.idClient) = ?", [$client_id]);

                    if (!empty($project_id)) {
                        $tracks = $tracks->whereRaw("(Projects.id) = ?", [$project_id])->get();

                        $tracks = $this->calcCosto($tracks);

                        return array("response" => $tracks);
                    }

                    $tracks = $tracks->get();

                    $tracks = $this->calcCosto($tracks);

                    return array("response" => $tracks);
                }

                if (!empty($$project_id)) {
                    $tracks = $tracks->whereRaw("(Projects.id) = ?", [$project_id])->get();

                    $tracks = $this->calcCosto($tracks);

                    return array("response" => $tracks);
                }

                $tracks = $tracks->get();

                $tracks = $this->calcCosto($tracks);

                return array("response" => $tracks);
            }

            if (!empty($client_id)) {
                $tracks = $tracks->whereRaw("(Projects.idClient) = ?", [$client_id]);

                if (!empty($project_id)) {
                    $tracks = $tracks->whereRaw("(Projects.id) = ?", [$project_id])->get();
                    $tracks = $this->calcCosto($tracks);

                    return array("response" => $tracks);
                }

                $tracks = $tracks->get();
                $tracks = $this->calcCosto($tracks);

                return array("response" => $tracks);
            }

            if (!empty($project_id)) {
                $tracks = $tracks->whereRaw("(Projects.id) = ?", [$project_id])->get();
            }

            $tracks = $tracks->get();
            $tracks = $this->calcCosto($tracks);

            return array("response" => $tracks);
        } catch (Exception $e) {
            return (new Response(array("Error" => BAD_REQUEST, "Operation" => "tracks all"), 500));
        }
    }

    public function current(Request $request)
    {

        $this->validate($request, [
            "startTime" => "string",
            "endTime" => "string",
        ]);

        $user_id = AuthController::current()->id;

        $tracks = $this->all($request, $user_id);

        return $tracks;

        try {
        } catch (Exception $e) {
            return (new Response(array("Error" => BAD_REQUEST, "Operation" => "tracks all"), 500));
        }
    }

    public function duracionDiff($start, $end)
    {
        $date1 = new \DateTime($start); //2022-02-04 15:21:19
        $date2 = new \DateTime($end);

        return $date2->diff($date1, true)->format("%H:%I:%S");;
    }

    public function new(Request $request)
    {
        $this->validate($request, [
            "currency" => "",
            "idProyecto" => "required|numeric|exists:projects,id",
            "idTask" => "required|numeric",
            "idUser" => "required|numeric|exists:users,id",
            "name" => "required",
            "startTime" => "required|date",
            "typeTrack" => "required",
        ]);

        $idTask = $request->input("idTask");
        $currency = $request->input("currency");
        $idProyecto = $request->input("idProyecto");
        $idUser = $request->input("idUser");
        $name = $request->input("name");
        $startTime = $request->input("startTime");
        $typeTrack = $request->input("typeTrack");

        try {
            if ($typeTrack == "manual") {
                $task_manual = Tasks::where('id', $idTask)->first();

                if (!$task_manual) {
                    $task_trello = TrelloTasks::where('id', $idTask)->first();

                    if (!$task_trello) {
                        return (new Response(array("Error" => TASK_INVALID, "Operation" => "tracks new"), 500));
                    }
                }
            }

            $track = $this->arrayTracks($currency, $idProyecto, $idTask, $idUser, $name, $startTime, $typeTrack);

            return Tracks::create($track);
        } catch (Exception $e) {
            return (new Response(array("Error" => BAD_REQUEST, "Operation" => "tracks new"), 500));
        }
    }

    public function update(Request $request)
    {
        $this->validate($request, [
            "duracion" => "required|regex:/(\d+\:\d+)/",
            "endTime" => "required|date",
            "id" => "required|numeric",
        ]);

        try {
            $duracion = 0;
            $endTime = $request->input("endTime");
            $id = $request->input("id");

            return Tracks::where("id", $id)->update(["duracion" => $duracion, "endTime" => $endTime]);
        } catch (Exception $e) {
            return (new Response(array("Error" => BAD_REQUEST, "Operation" => "track update"), 500));
        }
    }

    public function arrayTracks($currency, $idProyecto, $idTask, $idUser, $name, $startTime, $typeTrack)
    {
        return array(
            "currency" => $currency,
            "idProyecto" => $idProyecto,
            "idTask" => $idTask,
            "idUser" => $idUser,
            "name" => $name,
            "startTime" => $startTime,
            "typeTrack" => $typeTrack
        );
    }

    public function currentUserLastTrack()
    {
        $user_id = AuthController::current()->id;

        $tracks = Tracks::where('idUser', $user_id)->orderBy("startTime", 'desc')->get();

        if (count($tracks) > 0) {
            return array("response" => $tracks[0]);
        }

        return $tracks;
        try {
        } catch (Exception $e) {
            return (new Response(array("Error" => BAD_REQUEST, "Operation" => "tracks current last"), 500));
        }
    }

    public function calendar($id, $fecha)
    {
        try {
            $user = User::where('id', $id)->first();

            if (!$user) {
                return (new Response(array("Error" => ID_INVALID, "Operation" => "tracks current calendar"), 400));
            }

            return array('response' => DB::select("SELECT id AS id_track, name AS title, startTime AS start, endTime AS end FROM tracks WHERE idUser = " . $id . " AND Month(startTime) = Month('" . $fecha . "') AND Year(startTime) = Year('" . $fecha . "')"));
        } catch (Exception $e) {
            return (new Response(array("Error" => BAD_REQUEST, "Operation" => "tracks current calendar"), 500));
        }
    }

    public function currentCalendar($fecha)
    {
        $user_id = AuthController::current()->id;

        return $this->calendar($user_id, $fecha);
    }

    public function currentMonth(Request $request)
    {

        $this->validate($request, [
            "idMonth" => "required|numeric",
            "year" => "required|numeric"
        ]);

        $user_id = AuthController::current()->id;
        $idMonth = $request->input("idMonth");
        $year = $request->input("year");

        try {
            $tracks = DB::select("SELECT SUM(trackCost) AS salary FROM tracks WHERE month(endTime) = $idMonth AND year(endTime) = $year AND tracks.idUser = $user_id AND tracks.trackCost IS NOT NULL");
            $tracks[0]->salary = $tracks[0]->salary == null ? 0 : $tracks[0]->salary;

            return array('response' => $tracks);
        } catch (Exception $e) {
            return (new Response(array("Error" => BAD_REQUEST, "Operation" => "tracks current calendar"), 500));
        }
    }

    public function trelloTracks(Request $request, $id = null)
    {
        try {
            $user_id = $id;
            $client_id = $request->input("idClient") ? $request->input("idClient") : null;
            $project_id = $request->input("idProject") ? $request->input("idProject") : null;

            $startTime = $request->input("startTime");
            $endTime = $request->input("endTime");

            $tracks = Tracks::select(
                DB::raw("Tracks.*"),
                DB::raw("Weeklyhours.costHour"),
                DB::raw("users.name AS usersName"),
                DB::raw("trelloTask.name AS taskName"),
                DB::raw("trelloTask.project AS projectName"),
                DB::raw("clients.name AS client"),
                DB::raw("TIMEDIFF( tracks.endTime, tracks.startTime ) AS durations")
            )
                ->join("users", DB::raw("tracks.idUser"), "=", DB::raw("Users.id"))
                ->join("TrelloTask", DB::raw("tracks.idTask"), "=", DB::raw("TrelloTask.id"))
                ->join("Projects", DB::raw("Projects.id"), "=", DB::raw("TrelloTask.idProyecto"))
                ->join("Clients", DB::raw("Clients.id"), "=", DB::raw("Projects.idClient"))
                ->join("Weeklyhours", "Weeklyhours.idUser", "=", "Tracks.idUser")
                ->where("startTime", ">=", $startTime)
                ->where("endTime", "<=", $endTime)
                ->where("typeTrack", "trello")
                ->whereRaw("TrelloTask.active = 1");

            if (!empty($user_id)) {
                $tracks = $tracks->where("Tracks.idUser", $user_id);

                if (!empty($client_id)) {
                    $tracks = $tracks->whereRaw("(Projects.idClient) = ?", [$client_id]);

                    if (!empty($project_id)) {
                        $tracks = $tracks->whereRaw("(Projects.id) = ?", [$project_id])->get();

                        $tracks = $this->calcCosto($tracks);

                        return array("response" => $tracks);
                    }

                    $tracks = $tracks->get();
                    $tracks = $this->calcCosto($tracks);

                    return array("response" => $tracks);
                }

                if (!empty($project_id)) {
                    $tracks = $tracks->whereRaw("(Projects.id) = ?", [$project_id])->get();

                    $tracks = $this->calcCosto($tracks);

                    return array("response" => $tracks);
                }

                $tracks = $tracks->get();
                $tracks = $this->calcCosto($tracks);

                return array("response" => $tracks);
            }

            if (!empty($client_id)) {
                $tracks = $tracks->whereRaw("(Projects.idClient) = ?", [$client_id]);

                if (!empty($project_id)) {
                    $tracks = $tracks->whereRaw("(Projects.id) = ?", [$project_id])->get();

                    $tracks = $this->calcCosto($tracks);

                    return array("response" => $tracks);
                }

                $tracks = $tracks->get();

                $tracks = $this->calcCosto($tracks);

                return array("response" => $tracks);
            }

            if (!empty($project_id)) {
                $tracks = $tracks->whereRaw("(Projects.id) = ?", [$project_id])->get();

                $tracks = $this->calcCosto($tracks);

                return array("response" => $tracks);
            }

            $tracks = $tracks->get();

            return array("response" => $tracks);
        } catch (Exception $e) {
            return (new Response(array("Error" => BAD_REQUEST, "Operation" => "tracks trello"), 500));
        }
    }

    public function trelloTracksCurrent(Request $request)
    {
        $user_id = AuthController::current()->id;

        return $this->trelloTracks($request, $user_id);
    }

    public function convertTimeToDecimal($value)
    {
        $time = explode(":", $value);
        $horas = floatval($time[0]);
        $minutes = floatval($time[1]) / 60;
        $seconds = floatval($time[2]) / 3600;
        $fraccionaria = $minutes + $seconds;
        $decimal = floatval($horas + $fraccionaria);
        return $decimal;
    }

    public function calcCosto($tracks)
    {
        foreach ($tracks as $track) {
            $cost = $track['costHour'];
            $costDecimal = $this->ConvertTimeToDecimal($track['durations'] ? $track['durations'] : $track['duration']);
            $track['trackCost'] = round(round(($costDecimal * ($cost)), 2) ? round(($costDecimal * ($cost)), 2) : 0);
        }

        return $tracks;
    }
}
