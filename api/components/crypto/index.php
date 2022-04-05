<?php 
	require("classes/Usuario.php");

	$objUsr		= new Usuario();
	$params 	= $match['params'];

	echo json_encode( array("psw" => $objUsr->cryptoPsw($params["psw"])) );
?>