<?php 
	// INCLUDE CLASS
	require("classes/User.php");

	$conn 		= new Connection();
	$objUsr		= new User();
	$params 	= $match['params'];
    $name 		= $match['name'];
    
	if($params){
		// GET USER BY ID
		if($name == 'user-delete'){
			$id 		= $params["id"];

            
			$response 	= $objUsr->softDeleteUser($conn,$id);
			echo json_encode($response);
		}

	} else {
		echo json_encode( array("response" => 'err') );
	}
	
?>