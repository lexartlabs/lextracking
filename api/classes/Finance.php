<?php

class Finance {

	private $model = "Finances";
	// private $cotizacionDolar= file_get_contents('https://api.lexart.com.uy/gp-beta/algorithm/scrap/ine.php');
	private $cotizacionDolar= 32.7;


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
	public function getAllFinances($conn){
		$sql	="SELECT ".$this->model.".*, Users.name AS userName FROM ".$this->model."
				INNER JOIN Users ON ".$this->model.".idUser = Users.id
				WHERE ".$this->model.".active = 1
				";
		$d 		= $conn->query($sql);

		// CALLBACK
		if(!empty($d)){
			return array("response" => $d);
		} else {
			return array("error" => "Error: no existen datos contables.");
		}
	}

	public function totalAmount($arr,$key){
		$totalDolares 	= 0;
		$totalPesos			=0;
		for ($i=0; $i < count($arr) ; $i++) {
			if ($arr[$i]["currency"]=="$") {
				$totalPesos = $totalPesos + (float) $arr[$i][$key];
			}else {
				$totalDolares=$totalDolares +(float) $arr[$i][$key];
			}
		}
		return array("totalPesos" => $totalPesos,"totalDolares" =>  $totalDolares);
	}

	public function getAllFinancesByMonth($conn,$dateIni,$dateEnd){
		$sql	="SELECT ".$this->model.".*, Users.name AS userName FROM ".$this->model."
				INNER JOIN Users ON ".$this->model.".idUser = Users.id
				WHERE ".$this->model.".active = 1
				AND date >= '$dateIni' AND date <= ('$dateEnd' + INTERVAL 1 DAY)
				";
		$d 		= $conn->query($sql);

		// CALLBACK
		if(!empty($d)){

			// ORDER CONCEPTS
			$gastos 		= array();
			$gastosProg 	= array();
			$cobros 		= array();
			$cobrosEst 		= array();
			$deudas 			 = array();


			$totalCharges 		= array();
			$totalDeuda 	= array();
			$totalExpenses		= array();
			$totalEstimatedCharges 		= array();
			$totalScheduledExpenses 			 = array();

			for ($i=0; $i < count($d) ; $i++) {

				// GASTOS
				if($d[$i]["type"] == "GASTO"){
					$gastos[] = $d[$i];
				}

				// GASTOS PROGRAMADOS
				if($d[$i]["type"] == "GASTO_PROG"){
					$gastosProg[] = $d[$i];
				}

				if($d[$i]["type"] == "COBROS"){
					$cobros[] 	= $d[$i];
				}

				if($d[$i]["type"] == "COBROS_EST"){
					$cobrosEst[] 	= $d[$i];
				}
				if($d[$i]["type"] == "DEUDA"){
					$deudas[] 	= $d[$i];
				}
			}

			$key 						= "amount";

			$totalExpenses 				= $this->totalAmount($gastos,$key);
			$totalScheduledExpenses 	= $this->totalAmount($gastosProg,$key);
			$totalCharges 				= $this->totalAmount($cobros,$key);
			$totalEstimatedCharges 		= $this->totalAmount($cobrosEst,$key);
			$totalDeuda						= $this->totalAmount($deudas,$key);
			$cotizacion = $this->getCotizacion();
			$this->cotizacionDolar=$cotizacion->dolar->sell;
			$res 	= array(

					// GASTOS
					"expenses" 			=> $gastos,
					"totalExpenses" 	=> $totalExpenses,

					// GASTOS PROGRAMADOS
					"scheduledExpenses" 		=> $gastosProg,
					"totalScheduledExpenses" 	=> $totalScheduledExpenses,

					// PAGOS
					"charges"			=> $cobros,
					"totalCharges" 		=> $totalCharges,

					// PAGOS ESTIMADOS
					"estimatedCharges"		=> $cobrosEst,
					"totalEstimatedCharges" => $totalEstimatedCharges,

					// Deuda

					"debts"		=> $deudas,
					"totalDebts" => $totalDeuda,

					//cotizacion
					"cotizacion"=> $cotizacion->dolar,

					// CAJA
					"realCash" 			=> (float) (($totalCharges["totalPesos"]+ $totalCharges["totalDolares"]*$this->cotizacionDolar) - ($totalExpenses["totalPesos"] + $totalExpenses["totalDolares"]*$this->cotizacionDolar)),

					// CAJA Estiamda

					"estimatedCash" => (float) (($totalEstimatedCharges["totalPesos"]  + $totalEstimatedCharges["totalDolares"]*$this->cotizacionDolar)),


					// SALDO Real

					"realBalance" 		=> (float) (($totalCharges["totalPesos"]+ $totalCharges["totalDolares"]*$this->cotizacionDolar) - ($totalScheduledExpenses["totalPesos"] + $totalScheduledExpenses["totalDolares"]*$this->cotizacionDolar + $totalExpenses["totalPesos"]+$totalExpenses["totalDolares"]*$this->cotizacionDolar)),

					// Saldo Estimado

					"chargesBalance" 	=> (float) ( ($totalEstimatedCharges["totalPesos"] + $totalEstimatedCharges["totalDolares"]*$this->cotizacionDolar)-($totalCharges["totalPesos"] + $totalCharges["totalDolares"]*$this->cotizacionDolar)),

					//total Cobros

					"allCharges"		=> (float)($totalCharges["totalPesos"]+ $totalCharges["totalDolares"]*$this->cotizacionDolar)

			);

			return array("response" => $res);
		} else {
			return array("error" => "Error: no existen datos contables.");
		}
	}

