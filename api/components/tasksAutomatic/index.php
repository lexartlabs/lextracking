<?php 

/*ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_WARNING);*/


	// INCLUDE CLASS
	require("classes/TaskAutomatic.php");

	$conn 		= new Connection();
	$TaskAuto	= new taskAutomatic();
	$name 		= $match['name'];

	if($name == 'task_automatic-all'){
		$response 	= $TaskAuto->getAlltaskAutomatic($conn);
	}
	/*if($name == 'task-all'){
		$response 	= $objTsk->getAllTasks($conn);
	}*/

	echo json_encode($response);
?>