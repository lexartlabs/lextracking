<?php
	// INCLUDE CLASS
	require("classes/Evaluate.php");

	$conn 		= new Connection();
	$objUsr		= new Evaluate();
	$params 	= $match['params'];
	$name 		= $match['name'];

	if($params){

		// GET USER BY ID
		if($name == 'evaluate-user'){
			$id 		= $params["id"];
			$response 	= $objUsr->getEvaluateByUser($conn,$id);

			header('Content-Type: application/json');
			echo json_encode($response);
		}

	} else {
		header('Content-Type: application/json');
		echo json_encode( array("response" => 'err') );
	}

?>