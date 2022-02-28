<?php 
	// INCLUDE CLASS
	require("classes/Finance.php");

	$conn 		= new Connection();
	$objUsr		= new Finance();
	$params 	= $match['params'];
	$name 		= $match['name'];

	if($params){
		
		// GET USER BY ID
		if($name == 'finance-by-id'){
			$id 		= $params["id"];
			$response 	= $objUsr->getFinanceById($conn,$id);

			header('Content-Type: application/json');
			echo json_encode($response);
		}


		if($name == 'finances-by-date'){
			$dateIni 	= $params["date_ini"];
			$dateEnd 	= $params["date_end"];
			$response 	= $objUsr->getAllFinancesByMonth($conn,$dateIni,$dateEnd);

			header('Content-Type: application/json');
			echo json_encode($response);
		}

	} else {
		header('Content-Type: application/json');
		echo json_encode( array("response" => 'err') );
	}
	
?>