<?php 

//
// EXAMPLE CLASS
//

class HourUser {

	private $model = "users_hours";

	public function getUserHours($conn, $id){
		$sql = "SELECT * FROM $this->model WHERE user_id = ".$id;
		$d   = $conn->query($sql);
		if (!empty($d)) {
			return array("response" => $d);
		} else {
			return array("response" => 'Error al asignar proyecto');
		}
	}

}

?>

