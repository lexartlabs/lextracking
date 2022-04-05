<?php
	// INCLUDE CLASS
	require("classes/Product.php");

	$conn 		= new Connection();
	$objUsr		= new Product();
	$params 	= $match['params'];
	$name 		= $match['name'];

	if($params){

		// GET USER BY ID
		if($name == 'product-by-id'){
			$id 		= $params["id"];
			$response 	= $objUsr->getProductById($conn,$id);

			header('Content-Type: application/json');
			echo json_encode($response);
		}

	} else {
		header('Content-Type: application/json');
		echo json_encode( array("response" => 'err') );
	}

?>
