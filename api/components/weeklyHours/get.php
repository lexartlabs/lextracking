<?php
	// INCLUDE CLASS
	require("classes/WeeklyHours.php");

	$conn 		= new Connection();
	$objUsr		= new WeeklyHour();
	$params 	= $match['params'];
	$name 		= $match['name'];

	if($params){

		// GET USER BY ID
		if($name == 'weeklyHour-by-id'){
			$id 		= $params["id"];
			$response 	= $objUsr->getWeeklyHourById($conn,$id);

			header('Content-Type: application/json');
			echo json_encode($response);
		}

	} else {
		header('Content-Type: application/json');
		echo json_encode( array("response" => 'err') );
	}

?>
