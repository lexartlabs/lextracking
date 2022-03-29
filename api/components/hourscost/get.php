<?php 
	// INCLUDE CLASS
	require("classes/HourCost.php");

	$conn 		= new Connection();
	$objUsr		= new HourCost();
	$params 	= $match['params'];
	$name 		= $match['name'];

	if($params){
		
		// GET USER BY ID
		if($name == 'hourcost-by-id'){
			$id 		= $params["id"];
			$response 	= $objUsr->getHourCostById($conn,$id);

			header('Content-Type: application/json');
			echo json_encode($response);
		}

	} else {
		header('Content-Type: application/json');
		echo json_encode( array("response" => 'err') );
	}
	
?>