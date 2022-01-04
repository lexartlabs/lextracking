<?php
/**
*
*/
require("vendor/autoload.php");

class Track {

	private $model = "Tracks";

  public function getStructure($conn,$column){
		$sql	="SHOW COLUMNS FROM ".$this->model;
		$d 		= $conn->query($sql);
		$r 		= false;

		for ($i=0; $i < count($d) ; $i++) {
			if($d[$i]["Field"] == $column){
				$r = true;
			}
		}
		return $r;
	}

	public function getTrackByMonth($conn, $params){
		
		$sql = "SELECT SUM(trackCost) AS salary FROM ".$this->model." WHERE month(endTime) = ".$params['idMonth']." AND year(endTime) = ".$params['year']." AND ".$this->model.".idUser = ".$params['idUser']." AND ".$this->model.".trackCost IS NOT NULL";
		$d   = $conn->query($sql);
	
		if(!empty($d)){
			return array("response" => $d);
		} else {
			return array("error" => "Error: no existen tracks.");
		}
	}

	public function ConvertTimeToDecimal($value){
		$time = explode(":",$value);
		$horas = floatval($time[0]);
		$minutes = floatval($time[1])/60;
		$seconds = floatval($time[2])/3600;
		$fraccionaria = $minutes + $seconds;
		$decimal = floatval($horas+$fraccionaria);
		return $decimal;
	}
	
	public function validatePayload($payload) {
		if (!$payload['idUser']) { return "user id is required";}
		if (!$payload['plataform']) { return "plataform is required";}
		if (!$payload['currency']) { return "currency is required";}
		if (!$payload['duration']) { return "duration is required";}
		if (!$payload['idProject']) { return "project id is required"; }
		return "true";
	}

	// GET USER BY ID
	public function getAllTracks($conn){
		$sql	="SELECT ".$this->model.".*, Projects.name AS projectName, Tasks.name AS taskName, Users.name AS userName, TIMEDIFF( ".$this->model.".endTime, ".$this->model.".startTime ) AS duration FROM ".$this->model."
				INNER JOIN Tasks ON ".$this->model.".idTask = Tasks.id
				INNER JOIN Users ON ".$this->model.".idUser = Users.id
				INNER JOIN Projects ON Projects.id = Tasks.idProject
				WHERE Tasks.active = 1";
		$d 		= $conn->query($sql);
		// CALLBACK
		if(!empty($d)){
			return array("response" => "OK");
		} else {
			return array("error" => "Error: no existen tracks.");
		}
	}
	//GET Active Tracks
	public function getAllTracksActiveTracks($conn){
		$d 		= [];
		$d0 	= [];
		$sql	="SELECT ".$this->model.".*, Projects.name AS projectName, Tasks.name AS taskName, Users.name AS userName, TIMEDIFF( ".$this->model.".endTime, ".$this->model.".startTime ) AS duration FROM ".$this->model."
				INNER JOIN Tasks ON ".$this->model.".idTask = Tasks.id
				INNER JOIN Users ON ".$this->model.".idUser = Users.id
				INNER JOIN Projects ON Projects.id = Tasks.idProject
				WHERE Tracks.endTime is null OR Tracks.endTime='0000-00-00 00:00:00' AND Tasks.active = 1 AND Tracks.typeTrack = 'manual'";
		$sql0	="SELECT ".$this->model.".*, Projects.name AS projectName, 	TrelloTask.id_project AS TrelloProyect, TrelloTask.name AS taskName, Users.name AS userName, TIMEDIFF( ".$this->model.".endTime, ".$this->model.".startTime ) AS duration FROM ".$this->model."
				INNER JOIN TrelloTask ON ".$this->model.".idTask = TrelloTask.id
				INNER JOIN Users ON ".$this->model.".idUser = Users.id
				INNER JOIN Projects ON Projects.id = TrelloTask.id_project
				WHERE Tracks.endTime is null OR Tracks.endTime='0000-00-00 00:00:00' AND TrelloTask.active = 1 AND Tracks.typeTrack = 'trello'";
		$d 		= $conn->query($sql);
		$d0 	= $conn->query($sql0);
		$dd 	= array_merge($d, $d0);
		// CALLBACK
		if(!empty($d) || !empty($d0)){
			return array("response" => $dd);
		} else {
			return array("error" => "Error: no existen tracks activas.");
		}
	}
	// GET TRACKS USING FILTERS
	public function getTracks($conn, $idClient, $idProject, $idTask, $idUser, $startTime, $endTime){

		$sql ="SELECT ".$this->model.".*,
				Projects.name AS projectName,
				Tasks.name AS taskName,
				Users.name AS userName,
				Clients.name AS clientName,
				TIMEDIFF( ".$this->model.".endTime, ".$this->model.".startTime ) AS duration
				FROM ".$this->model."
				INNER JOIN Tasks ON ".$this->model.".idTask = Tasks.id
				INNER JOIN Users ON ".$this->model.".idUser = Users.id
				INNER JOIN Projects ON Projects.id = Tasks.idProject
				INNER JOIN Clients ON Clients.id = Projects.idClient
				WHERE (startTime >= '$startTime') AND (endTime <= '$endTime') AND typeTrack='manual' AND Tasks.active = 1 ";

			if ($idClient != '') {
				$sql .= " AND (Projects.idClient='$idClient')";
			}

			if ($idProject != '') {
				$sql .= " AND (Projects.id='$idProject')";
			}

			if ($idTask != '') {
				$sql .= " AND (idTask='$idTask')";
			}

			if ($idUser != '') {
				$sql .= " AND (idUser='$idUser')";
			}


		$sql .= 'ORDER BY projectName ASC, startTime DESC';

		$d = $conn->query($sql);

		for ($i=0; $i < count($d); $i++) {
			$sql_cost	= "SELECT costHour FROM WeeklyHours WHERE idUser='".$d[$i]['idUser']."'";
			$d_cost 		= $conn->query($sql_cost);
			if(!empty($d_cost)){
				$cost = $d_cost[0]['costHour'];
				$costDecimal = $this->ConvertTimeToDecimal($d[$i]['duration']);
				$d[$i]['trackCost'] = round(($costDecimal * ($cost)), 2) ? round(($costDecimal * ($cost)), 2) : 0 ;
			}
		}

		// CALLBACK
		if(!empty($d)){
			return array("response" => $d);
		} else {
			return array("error" => "Error: no se encontraron tracks con estos filtros.");
		}
	}

