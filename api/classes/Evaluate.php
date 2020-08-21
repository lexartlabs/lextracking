<?php

class Evaluate {

	private $model = "Evaluate";

	public function insertEval($conn,$params){
		$sql = "INSERT INTO ".$this->model." (idUser, idAdmin, idTask, evaluacion, puntaje, fecha) VALUES (".$params['id'].", ".$params['idAdmin'].", ".$params['value'].", '".$params['evaluacion']."', ".$params['puntaje'].", '".$params['fecha']."')";

		$d = $conn->query($sql);
		// CALLBACK
		if(empty($d)){
			return array("response" => $d);
		} else {
			return array("error" => "Error: al ingresar el banco.", "sql" => $sql);
		}
	}

	public function getEvaluateByUser($conn, $id) {
		$sql = "SELECT ".$this->model.".*, users.name AS admin FROM ".$this->model." 
		INNER JOIN users ON ".$this->model.".idAdmin = users.id WHERE idUser = ".$id;
		$d   = $conn->query($sql);

		if(!empty($d)){
			return array("response" => $d);
		} else {
			return array("error" => "Error: al ingresar el banco.", "sql" => $sql);
		}
	}
}

?>
