<?php 
	// INCLUDE CLASS
	require("classes/HourUser.php");

	$conn 		= new Connection();
	$objUsr		= new HourUser();
	$params_get = $match['params'];
	$params 	= json_decode(file_get_contents('php://input'), true);
	$name 		= $match['name'];

	if(count($params) >= 0){
		// GET USER BY ID
		if($name == 'save-fixed-hours'){
			$response = $objUsr->saveUserFixedHours($conn,$params);
			echo json_encode($response);
		}
		if($name == 'edit-fixed-hours'){
			$response = $objUsr->editUserFixedHours($conn,$params);
			echo json_encode($response);
		}
		if($name == 'save-exceptions'){
			$id = $params_get["id"];
			$fecha 	= $params_get["date_ini"];

			$response = $objUsr->saveExceptions($conn, $params, $id, $fecha);
			echo json_encode($response);
		}
	} else {
		echo json_encode( array("response" => 'err') );
	}
	
?>