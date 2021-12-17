<?php 
	// INCLUDE CLASS
	require("classes/Track.php");

	$conn 		= new Connection();
	$objUsr		= new Track();

	$response 	= $objUsr->getAllTracks($conn);

	echo json_encode($response);
?>