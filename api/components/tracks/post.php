<?php 
	// INCLUDE CLASS

	require("classes/Track.php");

	$conn 		= new Connection();
	$objUsr		= new Track();
	
	$params 	= json_decode(file_get_contents('php://input'), true);
	$name 		= $match['name'];

	if($params){
		if($name == 'track-new'){
			$response = $objUsr->insertTrack($conn,$params);
			echo json_encode($response);
		}
		if($name == 'track-by-month'){
			$response 	= $objUsr->getTrackByMonth($conn,$params);
			echo json_encode($response);
		}
		if($name == 'autoTrack-new'){
			$response = $objUsr->insertAutoTrack($conn,$params);
			echo json_encode($response);
		}
		if($name == 'track-trello-new'){
			$response = $objUsr->insertTrelloTrack($conn,$params);
			echo json_encode($response);
		}
		if($name == 'track-jira-new'){
			$response = $objUsr->insertJiraTrack($conn,$params);
			echo json_encode($response);
		}
		if($name == 'track-update'){
			$response = $objUsr->updateTrack($conn,$params);
			echo json_encode($response);
		}
		if($name == 'autoTrack-update'){
			$response = $objUsr->updateAutoTrack($conn,$params);
			echo json_encode($response);
		}
		if($name == 'tracks'){
			$idClient 	= $params["idClient"];
			$idProject 	= $params["idProject"];
			$idTask 	= $params["idTask"];
			$idUser 	= $params["idUser"];
			$startTime 	= $params["startTime"];
			$endTime 	= $params["endTime"];
			$response 	= $objUsr->getTracks($conn, $idClient, $idProject, $idTask, $idUser, $startTime, $endTime);

			echo json_encode($response);
		}
		if($name == 'tracks-auto'){
			$idClient 	= $params["idClient"];
			$idProject 	= $params["idProject"];
			//$idTask 	= $params["idTask"];
			$idUser 	= $params["idUser"];
			$startTime 	= $params["startTime"];
			$endTime 	= $params["endTime"];
			$response 	= $objUsr->getAutoTracks($conn, $idClient, $idProject, $idTask, $idUser, $startTime, $endTime);

			echo json_encode($response);
		}
		if($name == 'tracks-trello'){
			$idClient 	= $params["idClient"];
			$idProject 	= $params["idProject"];
			//$idTask 	= $params["idTask"];
			$idUser 	= $params["idUser"];
			$startTime 	= $params["startTime"];
			$endTime 	= $params["endTime"];
			$response 	= $objUsr->getTrelloTracks($conn, $idClient, $idProject, $idTask, $idUser, $startTime, $endTime);

			echo json_encode($response);
		}

		if($name == 'tracks-jira'){
			$idClient 	= $params["idClient"];
			$idProject 	= $params["idProject"];
			//$idTask 	= $params["idTask"];
			$idUser 	= $params["idUser"];
			$startTime 	= $params["startTime"];
			$endTime 	= $params["endTime"];
			$response 	= $objUsr->getJiraTracks($conn, $idClient, $idProject, $idTask, $idUser, $startTime, $endTime);

			echo json_encode($response);
		}

		if ($name == 'track-trello-update'){
			$response = $objUsr->updateTrelloTrack($conn, $params);
			echo json_encode($response);
		}
	} else {
		echo json_encode( array("response" => 'err') );
	}
	
?>