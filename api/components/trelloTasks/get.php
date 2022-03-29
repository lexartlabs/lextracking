<?php
	// INCLUDE CLASS
	require("classes/TrelloTask.php");

	$conn 		= new Connection();
	$TrelloTask = new TrelloTask();
	$params 	= $match['params'];
	$name 		= $match['name'];

	if($params){

		// GET USER BY ID
		if($name == 'trello-by-id'){
			$id 		= $params["id"];
			$response 	= $TrelloTask->getTrelloTaskById($conn,$id);
			echo json_encode($response);
		}
		if($name == 'remove-trelloTask'){
			$id 		= $params["id"];
			$response 	= $TrelloTask->removeTrelloTask($conn,$id);
			echo json_encode($response);
		}
		if($name == 'remove-trelloBoard'){
			$id 		= $params["id"];
			$response 	= $TrelloTask->removeTrelloBoard($conn,$id);
			echo json_encode($response);
		}
		/*if($name == 'trello-all'){
			$id 		= $params["id"];
			$response 	= $TaskAuto->getAllTrelloTasks($conn,$params);
			echo json_encode($response);
		}*/
		/*if($name == 'task_automatic-by-idproject-and-iduser'){
			$id 		= $params["id"];
			$iduser 	= $params["iduser"];
			$response 	= $TaskAuto->getTaskAutomaticByProjectAndUser($conn,$id,$iduser);
			echo json_encode($response);
		}*/
		if($name == 'TrelloTask-by-user'){
			$id 		= $params["id"];
			$response 	= $TaskAuto->getTaskAutomaticByUser($conn,$id);
			echo json_encode($response);
		}

	} else {
		echo json_encode( array("response" => 'err') );
	}

?>
