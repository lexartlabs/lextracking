<?php 
	// INCLUDE CLASS
	require("classes/Client.php");

	$conn 		= new Connection();
	$objUsr		= new Client();
	
	$params 	= json_decode(file_get_contents('php://input'), true);
	$name 		= $match['name'];

	if($params){
		// GET USER BY ID
		if($name == 'client-new'){
			$response = $objUsr->insertClient($conn,$params);
			echo json_encode($response);
		}
		if($name == 'client-update'){
			$response = $objUsr->updateClient($conn,$params);
			echo json_encode($response);
		}
	} else {
		echo json_encode( array("response" => 'err') );
	}
	
?>