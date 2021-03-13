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
		$sql	="SELECT ".$this->model.".*, Projects.name AS projectName, Tasks.name AS taskName, Users.name AS userName, TIMEDIFF( ".$this->model.".endTime, ".$this->model.".startTime ) AS duration FROM ".$this->model."
				INNER JOIN Tasks ON ".$this->model.".idTask = Tasks.id
				INNER JOIN Users ON ".$this->model.".idUser = Users.id
				INNER JOIN Projects ON Projects.id = Tasks.idProject
				WHERE Tracks.endTime is null OR Tracks.endTime='0000-00-00 00:00:00' AND Tasks.active = 1";
		$d 		= $conn->query($sql);

		// CALLBACK
		if(!empty($d)){
			return array("response" => $d);
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
				// $d[$i]['trackCost'] = round($costDecimal * intval($cost)) ? round($costDecimal * intval($cost)) : 0 ;
				
				//$d[$i]['trackCost'] = ($costDecimal * ($cost)) ? ($costDecimal * ($cost)) : 0 ;

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
				INNER JOIN TrelloTask ON ".$this->model.".idTask = TrelloTask.card_id
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
				INNER JOIN TrelloTask ON ".$this->model.".idTask = TrelloTask.card_id
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
}

?>
