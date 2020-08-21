(function (ng) {

    'use strict';

    var Module = ng.module('Imm');

    Module.factory('EvaluateServices', ['RestClient', function(RestClient){

	  	var model = "evaluate";

	  	var factory = {
		    save: function(obj, cb) {
	        	RestClient.post(model + "/new", obj, function(err, result) {
	          		cb(err, result);
	        	})
		    },

		    find: function(id, cb) {
		    	RestClient.get(model + '/user/' + id, function(err, result){
		    		cb(err, result);
		    	})
		    }
	  	};

	  	return factory;

	}]);

}(angular));
