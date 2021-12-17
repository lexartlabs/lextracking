<?php 
	// INCLUDE CLASS
	require("classes/Client.php");

	$conn 		= new Connection();
	$objUsr		= new Client();
	$params 	= $match['params'];
	$name 		= $match['name'];

	if($params){
		
		// GET USER BY ID
		if($name == 'client-by-id'){
			$id 		= $params["id"];
			$response 	= $objUsr->getClientById($conn,$id);
			echo json_encode($response);
		}

	} else {
		echo json_encode( array("response" => 'err') );
	}
	
?>