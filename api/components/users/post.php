<?php 
	// INCLUDE CLASS
	require("classes/User.php");

	$conn 		= new Connection();
	$objUsr		= new User();
	
	$params 	= json_decode(file_get_contents('php://input'), true);
	$name 		= $match['name'];

	if($params){
		// GET USER BY ID
		if($name == 'user-new'){
			$response = $objUsr->insertUser($conn,$params);
			echo json_encode($response);
		}
		if($name == 'user-update'){
			$response = $objUsr->updateUser($conn,$params);
			echo json_encode($response);
		}
		if($name == 'user-login'){
			$response = $objUsr->login($conn,$params);
			echo json_encode($response);
		}
		if($name == 'user-performance'){
			$response = $objUsr->savePerformance($conn,$params);
			echo json_encode($response);
		}
		if($name == 'user-performance-by-id'){
			$response 	= $objUsr->getPerformanceById($conn,$params);
			echo json_encode($response);
		}
		if($name == 'performance-all'){
			$response 	= $objUsr->getAllPerformance($conn,$params);
			echo json_encode($response);
		}
	} else {
		echo json_encode( array("response" => 'err') );
	}
	
?>