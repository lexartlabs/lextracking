<?php

//
// EXAMPLE CLASS
//
class WeeklyHour {

	private $model = "WeeklyHours";

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

	// CRYPTO FUNCTION

	// GET WeeklyHour BY ID
	public function getAllWeeklyHours($conn){
		$sql	="SELECT * FROM ".$this->model;
		$d 		= $conn->query($sql);

		// CALLBACK
		if(!empty($d)){
			return array("response" => $d);
		} else {
			return array("error" => "Error: no existen horas semanales.");
		}
	}

	public function getWeeklyHourById($conn,$id){
		$sql	="SELECT * FROM ".$this->model." WHERE id='$id'";
		$d 		= $conn->query($sql);

		// CALLBACK
		if(!empty($d)){
			return array("response" => $d[0]);
		} else {
			return array("error" => "Error: no se encuentra la hora semanal.");
		}
	}

	public function getWeeklyHourByIdUser($conn,$id){
		$sql	="
			SELECT wh.*, u.role AS 'userRole'
			FROM ".$this->model." AS wh
			INNER JOIN `Users` AS u ON u.id = wh.idUser
			WHERE idUser=".$id;

		$d 		= $conn->query($sql);

		// CALLBACK
		if(!empty($d)){
			return array("response" => $d);
		} else {
			//$sqli = "INSERT INTO ".$this->model." (idUser, userName, costHour, workLoad, borrado) VALUES ($params[id], '$params[name]', 0, 0, 0)";
			//$b    = $conn->query($sqli);
			return array("error" => "Usuario agregado, valor costo hora: 0$");
		}
	}



	public function insertWeeklyHour($conn,$weeklyHour){
		$md   	 = $this->model;
		$head 	 ="INSERT INTO ".$this->model;
		$insert .="(";
		$body 	.=" VALUES (";


		$last 	 = count($weeklyHour);

		$ind 	 = 1;
		foreach ($weeklyHour as $key => $vle) {
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

		// CALLBACK
		if(empty($d)){
			return array("response" => 'OK');
		} else {
			return array("error" => "Error: al ingresar la hora semanal.", "sql" => $sql);
		}
	}

	public function updateWeeklyHour($conn, $weeklyHour){
		$body = "UPDATE ".$this->model." SET ";
		$last=count($weeklyHour);
		$ind=1;
		foreach ($weeklyHour as $key => $value) {
			if($this->getStructure($conn,$key)){
				if ($ind==$last){
					$body.=$key."='".$value."'";
				}
				else {
					$body.=$key."='".$value."', ";
				}
			}
			$ind++;
		}
		$end=" WHERE id =".$weeklyHour["id"];
		$sql=$body.$end;
		$d 	= $conn->query($sql);

		// CALLBACK
		if(empty($d)){
			return array("response" => 'OK', "sql" => $sql);
		} else {
			return array("error" => "Error: al actualizar la hora semanal.", "sql" => $sql);
		}
	}
}

?>
