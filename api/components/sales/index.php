<?php

	// INCLUDE CLASS
	require("classes/Sales.php");

	$conn 		= new Connection();
	$objUsr		= new Sale();
	$name 		= $match['name'];
	if($name == 'sale-all'){
		$response 	= $objUsr->getAllSales($conn);
	}
	if($name == 'sales-concepts'){
		$response 	= $objUsr->getSaleConcepts();
	}

	if($name == 'sales-types'){
		$response 	= $objUsr->getSaleTypes();
	}


	header('Content-Type: application/json');
	echo json_encode($response);
?>