	public function getAutoTracks($conn, $idClient, $idProject, $idTask, $idUser, $startTime, $endTime){

		$sql ="SELECT ".$this->model.".*,
				Users.name AS usersName,
				TaskAutomatic.error AS error,
				TaskAutomatic.project AS projectError,
				TaskAutomatic.client AS client,
				TIMEDIFF( ".$this->model.".endTime, ".$this->model.".startTime ) AS durations
				FROM ".$this->model."
				INNER JOIN Users ON ".$this->model.".idUser = Users.id
				INNER JOIN TaskAutomatic ON ".$this->model.".idTask = TaskAutomatic.id
				WHERE (startTime >= '$startTime') AND (endTime <= '$endTime') AND typeTrack='automatic' AND TaskAutomatic.active = 1 ";

			if ($idClient != '') {
				$sql .= " AND (TaskAutomatic.idClient ='$idClient')";
			}

			if ($idProject != '') {
				$sql .= " AND (TaskAutomatic.idProyecto ='$idProject')";
			}

			if ($idTask != '') {
				$sql .= " AND (idTask='$idTask')";
			}

			if ($idUser != '') {
				$sql .= " AND (idUser='$idUser')";
			}

		$sql .= 'ORDER BY projectError ASC, startTime DESC';

		$d = $conn->query($sql);

		for ($i=0; $i < count($d); $i++) {
			$sql_cost	= "SELECT costHour FROM WeeklyHours WHERE idUser='".$d[$i]['idUser']."'";
			$d_cost 		= $conn->query($sql_cost);
			if(!empty($d_cost)){
				$cost = $d_cost[0]['costHour'];
				$costDecimal = $this->ConvertTimeToDecimal($d[$i]['durations']);
				$d[$i]['trackCost'] = round($costDecimal * intval($cost)) ? round($costDecimal * intval($cost)) : 0 ;
			}
		}

		// CALLBACK
		if(!empty($d)){
			return array("response" => $d);
		} else {
			return array("error" => "Error: no se encontraron tracks con estos filtros.");
		}
	}

