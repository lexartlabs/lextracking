<?php 
/**
* 
*/
class Token {

	// CRYPTO FUNCTION
	public function cryptoPsw($psw){
		$key 	= "y0ur.k3y";
		$ps 	= strtoupper(sha1($psw.$key));
		return 	$ps;
	}

	public function checkToken($conn, $token){
		$sql = "SELECT password, email, role FROM Users";
		$d 	 = $conn->query($sql);
		$cnt = count($d);
		$find= false;
		for ($i=0; $i < $cnt; $i++) { 
			if($token == $this->cryptoPsw($d[$i]["password"].$d[$i]["email"])){
				$find = true;
				$role = $d[$i]['role'];
				break;
			}
		}

		return array("find_token" => $find, "role"=>$role);
	}

}


?>