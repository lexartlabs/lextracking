<?php 
	require("classes/Evaluate.php");

	$conn 		= new Connection();
	$objUsr		= new Evaluate();
	
	$params 	= json_decode(file_get_contents('php://input'), true);
	$name 		= $match['name'];
	if($params){
		// GET USER BY ID
		if($name == 'evaluate-new'){
			$response = $objUsr->insertEval($conn,$params);
			header('Content-Type: application/json');
			echo json_encode($response);
		}
	} else {
		echo json_encode( array("response" => 'err') );
	}
	
?>