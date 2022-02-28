<?php 
	// INCLUDE CLASS
	require("classes/Finance.php");

	$conn 		= new Connection();
	$objUsr		= new Finance();
	
	$params 	= json_decode(file_get_contents('php://input'), true);
	$name 		= $match['name'];

	if($params){
		// GET USER BY ID
		if($name == 'finance-new'){
			$response = $objUsr->insertFinance($conn,$params);

			header('Content-Type: application/json');
			echo json_encode($response);
		}
		if($name == 'finance-update'){
			$response = $objUsr->updateFinance($conn,$params);

			header('Content-Type: application/json');
			echo json_encode($response);
		}
	} else {
		echo json_encode( array("response" => 'err') );
	}
	
?>