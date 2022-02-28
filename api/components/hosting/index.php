<?php

	// INCLUDE CLASS
	require("classes/Hosting.php");

	$conn 		= new Connection();
	$objUsr		= new Hosting();
	$name 		= $match['name'];

	if($name == 'hosting-all'){
		$response 	= $objUsr->getAllHosting($conn);
	}
	if ($name == 'hosting-products') {
		$response 	= $objUsr->getProducts($conn);

	}

	header('Content-Type: application/json');
	echo json_encode($response);
?>
