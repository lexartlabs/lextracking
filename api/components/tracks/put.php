<?php

require("classes/Track.php");

  $conn 		= new Connection();
	$objUsr		= new Track();
	
	$params 	= json_decode(file_get_contents('php://input'), true);
	$name 		= $match['name'];

  if($params) {
    if ($name == 'update-external') {
      $id = $match['params']['id'];

      $response = $objUsr->update($conn, $params, $id);
			echo json_encode($response);
    }
  } else {
    echo json_encode( array("response" => 'err') );
  }
?>