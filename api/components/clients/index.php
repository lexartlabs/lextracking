<?php 
	// INCLUDE CLASS
	require("classes/Client.php");

	$conn 		= new Connection();
	$objUsr		= new Client();

	$response 	= $objUsr->getAllClients($conn);

	echo json_encode($response);
?>