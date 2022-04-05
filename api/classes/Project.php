<?php 

class Project {

	private $model = "Projects";

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
	public function getAllProjects($conn){
		$sql	="SELECT ".$this->model.".*, Clients.name AS clientName FROM ".$this->model." 
				INNER JOIN Clients ON ".$this->model.".idClient = Clients.id ORDER BY clientName";
		$d 		= $conn->query($sql);
		
		// CALLBACK
		if(!empty($d)){
			return array("response" => $d);
		} else {
			return array("error" => "Error: no existen proyectos.");
		}
	}

	

	public function getProjectById($conn,$id){
		$sql	="SELECT ".$this->model.".*, Clients.name AS clientName FROM ".$this->model." 
				INNER JOIN Clients ON ".$this->model.".idClient = Clients.id
				WHERE ".$this->model.".id='$id'";
		$d 		= $conn->query($sql);
		
		// CALLBACK
		if(!empty($d)){
			return array("response" => $d[0]);
		} else {
			return array("error" => "Error: no se encuentra el proyecto.");
		}
	}

	public function getProjectsByIdUser($conn,$idUser){

		$objTask = new Task();
		$resTask = $objTask->getAllTasksByIdUser($conn,$idUser);
	
		// // CALLBACK
		if(!empty($resTask["response"])){
			$tasks =$resTask["response"];
			$projects = array();

			for ($i=0; $i <sizeof($tasks) ; $i++) {
				$estaProject=false;
				for ($j=0; $j <sizeof($projects) && !$estaProject; $j++) {
					if ($projects[$j]["id"]==$tasks[$i]["idProject"]) {
						$estaProject=true;
					}
				}
				if (!$estaProject) {
					$resProject = $this->getProjectById($conn,$tasks[$i]["idProject"]);
					if (!empty($resProject["response"])) {
						array_push($projects,$resProject["response"]);
					}
				}

			}
			return array("response" => $projects);
		} else {
			return array("error" => "Error: no se encuentra el proyecto.");
		}
	}

	public function getProjectByClient($conn,$id){
		$sql	="SELECT ".$this->model.".*, Clients.name AS clientName FROM ".$this->model." 
				INNER JOIN Clients ON ".$this->model.".idClient = Clients.id
				WHERE ".$this->model.".idClient='$id'";
		$d 		= $conn->query($sql);
		
		// CALLBACK
		if(!empty($d)){
			return array("response" => $d);
		} else {
			return array("error" => "Error: no se encuentra el proyecto.");
		}
	}
	
	public function insertProject($conn,$user){
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
		$newestTrack = $this->getProjectById($conn, $lastId);
		$newestTrack = $newestTrack["response"];
		
		// CALLBACK
		if(empty($d)){
			return array("response" => $newestTrack);
		} else {
			return array("error" => "Error: al ingresar el proyecto.", "sql" => $sql);
		}
	}

	public function getProjectsByDeveloper($conn,$id){
		$user = '{"idUser":"'.$id.'"}';
		$checkadmin = "SELECT role  FROM `Users` WHERE `id` = $id";
		$d1		= $conn->query($checkadmin);
		$role = $d1[0]['role'];
		if ($role != 'developer' && $role != 'client') {
			$sql = "SELECT ".$this->model.".*, Clients.name AS clientName, CONCAT(COUNT(IF(Tasks.status = 'Done',1,NULL)), '/', COUNT(Tasks.id)) AS tasknumber, GROUP_CONCAT(Tasks.users) AS users FROM ".$this->model."
		LEFT JOIN Clients ON ".$this->model.".idClient = Clients.id
		LEFT JOIN Tasks ON ".$this->model.".id = Tasks.idProject GROUP BY ".$this->model.".id ORDER by id DESC";
		} else if ($role == 'client') {
			$sql	="SELECT ".$this->model.".*, Clients.name AS clientName, CONCAT(COUNT(IF(Tasks.status = 'Done',1,NULL)), '/', COUNT(Tasks.id)) AS tasknumber FROM ".$this->model."
		LEFT JOIN Clients ON ".$this->model.".idClient = Clients.id
		LEFT JOIN Tasks ON ".$this->model.".id = Tasks.idProject WHERE Projects.idClient = $id GROUP BY ".$this->model.".id ORDER by id DESC";
		} else if ($role == 'developer'){
		$sql = "SELECT ".$this->model.".*, Clients.name AS clientName, CONCAT(COUNT(IF(Tasks.status = 'Done' AND Tasks.users LIKE '%".$user."%' ,1,NULL)), '/', COUNT(IF(Tasks.users LIKE '%".$user."%' ,1,NULL))) AS tasknumber FROM ".$this->model."
			LEFT JOIN Clients ON ".$this->model.".idClient = Clients.id
			LEFT JOIN Tasks ON ".$this->model.".id = Tasks.idProject WHERE Tasks.users LIKE '%".$user."%' GROUP BY ".$this->model.".id";
		}
		$d		= $conn->query($sql);
		// CALLBACK
		if(!empty($d)){
			return array("response" => $d);
		} else {
			return array("error" => "Error: no se encuentra el proyecto.");
		}
	}

public function updateProject($conn, $user){
		if($user['tracked']){
			if ($user['filter'] == 'rest') {
				$sqlq = "SELECT totalCost FROM ".$this->model." WHERE id = '$user[id]'";
				$c    = $conn->query($sqlq);
				$totalCost = $user[cost] - $c[0]['totalCost'];
				$sqlr =	"UPDATE ".$this->model." SET tracked = '$user[tracked]', totalCost = '$totalCost' WHERE id = '$user[id]'";
				$b    = $conn->query($sqlr);
				if(empty($b)){
					return array("response" => 'OK');
				} else {
					return array("error" => "Error: al actualizar el Proyecto.", "sql" => $sql);
				}	
			} elseif ($user['filter'] == 'update') {
				$sqlx = "SELECT totalCost FROM ".$this->model." WHERE id = '$user[id]'";
				$q    = $conn->query($sqlx);
				$totalCost = $user[cost] + $q[0]['totalCost'];
				$sqli =	"UPDATE ".$this->model." SET tracked = '$user[tracked]', totalCost = '$totalCost' WHERE id = '$user[id]'";
				$b    = $conn->query($sqli);
				if(empty($b)){
					return array("response" => 'OK');
				} else {
					return array("error" => "Error: al actualizar el Proyecto.", "sql" => $sql);
				}
			} elseif ($user['filter'] == 'TotalUpdate'){
				$sqlk =	"UPDATE ".$this->model." SET tracked = '$user[tracked]', totalCost = '$user[cost]' WHERE id = '$user[id]'";
				$u    = $conn->query($sqlk);
				if(empty($u)){
					return array("response" => 'OK');
				} else {
					return array("error" => "Error: al actualizar el Proyecto.", "sql" => $sqlk);
				}
			} else {
				$sql = "UPDATE ".$this->model." SET name = '$user[name]', idClient = '$user[idClient]', description = '$user[description]', comments = '$user[comments]', duration = '$user[duration]', presupuesto = '$user[presupuesto]'  WHERE id='$user[id]'";
				$d 	= $conn->query($sql);
				

				// CALLBACK
				if(empty($d)){
					return array("response" => 'OK');
				} else {
					return array("error" => "Error: al actualizar el Proyecto.", "sql" => $sql);
				}
			} 
	}
	}
}

?>
