<?php
	// INCLUDE CLASS
	require("classes/taskAutomatic.php");

	$conn 		= new Connection();
	$TaskAuto	= new taskAutomatic();
	$params 	= $match['params'];
	$name 		= $match['name'];

	if($params){

		// GET USER BY ID
		if($name == 'task_automatic-by-id'){
			$id 		= $params["id"];
			$response 	= $TaskAuto->getTaskAutomaticById($conn,$id);
			echo $response[0];
		}
		if($name == 'task_automatic-by-idclient'){
			$id 		= $params["id"];
			$response 	= $TaskAuto->getTaskAutomaticByClient($conn,$id);
			echo json_encode($response);
		}
		if($name == 'task_automatic-by-id'){
			$id 		= $params["id"];
			$response 	= $TaskAuto->getTaskAutomaticById($conn,$id);
			echo json_encode($response);
		}
		/*if($name == 'task_automatic-by-idproject'){
			$id 		= $params["id"];
			$response 	= $objTsk->getTasksByProject($conn,$id);
			echo json_encode($response);
		}*/
		if($name == 'task_automatic-by-iddeveloper'){
			$id 		= $params["id"];
			$response 	= $TaskAuto->getTaskAutomaticByDeveloper($conn,$id);
			echo json_encode($response);
		}
		/*if($name == 'task_automatic-by-idproject-and-iduser'){
			$id 		= $params["id"];
			$iduser 	= $params["iduser"];
			$response 	= $TaskAuto->getTaskAutomaticByProjectAndUser($conn,$id,$iduser);
			echo json_encode($response);
		}*/
		if($name == 'task_automatic-by-user'){
			$id 		= $params["id"];
			$response 	= $TaskAuto->getTaskAutomaticByUser($conn,$id);
			echo json_encode($response);
		}

		if ($name == 'task_automatic-delete') {
			$id 		= $params["id"];
			$response 	= $TaskAuto->deleteTaskAutomatic($conn,$id);
			echo json_encode($response);
		}

	} else {
		echo json_encode( array("response" => 'err') );
	}

?>
