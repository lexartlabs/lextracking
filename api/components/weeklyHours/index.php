<?php

	// INCLUDE CLASS
	require("classes/WeeklyHours.php");

	$conn 		= new Connection();
	$objUsr		= new WeeklyHour();
	$name 		= $match['name'];
	if($name == 'weeklyHour-all'){
		$response 	= $objUsr->getAllWeeklyHours($conn);
	}


	header('Content-Type: application/json');
	echo json_encode($response);
?>
