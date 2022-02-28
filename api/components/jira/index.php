<?php 

	// INCLUDE CLASS
	require("classes/Jira.php");
	
	$conn 		= new Connection();
	$Jira	    = new JiraCloud();
	$name 		= $match['name'];
	$params 	= json_decode(file_get_contents('php://input'), true);

	if($name == 'all-dashboards'){
		$response 	= $Jira->getAllDashboards($conn, $params);
		header('Content-Type: application/json');
		echo json_encode($response);
	} else {
		echo json_encode($response);	
	}

?>