	public function getFinanceStatuses (){
		$statuses = array(
						array("status" => "PAGO"),
						array("status" => "CIERRE"),
						array("status" => "PENDIENTE"),
						array("status" => "CONFIRMADO")
					);
		return array("response" => $statuses);
	}

	public function getFinanceConcepts (){
		$concepts = array(
						array("concept" => "EMPRESA"),
						array("concept" => "ESTADO"),
						array("concept" => "SPONSOR"),
						array("concept" => "SUELDOS"),
						array("concept" => "SERVICIOS"),
						array("concept" => "SERVIDORES"),
						array("concept" => "INVERSIONES"),
						array("concept" => "AHORRO"),
						array("concept" => "OTROS"),
					);
		return array("response" => $concepts);
	}

	public function getFinanceTypes (){
		$types = array(
						array("type" => "GASTO", 		"name" => "GASTO"),
						array("type" => "GASTO_PROG", 	"name" => "GASTO PROGRAMADO"),
						array("type" => "COBROS" ,		"name" => "COBROS"),
						array("type" => "COBROS_EST" ,	"name" => "COBROS ESTIMADOS"),
						array("type" => "DEUDA" ,		"name" => "DEUDAS / CREDITO")
					);
		return array("response" => $types);
	}
	public function getCotizacion(){
		return json_decode(file_get_contents('https://api.lexart.com.uy/gp-beta/algorithm/scrap/ine.php'));
	}

	public function getFinanceById($conn,$id){
		$sql	="SELECT ".$this->model.".*, Users.name AS userName FROM ".$this->model."
				INNER JOIN Users ON ".$this->model.".idUser = Users.id
				WHERE ".$this->model.".id='$id'";
		$d 		= $conn->query($sql);

		// CALLBACK
		if(!empty($d)){
			return array("response" => $d[0]);
		} else {
			return array("error" => "Error: no se encuentra el dato contable.");
		}
	}

	public function insertFinance($conn,$user){
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
		$newestTrack = $this->getFinanceById($conn, $lastId);
		$newestTrack = $newestTrack["response"];

		// CALLBACK
		if(empty($d)){
			return array("response" => $newestTrack);
		} else {
			return array("error" => "Error: al ingresar el dato contable.", "sql" => $sql);
		}
	}

	public function updateFinance($conn, $user){
		$sql = "UPDATE ".$this->model."
			SET
				description = '$user[description]',
				concept 	= '$user[concept]',
				amount 		= '$user[amount]',
				type 		= '$user[type]',
				currency 	= '$user[currency]',
				active 		= '$user[active]',
				date 		= '$user[date]',
				status 		= '$user[status]',
				idUser 		= '$user[idUser]'
			WHERE id='$user[id]'";
		$d 	= $conn->query($sql);

		// CALLBACK
		if(empty($d)){
			return array("response" => 'OK');
		} else {
			return array("error" => "Error: al actualizar el dato contable.", "sql" => $sql);
		}
	}
}

?>
