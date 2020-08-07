<?php 
	// INCLUDE CLASS
	require("classes/Project.php");
	require("classes/Task.php");

	$conn 		= new Connection();
	$objUsr		= new Project();
	$objTsk		= new Task();
	$name 		= $match['name'];
	
	$params 	= json_decode(file_get_contents('php://input'), true);

	if($name == 'project-all'){
		$response 	= $objUsr->getAllProjects($conn);
	}
	if($name == 'task-all'){
		$response 	= $objTsk->getAllTasks($conn, $params);
	}

	echo json_encode($response);
?>