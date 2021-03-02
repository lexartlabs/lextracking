<?php 

//
// EXAMPLE CLASS
//
require("vendor/autoload.php");

class JiraCloud {

	private $model  = "jiraboards";
	private $modelT = "jiratasks";

	public function getAllDashboards($conn, $params){
		//TRAER TODOS LOS BOARDS ASIGNADOS AL PROYECTO
		Unirest\Request::verifyPeer(false); 
		Unirest\Request::auth($mail, $token);
		$b = base64_encode($params['email'].":".$params['token']);

		$headers = array(
		  'Authorization' => 'Basic '.$b,
		  'Accept' => 'application/json'
		);

		$response = Unirest\Request::get(
  			  'https://test-lexart.atlassian.net/rest/api/3/project/search',
		  $headers
		);

		if(!empty($response)){
			for ($i=0; $i < $response->body->total; $i++) { 
				//VERIFICA SI EL BOARD NO EXISTE EN LA BASE DE DATOS
				$sql = "SELECT * FROM ".$this->model." WHERE idBoard = ".$response->body->values[$i]->id." AND keyProject = '".$response->body->values[$i]->key."' HAVING id";
				$d   = $conn->query($sql);
				if (empty($d)) {
					//SI NO EXISTE, GUARDA EL BOARD EN LA BD
					$sql_save = "INSERT INTO ".$this->model." (idBoard, keyProject, name) VALUES ('".$response->body->values[$i]->id."', '".$response->body->values[$i]->key."', '".$response->body->values[$i]->name."')";
					$d_save   = $conn->query($sql_save);
				}
			}
			if ($i == $response->body->total) {
				//CUANDO SE COMPLETA EL FOR, TRAE TODOS LOS TABLEROS DE LA BASE DE DATOS
				$sql = "SELECT * FROM ".$this->model;
				$d   = $conn->query($sql);
				if (!empty($d)) {
					return array('response' => $d);				
				} else {
					return array('response' => 'Error');				
				}
			}
		} else {
			return array("error" => "Error: no existen proyectos.");
		}
	}

	public function saveBoards($conn, $params){
		//ASIGNAR PROYECTO AL BOARD DE JIRA
		$sql = "UPDATE ".$this->model." SET idProyecto = ".$params['idProyecto'].", projectName = '".$params['projectName']."' WHERE id = ".$params['id'];
		$d   = $conn->query($sql);
		if (!empty($d)) {
			return array("response" => $d);
		} else {
			return array("response" => 'Error al asignar proyecto');
		}
	}

	public function issuesByBoard($conn, $params){
		
		Unirest\Request::verifyPeer(false); 
		Unirest\Request::auth($mail, $token);
		$b = base64_encode($params['email'].":".$params['token']);
		$headers = array(
		   'Authorization' => 'Basic '.$b,
		   'Accept' => 'application/json'
		);

		$response = Unirest\Request::get(
		  'https://test-lexart.atlassian.net/rest/api/3/search?jql=project='.$params['idBoard'],
		  $headers
		);

		$issues = array();
		if(!empty($response)){
			for ($i=0; $i < $response->body->total; $i++) { 
				$issues[] = $response->body->issues[$i]->id;
				//BUSCA EL ISSUE EN LA BASE DE DATOS
				$sql = "SELECT * FROM ".$this->modelT." WHERE idTask = ".$response->body->issues[$i]->id." AND keyTask = '".$response->body->issues[$i]->key."' HAVING id";
				$d   = $conn->query($sql);
				if (empty($d)) {
					//SI NO EXISTE EL ISSUE LO CREA
					$sql_save = "INSERT INTO ".$this->modelT." (idTask, keyTask, idBoard, name, status, priority, reporter, users) VALUES ('".$response->body->issues[$i]->id."', '".$response->body->issues[$i]->key."', '".$response->body->issues[$i]->fields->project->id."', '".$response->body->issues[$i]->fields->summary."', '".$response->body->issues[$i]->fields->status->name."', '".$response->body->issues[$i]->fields->priority->name."', '".$response->body->issues[$i]->fields->reporter->emailAddress."', '".$response->body->issues[$i]->fields->assignee->emailAddress."')";
					$d_save   = $conn->query($sql_save);
				} else {
					$sql_updProject = "SELECT idProyecto FROM ".$this->model." WHERE idBoard = ".$params['idBoard'];
					$d_updProject   = $conn->query($sql_updProject);
					$sql_getNameProject = "SELECT name FROM projects WHERE id = ".$d_updProject[0]['idProyecto'];
					$d_getNameProject   = $conn->query($sql_getNameProject);
					//Y SI EXISTE UPDATEA EL ISSUE ENTERO POR SI HUBO ALGUN CAMBIO DESDE GIRA
					$sql_upd = "UPDATE ".$this->modelT." SET idProyecto = ".$d_updProject[0]['idProyecto'].", name = '".$response->body->issues[$i]->fields->summary."', project = '".$d_getNameProject[0]['name']."', status = '".$response->body->issues[$i]->fields->status->name."', priority = '".$response->body->issues[$i]->fields->priority->name."', users = '".$response->body->issues[$i]->fields->assignee->emailAddress."' WHERE idTask = '".$response->body->issues[$i]->id."' AND keyTask = '".$response->body->issues[$i]->key."' AND idBoard = '".$response->body->issues[$i]->fields->project->id."'";
					$d_upd   = $conn->query($sql_upd);
				}
			}
			if ($i == $response->body->total) {
				//CUANDO RECORRE TODO EL FOR, TRAE TODAS LAS TAREAS ACTUALIZADAS O CREADAS Y ELIMINA LAS NO EXISTENTES.
				$toDelete = array("[", "]", '"');
				if(count($issues) > 0){
					$issues = json_encode($issues);
					$issues = str_replace($toDelete, "", $issues);
					$issues = str_replace(",", " OR idTask = ", $issues);
					$sql_del = "UPDATE ".$this->modelT." AS t1, (SELECT idTask FROM ".$this->modelT." WHERE idBoard = ".$params['idBoard']." AND NOT (idTask = ".str_replace($toDelete, "", $issues).")) AS t2 SET active = 0 WHERE t1.idTask = t2.idTask";
					$d_del   = $conn->query($sql_del);
				}
				$sql = "SELECT * FROM ".$this->modelT." WHERE users = '$params[email]' AND idBoard = ".$params['idBoard']." AND active = 1";
				$d   = $conn->query($sql);
				if (!empty($d)) {
					return array('response' => $d);				
				} else {
					return array('response' => 'Error');				
				}
			}
		} else {
			return array("error" => "Error: no existen proyectos.");
		}
	}