	public function getTrelloTracks($conn, $idClient, $idProject, $idTask, $idUser, $startTime, $endTime){
		$sql ="SELECT ".$this->model.".*,
				Users.name AS usersName,
				TrelloTask.name AS taskName,
				TrelloTask.project AS projectName,
				Clients.name AS client,
				TIMEDIFF( ".$this->model.".endTime, ".$this->model.".startTime ) AS durations
				FROM ".$this->model."
				INNER JOIN Users ON ".$this->model.".idUser = Users.id
				INNER JOIN TrelloTask ON ".$this->model.".idTask = TrelloTask.id
				INNER JOIN Projects ON Projects.id = TrelloTask.idProyecto
				INNER JOIN Clients ON Clients.id = Projects.idClient
				WHERE (startTime >= '$startTime') AND (endTime <= '$endTime') AND typeTrack='trello' AND TrelloTask.active = 1 ";

			if ($idClient != '') {
				$sql .= " AND (Projects.idClient='$idClient')";
			}

			if ($idProject != '') {
				$sql .= " AND (Projects.id='$idProject')";
			}

			if ($idTask != '') {
				$sql .= " AND (idTask='$idTask')";
			}

			if ($idUser != '') {
				$sql .= " AND (idUser='$idUser')";
			}

		$sql .= 'ORDER BY taskName ASC, startTime DESC';
		$d = $conn->query($sql);

		for ($i=0; $i < count($d); $i++) {
			$sql_cost	= "SELECT costHour FROM WeeklyHours WHERE idUser='".$d[$i]['idUser']."'";
			$d_cost 		= $conn->query($sql_cost);
			if(!empty($d_cost)){
				$cost = $d_cost[0]['costHour'];
				$costDecimal = $this->ConvertTimeToDecimal($d[$i]['durations']);
				$d[$i]['trackCost'] = round($costDecimal * intval($cost)) ? round($costDecimal * intval($cost)) : 0 ;
			}
		}

		// CALLBACK
		if(!empty($d)){
			return array("response" => $d);
		} else {
			return array("error" => "Error: no se encontraron tracks con estos filtros.");
		}
	}

	public function getJiraTracks($conn, $idClient, $idProject, $idTask, $idUser, $startTime, $endTime){

		$sql ="SELECT ".$this->model.".*,
				Users.name AS usersName,
				jiratasks.name AS taskName,
				jiratasks.project AS projectName,
				Clients.name AS client,
				TIMEDIFF( ".$this->model.".endTime, ".$this->model.".startTime ) AS durations
				FROM ".$this->model."
				INNER JOIN Users ON ".$this->model.".idUser = Users.id
				INNER JOIN jiratasks ON ".$this->model.".idTask = jiratasks.idTask
				INNER JOIN Projects ON Projects.id = jiratasks.idProyecto
				INNER JOIN Clients ON Clients.id = Projects.idClient
				WHERE (startTime >= '$startTime') AND (endTime <= '$endTime') AND typeTrack='jira' AND jiratasks.active = 1 ";

			if ($idClient != '') {
				$sql .= " AND (Projects.idClient='$idClient')";
			}

			if ($idProject != '') {
				$sql .= " AND (Projects.id='$idProject')";
			}

			if ($idTask != '') {
				$sql .= " AND (idTask='$idTask')";
			}

			if ($idUser != '') {
				$sql .= " AND (idUser='$idUser')";
			}

		$sql .= 'ORDER BY taskName ASC, startTime DESC';
		
		$d = $conn->query($sql);

		for ($i=0; $i < count($d); $i++) {
			$sql_cost	= "SELECT costHour FROM WeeklyHours WHERE idUser='".$d[$i]['idUser']."'";
			$d_cost 		= $conn->query($sql_cost);
			if(!empty($d_cost)){
				$cost = $d_cost[0]['costHour'];
				$costDecimal = $this->ConvertTimeToDecimal($d[$i]['durations']);
				$d[$i]['trackCost'] = round($costDecimal * intval($cost)) ? round($costDecimal * intval($cost)) : 0 ;
			}
		}

		// CALLBACK
		if(!empty($d)){
			return array("response" => $d);
		} else {
			return array("error" => "Error: no se encontraron tracks con estos filtros.");
		}
	}

