<?php
	// INCLUDE CLASS
	require("classes/EasyWeb.php");

	$conn 		= new Connection();
	$objUsr		= new EasyWeb();
	$params 	= $match['params'];
	$name 		= $match['name'];

	if($params){

		// GET USER BY ID
		if($name == 'app-easyweb-by-id'){
			$id 		= $params["id"];
			$response 	= $objUsr->getEasyWebById($conn,$id);

			header('Content-Type: application/json');
			echo json_encode($response);
		}

		if($name == 'app-easyweb-by-token'){
			$token 		= $params["token"];
			$response 	= $objUsr->getEasyWebByToken($conn,$token);

			header('Content-Type: application/json');
			echo json_encode($response);
		}

	} else {
		header('Content-Type: application/json');
		echo json_encode( array("response" => 'err') );
	}

?>