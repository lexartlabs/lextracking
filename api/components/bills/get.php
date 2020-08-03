<?php
	// INCLUDE CLASS
	require("classes/Bill.php");

	$conn 		= new Connection();
	$objUsr		= new Bill();
	$params 	= $match['params'];
	$name 		= $match['name'];

	if($params){

		// GET USER BY ID
		if($name == 'bill-by-id'){
			$id 		= $params["id"];
			$response 	= $objUsr->getBillById($conn,$id);

			header('Content-Type: application/json');
			echo json_encode($response);
		}

	} else {
		header('Content-Type: application/json');
		echo json_encode( array("response" => 'err') );
	}

?>
