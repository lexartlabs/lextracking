<?php

	// INCLUDE CLASS
	require("classes/EasyWeb.php");

	$conn 		= new Connection();
	$objUsr		= new EasyWeb();
	$name 		= $match['name'];

	if($name == 'app-easyweb-all'){
		$response 	= $objUsr->getAllEasyweb($conn);
	}

	header('Content-Type: application/json');
	echo json_encode($response);
?>
