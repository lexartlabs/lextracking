<?php 
	// INCLUDE CLASS
	require("classes/Budget.php");

	$conn 		= new Connection();
	$objUsr		= new Budget();
	$params 	= $match['params'];
	$name 		= $match['name'];

	if($params){
		
		// GET USER BY ID
		if($name == 'budget-by-id'){
			$id 		= $params["id"];
			$response 	= $objUsr->getBudgetById($conn,$id);

			header('Content-Type: application/json');
			echo json_encode($response);
		}
		if($name == 'budgets-by-date'){
			$dateIni 	= $params["date_ini"];
			$dateEnd 	= $params["date_end"];
			$response 	= $objUsr->getAllBudgetsByMonth($conn,$dateIni,$dateEnd);

			header('Content-Type: application/json');
			echo json_encode($response);
		}
		if($name == 'budgets-by-user-date'){
			$dateIni 	= $params["date_ini"];
			$dateEnd 	= $params["date_end"];
			$id 			=	$params["id"];
			$response = $objUsr->getAllBudgetsByUserMonth($conn,$dateIni,$dateEnd,$id);

			header('Content-Type: application/json');
			echo json_encode($response);
		}

	} else {
		header('Content-Type: application/json');
		echo json_encode( array("response" => 'err') );
	}
	
?>