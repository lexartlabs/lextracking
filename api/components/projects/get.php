<?php
	// INCLUDE CLASS
	require("classes/Project.php");
	require("classes/Task.php");

	$conn 		= new Connection();
	$objUsr		= new Project();
	$objTsk		= new Task();
	$params 	= $match['params'];
	$name 		= $match['name'];

	if($params){

		// GET USER BY ID
		if($name == 'project-by-id'){
			$id 		= $params["id"];
			$response 	= $objUsr->getProjectById($conn,$id);
			echo json_encode($response);
		}
		if($name == 'project-by-idclient'){
			$id 		= $params["id"];
			$response 	= $objUsr->getProjectByClient($conn,$id);
			echo json_encode($response);
		}
		if($name == 'task-by-idclient'){
			$id 		= $params["id"];
			$response 	= $objTsk->getTaskByIdClient($conn,$id);
			echo json_encode($response);
		}

		if($name == 'project-by-idUser'){
			$id 		= $params["id"];
			$response 	= $objUsr->getProjectsByIdUser($conn,$id);
			echo json_encode($response);
		}
		if($name == 'task-by-id'){
			$id 		= $params["id"];
			$response 	= $objTsk->getTaskById($conn,$id);
			echo json_encode($response);
		}
		if($name == 'task-by-idproject'){
			$id 		= $params["id"];
			$response 	= $objTsk->getTasksByProject($conn,$id);
			echo json_encode($response);
		}
		if($name == 'project-by-iddeveloper'){
			$id 		= $params["id"];
			$response 	= $objUsr->getProjectsByDeveloper($conn,$id);
			echo json_encode($response);
		}
		if($name == 'task-by-idproject-and-iduser'){
			$id 		= $params["id"];
			$iduser 	= $params["iduser"];
			$response 	= $objTsk->getTasksByProjectAndUser($conn,$id,$iduser);
			echo json_encode($response);
		} if($name == 'tasks-by-user'){
			$id 		= $params["id"];
			$response 	= $objTsk->getTasksByUser($conn,$id);
			echo json_encode($response);
		} if($name == 'tasks-delete'){
			$id 		= $params["id"];
			$response 	= $objTsk->deleteTask($conn,$id);
			echo json_encode($response);
		}


	} else {
		echo json_encode( array("response" => 'err') );
	}

?>
