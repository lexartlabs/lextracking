<?php 

//
// EXAMPLE CLASS
//

class HourUser {

	private $model = "users_hours";
	private $exceptions = "user_exceptions";

	public function getUserFixedHours($conn, $id){
		$sql = "SELECT * FROM $this->model WHERE user_id = ".$id;
		$d   = $conn->query($sql);
		if (!empty($d)) {
			return array("response" => $d);
		} else {
			return array("response" => 'Error al asignar proyecto');
		}
	}

	public function saveUserFixedHours($conn, $params){
		$d = [];
		$sqli = "DELETE FROM $this->model WHERE user_id = ".$params[7]['id'];
		$b = $conn->query($sqli);

		foreach ($params as $days){
			if(!empty($days['horarios'])){
				foreach ($days['horarios'] as $hour){
					$sql = "INSERT INTO $this->model (user_id, day, start, end) VALUES (".$days['user_id'].",'".$days['name']."','".$hour['desde']."','".$hour['hasta']."')";
					$d   = $conn->query($sql);
				}
			}
		};
		if (!empty($d)) {
			return array("response" => $d);
		} else {
			return array("response" => 'Error al asignar proyecto');
		}
	}

	public function editUserFixedHours($conn, $params){

		foreach ($params as $days){
			if(count($days['horarios']) > 0 && $days['user_id']){
				foreach ($days['horarios'] as $hour){
					$sql = "UPDATE $this->model SET 'day' = '".$days['name']."', 'start' = '".$hour['start']."', 'end' = '".$hour['end']."' WHERE user_id =".$params['user_id'];
					$d   = $conn->query($sql);

					if (!empty($d)) {
						return array("response" => $d);
					} else {
						return array("response" => 'Error al asignar proyecto');
					}
				}
			}
		};

	}

	public function deleteUserFixedHours($conn, $params){
		foreach ($params as $days){
				foreach ($days['horarios'] as $hour){
					if($hour['isDeleted'] == true){
						$sql = "UPDATE $this->model SET 'updated_at' = now(), 'deleted_at' = now() WHERE user_hour_id =".$hour['user_hour_id'];
						$d   = $conn->query($sql);

						if (!empty($d)) {
							return array("response" => $d);
						} else {
							return array("response" => 'Error al asignar proyecto');
						}
					}
				}
		};
	}

	public function getUserExceptions($conn, $id){
		$sql = "SELECT * FROM $this->exceptions WHERE user_id = ".$id;
		$d   = $conn->query($sql);
		if (!empty($d)) {
			return array("response" => $d);
		} else {
			return array("response" => 'Error al asignar proyecto');
		}
	}

}

?>

