<?php

//
// EXAMPLE CLASS
//

class Hosting {

	private $model = "Hosting";

	private $products=[
		array(
			'name' => "VPS DigitalOcean" ,
			'state'=>"Active",
			'access'=>  array('user' => "user",'password'=>"password" ,'link'=>"ftp.lexartlabs.uy" )
		),
		array(
			'name' => "Hosting básico" ,
			'state'=>"Active",
			'access'=>  array('user' => "user",'password'=>"password" ,'link'=>"ftp.lexartlabs.uy" )


		),
		array(
			'name' => "App hosting" ,
			'state'=>"Active",
			'access'=>  array('user' => "user",'password'=>"password" ,'link'=>"ftp.lexartlabs.uy" )


		)

	];

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
	public 	function generateRandomString($length) {
		$characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
		$charactersLength = strlen($characters);
		$randomString = '';
		for ($i = 0; $i < $length; $i++) {
			$randomString .= $characters[rand(0, $charactersLength - 1)];
		}
		return $randomString;
	}


	public function getProducts($conn){
		return array("response" => $this->products);
	}

	// GET Hosting BY ID
	public function getAllHosting($conn){
		$sql	="SELECT * FROM ".$this->model." Where borrado='0' ";
		$d 		= $conn->query($sql);

		// CALLBACK
		if(!empty($d)){

			for ($i=0; $i <sizeof($d) ; $i++) {
				if ($d[$i]["company"]==1) {
					$d[$i]["contact"] 	= json_decode( str_replace("\n", "<br>", $d[$i]["contact"]) );

				}
				if (!empty($d[$i]["products"])) {
					$d[$i]["products"]=json_decode( str_replace("\n", "<br>", $d[$i]["products"]) );

				}
			}
			return array("response" => $d);
		} else {
			return array("error" => "Error: no existen bancos.");
		}
	}

	public function getHostingById($conn,$id){
		$sql	="SELECT * FROM ".$this->model." WHERE id='$id' AND borrado ='0' ";
		$d 		= $conn->query($sql);

		// CALLBACK
		if(!empty($d)){


			if($d[0]["company"]==1){
				$d[0]["contact"] 	= json_decode( str_replace("\n", "<br>", $d[0]["contact"]) );

			}
			if (!empty($d[0]["products"])) {
				$d[0]["products"]=json_decode( str_replace("\n", "<br>", $d[0]["products"]) );

			}
			return array("response" => $d[0]);
		} else {
			return array("error" => "Error: no se encuentra el bank.");
		}
	}

	public function getHostingByServiceNumber($conn,$serviceNumber){
		$sql	="SELECT * FROM ".$this->model." WHERE serviceNumber='$serviceNumber'  AND borrado ='0' ";
		$d 		= $conn->query($sql);

		// CALLBACK
		if(!empty($d)){

			if($d[0]["company"]==1){
				$d[0]["contact"] 	= json_decode( str_replace("\n", "<br>", $d[0]["contact"]) );

			}
			if (! empty($d[0]["products"])) {
				$d[0]["products"]=json_decode( str_replace("\n", "<br>", $d[0]["products"]) );

			}
			return array("response" => $d[0]);
		} else {
			return array("error" => "Error: no se encuentra el web builder.");
		}
	}





	public function insertHosting($conn,$web){
		$md   	 = $this->model;
		$head 	 ="INSERT INTO ".$this->model;
		$insert .="(";
		$body 	.=" VALUES (";
		$ind 	 = 1;

		// $web["fechaCreado"]= date("Y-m-d");
		// $web["fechaActualizado"]= date("Y-m-d");
		if (!empty($web["products"])) {
			$web["products"]=json_encode($web["products"]);
		}


		if(!empty($web["company"]) && $web["company"]==1){
			$web["contact"] 	= json_encode(  $web["contact"] );

		}
		$last 	 = count($web);


		foreach ($web as $key => $vle) {
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
			$rand = $this->generateRandomString(5);
			$id=mysql_insert_id();
			$serviceNumber= array('id' =>$id ,"serviceNumber"=> $id.$rand );
			$res= $this->updateHosting($conn,$serviceNumber);


			return array("response" => 'OK');
		} else {
			return array("error" => "Error: al ingresar el banco.", "sql" => $sql);
		}
	}

	public function updateHosting($conn, $web){
		// $web["fechaActualizado"]= date("Y-m-d");
		$body = "UPDATE ".$this->model." SET ";
		$ind=1;

		if(!empty($web["company"]) && $web["company"]==1){
			$web["contact"] 	= json_encode(  $web["contact"] );

		}

		if (!empty($web["products"])) {
			$web["products"]=json_encode($web["products"]);
		}
		
		$last=count($web);

		foreach ($web as $key => $value) {
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

		$end=" WHERE id =".$web["id"];
		$sql=$body.$end;
		$d 	= $conn->query($sql);


		// CALLBACK
		if(empty($d)){
			return array("response" => 'OK');
		} else {
			return array("error" => "Error: al actualizar el hosting.", "sql" => $sql);
		}
	}
	public function deleteHosting($conn,$id){
			$body = "UPDATE ".$this->model." SET borrado ='1' ";
			$end=" WHERE id =".$id;
			$sql = $body.$end;
			$d=$conn->query($sql);
			if(empty($d)){
				return array("response" => 'OK');
			} else {
				return array("error" => "Error: al borrar  el hosting.", "sql" => $sql);
			}

	}

}

?>
