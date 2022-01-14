<?php

	// INCLUDE CLASS
	require("classes/Bill.php");

	$conn 		= new Connection();
	$objUsr		= new Bill();
	$name 		= $match['name'];

	if($name == 'bill-all'){
		$response 	= $objUsr->getAllBills($conn);
	}


	header('Content-Type: application/json');
	echo json_encode($response);
?>
