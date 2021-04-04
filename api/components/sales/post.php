<?php
	// INCLUDE CLASS
	require("classes/Sales.php");

	$conn 		= new Connection();
	$objUsr		= new Sale();

	$params 	= json_decode(file_get_contents('php://input'), true);
	$name 		= $match['name'];

	if($params){
		// GET USER BY ID
		if($name == 'sale-new'){
			$response = $objUsr->insertSale($conn,$params);

			header('Content-Type: application/json');
			echo json_encode($response);
		}
		if($name == 'sale-update'){
			$response = $objUsr->updateSale($conn,$params);

			header('Content-Type: application/json');
			echo json_encode($response);
		}
	} else {
		echo json_encode( array("response" => 'err') );
	}

?>
