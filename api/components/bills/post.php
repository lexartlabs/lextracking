<?php
	// INCLUDE CLASS
	require("classes/Bill.php");

	$conn 		= new Connection();
	$objUsr		= new Bill();

	$params 	= json_decode(file_get_contents('php://input'), true);
	$name 		= $match['name'];

	if($params){
		// GET USER BY ID
		if($name == 'bill-new'){
			$response = $objUsr->insertBill($conn,$params);

			header('Content-Type: application/json');
			echo json_encode($response);
		}
		if($name == 'bill-update'){
			$response = $objUsr->updateBill($conn,$params);

			header('Content-Type: application/json');
			echo json_encode($response);
		}
	} else {
		echo json_encode( array("response" => 'err') );
	}

?>
