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

	public function updateEval($conn, $params){
		$sql = "UPDATE ".$this->model." SET evaluacion = '$params[evaluacion]', puntaje = '$params[puntaje]', fecha = '$params[fecha]' WHERE id = '$params[id]'";
		$d   = $conn->query($sql);

		if(!empty($d)){
			return array("response" => $d);
		} else {
			return array("error" => "Error: al ingresar la evaluacion.", "sql" => $sql);
		}
	}

	public function getEvaluateByUser($conn, $id) {
		$sql = "SELECT ".$this->model.".*, DAY(fecha) AS dia, MONTH(fecha) AS mes, YEAR(fecha) AS year, Users.name AS admin FROM ".$this->model." 
		INNER JOIN Users ON ".$this->model.".idAdmin = Users.id WHERE idUser = ".$id;
		$d   = $conn->query($sql);

		if(!empty($d)){
			return array("response" => $d);
		} else {
			return array("error" => "Error: al ingresar el banco.", "sql" => $sql);
		}
	}
}

?>
