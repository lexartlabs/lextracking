<?php 
	// INCLUDE CLASS
	require("classes/Biller.php");

	$conn 		= new Connection();
	$objBiller		= new Biller();
	
	$params 	= json_decode(file_get_contents('php://input'), true);
	$name 		= $match['name'];

	if($params){
		// GET USER BY ID
		if($name == 'crear'){
			$response = $objBiller->crear($conn,$params);

			header('Content-Type: application/json');
			echo json_encode($response);
		}
		if($name == 'obtener'){
			$response = $objBiller->obtener($conn,$params);

			header('Content-Type: application/json');
			echo json_encode($response);
		}
		if($name == 'pdf'){
			$response = $objBiller->pdf($conn,$params);

			header('Content-Type: application/json');
			echo json_encode($response);
		}
	} else {
		echo json_encode( array("response" => 'err') );
	}
	
?>