<?php 

//
// EXAMPLE CLASS
//

class HourUser {

	private $model = "users_hours";

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
		foreach ($params as $days){
				foreach ($days['horarios'] as $hour){
					$sql = "INSERT INTO $this->model ('user_id', 'day', 'start', 'end') VALUES (".$params['user_id'].",".$days['name'].",".$hour['start'].",".$hour['end'].")";
					$d   = $conn->query($sql);
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
			foreach ($days as $day){
				foreach ($day['horarios'] as $hour){
					$sql = "UPDATE $this->model SET 'day' = ".$day['name'].", 'start' = ".$hour['start'].", 'end' = ".$hour['end']." WHERE user_id =".$params['user_id'];
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

	public function deleteUserFixedHours($conn, $params){
		foreach ($params as $days){
			foreach ($days as $day){
				foreach ($day['horarios'] as $hour){
					if($hour['isDeleted'] == true){
						$sql = "UPDATE $this->model SET 'updated_at' = now(), 'deleted_at' = now() WHERE user_hour_id =".$params['user_hour_id'];
						$d   = $conn->query($sql);
					}
				}
			}
		};

		if (!empty($d)) {
			return array("response" => $d);
		} else {
			return array("response" => 'Error al asignar proyecto');
		}
	}

}

?>

