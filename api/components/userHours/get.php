<?php 
	// INCLUDE CLASS
	require("classes/HourUser.php");

	$conn 		= new Connection();
	$objUsr		= new HourUser();
	$params 	= $match['params'];
	$name 		= $match['name'];

	if($params){
		
		// GET USER BY ID
		if($name == 'user-hours'){
			$id 		= $params["id"];
			$response 	= $objUsr->getUserFixedHours($conn,$id);
			echo json_encode($response);
		}

		if($name == 'user-exceptions'){
			$id 		= $params["id"];
			$fecha 	= $params["fecha"];
			$response 	= $objUsr->getUserExceptions($conn,$id, $fecha);
			echo json_encode($response);
		}

	} else {
		echo json_encode( array("response" => 'err') );
	}
	
?>