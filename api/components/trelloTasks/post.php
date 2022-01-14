<?php 

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_WARNING);

	// INCLUDE CLASS
	require("classes/TrelloTask.php");

	$conn 	  	= new Connection();
	$Trello		= new TrelloTask();
	
	$params 	= json_decode(file_get_contents('php://input'), true);
	$name 		= $match['name'];

	if($params){

		if($name == 'trello-new'){
			$response = $Trello->insertTrelloTasks($conn,$params);
		}
		if($name == 'card-new'){
			$response = $Trello->insertTrelloCard($conn,$params);
			echo json_encode($response);
		}
		if($name == 'board-edit'){
			$response = $Trello->editTrelloBoard($conn,$params);
			echo json_encode($response);
		}

	} else {
		echo json_encode( array("response" => 'err') );
	}
	
?>