<?php 

class HourCost {

	private $model = "HoursCost";

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
	public function getAllHoursCost($conn){
		$sql	="SELECT ".$this->model.".*, Clients.name AS clientName, Users.name AS userName FROM ".$this->model." 
				INNER JOIN Clients ON ".$this->model.".idClient = Clients.id
				INNER JOIN Users ON ".$this->model.".idUser 	= Users.id";
		$d 		= $conn->query($sql);
		
		// CALLBACK
		if(!empty($d)){
			return array("response" => $d);
		} else {
			return array("error" => "Error: no existen costo de horas.");
		}
	}

	public function getHourCostById($conn,$id){
		$sql	="SELECT ".$this->model.".*, Clients.name AS clientName, Users.name AS userName FROM ".$this->model." 
				INNER JOIN Clients ON ".$this->model.".idClient = Clients.id
				INNER JOIN Users ON ".$this->model.".idUser 	= Users.id
				WHERE ".$this->model.".id='$id'";
		$d 		= $conn->query($sql);
		
		// CALLBACK
		if(!empty($d)){
			return array("response" => $d[0]);
		} else {
			return array("error" => "Error: no se encuentra el costo de hora.");
		}
	}

	public function insertHourCost($conn,$user){
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
		$newestTrack = $this->getHourCostById($conn, $lastId);
		$newestTrack = $newestTrack["response"];
		
		// CALLBACK
		if(empty($d)){
			return array("response" => $newestTrack);
		} else {
			return array("error" => "Error: al ingresar el costo de hora.", "sql" => $sql);
		}
	}

	public function updateHourCost($conn, $user){
		$sql = "UPDATE ".$this->model." 
			SET 
				idUser = '$user[idUser]',
				idClient = '$user[idClient]',
				costUser = '$user[costUser]',
				costClient = '$user[costClient]',
				currencyClient = '$user[currencyClient]',
				currencyUser = '$user[currencyUser]',
				date = '$user[date]',
				active = '$user[active]'
			WHERE id='$user[id]'";
		$d 	= $conn->query($sql);

		// CALLBACK
		if(empty($d)){
			return array("response" => 'OK');
		} else {
			return array("error" => "Error: al actualizar el Proyecto.", "sql" => $sql);
		}
	}
}

?>