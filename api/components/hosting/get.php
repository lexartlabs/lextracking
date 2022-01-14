<?php
	// INCLUDE CLASS
	require("classes/Hosting.php");

	$conn 		= new Connection();
	$objUsr		= new Hosting();
	$params 	= $match['params'];
	$name 		= $match['name'];

	if($params){

		// GET USER BY ID
		if($name == 'hosting-by-id'){
			$id 		= $params["id"];
			$response 	= $objUsr->getHostingById($conn,$id);

			header('Content-Type: application/json');
			echo json_encode($response);
		}
		if($name == 'hosting-by-serviceNumber'){
			$id 		= $params["serviceNumber"];
			$response 	= $objUsr->getHostingByServiceNumber($conn,$id);

			header('Content-Type: application/json');
			echo json_encode($response);
		}

	} else {
		header('Content-Type: application/json');
		echo json_encode( array("response" => 'err') );
	}

?>
