<?php 

//
// EXAMPLE CLASS
//

class User {

	private $model = "Users";
	private $pModel = "Performance";

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

	public function savePerformance($conn, $params){
		$sql = "SELECT * FROM ".$this->pModel." WHERE idMonth = '$params[idMonth]' AND year = '$params[year]' AND idUser = '$params[idUser]'";
		$d   = $conn->query($sql);
		$id  = $d[0]['id'];
		if(empty($d)){
			$sql_save = "INSERT INTO ".$this->pModel." (`idUser`, `year`, `idMonth`, `month`, `salary`, `costHour`) VALUES ('$params[idUser]', '$params[year]', '$params[idMonth]', '$params[month]', '$params[salary]', '$params[costHour]')";
			$d_save   = $conn->query($sql_save);
		} else {
			$sql_update = "UPDATE ".$this->pModel." SET `year`= '$params[year]',`idMonth`='$params[idMonth]',`month`='$params[month]',`salary`='$params[salary]',`costHour`='$params[costHour]' WHERE id = ".$id;
			$d_update   = $conn->query($sql_update);
		}
	}

	public function getPerformanceById($conn, $params){
		$sql = "SELECT * FROM ".$this->pModel." WHERE idMonth = '$params[idMonth]' AND year = '$params[year]' AND idUser = '$params[idUser]'";
		$d   = $conn->query($sql);

		if(!empty($d)){
			return array("response" => $d);
		} else {
			return array("error" => "Error: no existen usuarios.");
		}
	}

	public function getAllPerformance($conn, $params){
		$sql = "SELECT * FROM ".$this->pModel." WHERE year = '$params[year]' AND idUser = '$params[idUser]' AND NOT idMonth = '$params[actMonth]' AND NOT idMonth = '$params[pastMonth]'";
		$d   = $conn->query($sql);

		if(!empty($d)){
			return array("response" => $d);
		} else {
			return array("error" => "Error: no existen usuarios.");
		}		
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

