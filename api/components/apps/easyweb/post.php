<?php
	// INCLUDE CLASS
	require("classes/EasyWeb.php");

	$conn 		= new Connection();
	$objUsr		= new EasyWeb();

	$params 	= json_decode(file_get_contents('php://input'), true);
	$name 		= $match['name'];


	if($params){
		// GET USER BY ID
		if($name == 'app-easyweb-new'){
			$response = $objUsr->insertEasyWeb($conn,$params);

			header('Content-Type: application/json');
			echo json_encode($response);
		}
		if($name == 'app-easyweb-update'){
			$response = $objUsr->updateEasyWeb($conn,$params);

			header('Content-Type: application/json');
			echo json_encode($response);
		}
	} else {
		
		header('Content-Type: application/json');
		echo json_encode( array("response" => 'err') );
	}

?>