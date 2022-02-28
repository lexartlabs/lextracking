<?php
	// INCLUDE CLASS
	require("classes/Bank.php");

	$conn 		= new Connection();
	$objUsr		= new Bank();

	$params 	= json_decode(file_get_contents('php://input'), true);
	$name 		= $match['name'];

	if($params){
		// GET USER BY ID
		if($name == 'bank-new'){
			$response = $objUsr->insertBank($conn,$params);

			header('Content-Type: application/json');
			echo json_encode($response);
		}
		if($name == 'bank-update'){
			$response = $objUsr->updateBank($conn,$params);

			header('Content-Type: application/json');
			echo json_encode($response);
		}
	} else {
		echo json_encode( array("response" => 'err') );
	}

?>
