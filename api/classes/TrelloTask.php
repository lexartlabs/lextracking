<?php

ini_set('display_errors', 'On');
error_reporting(1);
/**
*
*/
class TrelloTask {

	private $model  = "TrelloBoard";
	private $modelB = "TrelloTask";

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
	public function getAllTrelloTasks($conn){

		$sql     = "SELECT ".$this->model.".*, Projects.name AS projectName FROM ".$this->model." INNER JOIN Projects ON TrelloBoard.proyecto_id=Projects.id WHERE TrelloBoard.proyecto_id=Projects.id AND active = 1";
		$d       = $conn->query($sql);

		foreach($d as $value => $dd){
			$array[$value]['id']           = $dd['id'];
			$array[$value]['tablero_id']   = $dd['tablero_id'];
			$array[$value]['proyecto_id']  = $dd['proyecto_id'];
			$array[$value]['url']          = urldecode($dd['url']);
			$array[$value]['activo']       = $dd['activo'];
			$array[$value]['dateCreate']   = $dd['dateCreate'];
			$array[$value]['dateUpdate']   = $dd['dateUpdate'];
			$array[$value]['projectName']  = $dd['projectName'];
		}
		//CALLBACK
		if(!empty($array)){
			return array("response" => $array);
		} else {
			return array("error" => "Error: no existen tareas en Trello.");
		}
	}

	public function getTrelloTaskById($conn,$id){
		$sql	="SELECT ".$this->model.".*, Projects.name AS projectName FROM ".$this->model." INNER JOIN Projects ON TrelloBoard.proyecto_id=Projects.id WHERE ".$this->model.".id='$id' AND active= 1";
		$d 		= $conn->query($sql);

		foreach($d as $value => $dd){
			$array[$value]['id']           = $dd['id'];
			$array[$value]['tablero_id']   = $dd['tablero_id'];
			$array[$value]['proyecto_id']  = $dd['proyecto_id'];
			$array[$value]['url']          = urldecode($dd['url']);
			$array[$value]['activo']       = $dd['activo'];
			$array[$value]['dateCreate']   = $dd['dateCreate'];
			$array[$value]['dateUpdate']   = $dd['dateUpdate'];
			$array[$value]['projectName']  = $dd['projectName'];
		}
		// CALLBACK
		if(!empty($array)){
			return array("response" => $array);
		} else {
			return array("error" => "Error: no se encuentra la tarea automatica.");
		}
	}

	public function getByIdCard($conn) {
		$sql = "SELECT card_id FROM ".$this->modelB." WHERE active= 1";
		$d   = $conn->query($sql);
		if(!empty($d)) {
			return array("response" => $d);
		} else {
			return array("response" => "No se encontraron id cards");
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
	public function insertTrelloTasks($conn,$params){
		$url  = urlencode($params['url']);
		$sqli = "SELECT * FROM ".$this->model." WHERE proyecto_id = $params[project]";
		$d    = $conn->query($sqli);
		$sqly = "SELECT * FROM ".$this->model." WHERE tablero_id='$params[idBoard]'";
		$q    = $conn->query($sqly);
		$sql  = "INSERT INTO ".$this->model." (tablero_id, proyecto_id, url, activo, dateCreate, dateUpdate) VALUES ('$params[idBoard]', $params[project], '$url', 1, NOW(), NOW())";
		if(!empty($d)){
			return array("response" => $sqli);
		} elseif (!empty($q)) {
			return array("response" => $sqly);
		} else {
			$b = $conn->query($sql);
			return array("response" => $sql);
		}
	}


	public function insertTrelloCard($conn, $params){
		$sqli   = "SELECT * FROM ".$this->modelB." WHERE card_id = '$params[card_id]'";
		$d      = $conn->query($sqli);
		$sql    = "INSERT INTO ".$this->modelB." (id_project, idProyecto, id_board, card_id, name, project, description, comments, duration, users, dateCreate, dateUpdate, startDate, endDate, status, client) VALUES ('$params[id_project]', '$params[idProyecto]', '$params[idboard]', '$params[card_id]', '$params[name]', '$params[project]', '$params[description]', 'nulo', '00:00:00', 'user', NOW(), NOW(), NOW(), NOW(), '$params[status]', '$params[client]')";
		if(!empty($d)){
			$updCard = $this->updateCard($conn, $params);
			return array("response" => "OK");
		} else {
			$b = $conn->query($sql);
			return array("response" => "ERROR");
		}
	}

	public function updateCard($conn, $params){
		$sql = "UPDATE ".$this->modelB." SET name = '$params[name]', project = '$params[project]', description = '$params[description]', status = '$params[status]' WHERE card_id='$params[card_id]'";
		$d 	= $conn->query($sql);

		// CALLBACK
		if(empty($d)){
			return array("response" => 'OK');
		} else {
			return array("error" => "Error: al actualizar la tarea.", "sql" => $sql);
		}
	}

	public function getTasksByProjectAndUser($conn,$id,$iduser){
		$user = '{"idUser":"'.$iduser.'"}';
		$sql	="SELECT ".$this->model.".*, TaskAutomatic.error AS TaskAutomaticError FROM ".$this->model." INNER JOIN TaskAutomatic ON ".$this->model.".idTaskAutomatic = TaskAutomatic.id WHERE ".$this->model.".idTaskAutomatic='$id' AND ".$this->model.".users LIKE '%$user%' AND active = 1 ORDER BY TaskAutomaticError";
		$d 		= $conn->query($sql);

		// CALLBACK

		if(!empty($d)){
			return array("response" => $d);
		} else {
			return array("error" => "Error: no se encuentran las tareas automaticas para este proyecto.");
		}
	}

	public function removeTrelloTask($conn,$id){
		$sql	="UPDATE ".$this->modelb." SET active = 0 WHERE id = '$id'";
		$d 		= $conn->query($sql);

		// CALLBACK

		if(!empty($d)){
			return array("response" => $d);
		} else {
			return array("error" => "Error: no se encuentran las tareas automaticas para este proyecto.");
		}
	}

	public function removeTrelloBoard($conn,$id){
		$sql	="UPDATE ".$this->model." SET active = 0 WHERE id = '$id'";
		$d 		= $conn->query($sql);

		// CALLBACK

		if(!empty($d)){
			return array("response" => $d);
		} else {
			return array("error" => "Error: no se encuentran las tareas automaticas para este proyecto.");
		}
	}


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
