<?php

	// INCLUDE CLASS
	require("classes/Bank.php");

	$conn 		= new Connection();
	$objUsr		= new Bank();
	$name 		= $match['name'];

	if($name == 'bank-all'){
		$response 	= $objUsr->getAllBanks($conn);
	}


	header('Content-Type: application/json');
	echo json_encode($response);
?>
