<?php 

//
// EXAMPLE CLASS
//

class HourUser {

	private $model = "users_hours";
	private $exceptions = "user_exceptions";
	private $tracks = "tracks";

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

	public function getUserExceptions($conn, $id, $fecha){

		$fullDate = explode("-", $fecha);
		$month = $fullDate[0];
		$year = $fullDate[1];

		$sql = "SELECT * FROM $this->exceptions WHERE user_id = ".$id. " AND MONTH(`start`) =".$month." AND YEAR(`start`) =".$year;
		$d   = $conn->query($sql);
		if (!empty($d)) {
			return array("response" => $d);
		} else {
			return array("response" => 'No hay excepciones para este mes');
		}
	}

	public function saveExceptions($conn, $params, $id, $fecha){
		$d = [];
		$sqli = "DELETE FROM $this->exceptions WHERE user_id = ".$id." AND DAY(start) = DAY('".$fecha."') AND Month(start) = Month('".$fecha."') AND Year(start) = Year('".$fecha."')";
		$b = $conn->query($sqli);

		foreach ($params as $days){
			if($days){
				$sql = "INSERT INTO $this->exceptions (user_id, day, title, start, end) VALUES (".$days['user_id'].",'".$days['day']."','".$days['title']."','".$days['start']."','".$days['end']."')";
				$d   = $conn->query($sql);
			}
		};

		if (!empty($d)) {
			return array("response" => $d);
		} else {
			return array("response" => 'Error al asignar proyecto');
		}
	}

	public function getTracksEvents($conn, $id, $fecha){
		$sql = "SELECT id, name AS title, startTime AS start, endTime AS end FROM $this->tracks WHERE idUser = ".$id." AND DAY(startTime) = DAY('".$fecha."') AND Month(startTime) = Month('".$fecha."') AND Year(startTime) = Year('".$fecha."')";
		$d   = $conn->query($sql);
		if (!empty($d)) {
			return array("response" => $d);
		} else {
			return array("response" => 'Error al asignar proyecto');
		}
	}

}

?>

