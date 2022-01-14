<?php 
	// INCLUDE CLASS
	require("classes/HourCost.php");

	$conn 		= new Connection();
	$objUsr		= new HourCost();
	
	$params 	= json_decode(file_get_contents('php://input'), true);
	$name 		= $match['name'];

	if($params){
		// GET USER BY ID
		if($name == 'hourcost-new'){
			$response = $objUsr->insertHourCost($conn,$params);

			header('Content-Type: application/json');
			echo json_encode($response);
		}
		if($name == 'hourcost-update'){
			$response = $objUsr->updateHourCost($conn,$params);

			header('Content-Type: application/json');
			echo json_encode($response);
		}
	} else {
		echo json_encode( array("response" => 'err') );
	}
	
?>