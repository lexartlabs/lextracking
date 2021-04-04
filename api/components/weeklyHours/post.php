<?php
	// INCLUDE CLASS
	require("classes/WeeklyHours.php");

	$conn 		= new Connection();
	$objUsr		= new WeeklyHour();

	$params 	= json_decode(file_get_contents('php://input'), true);
	$name 		= $match['name'];

	if($params){
		// GET USER BY ID
		if($name == 'weeklyHour-new'){
			$response = $objUsr->insertWeeklyHour($conn,$params);

			header('Content-Type: application/json');
			echo json_encode($response);
		}
		if($name == 'weeklyHour-update'){
			$response = $objUsr->updateWeeklyHour($conn,$params);

			header('Content-Type: application/json');
			echo json_encode($response);
		}
		
	} else {
		echo json_encode( array("response" => 'err') );
	}

?>
