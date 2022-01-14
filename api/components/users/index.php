<?php 
	// INCLUDE CLASS
	require("classes/User.php");

	$conn 		= new Connection();
	$objUsr		= new User();

	$response 	= $objUsr->getAllUsers($conn);

	echo json_encode($response);
?>