(function (ng) {

    'use strict';

    var Module = ng.module('Imm');

    Module.factory('CalendarServices', ['RestClient', function(RestClient){
        var model = 'Calendar';

        var factory = {
            

            getUserEvents: function(obj, cb){
                RestClient.get(model + "/events-id", function(err, result){
                    cb(err, result);
                })
            },

            postUserEvents: function(obj, cb){
                RestClient.post(model + '/save-events', obj, function(err, result){
                    cb(err, result);
                })
            },

            EditEvents: function(obj, cb){
                RestClient.post(model + '/save-events/' + obj.id, obj, function(err, result){
                    cb(err, result);
                })
            },















        };
        return factory;
    }]);

}(angular));