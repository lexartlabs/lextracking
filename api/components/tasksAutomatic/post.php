<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_WARNING);

	// INCLUDE CLASS
	require("classes/TaskAutomatic.php");

	$conn 	      	= new Connection();
	$TaskAuto		= new taskAutomatic();

	$params 	= json_decode(file_get_contents('php://input'), true);
	$name 		= $match['name'];

	if($params){

		if($name == 'warehouse-new'){
			$response = $TaskAuto->insertTaskAutomatic($conn,$params);
		}
		if($name == 'task_automatic-update'){
			$response = $TaskAuto->updateTaskAutomatic($conn,$params);
			echo json_encode($response);
		}

	} else {
		echo json_encode( array("response" => 'err') );
	}

?>
