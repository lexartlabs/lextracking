<?php
	// INCLUDE CLASS
	require("classes/Hosting.php");

	$conn 		= new Connection();
	$objUsr		= new Hosting();

	$params 	= json_decode(file_get_contents('php://input'), true);
	$name 		= $match['name'];

	if($params){
		// GET USER BY ID
		if($name == 'hosting-new'){
			$response = $objUsr->insertHosting($conn,$params);

			header('Content-Type: application/json');
			echo json_encode($response);
		}
		if($name == 'hosting-update'){
			$response = $objUsr->updateHosting($conn,$params);

			header('Content-Type: application/json');
			echo json_encode($response);
		}
		if($name == 'hosting-delete'){
			$response = $objUsr->deleteHosting($conn,$params["id"]);

			header('Content-Type: application/json');
			echo json_encode($response);
		}
	} else {
		echo json_encode( array("response" => 'err') );
	}

?>
