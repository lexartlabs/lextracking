<?php

class Externals {

  private $model = "Tracks";

  // Helpers
  public function validatePayload($payload) {
    if (!$payload['idUser']) { return "user id is required";}
    if (!$payload['plataform']) { return "plataform is required";}
    if (!$payload['currency']) { return "currency is required";}
    if (!$payload['duration']) { return "duration is required";}
    return "true";
  }

  public function ConvertTimeToDecimal($value){
    $time = explode(":",$value);
    $horas = floatval($time[0]);
    $minutes = floatval($time[1])/60;
    $seconds = floatval($time[2])/3600;
    $fraccionaria = $minutes + $seconds;
    $decimal = floatval($horas+$fraccionaria);
    return $decimal;
  }

  // CRUD
  public function create($conn, $report) {
    $isValid = $this->validatePayload($report);

    if ($isValid == "true") {
      $idProject = $report['idProyecto'] ? $report['idProyecto'] : 0;

      $sql = "
        INSERT INTO ".$this->model."
            (`idUser`, `name`, `typeTrack`, `currency`, `idProyecto`, `duracion`, `startTime`)
          VALUES
            (
            ".$report['idUser'].",
            '".$report['plataform']."',
            'external',
            '".$report['currency']."',
            ".$idProject.",
            '".$report['duration']."',
            NOW()
          );
        ";

      $d = $conn->query($sql);

      if(empty($d)){
        return array("response" => 'OK');
      } else {
        return array("error" => "Error: al ingresar el reporte.", "sql" => $sql);
      }
    } else {
      return array("error" => "Error: '$isValid'");
    }
  }

  public function all($conn, $month) {
    // Busco las informaciones del track
    $sql = "
      SELECT
        t.id,
        t.idUser,
        t.currency,
        t.name AS 'plataform',
        t.startTime,
        t.duracion AS 'duration',
        c.name AS 'client',
        p.name AS 'project',
        u.name AS 'user'
      FROM ".$this->model." AS t
      INNER JOIN Users AS u ON t.idUser = u.id
      INNER JOIN Projects AS p ON p.id = t.idProyecto
      INNER JOIN Clients AS c ON c.id = p.idClient
      WHERE `typeTrack` = 'external' AND MONTH(startTime) = ".$month;
    
    $d = $conn->query($sql);

    // Calculo el precio de las horas
    for($i=0; $i < count($d); $i++) {
      $sql_cost	= "SELECT costHour FROM WeeklyHours WHERE idUser='".$d[$i]['idUser']."'";
      $d_cost 		= $conn->query($sql_cost);
      if(!empty($d_cost)){
				$cost = $d_cost[0]['costHour'];
				$costDecimal = $this->ConvertTimeToDecimal($d[$i]['duration']);
				$d[$i]['trackCost'] = round($costDecimal * $cost, 2) ? round($costDecimal * $cost, 2) : 0 ;
			}
    };

		if(!empty($d)){
			return array("response" => $d);
		} else {
			return array("error" => "Error: no existen reportes para esta fecha.");
		}
  }

  public function one($conn, $id) {
    $sql = "
      SELECT
        t.id,
        t.idUser,
        t.currency,
        t.name AS 'plataform',
        t.startTime,
        t.duracion AS 'duration',
        c.name AS 'client',
        p.name AS 'project',
        u.name AS 'user'
      FROM ".$this->model." AS t
      INNER JOIN Users AS u ON t.idUser = u.id
      INNER JOIN Projects AS p ON p.id = t.idProyecto
      INNER JOIN Clients AS c ON c.id = p.idClient
      WHERE `typeTrack` = 'external' AND t.id = ".$id;
    
    $d = $conn->query($sql);

    // Calculo el precio de las horas
    for($i=0; $i < count($d); $i++) {
      $sql_cost	= "SELECT costHour FROM WeeklyHours WHERE idUser='".$d[$i]['idUser']."'";
      $d_cost 		= $conn->query($sql_cost);
      if(!empty($d_cost)){
				$cost = $d_cost[0]['costHour'];
				$costDecimal = $this->ConvertTimeToDecimal($d[$i]['duration']);
				$d[$i]['trackCost'] = round($costDecimal * $cost, 2) ? round($costDecimal * $cost, 2) : 0 ;
			}
    };

		if(!empty($d)){
			return array("response" => $d[0]);
		} else {
			return array("error" => "Error: Id invalido.");
		}
  }

  public function update($conn, $report, $id) {
    $isValid = $this->validatePayload($report);

    if ($isValid == "true") {
      $idProject = $report['idProyecto'] ? $report['idProyecto'] : 0;

      $sql = "
        UPDATE ".$this->model." SET
          `idUser` = ".$report['idUser'].",
          `name` = '".$report['plataform']."',
          `currency` = '".$report['currency']."',
          `idProyecto` = ".$idProject.",
          `duracion` = '".$report['duration']."'
        WHERE id = ".$id.";
        ";

      $d = $conn->query($sql);

      if(empty($d)){
        return array("response" => 'OK');
      } else {
        return array("error" => "Error: al modificar el reporte.", "sql" => $sql);
      }
    } else {
      return array("error" => "Error: '$isValid'");
    }
  }

}

?>
