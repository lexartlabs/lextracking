<?php 
	// INCLUDE CLASS
	require("classes/User.php");

	$conn 		= new Connection();
	$objUsr		= new User();

	$params 	= $match['params'];
	$params["active"] = empty($params["active"]) ? true : filter_var($params["active"], FILTER_VALIDATE_BOOLEAN);
	
	$response 	= $objUsr->getAllUsers($conn, $params);

	echo json_encode($response);
?>