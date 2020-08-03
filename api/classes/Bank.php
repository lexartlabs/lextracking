<?php

//
// EXAMPLE CLASS
//

class Bank {

	private $model = "Banks";

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

	// GET Bank BY ID
	public function getAllBanks($conn){
		$sql	="SELECT * FROM ".$this->model;
		$d 		= $conn->query($sql);

		// CALLBACK
		if(!empty($d)){
			return array("response" => $d);
		} else {
			return array("error" => "Error: no existen bancos.");
		}
	}

	public function getBankById($conn,$id){
		$sql	="SELECT * FROM ".$this->model." WHERE id='$id'";
		$d 		= $conn->query($sql);

		// CALLBACK
		if(!empty($d)){
			return array("response" => $d[0]);
		} else {
			return array("error" => "Error: no se encuentra el bank.");
		}
	}



	public function insertBank($conn,$bank){
		$md   	 = $this->model;
		$head 	 ="INSERT INTO ".$this->model;
		$insert .="(";
		$body 	.=" VALUES (";
		// $bank["fechaCreado"]= date("Y-m-d");
		// $bank["fechaActualizado"]= date("Y-m-d");

		$last 	 = count($bank);

		$ind 	 = 1;
		foreach ($bank as $key => $vle) {
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
			return array("error" => "Error: al ingresar el banco.", "sql" => $sql);
		}
	}

	public function updateBank($conn, $bank){
		// $bank["fechaActualizado"]= date("Y-m-d");
		$body = "UPDATE ".$this->model." SET ";
		$last=count($bank);
		$ind=1;
		foreach ($bank as $key => $value) {
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
		
		$end=" WHERE id =".$bank["id"];
		$sql=$body.$end;
		$d 	= $conn->query($sql);


		// CALLBACK
		if(empty($d)){
			return array("response" => 'OK');
		} else {
			return array("error" => "Error: al actualizar el banco.", "sql" => $sql);
		}
	}
}

?>
