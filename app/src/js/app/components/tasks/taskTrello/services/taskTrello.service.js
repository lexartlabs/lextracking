(function (ng) {

    'use strict';

    var Module = ng.module('Imm');

    Module.factory('tasks_trelloServices', ['RestClient', function(RestClient){

		  var model = "taskTrello";
		  var key   = "2f132aeb2a02c90e0966cbcfd9f45329";
		  var token = "c9e22df4e936322b7949cc9b98c0e972f8991099f8bbb5733e70956abcd06ff4";

	  	var factory = {

		    find: function(page, q, cb) {
				  RestClient.get(model + "/all", function(err, result, countItems) {
					console.log("TrelloResult:: ", result);
		        	cb(err, result, countItems);
		      	})
		    },

		    findById: function(id, cb) {
		    	RestClient.get(model + "/" + id, function(err, result) {
		    		cb(err, result);
		    	})
			},

			findByIdCard: function(page, q, cb){
				RestClient.get(model +  "/id-card", function(err, result, countItems) {
					cb(err, result);
				})
			},

			findByIdClient: function(id, cb) {
				RestClient.get(model + "/id-client/" + id, function(err, result) {
				cb(err, result);
				})
			},

			findByIdUser: function(id, cb) {
				RestClient.get(model + "/id-user/" + id, function(err, result) {
				cb(err, result);
				})
			},

		   	findAll: function(page, q,  cb) {
				RestClient.get(model + "?sort[name]=1" + q, function(err, result) {
					cb(err, result);
				})
			},

		    save: function(obj, cb) {
		    	if (obj.id) {
		        	RestClient.put(model + "/" + obj.id, obj, function(err, result) {
		          		cb(err, result);
		        	})
		      	} else {
		        	RestClient.post(model, obj, function(err, result) {
		          		cb(err, result);
		        	})
		      	}
		    },

		    remove: function(id, cb) {
		    	RestClient.get(model + "/remove-trello-task/" + id, function(err, result) {
		        	cb(err, result);
		      	})
			},

      deleteBoardTrello: function(id, cb) {
        RestClient.get(model + '/remove-board/' + id, function(err, result){
          cb(err, result)
        })
      },

			saveTask_trello: function(obj, cb) {
		    	if (obj.id) {
		        	RestClient.post(model + "/update", obj, function(err, result) {
		          		cb(err, result);
		        	})
		      	} else {
		        	RestClient.post(model + "/new", obj, function(err, result) {
		          		cb(err, result);
		        	})
		      	}
			},

			saveTaskTrello: function(obj, cb ) {
				RestClient.post(model + "/new-card", obj, function(err, result) {
					cb(err, result);
			  })
			},

			getCards: function(obj,cb){
				var data = null;
				var xhr = new XMLHttpRequest();
				xhr.addEventListener("readystatechange", function (resp) {
					if (this.readyState === this.DONE) {
						console.log("ID BOARD RECIBIDO", obj);
						var resp = JSON.parse(this.responseText);
						console.log("CARDS RECIBIDAS", resp);
						cb(resp);
					}
				});
				xhr.open("GET", "https://api.trello.com/1/cards/"+obj+"?attachments=false&attachment_fields=all&members=false&membersVoted=false&checkItemStates=false&checklists=none&checklist_fields=all&board=false&list=false&pluginData=false&stickers=false&sticker_fields=all&customFieldItems=false&key="+key+"&token="+token);
				xhr.send(data);
			},

			getBoardsId: function(obj, cb){
				var data = null;
				var xhr = new XMLHttpRequest();
				xhr.addEventListener("readystatechange", function (resp) {
					if (this.readyState === this.DONE) {
						console.log("ID BOARD RECIBIDO", obj);
						var resp = JSON.parse(this.responseText);
						console.log("CARDS RECIBIDAS", resp);
						cb(resp);
					}
				});
				xhr.open("GET", 'https://api.trello.com/1/boards/'+obj+'/cards/?limit=1000&fields=name&members=true&member_fields=fullName&key='+key+'&token='+token);
				xhr.send(data);
			},

			getLists: function(obj, cb){

			},

			getLabels: function(obj, cb){ //GET LABELS BOARD
				var data = null;
				var xhr = new XMLHttpRequest();
				xhr.addEventListener("readystatechange", function (resp) {
					if (this.readyState === this.DONE) {
						console.log("ID PARA LABEL", obj);
						var resp = JSON.parse(this.responseText);
						console.log("LABEL RECIBIDA", resp);
						cb(resp);
					}
				});
				xhr.open("GET", "https://api.trello.com/1/boards/"+obj+"/labels?fields=all&limit=50&key="+key+"&token="+token);
				xhr.send(data);
			},

			deleteLabel: function(obj, cb){
				var data = null;
				var xhr = new XMLHttpRequest();
				xhr.addEventListener("readystatechange", function (resp) {
					if (this.readyState === this.DONE) {
						console.log("LABELS ELIMINADAS", obj);
						var resp = JSON.parse(this.responseText);
						console.log("RESP", resp);
						cb(resp);
					}
				});
				xhr.open("DELETE", "https://api.trello.com/1/labels/"+obj+"?key="+key+"&token="+token);
				xhr.send(data)
			},

			activateLabel: function(id, color, name, cb){
				var data = null;
				var xhr = new XMLHttpRequest();
				xhr.addEventListener("readystatechange", function (resp) {
					if (this.readyState === this.DONE) {
						console.log("LABEL CREADA Y ACTIVADA", id, color, name);
						var resp = JSON.parse(this.responseText);
						console.log("RESP", resp);
						cb(resp);
					}
				});
				xhr.open("POST", "https://api.trello.com/1/cards/"+id+"/labels?color="+color+"&name="+name+"&key="+key+"&token="+token);
				xhr.send(data);
			},

			createLabel: function(id, color, name, cb){
				var data = null;
				var xhr = new XMLHttpRequest();
				xhr.addEventListener("readystatechange", function (resp) {
					if (this.readyState === this.DONE) {
						console.log("LABEL CREADA", id, color, name);
						var resp = JSON.parse(this.responseText);
						console.log("RESP", resp);
						cb(resp);
					}
				});
				xhr.open("POST", "https://api.trello.com/1/boards/"+id+"/labels?name="+name+"&color="+color+"&key="+key+"&token="+token);
				xhr.send(data);
			},

			getLabelsByCard: function(obj, cb){
				var data = null;
				var xhr = new XMLHttpRequest();
				xhr.addEventListener("readystatechange", function (resp) {
					if (this.readyState === this.DONE) {
						console.log("ID PARA LABEL", obj);
						var resp = JSON.parse(this.responseText);
						console.log("LABEL RECIBIDA card", resp);
						cb(resp);
					}
				});
				xhr.open("GET", "https://api.trello.com/1/cards/" + obj + "/labels?key="+key+"&token="+token);
				xhr.send(data);
			},

			desactiveLabel: function(idCard, idLabel, cb){
				var data = null;
				var xhr = new XMLHttpRequest();
				xhr.addEventListener("readystatechange", function (resp) {
					if (this.readyState === this.DONE) {
						console.log("ID PARA LABEL", idLabel);
						var resp = JSON.parse(this.responseText);
						console.log("LABEL RECIBIDA card", resp);
						cb(resp);
					}
				});
				xhr.open("DELETE", "https://api.trello.com/1/cards/"+idCard+"/idLabels/"+idLabel+"?key="+key+"&token="+token);
                xhr.send(data);

			},

			selectLabel: function(idCard, idLabel, cb){
				var data = null;
				var xhr = new XMLHttpRequest();
				xhr.addEventListener("readystatechange", function (resp) {
					if (this.readyState === this.DONE) {
						console.log("ID PARA LABEL", idLabel);
						var resp = JSON.parse(this.responseText);
						console.log("LABEL RECIBIDA card", resp);
						cb(resp);
					}
				});
				xhr.open("POST", "https://api.trello.com/1/cards/"+idCard+"/idLabels?value="+idLabel+"&key="+key+"&token="+token);
				xhr.send(data);
			},

			getBoards: function(cb) {
				var data = {};
			    var xhr = new XMLHttpRequest();
			    xhr.addEventListener("readystatechange", function (resp) {
		        if (this.readyState === this.DONE) {
					var resp = JSON.parse(this.responseText);
					cb(resp);
		        }
		        });
		        xhr.open("GET", "https://api.trello.com/1/members/lexartbrain/boards?filter=all&fields=all&lists=none&memberships=none&organization=false&organization_fields=name%2CdisplayName&key="+key+"&token="+token);
		        xhr.send(data);
			},

			saveBoards: function(obj, cb) {
	            var xhr = new XMLHttpRequest();
	            xhr.addEventListener("readystatechange", function (resp) {
	              if (this.readyState === this.DONE) {
					var resp = this.responseText;
	                cb(resp);
	              }
	            })
	            console.log("ObjBoard::", obj);
	            xhr.open("POST", BASE_URL+'trello/new', true);
	            xhr.setRequestHeader('Content-Type', 'application/json');
	            xhr.send(JSON.stringify(obj));
			}
	  	};

	  	return factory;

	}]);



}(angular));
