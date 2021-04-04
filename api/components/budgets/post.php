<?php 
	// INCLUDE CLASS
	require("classes/Budget.php");

	$conn 		= new Connection();
	$objUsr		= new Budget();

	$params 	= json_decode(file_get_contents('php://input'), true);
	$name 		= $match['name'];

	if($params){
		// GET USER BY ID
		if($name == 'budget-new'){
			$response = $objUsr->insertBudget($conn,$params);

			header('Content-Type: application/json');
			echo json_encode($response);
		}
		if($name == 'budget-update'){
			$response = $objUsr->updateBudget($conn,$params);

			header('Content-Type: application/json');
			echo json_encode($response);
		}
	} else {
		echo json_encode( array("response" => 'err') );
	}

?>