	public function getTrackById($conn,$id){
		$sql	="SELECT ".$this->model.".*, Projects.name AS projectName, Tasks.name AS taskName, Users.name AS userName, TIMEDIFF( ".$this->model.".endTime, ".$this->model.".startTime ) AS duration FROM ".$this->model."
				INNER JOIN Tasks ON ".$this->model.".idTask = Tasks.id
				INNER JOIN Users ON ".$this->model.".idUser = Users.id
				INNER JOIN Projects ON Projects.id = Tasks.idProject
				WHERE ".$this->model.".id='$id' AND Tasks.active = 1";
		$d 		= $conn->query($sql);
		// CALLBACK
		if(!empty($d)){
			return array("response" => $d[0]);
		} else {
			return array("error" => "Error: no se encuentra el track.");
		}
	}
	public function getAutoTrackById($conn,$id){
		$sql	="SELECT ".$this->model.".*, TaskAutomatic.project AS projectName, TaskAutomatic.error AS taskName, Users.name AS userName, TIMEDIFF( ".$this->model.".endTime, ".$this->model.".startTime ) AS duration FROM ".$this->model."
				INNER JOIN TaskAutomatic ON ".$this->model.".idTask = TaskAutomatic.id
				INNER JOIN Users ON ".$this->model.".idUser = Users.id
				WHERE ".$this->model.".id='$id' AND TaskAutomatic.active = 1";
		$d 		= $conn->query($sql);
		// CALLBACK
		if(!empty($d)){
			return array("response" => $d[0]);
		} else {
			return array("error" => "Error: no se encuentra el track.");
		}
	}

	public function getTrelloTrackById($conn,$id){
		$sql	="SELECT ".$this->model.".*, TrelloTask.project AS projectName, TrelloTask.name AS taskName, Users.name AS userName, TIMEDIFF( ".$this->model.".endTime, ".$this->model.".startTime ) AS duration FROM ".$this->model."
				INNER JOIN TrelloTask ON ".$this->model.".idTask = TrelloTask.id
				INNER JOIN Users ON ".$this->model.".idUser = Users.id
				WHERE ".$this->model.".id='$id' AND TrelloTask.active = 1";
		$d 		= $conn->query($sql);
		// CALLBACK
		if(!empty($d)){
			return array("response" => $d);
		} else {
			return array("error" => "Error: no se encuentra el track.");
		}
	}

	public function getJiraTrackById($conn,$id){
		$sql	="SELECT ".$this->model.".*, jiratasks.name AS taskName, Users.name AS userName, TIMEDIFF( ".$this->model.".endTime, ".$this->model.".startTime ) AS duration FROM ".$this->model."
				INNER JOIN jiratasks ON ".$this->model.".idTask = jiratasks.idTask
				INNER JOIN Users ON ".$this->model.".idUser = Users.id
				WHERE ".$this->model.".id='$id' AND jiratasks.active = 1";
		$d 		= $conn->query($sql);
		// CALLBACK
		if(!empty($d)){
			return array("response" => $d);
		} else {
			return array("error" => "Error: no se encuentra el track.");
		}
	}

	public function getTrackByTask($conn,$id){
		$sql	="SELECT ".$this->model.".*, Projects.name AS projectName, Tasks.name AS taskName, Users.name AS userName, TIMEDIFF( ".$this->model.".endTime, ".$this->model.".startTime ) AS duration FROM ".$this->model."
				INNER JOIN Tasks ON ".$this->model.".idTask = Tasks.id
				INNER JOIN Users ON ".$this->model.".idUser = Users.id
				INNER JOIN Projects ON Projects.id = Tasks.idProject
				WHERE idTask='$id' AND Tasks.active = 1";
		$d 		= $conn->query($sql);

		// CALLBACK
		if(!empty($d)){
			return array("response" => $d);
		} else {
			return array("error" => "Error: no se encuentran los tracks de este task.");
		}
	}

