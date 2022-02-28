<?php 

//
// EXAMPLE CLASS
//
require("vendor/autoload.php");

class Biller {

    public function postQuery($params, $url){
        $postBody = $params;

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, Biller_Api . $url);
        curl_setopt($ch, CURLOPT_POST, 1);
    
        // TOKEN POST           
        curl_setopt( $ch, CURLOPT_HTTPHEADER, array('Authorization: Bearer '.Biller_Token,'Content-Type:application/json'));
           
        // MAKE POST
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($postBody) );

        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        $server_output = curl_exec ($ch);
        curl_close ($ch);
        return json_decode( $server_output ,true);
    }

    public function getQuery($url){
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, Biller_Api . $url); 
        // TOKEN POST           
        curl_setopt( $ch, CURLOPT_HTTPHEADER, array('Authorization: Bearer '.Biller_Token,'Content-Type:application/json'));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); 
        $server_output = curl_exec($ch); 
        curl_close($ch); 
        return json_decode( $server_output ,true);
    }

	public function crear($conn, $params){
        $response = $this->postQuery($params, "/comprobantes/crear");
        return array("response" => $response);
	}
    public function obtener($conn, $params){
        $url = "/comprobantes/obtener?";
        !empty($params['id']) ? $url = $url."id=".$params['id'] : "" ;
        !empty($params['sucursal']) ? $url = $url."sucursal=".$params['sucursal'] : "" ;
        !empty($params['desde']) ? $url = $url."desde=".$params['desde'] : "" ;
        !empty($params['hasta']) ? $url = $url."hasta=".$params['hasta'] : "" ;
        $response = $this->getQuery($url);
        return array("response" => $response);
	}
    public function pdf($conn, $params){
        $url = "/comprobantes/pdf";
        !empty($params['id']) ? $url = $url."?id=".$params['id'] : "" ;
        $response = $this->getQuery($url);
        return array("response" => $response);
	}
}


?>

