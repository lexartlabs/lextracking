(function (ng) {

    'use strict';

    var Module = ng.module('Imm');

    Module.factory('TracksServices', ['RestClient', function(RestClient){

	  	var model = "track";

	  	var factory = {

		    find: function(page, q, cb) {
		      	RestClient.get(model + "/all", function(err, result, countItems) {
		        	cb(err, result, countItems);
		      	})
		    },

		    findById: function(id, cb) {
		    	RestClient.get(model + "/" + id, function(err, result) {
		    		cb(err, result);
		    	})
		    },
        findActives: function( cb) {
		    	RestClient.get(model + "/active" , function(err, result) {
		    		cb(err, result);
		    	})
		    },

		   	findAll: function(page, q,  cb) {
				RestClient.get(model + "?sort[name]=1" + q, function(err, result) {
					cb(err, result);
				})
			},

			getTracks: function(filters, cb) {
				RestClient.post("tracks", filters, function(err, result) {
					cb(err, result);
				})
			},

			getAutoTracks: function(filters, cb) {
				RestClient.post("tracks-auto", filters, function(err, result) {
					cb(err, result);
				})
			},

			getTrelloTrack: function(filters, cb) {
				RestClient.post("tracks-trello", filters, function(err, result) {
					cb(err, result);
				})
			},

			getUserTracks: function(idUser, cb) {
				RestClient.get(model + "/user/" + idUser, function(err, result) {
					cb(err, result);
				})
			},

			getLastUserTrack: function(idUser, cb) {
				RestClient.get(model + "/user/" + idUser + "/last", function(err, result) {
					cb(err, result);
				})
			},

		    create: function(obj, cb) {
		    	console.log(obj);
		    	var track = {
		    		idTask 	  : obj.idTask,
		    		idUser 	  : obj.idUser,
		    		name 	  : obj.taskName + ' - ' + obj.projectName,
		    		startTime : obj.startTime,
					endTime	  : obj.endTime,
					typeTrack : obj.typeTrack,
					idProyecto: obj.idProyecto
		    	}
	        	RestClient.post(model + "/new", track, function(err, result) {
					console.log("result::", result);
	          		cb(err, result);
	        	})
			},
			
			createAutoTask: function(obj, cb) {
		    	var track = {
		    		idTask 	  : obj.idTask,
		    		idUser 	  : obj.idUser,
		    		idProyecto: obj.idProyecto,
		    		name 	  : obj.taskName,
		    		startTime : obj.startTime,
					endTime	  : obj.endTime,
					typeTrack : obj.typeTrack
				}
	        	RestClient.post(model + "/auto-new", track, function(err, result) {
					console.log("result2::", err, result);
	          		cb(err, result);
	        	})
		    },

			createTrelloTask: function(obj, cb) {
		    	var track = {
		    		idTask 	  : obj.idTask,
					idUser 	  : obj.idUser,
					idProyecto: obj.idProyecto,
		    		name 	  : obj.taskName,
		    		startTime : obj.startTime,
					endTime	  : obj.endTime,
					typeTrack : obj.typeTrack
				}
	        	RestClient.post(model + "/track-trello-new", track, function(err, result) {
					console.log("resultTrello::", err, result);
	          		cb(err, result);
	        	})
		    },

		    update: function(obj, cb) {
				console.log("OBJ::",obj);
		    	if (obj.typeTrack == "manual") {
		    		var track = {
		    			id 		   : obj.id,
			    		idTask 	   : obj.idTask,
			    		idUser 	   : obj.idUser,
			    		name 	   : obj.taskName + ' - ' + obj.projectName,
			    		startTime  : obj.startTime,
			    		endTime    : obj.endTime,
			    		trackCost  : obj.trackCost,
			    		idProyecto : obj.idProyecto,
			    		duracion   : obj.duracion,
			    		totalTrack : obj.totalTrack,
			    		projCost   : obj.projCost
			    	}
			    	console.log('track to update', track);
		        	RestClient.post(model + "/update", track, function(err, result) {
		          		cb(err, result);
		        	})
				} else if(obj.typeTrack == "trello"){
					console.log("TrelloObj",obj);
					var track = {
						id 		 : obj.id,
			    		idTask 	 : obj.idTask,
			    		idUser 	 : obj.idUser,
			    		trackCost: obj.trackCost,
						name 	 : obj.taskName,
			    		startTime: obj.startTime,
			    		endTime  : obj.endTime
					}
					console.log('track trelloTrack to update', track);
		        	RestClient.post(model + "/track-trello-update", track, function(err, result) {
						console.log("updateTrello:: ", result);
						  cb(err, result);
					})
				  } else {
		    		var track = {
		    			id 		 : obj.id,
			    		idTask 	 : obj.idTask,
			    		idUser 	 : obj.idUser,
			    		trackCost  : obj.trackCost,
						name 	 : obj.taskName,
			    		startTime: obj.startTime,
			    		endTime  : obj.endTime
			    	}
			    	console.log('track autoTask to update', track);
		        	RestClient.post(model + "/update-auto", track, function(err, result) {
		          		cb(err, result);
		        	})
				  }
			},
			
		    remove: function(id, cb) {
		    	RestClient.delete(model + "/" + id, function(err, result) {
		        	cb(err, result);
		      	})
			},
			
			projectByHour: function(id,cb){
				console.log("ID PROJECT GET", id);
		    	RestClient.get(model + "/projectByHour/" + id, function(err, result) {
					console.log("PROJECT BY HOUR", result, err);
		    		cb(result, err);
				})	
			}
	  	};

	  	return factory;

	}]);

}(angular));