	public function getTrackByUser($conn,$id){
		$sql	="SELECT ".$this->model.".*, Projects.name AS projectName, Tasks.name AS taskName, Users.name AS userName, TIMEDIFF( ".$this->model.".endTime, ".$this->model.".startTime ) AS duration FROM ".$this->model."
				INNER JOIN Tasks ON ".$this->model.".idTask = Tasks.id
				INNER JOIN Users ON ".$this->model.".idUser = Users.id
				INNER JOIN Projects ON Projects.id = Tasks.idProject
				WHERE idUser='$id' AND Tasks.active = 1 ORDER BY Tracks.startTime DESC LIMIT 20";
		$d 		= $conn->query($sql);

		// CALLBACK
		if(!empty($d)){
			return array("response" => $d);
		} else {
			return array("error" => "Error: no se encuentran los tracks de este usuario.");
		}
	}

	public function getLastTrackByUser($conn,$id){
		$sqlType = "SELECT ".$this->model.".typeTrack FROM ".$this->model." WHERE idUser='$id' ORDER BY id DESC LIMIT 1";
		$dType   = $conn->query($sqlType);
		$dType   = $dType[0]['typeTrack'];

		if ($dType == 'manual') {
			$sql = "SELECT ".$this->model.".*, Projects.name AS projectName, Tasks.name AS taskName, Users.name AS userName, TIMEDIFF( ".$this->model.".endTime, ".$this->model.".startTime ) AS duration FROM ".$this->model."
				INNER JOIN Tasks ON ".$this->model.".idTask = Tasks.id
				INNER JOIN Users ON ".$this->model.".idUser = Users.id
				INNER JOIN Projects ON Projects.id = Tasks.idProject
				WHERE idUser='$id' AND Tasks.active = 1 ORDER BY id DESC LIMIT 1";		
		} elseif ($dType == 'automatic') {
			$sql = "SELECT ".$this->model.".*, Projects.name AS projectName, TaskAutomatic.error AS taskName, Users.name AS userName, 	TIMEDIFF( ".$this->model.".endTime, ".$this->model.".startTime ) AS duration FROM ".$this->model."
				INNER JOIN TaskAutomatic ON ".$this->model.".idTask = TaskAutomatic.id
				INNER JOIN Users ON ".$this->model.".idUser = Users.id
				INNER JOIN Projects ON Projects.id = TaskAutomatic.idProyecto
				WHERE idUser='$id' AND TaskAutomatic.active = 1 ORDER BY id DESC LIMIT 1";	
		} elseif ($dType == 'trello'){
			$sql = "SELECT ".$this->model.".*, Projects.name AS projectName, TrelloTask.name AS taskName, Users.name AS userName, 	TIMEDIFF( ".$this->model.".endTime, ".$this->model.".startTime ) AS duration FROM ".$this->model."
				INNER JOIN TrelloTask ON ".$this->model.".idTask = TrelloTask.id
				INNER JOIN Users ON ".$this->model.".idUser = Users.id
				INNER JOIN Projects ON Projects.id = TrelloTask.idProyecto
				WHERE idUser='$id' AND TrelloTask.active = 1 ORDER BY id DESC LIMIT 1";				
		}
		$d 		= $conn->query($sql);

		// CALLBACK
		if(!empty($d)){
			return array("response" => $d[0]);
		} else {
			return array("error" => "Error: no se encuentran los tracks de este usuario.");
		}
	}

	public function getTrackByTaskAndUser($conn,$idTask,$idUser){
		$sql	="SELECT ".$this->model.".*, Projects.name AS projectName, Tasks.name AS taskName, Users.name AS userName, TIMEDIFF( ".$this->model.".endTime, ".$this->model.".startTime ) AS duration FROM ".$this->model."
				INNER JOIN Tasks ON ".$this->model.".idTask = Tasks.id
				INNER JOIN Users ON ".$this->model.".idUser = Users.id
				INNER JOIN Projects ON Projects.id = Tasks.idProject
				WHERE idUser='$idUser' AND idTask = '$idTask' AND Tasks.active = 1";
		$d 		= $conn->query($sql);

		// CALLBACK
		if(!empty($d)){
			return array("response" => $d);
		} else {
			return array("error" => "Error: no se encuentran los tracks de este usuario.");
		}
	}

