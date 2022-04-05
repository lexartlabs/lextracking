<?php

class Budget {

	private $model = "Budgets";

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

	public function totalAmount($arr,$key){
		$totalDolares 	= 0;
		$totalPesos			=0;
		for ($i=0; $i < count($arr) ; $i++) {
			if ($arr[$i]["currency"]=="Pesos") {
				$totalPesos = $totalPesos + (float) $arr[$i][$key];
			}else {
				$totalDolares=$totalDolares +(float) $arr[$i][$key];
			}
		}
		return array("totalPesos" => $totalPesos,"totalDolares" =>  $totalDolares);
	}

	// GET USER BY ID
	public function getAllBudgets($conn){
		$sql	="SELECT ".$this->model.".*, Clients.name AS clientName FROM ".$this->model."
				INNER JOIN Clients ON ".$this->model.".idClient = Clients.id
				WHERE ".$this->model.".active = 1
				";
		$d 		= $conn->query($sql);

		// CALLBACK
		if(!empty($d)){
			$pesos=0;
			$dolares=0;
			foreach ($d as $key => $value) {
				if ($value["currency"]=="$") {
					$pesos+= (float) $value["amount"];
				}else {
					$dolares+= (float) $value["amount"];
				}
			}
			// $d["totalPesos"]= $pesos;
			// $d["totalUsd"]= $dolares;
			$res = array("budgets" => $d,"totalPesos" => $pesos,"totalUsd" => $dolares);

			return array("response" => $res , "totalPesos"=>$pesos, "totalUsd"=>$dolares);
		} else {
			return array("error" => "Error: no existen presupuesto.");
		}
	}
	public function getAllBudgetsByMonth($conn,$dateIni,$dateEnd){
		$sql	="SELECT ".$this->model.".*, Clients.name AS clientName FROM ".$this->model." 
		INNER JOIN Clients ON ".$this->model.".idClient = Clients.id
		WHERE  ".$this->model.".date >= '$dateIni' AND ".$this->model.".date <= ('$dateEnd' + INTERVAL 1 DAY)";
		$d 		= $conn->query($sql);
		if(!empty($d)){
			$key 						= "amount";
			$totalBudgets =  $this->totalAmount($d ,$key);
			$res = array('budgets' => $d, 'totalBudgets' => $totalBudgets );
			return array("response" => $res );
		} else {
			return array("error" => "Error: no existen presupuestos.","sql"=>$sql);
		}
	}

	public function getAllBudgetsByUserMonth($conn,$dateIni,$dateEnd,$id){
		$sql	="SELECT ".$this->model.".*, Clients.name AS clientName FROM ".$this->model." 
		INNER JOIN Clients ON ".$this->model.".idClient = Clients.id
		WHERE  idUser='$id' AND date >= '$dateIni' AND date <= ('$dateEnd' + INTERVAL 1 DAY)";
		$d 		= $conn->query($sql);
		if(!empty($d)){
			$key 						= "amount";
			$totalBudgets =  $this->totalAmount($d ,$key);
			$res = array('budgets' => $d, 'totalBudgets' => $totalBudgets );
			return array("response" => $res );
		} else {
			return array("error" => "Error: no existen presupuestos.","sql"=>$sql);
		}
	}

	public function getBudgetStatuses (){
		$statuses = array(
						array("status" => "PENDIENTE"),
						array("status" => "APROBADO"),
						array("status" => "RECHAZADO"),
						array("status" => "APLAZADO")
					);
		return array("response" => $statuses);
	}

	public function getBudgetConcepts (){
		$concepts = array(
						array("concept" => "APP", 				"name" => "Aplicaciones Moviles"),
						array("concept" => "WEB", 				"name" => "Sitios Web / E-commerce"),
						array("concept" => "SOFTWARE", 			"name" => "Software / Sistemas"),
						array("concept" => "INFRAESTRUCTURA", 	"name" => "Servidores / Cloud"),
						array("concept" => "CAPACITACIONES", 	"name" => "Capacitaciones / Cursos"),
						array("concept" => "ASESORAMIENTO", 	"name" => "Asesoramiento"),
						array("concept" => "AUDITORIA", 		"name" => "Auditoria"),
						array("concept" => "OTROS", 			"name" => "Otros"),
					);
		return array("response" => $concepts);
	}

	public function getBudgetById($conn,$id){
		$sql	="SELECT ".$this->model.".*, Clients.name AS clientName FROM ".$this->model."
				INNER JOIN Clients ON ".$this->model.".idClient = Clients.id
				WHERE ".$this->model.".id='$id'";
		$d 		= $conn->query($sql);

		// CALLBACK
		if(!empty($d)){
			return array("response" => $d[0]);
		} else {
			return array("error" => "Error: no se encuentra el presupuesto.");
		}
	}

	public function insertBudget($conn,$user){
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
		$newestTrack = $this->getBudgetById($conn, $lastId);
		$newestTrack = $newestTrack["response"];

		// CALLBACK
		if(empty($d)){
			return array("response" => $newestTrack);
		} else {
			return array("error" => "Error: al ingresar el presupuesto.", "sql" => $sql);
		}
	}

	public function updateBudget($conn, $user){
		$sql = "UPDATE ".$this->model."
			SET
				idClient 	= '$user[idClient]',
				concept 	= '$user[concept]',
				amount		= '$user[amount]',
				currency 	= '$user[currency]',
				active		= '$user[active]',
				date 		= '$user[date]',
				description = '$user[description]',
				hoursTotal 	= '$user[hoursTotal]',
				hoursPayable = '$user[hoursPayable]',
				status 		= '$user[status]'
			WHERE id='$user[id]'";
		$d 	= $conn->query($sql);

		// CALLBACK
		if(empty($d)){
			return array("response" => 'OK');
		} else {
			return array("error" => "Error: al actualizar el presupuesto.", "sql" => $sql);
		}
	}
}

?>
