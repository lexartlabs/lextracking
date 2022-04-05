<?php
	// INCLUDE CLASS
	require("classes/Bank.php");

	$conn 		= new Connection();
	$objUsr		= new Bank();
	$params 	= $match['params'];
	$name 		= $match['name'];

	if($params){

		// GET USER BY ID
		if($name == 'bank-by-id'){
			$id 		= $params["id"];
			$response 	= $objUsr->getBankById($conn,$id);

			header('Content-Type: application/json');
			echo json_encode($response);
		}

	} else {
		header('Content-Type: application/json');
		echo json_encode( array("response" => 'err') );
	}

?>