	public function insertTrack($conn,$user){
		$md   	 = $this->model;
		$head 	 ="INSERT INTO ".$this->model;
		$insert .="(";
		$body 	.=" VALUES (";
		$last 	 = count($user);

		$ind 	 = 1;
		foreach ($user as $key => $vle) {
			if($this->getStructure($conn,$key)){
				if($ind==$last){
					$insert .=$key;
					$body 	.="'".$vle."'";
				} else {
					$insert .=$key.", ";
					$body 	.="'".$vle."', ";
				}
			}
			$ind++;
		}

		$insert .=")";
		$body 	.=")";
		$sql 	 = $head.$insert.$body;
		$d 		 = $conn->query($sql);
		// GET LAST INSERT
		$lastId = mysql_insert_id();
		// GET LAST OBJECT
		$newestTrack = $this->getTrackById($conn, $lastId);
		$newestTrack = $newestTrack["response"];
		// CALLBACK
		if(empty($d)){
			return array("response" => $newestTrack);
		} else {
			return array("error" => "Error: al ingresar el track.", "sql" => $sql);
		}
	}

	public function insertAutoTrack($conn,$user){
		$userPreg   = preg_replace('~[\\\\/;()*?"|]~', ' ', $user);

		$md   	 = $this->model;
		$head 	 ="INSERT INTO ".$this->model;
		$insert .="(";
		$body 	.=" VALUES (";
		$last 	 = count($userPreg);

		$ind 	 = 1;
		foreach ($userPreg as $key => $vle) {
			if($this->getStructure($conn,$key)){
				if($ind==$last){
					$insert .=$key;
					$body 	.="'".$vle."'";
				} else {
					$insert .=$key.", ";
					$body 	.="'".$vle."', ";
				}
			}
			$ind++;
		}

		$insert .=")";
		$body 	.=")";
		$sql 	 = $head.$insert.$body;
		$d 		 = $conn->query($sql);
		// GET LAST INSERT
		$lastId = mysql_insert_id();
		// GET LAST OBJECT
		$newestTrack = $this->getAutoTrackById($conn, $lastId);
		$newestTrack = $newestTrack["response"];
		// CALLBACK
		if(empty($d)){
			return array("response" => $newestTrack);
		} else {
			return array("error" => "Error: al ingresar el Autotrack.", "sql" => $sql);
		}
	}

	public function insertJiraTrack($conn,$user){
		$userPreg   = preg_replace('~[\\\\/;()*?"|]~', ' ', $user);

		$md   	 = $this->model;
		$head 	 ="INSERT INTO ".$this->model;
		$insert .="(";
		$body 	.=" VALUES (";
		$last 	 = count($userPreg);

		$ind 	 = 1;
		foreach ($userPreg as $key => $vle) {
			if($this->getStructure($conn,$key)){
				if($ind==$last){
					$insert .=$key;
					$body 	.="'".$vle."'";
				} else {
					$insert .=$key.", ";
					$body 	.="'".$vle."', ";
				}
			}
			$ind++;
		}

		$insert .=")";
		$body 	.=")";
		$sql 	 = $head.$insert.$body;
		$d 		 = $conn->query($sql);
		// GET LAST INSERT
		$lastId = mysql_insert_id();
		// GET LAST OBJECT
		$newestTrack = $this->getJiraTrackById($conn, $lastId);
		$newestTrack = $newestTrack["response"];
		// CALLBACK
		if(empty($d)){
			return array("response" => $newestTrack);
		} else {
			return array("error" => "Error: al ingresar el Autotrack.", "sql" => $sql);
		}
	}

	public function insertTrelloTrack($conn,$user){
		$md   	 = $this->model;
		$fsql    = "SET FOREIGN_KEY_CHECKS=0";
		$q       = $conn->query($fsql);
		$head 	 ="INSERT INTO ".$this->model;
		$insert .="(";
		$body 	.=" VALUES (";
		$last 	 = count($user);

		$ind 	 = 1;
		foreach ($user as $key => $vle) {
			if($this->getStructure($conn,$key)){
				if($ind==$last){
					$insert .=$key;
					$body 	.="'".$vle."'";
				} else {
					$insert .=$key.", ";
					$body 	.="'".$vle."', ";
				}
			}
			$ind++;
		}

		$insert .=")";
		$body 	.=")";
		$sql 	 = $head.$insert.$body;
		$d 		 = $conn->query($sql);
		// GET LAST INSERT
		$lastId = mysql_insert_id();
		// GET LAST OBJECT
		$newestTrack = $this->getTrelloTrackById($conn, $lastId);
		$newestTrack = $newestTrack["response"];
		// CALLBACK
		if(empty($d)){
			return array("response" => $newestTrack);
		} else {
			return array("error" => "Error: al ingresar el track.", "sql" => $sql);
		}
	}

