<?php 
	// INCLUDE CLASS
	require("classes/Jira.php");

	$conn 		= new Connection();
	$objUsr		= new JiraCloud();
	
	$params 	= json_decode(file_get_contents('php://input'), true);
	$name 		= $match['name'];

	if($params){
		// GET USER BY ID
		if($name == 'issues-by-board'){
			$response = $objUsr->issuesByBoard($conn,$params);

			header('Content-Type: application/json');
			echo json_encode($response);
		}
		if($name == 'save-dashboards'){
			$response = $objUsr->saveBoards($conn,$params);

			header('Content-Type: application/json');
			echo json_encode($response);
		}
		if($name == 'get-issue'){
			$response = $objUsr->getIssue($conn,$params);

			header('Content-Type: application/json');
			echo json_encode($response);
		}
		if($name == 'add-comment'){
			$response = $objUsr->addComment($conn,$params);

			header('Content-Type: application/json');
			echo json_encode($response);
		}
		if($name == 'update-issue'){
			$response = $objUsr->editIssue($conn,$params);

			header('Content-Type: application/json');
			echo json_encode($response);
		}
		if($name == 'save-issue'){
			$response = $objUsr->saveIssue($conn,$params);

			header('Content-Type: application/json');
			echo json_encode($response);
		}
		if($name == 'delete-issues'){
			$response = $objUsr->deleteIssues($conn,$params);

			header('Content-Type: application/json');
			echo json_encode($response);
		}

		
		
	} else {
		echo json_encode( array("response" => 'err') );
	}
	
?>