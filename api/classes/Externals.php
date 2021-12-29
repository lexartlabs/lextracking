<?php

class Externals {

  private $model = "Externals";

  public function create($conn, $report) {}

  public function all($conn) {
    $sql = "SELECT * FROM ".$this->model;
    $d 		= $conn->query($sql);

		if(!empty($d)){
			return array("response" => $d);
		} else {
			return array("error" => "Error: no existen reportes para esta fecha.");
		}
  }

  public function byId($conn, $id) {}

  public function update($conn, $report, $id) {}

}

?>