	public function getIssue($conn, $params){
		$i = 0;

		Unirest\Request::verifyPeer(false); 
		Unirest\Request::auth($mail, $token);
		$b = base64_encode($params['email'].":".$params['token']);
		$headers = array(
		   'Authorization' => 'Basic '.$b,
		   'Accept' => 'application/json'
		);
		//TRAE LA ISSUE
		$response = Unirest\Request::get(
		  	'https://test-lexart.atlassian.net/rest/api/3/search?jql=issue='.$params['keyTask'],
		  $headers
		);
		//TRAE LOS COMMENTS DE LA ISSUE
		$response_comm = Unirest\Request::get(
			'https://test-lexart.atlassian.net/rest/api/3/issue/'.$params['keyTask'].'/comment',
		  $headers
		);
		//ALMACENA LOS COMMENTS POR IDCOMENTARIO, AUTOR DEL COMENTARIO Y EL COMENTARIO.
		if ($response_comm->body->total > 0) {
			for ($x=0; $x < $response_comm->body->total; $x++) { 
				$comment[$x]->idComm = $response_comm->body->comments[$x]->id;
				$comment[$x]->author = $response_comm->body->comments[$x]->author->emailAddress;
				$comment[$x]->text   = $response_comm->body->comments[$x]->body->content[$i]->content[$i]->text;
			}
		}

		if (!empty($response)) {
			//CUANDO TRAE LA ISSUE, ACTUALIZA EN LA BASE DE DATOS POR SI EXISTEN CAMBIOS EN JIRA
			$sql = "UPDATE ".$this->modelT." SET description = '".$response->body->issues[$i]->fields->description->content[$i]->content[$i]->text."' WHERE idTask = ".$params['keyTask']." AND keyTask = '".$response->body->issues[$i]->key."'";
			$d   = $conn->query($sql);
			if (empty($d)) {
				//UNA VEZ TERMINA TRAE LA ISSUE, VERIFICA SI ES EL USUARIO ASIGNADO Y EL TABLERO CORRECTO
				$sql_sel = "SELECT * FROM ".$this->modelT." WHERE users = '$params[email]' AND idTask = ".$params['keyTask'];
				$d_sel   = $conn->query($sql_sel);

				//ARRAY PUSH A LA ISSUE, DE LOS COMENTARIOS
				array_push($d_sel, $comment);
				if (!empty($d_sel)) {
					return array("response" => $d_sel);
				} else {
					return array("response" => 'Error al traer la tarea');
				}
			}
		}
	}

	public function addComment($conn, $params){
		//AL AGREGAR UN COMENTARIO SE GUARDA DIRECTAMENTE EN LA TAREA
		Unirest\Request::verifyPeer(false); 
		Unirest\Request::auth($mail, $token);
		$b = base64_encode($params['email'].":".$params['token']);
		$headers = array(
		   'Authorization' => 'Basic '.$b,
		   'Accept' => 'application/json',
   		   'Content-Type' => 'application/json',
		);

		$body = json_decode('{
				  "body": {
				    "type": "doc",
				    "version": 1,
				    "content": [
				      {
				        "type": "paragraph",
				        "content": [
				          {
				            "text": "'.$params['comment'].'",
				            "type": "text"
				          }
				        ]
				      }
				    ]
				  }
				}'
			);
		
