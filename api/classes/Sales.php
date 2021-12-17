<?php

//
// EXAMPLE CLASS
//
class Sale {

	private $model = "Sales";

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
			if ($arr[$i]["currency"]=="$") {
				$totalPesos = $totalPesos + (float) $arr[$i][$key];
			}else {
				$totalDolares=$totalDolares +(float) $arr[$i][$key];
			}
		}
		return array("totalPesos" => $totalPesos,"totalDolares" =>  $totalDolares);
	}

	// CRYPTO FUNCTION

	// GET Sale BY ID
	public function getAllSales($conn){
		$sql	="SELECT * FROM ".$this->model;
		$d 		= $conn->query($sql);

		// CALLBACK
		if(!empty($d)){
			return array("response" => $d);
		} else {
			return array("error" => "Error: no existen ventas.");
		}
	}

	public function getAllSalesByMonth($conn,$dateIni,$dateEnd){
		$sql	="SELECT * FROM ".$this->model." WHERE  date >= '$dateIni' AND date <= ('$dateEnd' + INTERVAL 1 DAY)";
		$d 		= $conn->query($sql);
		if(!empty($d)){
			$key 						= "amount";
			$totalSales =  $this->totalAmount($d ,$key);
			$res = array('sales' => $d, 'totalSales' => $totalSales );
			return array("response" => $res );
		} else {
			return array("error" => "Error: no existen ventas.","sql"=>$sql);
		}
	}

	public function getAllSalesByUserMonth($conn,$dateIni,$dateEnd,$id){
		$sql	="SELECT * FROM ".$this->model." WHERE  idUser='$id' AND date >= '$dateIni' AND date <= ('$dateEnd' + INTERVAL 1 DAY)";
		$d 		= $conn->query($sql);
		if(!empty($d)){
			$key 						= "amount";
			$totalSales =  $this->totalAmount($d ,$key);
			$res = array('sales' => $d, 'totalSales' => $totalSales );
			return array("response" => $res );
		} else {
			return array("error" => "Error: no existen ventas.","sql"=>$sql);
		}
	}

	public function getSaleById($conn,$id){
		$sql	="SELECT * FROM ".$this->model." WHERE id='$id'";
		$d 		= $conn->query($sql);

		// CALLBACK
		if(!empty($d)){
			return array("response" => $d[0]);
		} else {
			return array("error" => "Error: no se encuentra la venta.");
		}
	}



	public function insertSale($conn,$sale){
		$md   	 = $this->model;
		$head 	 ="INSERT INTO ".$this->model;
		$insert .="(";
		$body 	.=" VALUES (";


		$last 	 = count($sale);

		$ind 	 = 1;
		foreach ($sale as $key => $vle) {
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
			return array("error" => "Error: al ingresar la venta.", "sql" => $sql);
		}
	}

	public function updateSale($conn, $sale){
		$body = "UPDATE ".$this->model." SET ";
		$last=count($sale);
		$ind=1;
		foreach ($sale as $key => $value) {
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
		$end=" WHERE id =".$sale["id"];
		$sql=$body.$end;
		$d 	= $conn->query($sql);

		// CALLBACK
		if(empty($d)){
			return array("response" => 'OK', "sql" => $sql);
		} else {
			return array("error" => "Error: al actualizar la venta.", "sql" => $sql);
		}
	}

	public function getSaleConcepts (){
		$concepts = array(
						array("concept" => "WEB"),
						array("concept" => "SOFTWARE"),
						array("concept" => "INFRAESTRUCTURA"),
						array("concept" => "ASESORAMIENTO"),
					);
		return array("response" => $concepts);
	}

	public function getSaleTypes (){
		$types = array(
						array("type" => "RE_SELLING", 		"name" => "REVENTA"),
						array("type" => "NEW_SELL", 	"name" => "NUEVA VENTA"),
						array("type" => "PAYMENT" ,		"name" => "PAGO"),
					);
		return array("response" => $types);
	}
}

?>
