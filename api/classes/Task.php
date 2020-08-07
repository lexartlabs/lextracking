<?php
/**
*
*/
class Task extends Project {

	private $model = "Tasks";

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
	public function getAllTasks($conn, $params){
		$query = "";

		if (!empty($params["limit"]) && isset($params["limit"])) {
			$query .= " LIMIT ".$params["limit"]; 
		}

		if (!empty($params["offset"]) && isset($params["offset"])) {
			$query .= " OFFSET ".$params["offset"];
		}

		$sql	="SELECT ".$this->model.".*, Projects.name AS projectName FROM ".$this->model." INNER JOIN Projects ON ".$this->model.".idProject = Projects.id WHERE active = 1 ORDER BY projectName ".$query;
		$d 		= $conn->query($sql);

		// CALLBACK
		if(!empty($d)){
			return array("response" => $d);
		} else {
			return array("error" => "Error: no existen tareas.");
		}
	}

	public function getTaskById($conn,$id){
		$sql	="SELECT ".$this->model.".*, Projects.name AS projectName FROM ".$this->model." INNER JOIN Projects ON ".$this->model.".idProject = Projects.id WHERE ".$this->model.".id='$id' AND active = 1";
		$d 		= $conn->query($sql);

		// CALLBACK
		if(!empty($d)){
			return array("response" => $d[0]);
		} else {
			return array("error" => "Error: no se encuentra la tarea.");
		}
	}

	public function getAllTasksByIdUser($conn,$idUser){
		$sql	="SELECT ".$this->model.".*, Projects.name AS projectName FROM ".$this->model." INNER JOIN Projects ON ".$this->model.".idProject = Projects.id WHERE active = 1 ORDER BY projectName";
		$d 		= $conn->query($sql);

		// CALLBACK
		if(!empty($d)){
			$res= array();
			for ($i=0; $i <sizeof($d) ; $i++) {

			$users = ($d[$i]["users"]) ? json_decode( $d[$i]["users"],true ) : array() ;
			$encontreUser =false;

				for ($j=0; $j < sizeof($users) && !$encontreUser; $j++) {
					if ($users[$j]["idUser"]==$idUser) {
						$encontreUser=true;
						array_push($res,$d[$i]);
					}


				}



			}
			return array("response" => $res);
		} else {
			return array("error" => "Error: no existen tareas.");
		}
	}

	public function getTasksByProject($conn,$id){
		$sql	="SELECT ".$this->model.".*, Projects.name AS projectName FROM ".$this->model." INNER JOIN Projects ON ".$this->model.".idProject = Projects.id WHERE ".$this->model.".idProject='$id' AND active = 1 ORDER BY projectName";
		$d 		= $conn->query($sql);

		// CALLBACK
		if(!empty($d)){
			return array("response" => $d);
		} else {
			return array("error" => "Error: no se encuentran las tareas para este proyecto.");
		}
	}

	public function getTaskByIdClient($conn,$idClient){
		$resProjects = parent::getProjectByClient($conn,$idClient);
		if (!empty($resProjects["response"])) {
			$projects=$resProjects["response"];
			$task=array();
			for ($i=0; $i <sizeof($projects) ; $i++) {
				$resTaskProject = $this->getTasksByProject($conn,$projects[$i]["id"]);
				if (!empty($resTaskProject["response"])) {
					$taskProject = $resTaskProject["response"];
					for ($j=0; $j <sizeof($taskProject) ; $j++) {
						array_push($task,$taskProject[$j]);
					}

				}


			}


			return array("response" => $task);

		}else {
			return array("error" => "Error: no se encuentran las tareas para este cliente.");
		}


	}

	public function insertTask($conn,$user){
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
		$id = $conn->LastId();
		// CALLBACK
		if(empty($d)){
			return array("response" => $id, "sql" => $sql);
		} else {
			return array("error" => "Error: al ingresar la tarea.", "sql" => $sql);
		}
	}

	public function updateTask($conn, $user){
		$sql = "UPDATE ".$this->model." SET name = '$user[name]', idProject = '$user[idProject]', description = '$user[description]', comments = '$user[comments]', duration = '$user[duration]', users = '$user[users]', status = '$user[status]', startDate = '$user[startDate]',endDate = '$user[endDate]' WHERE id='$user[id]'";
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
		$sql	="SELECT ".$this->model.".*, Projects.name AS projectName FROM ".$this->model." INNER JOIN Projects ON ".$this->model.".idProject = Projects.id WHERE ".$this->model.".idProject='$id' AND ".$this->model.".users LIKE '%$user%' AND active = 1 ORDER BY projectName";
		$d 		= $conn->query($sql);

		// CALLBACK
		if(!empty($d)){
			return array("response" => $d);
		} else {
			return array("error" => "Error: no se encuentran las tareas para este proyecto.");
		}
	}

	public function getTasksByUser($conn,$iduser){
		$user = '{"idUser":"'.$iduser.'"}';
		$sql	="SELECT ".$this->model.".*, Projects.name AS projectName FROM ".$this->model." INNER JOIN Projects ON ".$this->model.".idProject = Projects.id WHERE ".$this->model.".users LIKE '%$user%' AND active = 1 ORDER BY projectName";
		$d 		= $conn->query($sql);
		// CALLBACK
		if(!empty($d)){
			return array("response" => $d);
		} else {
			return array("error" => "Error: no existen tareas.");
		}
	}

	public function deleteTask($conn,$id){
		$sql	="UPDATE ".$this->model." SET active = 0 WHERE id = '$id'";
		$d 		= $conn->query($sql);
		// CALLBACK
		if(empty($d)){
			return array("response" => "Tarea eliminada.");
		} else {
			return array("error" => "Error: No se pudo eliminar tareas.");
		}
	}



}

?>