	public function updateTrack($conn, $user){
		$sql = "UPDATE ".$this->model." SET idTask = '$user[idTask]', idUser = '$user[idUser]', name = '$user[name]', startTime = '$user[startTime]', endTime = '$user[endTime]', trackCost = '$user[trackCost]', idProyecto = '$user[idProyecto]', duracion = '$user[duracion]' WHERE id = $user[id]";
		$d 	 = $conn->query($sql);
		// CALLBACK
		if(empty($d)){
			$sqli = "UPDATE Projects SET tracked = '$user[totalTrack]', totalCost = '$user[projCost]' WHERE id = '$user[idProyecto]'";
			$b    = $conn->query($sqli);
			return array("response" => 'OK');
		} else {
			return array("error" => "Error: al actualizar la tarea.", "sql");
		}
	}

	public function updateAutoTrack($conn, $user){
		$sql = "UPDATE ".$this->model." SET idTask = '$user[idTask]', idUser = '$user[idUser]', name = '$user[name]', startTime = '$user[startTime]', endTime = '$user[endTime]', trackCost = '$user[trackCost]' WHERE id='$user[id]'";
		$d 	= $conn->query($sql);
		// CALLBACK
		if(empty($d)){
			$sqli = "UPDATE Projects SET tracked = '$user[totalTrack]', totalCost = '$user[projCost]' WHERE id = '$user[idProyecto]'";
			$b    = $conn->query($sqli);
			return array("response" => 'OK');
		} else {
			return array("error" => "Error: al actualizar la tarea.", "sql" => $sql);
		}
	}

	public function updateTrelloTrack($conn, $params){
		$sql = "UPDATE ".$this->model." SET idTask = '$params[idTask]', idUser = '$params[idUser]', name = '$params[name]', trackCost = '$params[trackCost]', startTime = '$params[startTime]', endTime = '$params[endTime]' WHERE id='$params[id]'";
		$d 	= $conn->query($sql);

		// CALLBACK
		if(empty($d)){
			$sqli = "UPDATE Projects SET tracked = '$user[totalTrack]', totalCost = '$user[projCost]' WHERE id = '$user[idProyecto]'";
			$b    = $conn->query($sqli);
			return array("response" => 'OK');
		} else {
			return array("error" => "Error: al actualizar la tarea.", "sql" => $sql);
		}
	}

	public function getProjectByHour($conn,$idProject){
		$sqli = "SELECT Tasks.*, Projects.name AS projectName FROM Tasks
		INNER JOIN Projects ON Tasks.idProject = Projects.id
		WHERE Tasks.idProject = $idProject";
		$d = $conn->query($sqli);
		$idTask = $d[0]["id"];
		if($idTask){
			$sql = "SELECT * FROM ".$this->model." WHERE idTask = $idTask AND Tasks.active = 1";
			$b   = $conn->query($sql);
			return array("response" => $b);
		}
	}

	// CRUD Externals
  public function create($conn, $report) {
    $isValid = $this->validatePayload($report);

    if ($isValid == "true") {
      $idProject = $report['idProject'];

      $sql = "
        INSERT INTO ".$this->model."
            (`idUser`, `name`, `typeTrack`, `currency`, `idProyecto`, `duracion`, `startTime`)
          VALUES
            (
            ".$report['idUser'].",
            '".$report['plataform']."',
            'external',
            '".$report['currency']."',
            ".$idProject.",
            '".$report['duration']."',
            NOW()
          );
        ";

      $d = $conn->query($sql);

      if(empty($d)){
        return array("response" => 'OK');
      } else {
        return array("error" => "Error: al ingresar el reporte.", "sql" => $sql);
      }
    } else {
      return array("error" => "Error: '$isValid'");
    }
  }

