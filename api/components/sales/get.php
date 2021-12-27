<?php
	// INCLUDE CLASS
	require("classes/Sales.php");

	$conn 		= new Connection();
	$objUsr		= new Sale();
	$params 	= $match['params'];
	$name 		= $match['name'];

	if($params){

		// GET USER BY ID
		if($name == 'sale-by-id'){
			$id 		= $params["id"];
			$response 	= $objUsr->getSaleById($conn,$id);

			header('Content-Type: application/json');
			echo json_encode($response);
		}
		if($name == 'sales-by-date'){
			$dateIni 	= $params["date_ini"];
			$dateEnd 	= $params["date_end"];
			$response 	= $objUsr->getAllSalesByMonth($conn,$dateIni,$dateEnd);

			header('Content-Type: application/json');
			echo json_encode($response);
		}
		if($name == 'sales-by-user-date'){
			$dateIni 	= $params["date_ini"];
			$dateEnd 	= $params["date_end"];
			$id 			=	$params["id"];
			$response = $objUsr->getAllSalesByUserMonth($conn,$dateIni,$dateEnd,$id);

			header('Content-Type: application/json');
			echo json_encode($response);
		}
		if($name == 'sales-total-by-date') {
			$dateIni 	= $params["date_ini"];
			$dateEnd 	= $params["date_end"];
			$response 	= $objUsr->getSalesTotalsMonth($conn,$dateIni,$dateEnd);

			header('Content-Type: application/json');
			echo json_encode($response);
		}

	} else {
		header('Content-Type: application/json');
		echo json_encode( array("response" => 'err') );
	}

?>
