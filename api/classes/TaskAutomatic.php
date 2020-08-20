<?php

ini_set('display_errors', 'On');
error_reporting(1);
/**
*
*/
class taskAutomatic {

	private $model = "TaskAutomatic";

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

	// GET USER BY ID
	public function getAlltaskAutomatic($conn){

		$sql     = "SELECT * FROM ".$this->model." WHERE active = 1";
		$d       = $conn->query($sql);

		foreach($d as $value => $dd){
			$array[$value]['id']          = $dd['id'];
			$array[$value]['error']       = $dd['error'];
			$array[$value]['project']     = $dd['project'];
			$array[$value]['column']      = $dd['column'];
			$array[$value]['line']        = $dd['line'];
			$array[$value]['file']        = $dd['file'];
			$array[$value]['url']         = urldecode($dd['url']);
			$array[$value]['origin']      = urldecode($dd['origin']);
			$array[$value]['dateCapture'] = $dd['dateCapture'];
			$array[$value]['dateCreate']  = $dd['dateCreate'];
			$array[$value]['dateUpdate']  = $dd['dateUpdate'];
			$array[$value]['comments']    = $dd['comments'];
			$array[$value]['duration']    = $dd['duration'];
			$array[$value]['users']       = $dd['users'];
			$array[$value]['startDate']   = $dd['startDate'];
			$array[$value]['endDate']     = $dd['endDate'];
			$array[$value]['status']      = $dd['status'];
			$array[$value]['client']      = $dd['client'];
			$array[$value]['idProyecto']  = $dd['idProyecto'];
			$array[$value]['idClient']    = $dd['idClient'];
		}
		//CALLBACK
		if(!empty($array)){
			$paramsR = str_replace("\'", "'", $array);
			return array("response" => $paramsR);
		} else {
			return array("error" => "Error: no existen tareas automaticas.");
		}
	}

	public function getTaskAutomaticById($conn,$id){
		$sql	="SELECT ".$this->model.".*, TaskAutomatic.error AS TaskAutomaticError FROM ".$this->model." INNER JOIN TaskAutomatic ON ".$this->model.".id = TaskAutomatic.id WHERE ".$this->model.".id='$id' AND active = 1";
		$d 		= $conn->query($sql);

		// CALLBACK
		if(!empty($d)){
			return array("response" => $d[0]);
		} else {
			return array("error" => "Error: no se encuentra la tarea automatica.");
		}
	}

	/*public function getTaskAutomaticByProject($conn,$id){
		$sql	="SELECT ".$this->model.".*, Projects.name AS projectName FROM ".$this->model." INNER JOIN Projects ON ".$this->model.".idProject = Projects.id WHERE ".$this->model.".idProject='$id' ORDER BY projectName";
		$d 		= $conn->query($sql);

		// CALLBACK
		if(!empty($d)){
			return array("response" => $d);
		} else {
			return array("error" => "Error: no se encuentran las tareas para este proyecto.");
		}
	}*/
	public function insertTaskAutomatic($conn,$params){
		$paramsR       = str_replace("'", "\'", $params[error]);
		$paramsD       = str_replace("'", "\'", $params[comments]);
		$paramsE       = str_replace("'", "\'", $params[duration]);
		$urlEncoder    = urlencode($params['url']);
		$originEncoder = urlencode($params['origin']);
		$parse = parse_url($params['url']);
		$name  = $parse['host'];
		$null = NULL;

		$sqli = "SELECT * FROM ".$this->model." WHERE error = '$paramsR' and origin = '$originEncoder' and url = '$urlEncoder'";
		$d    = $conn->query($sqli);
		$sql  = "INSERT INTO ".$this->model." (error, project, line, `column`, file, origin, url, dateCapture, dateCreate, dateUpdate, comments, duration, users, startDate, endDate, status, client) VALUES ('".$paramsR."', '".$name."', $params[line], $params[column], '$params[file]', '$originEncoder', '$urlEncoder', NOW(), NOW(), NOW(), '$null', NOW(), '$null', NOW(), NOW(), '$null', '".$name."')";
		if(!empty($d)){
			return array("response" => 'Tarea automatica ya creada');
		} else {
			$b = $conn->query($sql);
			return array("response" => "Tarea automatica creada");

		}
	}


	public function updateTaskAutomatic($conn, $params){
		$sql_project     = "SELECT name, idClient FROM Projects WHERE id = ".$params[idProyecto];
		$d_project       = $conn->query($sql_project);
		$sql_clientName  = "SELECT name FROM Clients WHERE id = ".$d_project[0]['idClient'];
		$d_clientName    = $conn->query($sql_clientName);
		$projectName     = $d_project[0]['name']; 
		$idClient        = $d_project[0]['idClient'];
		$clientName      = $d_clientName[0];

		$sql = "UPDATE ".$this->model." SET error = '$params[error]', status = '$params[status]', idProyecto = '$params[idProyecto]', idClient = '".$idClient."', client = '".$clientName."' , project = '".$projectName."' WHERE id='$params[idProyecto]'";
		$d 	= $conn->query($sql);
		var_dump($sql_project);
		var_dump($d_project);
		var_dump($sql_clientName);
		var_dump($d_clientName);
		var_dump($projectName);
		var_dump($clientName);
		var_dump($sql);
		var_dump($d);


		// CALLBACK
		if(empty($d)){
			return array("response" => 'OK');
		} else {
			return array("error" => "Error: al actualizar la tarea automatica.", "sql" => $sql);
		}
	}

	public function deleteTaskAutomatic($conn, $id){
		$sql = "UPDATE ".$this->model." SET active = 0 WHERE id = '$id'";
		$d   = $conn->query($sql);
		if(empty($d)){
			return array("response" => 'Error');
		} else {
			return array("response" => "Eliminada correctamente");
		}
	}

	/*public function getTasksByProjectAndUser($conn,$id,$iduser){
		$user = '{"idUser":"'.$iduser.'"}';
		$sql	="SELECT ".$this->model.".*, TaskAutomatic.error AS TaskAutomaticError FROM ".$this->model." INNER JOIN TaskAutomatic ON ".$this->model.".idTaskAutomatic = TaskAutomatic.id WHERE ".$this->model.".idTaskAutomatic='$id' AND ".$this->model.".users LIKE '%$user%' ORDER BY TaskAutomaticError";
		$d 		= $conn->query($sql);

		// CALLBACK

		if(!empty($d)){
			return array("response" => $d);
		} else {
			return array("error" => "Error: no se encuentran las tareas automaticas para este proyecto.");
		}
	}*/


	/*public function getTaskAutomaticByUser($conn,$iduser){
		$user = '{"idUser":"'.$iduser.'"}';
		$sql	="SELECT ".$this->model.".*, TaskAutomatic.error AS TaskAutomaticError FROM ".$this->model." INNER JOIN TaskAutomatic ON ".$this->model.".idTaskAutomatic = TaskAutomatic.id WHERE ".$this->model.".users LIKE '%$user%' ORDER BY TaskAutomaticError";
		$d 		= $conn->query($sql);
		// CALLBACK
		if(!empty($d)){
			return array("response" => $d);
		} else {
			return array("error" => "Error: no existen tareas automaticas.");
		}
	}*/



}

?>
