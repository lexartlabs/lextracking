<?php 

//
// EXAMPLE CLASS
//

class User {

	private $model = "Users";

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
	public function cryptoPsw($psw){
		$key 	= "y0ur.k3y";
		$ps 	= strtoupper(sha1($psw.$key));
		return 	$ps;
	}

	// GET USER BY ID
	public function getAllUsers($conn){
		$sql	="SELECT * FROM ".$this->model;
		$d 		= $conn->query($sql);
		
		// CALLBACK
		if(!empty($d)){
			return array("response" => $d);
		} else {
			return array("error" => "Error: no existen usuarios.");
		}
	}

	public function getUserById($conn,$id){
		$sql	="SELECT * FROM ".$this->model." WHERE id='$id'";
		$d 		= $conn->query($sql);
		
		// CALLBACK
		if(!empty($d)){
			return array("response" => $d[0]);
		} else {
			return array("error" => "Error: no se encuentra el usuario.");
		}
	}

	public function login($conn, $user){
		// CLEAR FIELDS
		// $user["email"] 		= $conn->escapeString($user["email"]);
		// $user["password"] 	= $conn->escapeString($user["password"]);
  //       $user["password"] 	=  $this->cryptoPsw($user["password"].$user["email"]);

		$sql	="SELECT * FROM ".$this->model." WHERE email='$user[email]' AND password = '$user[password]'";
		$d 		= $conn->query($sql);
		
		// CALLBACK
		if(!empty($d)){

			// SET TOKEN
			$d[0]["token"] =  $this->cryptoPsw($d[0]["password"].$d[0]["email"]);	
			return array("response" => $d[0]);
		} else {
			return array("error" => "Error: email o clave incorrecta.");
		}
	}

	public function insertUser($conn,$user){
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
		
		// CALLBACK
		if(empty($d)){
			return array("response" => 'OK');
		} else {
			return array("error" => "Error: al ingresar el usuario.", "sql" => $sql);
		}
	}

	public function updateUser($conn, $user){
		$sql = "UPDATE ".$this->model." SET name = '$user[name]', email = '$user[email]', password = '$user[password]', role = '$user[role]' WHERE id='$user[id]'";
		$d 	= $conn->query($sql);

		// CALLBACK
		if(empty($d)){
			return array("response" => 'OK', "sql" => $sql);
		} else {
			return array("error" => "Error: al actualizar el usuario.", "sql" => $sql);
		}
	}
}

?>

