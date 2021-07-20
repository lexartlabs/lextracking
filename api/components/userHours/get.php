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
			$response 	= $objUsr->getUserHours($conn,$id);
			echo json_encode($response);
		}

	} else {
		echo json_encode( array("response" => 'err') );
	}
	
?>