<?php 

/*ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_WARNING);*/


	// INCLUDE CLASS
	require("classes/TrelloTask.php");

	$conn 		= new Connection();
	$TrelloTask	= new TrelloTask();
	$name 		= $match['name'];

	if($name == 'trello-all'){
		$response 	= $TrelloTask->getAllTrelloTasks($conn);
	}
	if($name == 'get-card-id'){
		$response 	= $TrelloTask->getByIdCard($conn);
	}
	/*if($name == 'task-all'){
		$response 	= $objTsk->getAllTasks($conn);
	}*/

	echo json_encode($response);
?>