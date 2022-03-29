<?php 
	
	// INCLUDE CLASS
	require("classes/HourCost.php");

	$conn 		= new Connection();
	$objUsr		= new HourCost();
	$name 		= $match['name'];

	if($name == 'hourscost-all'){
		$response 	= $objUsr->getAllHoursCost($conn);
	}

	header('Content-Type: application/json');
	echo json_encode($response);
?>