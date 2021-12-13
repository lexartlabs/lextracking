<?php

//
// EXAMPLE CLASS
//

class Product {

	private $model = "Products";

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

	// GET Product BY ID
	public function getAllProducts($conn){
		$sql	="SELECT * FROM ".$this->model." WHERE borrado=0";
		$d 		= $conn->query($sql);

		// CALLBACK
		if(!empty($d)){
			for ($i=0; $i <sizeof($d) ; $i++) {
				if ($d[$i]["type"]=="Administracion productos externos") {
					$d[$i]["accessData"] 	= json_decode( str_replace("\n", "<br>",$d[$i]["accessData"]) );

				}
			}
			return array("response" => $d);
		} else {
			return array("error" => "Error: no existen productoss.");
		}
	}





	public function getProductById($conn,$id){
		$sql	="SELECT * FROM ".$this->model." WHERE id='$id' AND borrado=0";
		$d 		= $conn->query($sql);

		// CALLBACK
		if(!empty($d)){
			$i=0;
			if ($d[$i]["type"]=="Administracion productos externos") {
				$d[$i]["accessData"] 	= json_decode( str_replace("\n", "<br>",$d[$i]["accessData"]) );

			}
			return array("response" => $d[0]);
		} else {
			return array("error" => "Error: no se encuentra el bank.");
		}
	}



	public function insertProduct($conn,$product){
		$md   	 = $this->model;
		$head 	 ="INSERT INTO ".$this->model;
		$insert .="(";
		$body 	.=" VALUES (";
		if ($product["type"]=="Administracion productos externos") {
			$product["accessData"]=json_encode($product["accessData"]);
		}


		$last 	 = count($product);

		$ind 	 = 1;
		foreach ($product as $key => $vle) {
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
			return array("error" => "Error: al ingresar el productos.", "sql" => $sql);
		}
	}

	public function updateProduct($conn, $product){
		// $product["fechaActualizado"]= date("Y-m-d");
		$body = "UPDATE ".$this->model." SET ";
		$last=count($product);
		$ind=1;
		foreach ($product as $key => $value) {
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

		$end=" WHERE id =".$product["id"];
		$sql=$body.$end;
		$d 	= $conn->query($sql);


		// CALLBACK
		if(empty($d)){
			return array("response" => 'OK');
		} else {
			return array("error" => "Error: al actualizar el productos.", "sql" => $sql);
		}
	}
}

?>