  public function all($conn, $month) {
    // Busco las informaciones del track
    $sql = "
      SELECT
        t.id,
        t.idUser,
        t.currency,
        t.name AS 'plataform',
        t.startTime,
        t.duracion AS 'duration',
        c.name AS 'client',
        p.name AS 'project',
        u.name AS 'user'
      FROM ".$this->model." AS t
      INNER JOIN Users AS u ON t.idUser = u.id
      INNER JOIN Projects AS p ON p.id = t.idProyecto
      INNER JOIN Clients AS c ON c.id = p.idClient
      WHERE `typeTrack` = 'external' AND MONTH(startTime) = ".$month;
    
    $d = $conn->query($sql);

    // Calculo el precio de las horas
    for($i=0; $i < count($d); $i++) {
      $sql_cost	= "SELECT costHour FROM WeeklyHours WHERE idUser='".$d[$i]['idUser']."'";
      $d_cost 		= $conn->query($sql_cost);
      if(!empty($d_cost)){
				$cost = $d_cost[0]['costHour'];
				$costDecimal = $this->ConvertTimeToDecimal($d[$i]['duration']);
				$d[$i]['trackCost'] = round($costDecimal * $cost, 2) ? round($costDecimal * $cost, 2) : 0 ;
			}
    };

		if(!empty($d)){
			return array("response" => $d);
		} else {
			return array("error" => "Error: no existen reportes para esta fecha.");
		}
	}

  public function one($conn, $id) {
    $sql = "
      SELECT
        t.id,
        t.idUser,
        t.currency,
        t.name AS 'plataform',
        t.startTime,
        t.duracion AS 'duration',
        c.name AS 'client',
        p.name AS 'project',
        u.name AS 'user'
      FROM ".$this->model." AS t
      INNER JOIN Users AS u ON t.idUser = u.id
      INNER JOIN Projects AS p ON p.id = t.idProyecto
      INNER JOIN Clients AS c ON c.id = p.idClient
      WHERE `typeTrack` = 'external' AND t.id = ".$id;
    
    $d = $conn->query($sql);

    // Calculo el precio de las horas
    for($i=0; $i < count($d); $i++) {
      $sql_cost	= "SELECT costHour FROM WeeklyHours WHERE idUser='".$d[$i]['idUser']."'";
      $d_cost 		= $conn->query($sql_cost);
      if(!empty($d_cost)){
				$cost = $d_cost[0]['costHour'];
				$costDecimal = $this->ConvertTimeToDecimal($d[$i]['duration']);
				$d[$i]['trackCost'] = round($costDecimal * $cost, 2) ? round($costDecimal * $cost, 2) : 0 ;
			}
    };

		if(!empty($d)){
			return array("response" => $d[0]);
		} else {
			return array("error" => "Error: Id invalido.");
		}
  }

  public function update($conn, $report, $id) {
    $isValid = $this->validatePayload($report);

    if ($isValid == "true") {
      $idProject = $report['idProject'];

      $sql = "
        UPDATE ".$this->model." SET
          `idUser` = ".$report['idUser'].",
          `name` = '".$report['plataform']."',
          `currency` = '".$report['currency']."',
          `idProyecto` = ".$idProject.",
          `duracion` = '".$report['duration']."'
        WHERE id = ".$id.";
        ";

      $d = $conn->query($sql);

      if(empty($d)){
        return array("response" => 'OK');
      } else {
        return array("error" => "Error: al modificar el reporte.", "sql" => $sql);
      }
    } else {
      return array("error" => "Error: '$isValid'");
    }
  }

	// For cube
	public function getUserHoursByYear($conn, $id, $year) {
		$sql = "
			SELECT
				MONTH(startTime) AS 'month',
				'seconds' AS 'metric',
				(CASE WHEN typeTrack = 'external'
						THEN SUM(TIME_TO_SEC(duracion))
						ELSE SUM(TIME_TO_SEC((TIMEDIFF(endTime, startTime))))
				END) AS 'tracks'
			FROM ".$this->model."
			WHERE YEAR(startTime) = ".$year." AND idUser = ".$id."
			GROUP BY MONTH(startTime);
		";

		$d = $conn->query($sql);

		if(!empty($d)){
			return array("response" => $d);
		} else {
			return array("error" => "Error: no se encontraron tracks con estos filtros.");
		}
	}
}

?>
