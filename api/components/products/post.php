<?php
	// INCLUDE CLASS
	require("classes/Product.php");

	$conn 		= new Connection();
	$objUsr		= new Product();

	$params 	= json_decode(file_get_contents('php://input'), true);
	$name 		= $match['name'];

	if($params){
		// GET USER BY ID
		if($name == 'product-new'){
			$response = $objUsr->insertProduct($conn,$params);

			header('Content-Type: application/json');
			echo json_encode($response);
		}
		if($name == 'product-update'){
			$response = $objUsr->updateProduct($conn,$params);

			header('Content-Type: application/json');
			echo json_encode($response);
		}
	} else {
		echo json_encode( array("response" => 'err') );
	}

?>
