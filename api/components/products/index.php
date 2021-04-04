<?php

	// INCLUDE CLASS
	require("classes/Product.php");

	$conn 		= new Connection();
	$objUsr		= new Product();
	$name 		= $match['name'];

	if($name == 'product-all'){
		$response 	= $objUsr->getAllProducts($conn);
	}


	header('Content-Type: application/json');
	echo json_encode($response);
?>
