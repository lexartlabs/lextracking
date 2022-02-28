<?php

//
// EXAMPLE CLASS
//

class Bill {

	private $model = "Bills";

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

	// GET Bill BY ID
	public function getAllBills($conn){
		$sql	="SELECT * FROM ".$this->model;
		$d 		= $conn->query($sql);

		// CALLBACK
		if(!empty($d)){
			return array("response" => $d);
		} else {
			return array("error" => "Error: no existen facturas.");
		}
	}

	public function getBillById($conn,$id){
		$sql	="SELECT * FROM ".$this->model." WHERE id='$id'";
		$d 		= $conn->query($sql);

		// CALLBACK
		if(!empty($d)){
			return array("response" => $d[0]);
		} else {
			return array("error" => "Error: no se encuentra el bank.");
		}
	}



	public function insertBill($conn,$bill){
		$md   	 = $this->model;
		$head 	 ="INSERT INTO ".$this->model;
		$insert .="(";
		$body 	.=" VALUES (";
		// $bill["fechaCreado"]= date("Y-m-d");
		// $bill["fechaActualizado"]= date("Y-m-d");

		$last 	 = count($bill);

		$ind 	 = 1;
		foreach ($bill as $key => $vle) {
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
			return array("error" => "Error: al ingresar el factura.", "sql" => $sql);
		}
	}

	public function updateBill($conn, $bill){
		// $bill["fechaActualizado"]= date("Y-m-d");
		$body = "UPDATE ".$this->model." SET ";
		$last=count($bill);
		$ind=1;
		foreach ($bill as $key => $value) {
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

		$end=" WHERE id =".$bill["id"];
		$sql=$body.$end;
		$d 	= $conn->query($sql);


		// CALLBACK
		if(empty($d)){
			return array("response" => 'OK');
		} else {
			return array("error" => "Error: al actualizar el factura.", "sql" => $sql);
		}
	}
}

?>
