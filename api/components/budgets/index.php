<?php 
	
	// INCLUDE CLASS
	require("classes/Budget.php");

	$conn 		= new Connection();
	$objUsr		= new Budget();
	$name 		= $match['name'];

	if($name == 'budget-all'){
		$response 	= $objUsr->getAllBudgets($conn);
	}
	if($name == 'budget-statuses'){
		$response 	= $objUsr->getBudgetStatuses();
	}
	if($name == 'budget-concepts'){
		$response 	= $objUsr->getBudgetConcepts();
	}

	header('Content-Type: application/json');
	echo json_encode($response);
?>