<?php 
	// INCLUDE CLASS
	require("classes/Project.php");
	require("classes/Task.php");

	$conn 		= new Connection();
	$objUsr		= new Project();
	$objTsk		= new Task();
	
	$params 	= json_decode(file_get_contents('php://input'), true);
	$name 		= $match['name'];

	var_dump($params);

	if($params){
		// GET USER BY ID
		if($name == 'project-new'){
			$response = $objUsr->insertProject($conn,$params);
			echo json_encode($response);
		}
		if($name == 'project-update'){
			$response = $objUsr->updateProject($conn,$params);
			echo json_encode($response);
		}
		if($name == 'task-new'){
			$response = $objTsk->insertTask($conn,$params);
			echo json_encode($response);
		}
		if($name == 'task-update'){
			$response = $objTsk->updateTask($conn,$params);
			echo json_encode($response);
		}
		if($name == 'task-update-status'){
			$response = $objTsk->updateTaskStatus($conn,$params);
			echo json_encode($response);
		}

		if($name == 'task-all'){
			$response 	= $objTsk->getAllTasks($conn, $params);
			echo json_encode($response);
		}

	} else {
		echo json_encode( array("response" => 'err') );
	}
	
?>