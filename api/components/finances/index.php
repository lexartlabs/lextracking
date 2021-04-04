<?php 
	
	// INCLUDE CLASS
	require("classes/Finance.php");

	$conn 		= new Connection();
	$objUsr		= new Finance();
	$name 		= $match['name'];

	if($name == 'finances-all'){
		$response 	= $objUsr->getAllFinances($conn);
	}

	if($name == 'finances-statuses'){
		$response 	= $objUsr->getFinanceStatuses();
	}

	if($name == 'finances-concepts'){
		$response 	= $objUsr->getFinanceConcepts();
	}

	if($name == 'finances-types'){
		$response 	= $objUsr->getFinanceTypes();
	}

	header('Content-Type: application/json');
	echo json_encode($response);
?>