			if($params['idComm'] != ""){
				$response = Unirest\Request::put(
					'https://test-lexart.atlassian.net/rest/api/3/issue/'.$params['keyTask'].'/comment/'.$params['idComm'],
					$headers,json_encode($body)
				);
				if (empty($d_sel)) {
					return array("response" => $response);
				} else {
					return array("response" => 'Error al crear el comentario');
				}
			} else {
			$response = Unirest\Request::post(
				'https://test-lexart.atlassian.net/rest/api/3/issue/'.$params['keyTask'].'/comment',
				$headers,json_encode($body)
			);
			if (empty($d_sel)) {
				return array("response" => $response);
			} else {
				return array("response" => 'Error al crear el comentario');
			}
			}


	}


	public function editIssue($conn,$params){
		Unirest\Request::verifyPeer(false); 
		Unirest\Request::auth($mail, $token);
		$b = base64_encode($params["params"]['email'].":".$params["params"]['token']);
		$headers = array(
			'Authorization' => 'Basic '.$b,
			'Accept' => 'application/json',
			'Content-Type' => 'application/json',
		);
		$body = json_decode('{
			"update": {
				"summary": [
					{
						"set": "'.$params["task"]['name'].'"
					}
				]
			},
			"fields":{
				"priority": {
						"name": "'.$params["task"]['priority'].'"
				},
				"description": {
					"version": 1,
					"type": "doc",
					"content": [
							{
							"type": "paragraph",
							"content": [{
									"type": "text",
									"text": "'.$params["task"]['description'].'"
							}]
					}]
				}
			}
		}');

		$body_status = json_decode('{
			"transition": {
				"id": "'.$params["task"]['status'].'"
			}
		}');
		
		//ACTUALIZA LA TAREA COMPLETA
		$response = Unirest\Request::put(
			'https://test-lexart.atlassian.net/rest/api/3/issue/'.$params["task"]['idTask'],
			$headers,json_encode($body)
		);
		//ACTUALIZA EL PRIORITY DE LA TAREA
		$response_status = Unirest\Request::post(
			'https://test-lexart.atlassian.net/rest/api/2/issue/'.$params["task"]['idTask'].'/transitions',
			$headers,json_encode($body_status)
		);

		if (!empty($response)) {
			return array("response" => $response, $response_status);
		} else {
			return array("response" => 'Error al crear el comentario');
		}
	}
	
	//CREAR ISSUE EN JIRA DESDE EL TRACKING
	public function saveIssue($conn,$params){
			Unirest\Request::verifyPeer(false); 
			Unirest\Request::auth($mail, $token);
			$b = base64_encode($params["params"]['email'].":".$params["params"]['token']);
			$accounts = array();

			$headers = array(
				'Authorization' => 'Basic '.$b,
				'Accept' => 'application/json',
				'Content-Type' => 'application/json',
			);

			//GET TRAER ACCOUNT ID USUARIO ASIGNADO
			$response_users = Unirest\Request::get(
				'https://test-lexart.atlassian.net/rest/api/3/user/search?query='.$params["users"][0],
				$headers
			);

			$body =	json_decode('{
				"fields": {
						"project":
						{
								"id": "'.$params["task"]['idBoard'].'"
						},
						"priority": {
								"name": "'.$params["task"]['priority'].'"
						},
					"summary": "'.$params["task"]['name'].'",
					"description": {
						"version": 1,
						"type": "doc",
						"content": [
								{
								"type": "paragraph",
								"content": [{
										"type": "text",
										"text": "'.$params["task"]['description'].'"
								}]
						}]
					},
					"issuetype": {
							"name": "Bug"
					},
					"assignee":{
						"accountId": "'.$response_users->body[0]->accountId.'"
					}
				}
			}');

			//RESPONSE GUARDA LA ISSUE NUEVA
			$response = Unirest\Request::post(
				'https://test-lexart.atlassian.net/rest/api/3/issue',
				$headers,json_encode($body)
			);

			if (!empty($response)) {
				return array("response" => $response);
			} else {
				return array("response" => 'Error al crear la tarea');
			}
	}

	public function deleteIssues($conn, $params){
		Unirest\Request::verifyPeer(false); 
		Unirest\Request::auth($mail, $token);
		$b = base64_encode($params['email'].":".$params['token']);
		$headers = array(
		   'Authorization' => 'Basic '.$b,
			 'Accept' => 'application/json',
			 'Content-Type' => 'application/json'
		);

		$response = Unirest\Request::delete(
			'https://test-lexart.atlassian.net/rest/api/3/issue/'.$params["idTask"],
			$headers
		);

		if (!empty($response)) {
			return array("response" => $response);
		} else {
			return array("response" => 'Error al borrar la tarea');
		}
		
	}






}


?>

