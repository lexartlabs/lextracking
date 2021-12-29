<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, DELETE, PUT, PATCH, OPTIONS');
header('Content-Type: application/json');
header('Access-Control-Allow-Headers: *');

require('config/conn.php');
//require('server.config/conn_local.php');
require('classes/AltoRouter.php');
require('classes/Token.php');

define ("ENV", "/lextracking/api");

ini_set('display_errors', 'On');
error_reporting(1);
	// CALL OBJS
	$router 	= new AltoRouter();
	$conn 		= new Connection();
	$objToken	= new Token();
	$router->setBasePath(ENV);
	if($_SERVER["HTTP_TOKEN"]){
		$token 	= $_SERVER["HTTP_TOKEN"];
		$access = $objToken->checkToken($conn, $token);
		$permission = $access["role"];
		$access = $access["find_token"];
		//TRAE EL PERMISO Y SI EL TOKEN ES CORRECTO, A PARTIR DE LA FUNCIÓN 'CHECKTOCKEN'

		if($access){       
			if($permission == "developer") {
				//TODAS LAS RUTAS ACEPTADAS A DEVELOPERS DEBERIAN IR EN ESTE IF

				//HORARIOS USUARIO
				$router->map('GET', '/user-hours/[i:id]', 'components/userHours/get.php', 'user-hours'); 
				$router->map('GET', '/past-events/[i:id]/[*:date_ini]', 'components/userHours/get.php', 'user-tracks-events'); 
				$router->map('POST', '/user-hours', 'components/userHours/post.php', 'save-fixed-hours'); 
				$router->map('POST', '/user-hours/[i:id]', 'components/userHours/post.php', 'edit-fixed-hours'); 
				$router->map('POST', '/user-hours', 'components/userHours/post.php', 'delete-fixed-hours'); 

				//EXCEPCIONES USUARIO
				$router->map('GET', '/user-exceptions/[i:id]/[*:date_ini]', 'components/userHours/get.php', 'user-exceptions'); 
				$router->map('POST', '/user-exceptions/[i:id]/[*:date_ini]', 'components/userHours/post.php', 'save-exceptions'); 
				
				$router->map('POST', '/persistence', 'components/users/post.php', 'user-persistence'); 
				// CRYPTO ALGORITHM
				$router->map('GET','/crypto/[a:psw]', 'components/crypto/index.php', 'crypto');
				// GET USERS BY ID
				$router->map('GET','/user/[i:id]', 'components/users/get.php', 'user-by-id');
				// ALL USERS
				$router->map('GET','/user/all', 'components/users/index.php', 'users-all');
				// INSERT NEW USER
				$router->map('POST','/user/update', 'components/users/post.php', 'user-update');
				$router->map('POST','/user/save-performance', 'components/users/post.php', 'user-performance');
				$router->map('POST','/user/performance-id', 'components/users/post.php', 'user-performance-by-id');
				$router->map('POST','/user/all-performance', 'components/users/post.php', 'performance-all');
				// PROJECTS
				// ALL PROJECTS
				$router->map('GET','/project/all', 'components/projects/index.php', 'project-all');
				$router->map('GET','/project/user/[i:id]', 'components/projects/get.php', 'project-by-idUser');
				// GET PROJECTS BY ID
				$router->map('GET','/project/[i:id]', 'components/projects/get.php', 'project-by-id');
				// GET PROJECTS BY ID
				$router->map('GET','/project/client/[i:id]', 'components/projects/get.php', 'project-by-idclient');
				// ALL TASKS
				$router->map('POST','/project/task/all', 'components/projects/post.php', 'task-all');
				// GET PROJECTS BY ID
				$router->map('GET','/project/task/[i:id]', 'components/projects/get.php', 'task-by-id');
				$router->map('GET','/project/task/[i:id]/[i:iduser]', 'components/projects/get.php', 'task-by-idproject-and-iduser');
				$router->map('GET','/project/task/dev/[i:id]', 'components/projects/get.php', 'project-by-iddeveloper');
				$router->map('GET','/project/task/id-project/[i:id]', 'components/projects/get.php', 'task-by-idproject');
				$router->map('GET','/project/task/id-user/[i:id]', 'components/projects/get.php', 'tasks-by-user');
				$router->map('GET','/project/task/user-eval/[i:id]', 'components/projects/get.php', 'tasks-by-user-eval');
				//WITH FILTER
				$router->map('POST','/project/task/id-user/[i:id]', 'components/projects/post.php', 'tasks-by-user-filter');
				$router->map('GET','/project/task/delete/[i:id]', 'components/projects/get.php', 'tasks-delete');
				// INSERT NEW PROJECT
				$router->map('POST','/project/task/new', 'components/projects/post.php', 'task-new');
				$router->map('POST','/project/task/update', 'components/projects/post.php', 'task-update');

				//MARK TASK AS COMPLETE
				$router->map('POST','/project/task/update/status', 'components/projects/post.php', 'task-update-status');

				// AUTOMATIC TASKS
				$router->map('GET', '/taskAutomatic/all', 'components/tasksAutomatic/index.php', 'task_automatic-all');
				$router->map('GET', '/taskAutomatic/[i:id]', 'components/tasksAutomatic/get.php', 'task_automatic-by-id');
				$router->map('POST', '/taskAutomatic/update/[i:id]', 'components/tasksAutomatic/post.php', 'task_automatic-update');
				$router->map('GET', '/taskAutomatic/delete/[i:id]', 'components/tasksAutomatic/get.php', 'task_automatic-delete');
				$router->map('GET','/track/all', 'components/tracks/index.php', 'track-all');
				$router->map('POST','/tracks', 'components/tracks/post.php', 'tracks');
				$router->map('POST','/tracks-auto', 'components/tracks/post.php', 'tracks-auto');
				$router->map('POST','/tracks-trello', 'components/tracks/post.php', 'tracks-trello');
				$router->map('POST','/tracks-jira', 'components/tracks/post.php', 'tracks-jira');
				$router->map('POST','/track/track-trello-new', 'components/tracks/post.php', 'track-trello-new');
				$router->map('POST','/track/track-trello-update', 'components/tracks/post.php', 'track-trello-update');
				$router->map('POST','/track/track-jira-new', 'components/tracks/post.php', 'track-jira-new');
				// GET USERS BY ID
				$router->map('POST','/track/month', 'components/tracks/post.php', 'track-by-month');
				// GET USERS BY ID
				$router->map('GET','/track/task/[i:id]', 'components/tracks/get.php', 'track-by-idtask');
				$router->map('GET','/track/active', 'components/tracks/get.php', 'track-actives');
				// GET USERS BY ID
					$router->map('GET','/track/user/[i:id]/last', 'components/tracks/get.php', 'tracklast-by-iduser');

				// INSERT NEW USER
					$router->map('POST','/track/new', 'components/tracks/post.php', 'track-new');
					$router->map('POST','/track/auto-new', 'components/tracks/post.php', 'autoTrack-new');
					$router->map('POST','/track/update', 'components/tracks/post.php', 'track-update');
					$router->map('POST','/track/update-auto', 'components/tracks/post.php', 'autoTrack-update');
				// ALL CLIENTS
				$router->map('GET','/client/all', 'components/clients/index.php', 'clients-all');
				//Trello tasks
				$router->map('GET','/taskTrello/all', 'components/trelloTasks/index.php', 'trello-all');
				$router->map('GET','/taskTrello/[i:id]', 'components/trelloTasks/get.php', 'trello-by-id');
				$router->map('POST','/taskTrello/new-card', 'components/trelloTasks/post.php', 'card-new');
				$router->map('GET','/taskTrello/id-card', 'components/trelloTasks/index.php', 'get-card-id');
				$router->map('GET','/taskTrello/remove-trello-task/[i:id]', 'components/trelloTasks/get.php', 'remove-trelloTask');
				$router->map('GET','/taskTrello/remove-board/[i:id]', 'components/trelloTasks/get.php', 'remove-trelloBoard');
				$router->map('POST','/taskTrello/update-board', 'components/trelloTasks/post.php', 'board-edit');
				//JIRA
				$router->map('POST','/jira/all-dashboards', 'components/jira/index.php', 'all-dashboards');
				$router->map('POST','/jira/dashboard-issues', 'components/jira/post.php', 'issues-by-board');
				$router->map('POST','/jira/save-dashboards', 'components/jira/post.php', 'save-dashboards');
				$router->map('POST','/jira/issue', 'components/jira/post.php', 'get-issue');
				$router->map('POST','/jira/add-comment', 'components/jira/post.php', 'add-comment');
				$router->map('POST','/jira/save-issue', 'components/jira/post.php', 'save-issue');
				$router->map('POST','/jira/update-issue', 'components/jira/post.php', 'update-issue');
				$router->map('POST','/jira/delete-issues', 'components/jira/post.php', 'delete-issues');
				//WeeklyHour
				$router->map('GET','/weeklyHours/all', 			'components/weeklyHours/index.php', 'weeklyHour-all');
				$router->map('GET','/weeklyHour/user/[i:id]', 		'components/weeklyHours/get.php', 	'weeklyHour-by-idUser');

				$match = $router->match();
				if($match) {
				require $match['target'];
				} else {
					echo json_encode( array("error" => "Error: Usuario no tiene acceso a esta sección.", "code"=>403) );
				}
			} elseif ($permission == "admin" || $permission == "pm"){
				//EN ADMIN VAN TODAS LAS RUTAS
				
				//HORARIOS DE USUARIOS
				$router->map('GET', '/user-hours/[i:id]', 'components/userHours/get.php', 'user-hours'); 
				$router->map('GET', '/past-events/[i:id]/[*:date_ini]', 'components/userHours/get.php', 'user-tracks-events'); 
				$router->map('POST', '/user-hours', 'components/userHours/post.php', 'save-fixed-hours'); 
				$router->map('POST', '/user-hours/[i:id]', 'components/userHours/post.php', 'edit-fixed-hours'); 
				$router->map('POST', '/user-hours', 'components/userHours/post.php', 'delete-fixed-hours'); 

				//USER EXCEPCIONES
				$router->map('GET', '/user-exceptions/[i:id]/[*:date_ini]', 'components/userHours/get.php', 'user-exceptions'); 
				$router->map('POST', '/user-exceptions/[i:id]/[*:date_ini]', 'components/userHours/post.php', 'save-exceptions'); 


				$router->map('POST', '/persistence', 'components/users/post.php', 'user-persistence'); 

				// CRYPTO ALGORITHM
				$router->map('GET','/crypto/[a:psw]', 'components/crypto/index.php', 'crypto');
	
				// USERS
					// ALL USERS
					$router->map('GET','/user/all', 'components/users/index.php', 'users-all');
	
					// GET USERS BY ID
					$router->map('GET','/user/[i:id]', 'components/users/get.php', 'user-by-id');
	
					// INSERT NEW USER
					$router->map('POST','/user/new', 'components/users/post.php', 'user-new');
					$router->map('POST','/user/update', 'components/users/post.php', 'user-update');
					$router->map('POST','/user/save-performance', 'components/users/post.php', 'user-performance');
					$router->map('POST','/user/performance-id', 'components/users/post.php', 'user-performance-by-id');
					$router->map('POST','/user/all-performance', 'components/users/post.php', 'performance-all');
	
				// CLIENTS
					// ALL CLIENTS
					$router->map('GET','/client/all', 'components/clients/index.php', 'clients-all');
	
					// GET USERS BY ID
					$router->map('GET','/client/[i:id]', 'components/clients/get.php', 'client-by-id');
	
					// INSERT NEW USER
					$router->map('POST','/client/new', 'components/clients/post.php', 'client-new');
					$router->map('POST','/client/update', 'components/clients/post.php', 'client-update');
	
				// PROJECTS
					// ALL PROJECTS
					$router->map('GET','/project/all', 'components/projects/index.php', 'project-all');
	
					$router->map('GET','/project/user/[i:id]', 'components/projects/get.php', 'project-by-idUser');
					// GET PROJECTS BY ID
					$router->map('GET','/project/[i:id]', 'components/projects/get.php', 'project-by-id');
					// GET PROJECTS BY ID
					$router->map('GET','/project/client/[i:id]', 'components/projects/get.php', 'project-by-idclient');
	
					// INSERT NEW PROJECT
					$router->map('POST','/project/new', 'components/projects/post.php', 'project-new');
					$router->map('POST','/project/update', 'components/projects/post.php', 'project-update');
	
				// ALL TASKS
					$router->map('POST','/project/task/all', 'components/projects/post.php', 'task-all');
					$router->map('GET','/project/task/id-client/[i:id]', 'components/projects/get.php', 'task-by-idclient');
					// GET PROJECTS BY ID
					$router->map('GET','/project/task/[i:id]', 'components/projects/get.php', 'task-by-id');
					$router->map('GET','/project/task/[i:id]/[i:iduser]', 'components/projects/get.php', 'task-by-idproject-and-iduser');
					$router->map('GET','/project/task/dev/[i:id]', 'components/projects/get.php', 'project-by-iddeveloper');
					$router->map('GET','/project/task/id-project/[i:id]', 'components/projects/get.php', 'task-by-idproject');
					$router->map('GET','/project/task/id-user/[i:id]', 'components/projects/get.php', 'tasks-by-user');
					$router->map('GET','/project/task/user-eval/[i:id]', 'components/projects/get.php', 'tasks-by-user-eval');
					//WITH FILTER
					$router->map('POST','/project/task/id-user/[i:id]', 'components/projects/post.php', 'tasks-by-user-filter');
					$router->map('GET','/project/task/delete/[i:id]', 'components/projects/get.php', 'tasks-delete');
	
	
					// INSERT NEW PROJECT
					$router->map('POST','/project/task/new', 'components/projects/post.php', 'task-new');
					$router->map('POST','/project/task/update', 'components/projects/post.php', 'task-update');
	
					//MARK TASK AS COMPLETE
					$router->map('POST','/project/task/update/status', 'components/projects/post.php', 'task-update-status');
	
					// AUTOMATIC TASKS
	
					$router->map('GET', '/taskAutomatic/all', 'components/tasksAutomatic/index.php', 'task_automatic-all');
					$router->map('GET', '/taskAutomatic/[i:id]', 'components/tasksAutomatic/get.php', 'task_automatic-by-id');
					//$router->map('GET','task_automatic/[i:id]/[i:iduser]', 'components/TasksAutomatic/get.php', 'task_automatic-by-idproject-and-iduser');
					//$router->map('GET','task_automatic/dev/[i:id]', 'components/TasksAutomatic/get.php', 'task_automatic-by-iddeveloper');
					//$router->map('GET','task_automatic/id-project/[i:id]', 'components/TasksAutomatic/get.php', 'task_automatic-by-idproject');
					//$router->map('GET','task_automatic/id-user/[i:id]', 'components/TasksAutomatic/get.php', 'task_automatic-by-user');
					$router->map('POST', '/taskAutomatic/update/[i:id]', 'components/tasksAutomatic/post.php', 'task_automatic-update');
					$router->map('GET', '/taskAutomatic/delete/[i:id]', 'components/tasksAutomatic/get.php', 'task_automatic-delete');
	
	
				// TRACKS
					// ALL TRACKS
					$router->map('GET','/track/all', 'components/tracks/index.php', 'track-all');
					$router->map('POST','/tracks', 'components/tracks/post.php', 'tracks');
					$router->map('POST','/tracks-auto', 'components/tracks/post.php', 'tracks-auto');
					$router->map('POST','/tracks-trello', 'components/tracks/post.php', 'tracks-trello');
					$router->map('POST','/tracks-jira', 'components/tracks/post.php', 'tracks-jira');
					 $router->map('POST','/track/track-trello-new', 'components/tracks/post.php', 'track-trello-new');
					$router->map('POST','/track/track-trello-update', 'components/tracks/post.php', 'track-trello-update');
					$router->map('POST','/track/track-jira-new', 'components/tracks/post.php', 'track-jira-new');

					// EXTERNAL TASKS
					$router->map('GET', '/track/externals/all', 'components/tracks/get.php', 'external-by-month');
	
	
					// GET USERS BY ID
					$router->map('GET','/track/[i:id]', 'components/tracks/get.php', 'track-by-id');
	
					$router->map('GET','/track/active', 'components/tracks/get.php', 'track-actives');
					$router->map('POST','/track/month', 'components/tracks/post.php', 'track-by-month');
	
					// GET USERS BY ID
					$router->map('GET','/track/[i:id]/delete', 'components/tracks/get.php', 'delete-track-by-id');
	
					// GET USERS BY ID
					$router->map('GET','/track/task/[i:id]', 'components/tracks/get.php', 'track-by-idtask');
					// GET USERS BY ID
					$router->map('GET','/track/user/[i:id]', 'components/tracks/get.php', 'track-by-iduser');
					// GET USERS BY ID
					$router->map('GET','/track/user/[i:id]/last', 'components/tracks/get.php', 'tracklast-by-iduser');
					// GET USERS BY ID
					$router->map('GET','/track/user/[i:id_user]/task/[i:id_task]', 'components/tracks/get.php', 'track-by-taskuser');
	
					// INSERT NEW USER
					$router->map('POST','/track/new', 'components/tracks/post.php', 'track-new');
					$router->map('POST','/track/auto-new', 'components/tracks/post.php', 'autoTrack-new');
					$router->map('POST','/track/update', 'components/tracks/post.php', 'track-update');
					$router->map('POST','/track/update-auto', 'components/tracks/post.php', 'autoTrack-update');
				//Trello tasks
					$router->map('GET','/taskTrello/all', 'components/trelloTasks/index.php', 'trello-all');
					$router->map('GET','/taskTrello/[i:id]', 'components/trelloTasks/get.php', 'trello-by-id');
					$router->map('POST','/taskTrello/new-card', 'components/trelloTasks/post.php', 'card-new');
					$router->map('GET','/taskTrello/id-card', 'components/trelloTasks/index.php', 'get-card-id');
					$router->map('GET','/taskTrello/remove-trello-task/[i:id]', 'components/trelloTasks/get.php', 'remove-trelloTask');
					$router->map('GET','/taskTrello/remove-board/[i:id]', 'components/trelloTasks/get.php', 'remove-trelloBoard');
					$router->map('POST','/taskTrello/update-board', 'components/trelloTasks/post.php', 'board-edit');
	
	
				// HOURS
					// ALL PROJECTS
					$router->map('GET','/hours/cost/all', 'components/hourscost/index.php', 'hourscost-all');
					$router->map('GET','/hour/cost/[i:id]', 'components/hourscost/get.php', 'hourcost-by-id');
					$router->map('POST','/hour/cost/new', 'components/hourscost/post.php', 'hourcost-new');
					$router->map('POST','/hour/cost/update', 'components/hourscost/post.php', 'hourcost-update');
	
				// BUDGET
					// ALL BUDGET
					$router->map('GET','/budgets/all', 			'components/budgets/index.php', 'budget-all');
					$router->map('GET','/budgets/status/all',	'components/budgets/index.php', 'budget-statuses');
					$router->map('GET','/budgets/concept/all',	'components/budgets/index.php', 'budget-concepts');
					$router->map('GET','/budget/[i:id]', 		'components/budgets/get.php', 	'budget-by-id');
					$router->map('POST','/budget/new', 			'components/budgets/post.php', 'budget-new');
					$router->map('POST','/budget/update', 		'components/budgets/post.php', 'budget-update');
					$router->map('GET','/budget/all/by-date/[*:date_ini]/[*:date_end]','components/budgets/get.php', 'budgets-by-date');
					$router->map('GET','/budget/all/by-user-date/[*:date_ini]/[*:date_end]/[i:id]','components/budgets/get.php', 'budgets-by-user-date');
	
	
				// FINANCE
					// ALL FINANCES
					$router->map('GET','/finances/all', 		'components/finances/index.php', 'finances-all');
					$router->map('GET','/finances/all/by-date/[*:date_ini]/[*:date_end]','components/finances/get.php', 'finances-by-date');
					$router->map('GET','/finances/status/all', 	'components/finances/index.php', 'finances-statuses');
					$router->map('GET','/finances/concepts/all','components/finances/index.php', 'finances-concepts');
					$router->map('GET','/finances/types/all',	'components/finances/index.php', 'finances-types');
					$router->map('GET','/finance/[i:id]', 		'components/finances/get.php', 'finance-by-id');
					$router->map('POST','/finance/new', 		'components/finances/post.php', 'finance-new');
					$router->map('POST','/finance/update', 		'components/finances/post.php', 'finance-update');
	
					//BANK
					$router->map('GET','/banks/all', 			'components/banks/index.php', 'bank-all');
					$router->map('GET','/bank/[i:id]', 		'components/banks/get.php', 	'bank-by-id');
					$router->map('POST','/bank/new', 			'components/banks/post.php', 'bank-new');
					$router->map('POST','/bank/update', 		'components/banks/post.php', 'bank-update');
	
	
					//WeeklyHour
					$router->map('GET','/weeklyHours/all', 			'components/weeklyHours/index.php', 'weeklyHour-all');
					$router->map('GET','/weeklyHour/[i:id]', 		'components/weeklyHours/get.php', 	'weeklyHour-by-id');
					$router->map('GET','/weeklyHour/user/[i:id]', 		'components/weeklyHours/get.php', 	'weeklyHour-by-idUser');
					$router->map('POST','/weeklyHour/new', 			'components/weeklyHours/post.php', 'weeklyHour-new');
					$router->map('POST','/weeklyHour/update', 		'components/weeklyHours/post.php', 'weeklyHour-update');
	
	
	
	
	
					//Sale
					$router->map('GET','/sales/all', 			'components/sales/index.php', 'sale-all');
					$router->map('GET','/sales/types', 			'components/sales/index.php', 'sales-types');
					$router->map('GET','/sales/concepts', 			'components/sales/index.php', 'sales-concepts');
					$router->map('GET','/sales/all/by-date/[*:date_ini]/[*:date_end]','components/sales/get.php', 'sales-by-date');
					$router->map('GET','/sales/all/by-user-date/[*:date_ini]/[*:date_end]/[i:id]','components/sales/get.php', 'sales-by-user-date');
	
					$router->map('GET','/sale/[i:id]', 		'components/sales/get.php', 	'sale-by-id');
	
					$router->map('POST','/sale/new', 			'components/sales/post.php', 'sale-new');
					$router->map('POST','/sale/update', 		'components/sales/post.php', 'sale-update');
	
	
					//BANK
					$router->map('GET','/bills/all', 			'components/bills/index.php', 'bill-all');
					$router->map('GET','/bill/[i:id]', 		'components/bills/get.php', 	'bill-by-id');
					$router->map('POST','/bill/new', 			'components/bills/post.php', 'bill-new');
					$router->map('POST','/bill/update', 		'components/bills/post.php', 'bill-update');
	
					// EASY WEB
					$router->map('GET','/apps/easy-web/all', 		'components/apps/easyweb/index.php', 'app-easyweb-all');
					$router->map('GET','/apps/easy-web/[i:id]', 	'components/apps/easyweb/get.php', 'app-easyweb-by-id');
					$router->map('POST','/apps/easy-web/new', 		'components/apps/easyweb/post.php', 'app-easyweb-new');
					$router->map('POST','/apps/easy-web/update',	'components/apps/easyweb/post.php', 'app-easyweb-update');
	
	
	
					$router->map('GET','/hosting/all', 			'components/hosting/index.php', 'hosting-all');
					$router->map('GET','/hosting/products', 			'components/hosting/index.php', 'hosting-products');
	
					$router->map('GET','/hosting/[i:id]', 		'components/hosting/get.php', 	'hosting-by-id');
					$router->map('GET','/hosting/serviceNumber/[a:serviceNumber]', 		'components/hosting/get.php', 	'hosting-by-serviceNumber');
	
					$router->map('POST','/hosting/new', 			'components/hosting/post.php', 'hosting-new');
					$router->map('POST','/hosting/update', 		'components/hosting/post.php', 'hosting-update');
					$router->map('POST','/hosting/delete', 		'components/hosting/post.php', 'hosting-delete');
	
	
	
	
					//Products
					$router->map('GET','/products/all', 			'components/products/index.php', 'product-all');
					$router->map('GET','/product/[i:id]', 		'components/products/get.php', 	'product-by-id');
					$router->map('POST','/product/new', 			'components/products/post.php', 'product-new');
					$router->map('POST','/product/update', 		'components/products/post.php', 'product-update');
	
					//Evaluacion
					$router->map('POST','/evaluate/new', 		'components/evaluate/post.php', 'evaluate-new');
					$router->map('GET','/evaluate/user/[i:id]', 'components/evaluate/get.php', 'evaluate-user');
					$router->map('POST','/evaluate/update', 'components/evaluate/post.php', 'evaluate-update');
	
					//JIRA
					$router->map('POST','/jira/all-dashboards', 'components/jira/index.php', 'all-dashboards');
					$router->map('POST','/jira/dashboard-issues', 'components/jira/post.php', 'issues-by-board');
					$router->map('POST','/jira/save-dashboards', 'components/jira/post.php', 'save-dashboards');
					$router->map('POST','/jira/issue', 'components/jira/post.php', 'get-issue');
					$router->map('POST','/jira/add-comment', 'components/jira/post.php', 'add-comment');
					$router->map('POST','/jira/save-issue', 'components/jira/post.php', 'save-issue');
					$router->map('POST','/jira/update-issue', 'components/jira/post.php', 'update-issue');
					$router->map('POST','/jira/delete-issues', 'components/jira/post.php', 'delete-issues');

					//Biller
					$router->map('POST','/biller/comprobantes/crear', 'components/biller/post.php', 'crear');
					$router->map('POST','/biller/comprobantes/obtener', 'components/biller/post.php', 'obtener');
					$router->map('POST','/biller/comprobantes/pdf', 'components/biller/post.php', 'pdf');
	
	
					
				// match current request
				$match = $router->match();
				if($match) {
				  require $match['target'];
				} else {
				   echo json_encode( array("error" => "Error: no existe la API.") );
				}
			} 
		} else {
			echo json_encode( array("error" => "Error: token incorrecto.", "code" => 401) );
		}
	} else {
		// MATCH ROUTING - DEFAULT
		$router->map('GET','/', 'components/home/index.php', 'home');

		// LOGIN
		$router->map('POST','/login', 'components/users/post.php', 'user-login');

		//NEW AUTOMATIC TASK
		$router->map('POST', '/taskAutomatic/new', 'components/tasksAutomatic/post.php', 'warehouse-new');

		//Trello Tasks
		$router->map('POST','/trello/new', 'components/trelloTasks/post.php', 'trello-new');

		// PUBLIC APIS

		$router->map('GET','/public/apps/easy-web/my-website/[*:token]', 'components/apps/easyweb/get.php', 'app-easyweb-by-token');
		// match current request
		$match = $router->match();
		if($match) {
		  require $match['target'];
		} else {
		   echo json_encode( array("error" => "Error: token no encontrado.") );
		}
	}



?>
