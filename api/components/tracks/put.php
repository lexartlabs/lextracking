<?php

  require("classes/Externals.php");

  $conn 		= new Connection();
	$externals = new Externals();
	
	$params 	= json_decode(file_get_contents('php://input'), true);
	$name 		= $match['name'];

  if($params) {
    if ($name == 'update-external') {
      $id = $match['params']['id'];

      $response = $externals->update($conn, $params, $id);
			echo json_encode($response);
    }
  } else {
    echo json_encode( array("response" => 'err') );
  }
?>