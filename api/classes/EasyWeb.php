<?php

//
// EXAMPLE CLASS
//

class EasyWeb {

	private $model = "EasyWeb";

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
	public function getAllEasyweb($conn){
		$sql	="SELECT ".$this->model.".id, ".$this->model.".name, ".$this->model.".domain, Users.name AS developer  FROM ".$this->model."
				  JOIN Users ON ".$this->model.".idUser = Users.id";
		$d 		= $conn->query($sql);

		// CALLBACK
		if(!empty($d)){
			return array("response" => $d);
		} else {
			return array("error" => "Error: no existen APPs.");
		}
	}

	public function getEasyWebById($conn,$id){
		$sql	="SELECT * FROM ".$this->model." WHERE id='$id'";
		$d 		= $conn->query($sql);

		$d[0]["jsonMenu"] 		= json_decode( str_replace("\n", "<br>", $d[0]["jsonMenu"]) );
		$d[0]["jsonSections"] 	= json_decode( preg_replace("/\s+|\n+|\r/", ' ', str_replace("\n", "<br>", $d[0]["jsonSections"])) );
		$d[0]["jsonSliders"] 	= json_decode( str_replace("\n", "<br>", $d[0]["jsonSliders"]) );
		$d[0]["jsonForm"] 		= json_decode( str_replace("\n", "<br>", $d[0]["jsonForm"]) );
		$d[0]["jsonFooter"] 	= json_decode( str_replace("\n", "<br>", $d[0]["jsonFooter"]) );

		// CALLBACK
		if(!empty($d)){
			return array("response" => $d[0]);
		} else {
			return array("error" => "Error: no se encuentra la APP.");
		}
	}

	public function getEasyWebByToken($conn,$id){
		$sql	="SELECT
					name,
					domain,
					description,
					jsonMenu AS menuItems,
					jsonSections AS sections,
					jsonSliders AS sliders,
					jsonForm AS form,
					jsonFooter AS footers
				FROM ".$this->model." WHERE connectToken='$id'";
		$d 		= $conn->query($sql);

		$d[0]["menuItems"] 		= json_decode( str_replace("\n", "<br>", $d[0]["menuItems"]) );
		$d[0]["sections"] 		= json_decode( preg_replace("/\s+|\n+|\r/", ' ', str_replace("\n", "<br>", $d[0]["sections"])) );
		$d[0]["sliders"] 		= json_decode( str_replace("\n", "<br>", $d[0]["sliders"]) );
		$d[0]["footers"] 		= json_decode( preg_replace("/\s+|\n+|\r/", ' ', str_replace("\n", "<br>", $d[0]["footers"])) );
		$d[0]["form"] 			= json_decode( str_replace("\n", "<br>", $d[0]["form"]) );
		$d[0]["description"]	= str_replace("\n", "<br>", $d[0]["description"]);

		// CALLBACK
		if(!empty($d)){
			return array("response" => $d[0], "myToken" => $id);
		} else {
			return array("error" => "Error: no se encuentra la APP.");
		}
	}

	public function insertEasyWeb($conn,$easyWeb){
		$md   	 	= $this->model;
		$rand 	 	= rand();

		// CRYPTO TOKEN
		$connToken  = strtoupper( sha1($rand . $easyWeb["name"] . $easyWeb["domain"]) );

		$jsonMenu 		= json_encode( $easyWeb["jsonMenu"] );
		$jsonSections 	= json_encode( $easyWeb["jsonSections"] );
		$jsonSliders 	= json_encode( $easyWeb["jsonSliders"] );
		$jsonForm 		= json_encode( $easyWeb["jsonForm"] );
		$jsonFooter 		= json_encode( $easyWeb["jsonFooter"] );

		$sql 	 = "INSERT INTO ".$md."
					(
						name,
						domain,
						description,
						jsonMenu,
						jsonSections,
						jsonSliders,
						jsonForm,
						jsonFooter,
						active,
						idUser,
						connectToken
					) VALUES (
						'$easyWeb[name]',
						'$easyWeb[domain]',
						'$easyWeb[description]',
						'$jsonMenu',
						'$jsonSections',
						'$jsonSliders',
						'$jsonForm',
						'$jsonFooter',
						'$easyWeb[active]',
						'$easyWeb[idUser]',
						'$connToken'
					)";
		$d 		 = $conn->query($sql);

		// CALLBACK
		if(empty($d)){
			return array("response" => array("connectToken" => $connToken, "success" => true));
		} else {
			return array("error" => "Error: al ingresar la APP.", "sql" => $sql, "success" => false);
		}
	}

	public function updateEasyWeb($conn, $easyWeb){

		$jsonMenu 		= json_encode( $easyWeb["jsonMenu"] );
		$jsonSections 	= json_encode( $easyWeb["jsonSections"] );
		$jsonSliders 	= json_encode( $easyWeb["jsonSliders"] );
		$jsonForm 		= json_encode( $easyWeb["jsonForm"] );
		$jsonFooter 	= json_encode( $easyWeb["jsonFooter"] );

		$sql = "UPDATE ".$this->model." SET
					name 			= '$easyWeb[name]',
					domain 			= '$easyWeb[domain]',
					description 	= '$easyWeb[description]',
					jsonMenu 		= '$jsonMenu',
					jsonSections 	= '$jsonSections',
					jsonSliders 	= '$jsonSliders',
					jsonForm 		= '$jsonForm',
					jsonFooter		= '$jsonFooter',
					active 			= '$easyWeb[active]'
					WHERE id='$easyWeb[id]'";
		$d 	= $conn->query($sql);

		// CALLBACK
		if(empty($d)){
			return array("response" => array("success" => true));
		} else {
			return array("error" => "Error: al actualizar la APP.", "sql" => $sql);
		}
	}
}

?>
