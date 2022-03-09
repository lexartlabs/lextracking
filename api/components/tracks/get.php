 <?php 
	// INCLUDE CLASS
	require("classes/Track.php");

	$conn 		 = new Connection();
	$objUsr		 = new Track();
	$params  	 = $match['params'];
	$name 		 = $match['name'];

	if($params){
		
		// GET USER BY ID
		if($name == 'track-by-id'){
			$id 		= $params["id"];
			$response 	= $objUsr->getTrackById($conn,$id);
			echo json_encode($response);
		}

		if($name == 'delete-track-by-id'){
			$id 		= $params["id"];
			$response 	= $objUsr->deleteTrackById($conn,$id);
			echo json_encode($response);
		}
		if($name == 'track-by-iduser'){
			$id 		= $params["id"];
			$response 	= $objUsr->getTrackByUser($conn,$id);
			echo json_encode($response);
		}
		if($name == 'tracklast-by-iduser'){
			$id 		= $params["id"];
			$response 	= $objUsr->getLastTrackByUser($conn,$id);
			echo json_encode($response);
		}
		if($name == 'track-by-idtask'){
			$id 		= $params["id"];
			$response 	= $objUsr->getTrackByTask($conn,$id);
			echo json_encode($response);
		}
		if($name == 'track-by-taskuser'){
			$idUser 	= $params["id_user"];
			$idTask 	= $params["id_task"];
			$response 	= $objUsr->getTrackByTaskAndUser($conn,$idTask,$idUser);
			echo json_encode($response);
		}
		if($name == 'project-by-hour'){
			$idProject 	= $params["id"];
			$response 	= $objUsr->getProjectByHour($conn,$idProject);
			echo json_encode($response);
		}
		if($name == 'external-by-id') {
			$id = $params['id'];
			$response 	= $objUsr->one($conn,$id);
			echo json_encode($response);
		}
		if ($name == 'tracks-by-user-by-year') {
			$year = $params["year"];
			$id = $params["id"];
			$response 	= $objUsr->getUserHoursByYear($conn, $id, $year);
			echo json_encode($response);
		}
	}else {
		if($name == 'track-actives'){
			$response 	= $objUsr->getAllTracksActiveTracks($conn);
			echo json_encode($response);
		}
		if($name == 'external-by-month') {
			$month = $_GET['month'];
			$response 	= $objUsr->all($conn,$month);
			echo json_encode($response);
		}
		else {
			echo json_encode( array("response" => 'err') );
		}
	}
?>
