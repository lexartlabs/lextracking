<?php 
	// INCLUDE CLASS
	require("classes/Project.php");
	require("classes/Task.php");

	$conn 		= new Connection();
	$objUsr		= new Project();
	$objTsk		= new Task();
	$name 		= $match['name'];

	if($name == 'project-all'){
		$response 	= $objUsr->getAllProjects($conn);
	}
	if($name == 'task-all'){
		$response 	= $objTsk->getAllTasks($conn);
	}

	echo json_encode($response);
?>