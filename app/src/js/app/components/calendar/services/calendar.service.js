(function (ng) {

    'use strict';

    var Module = ng.module('Imm');

    Module.factory('CalendarServices', ['RestClient', function(RestClient){
        var model = 'user-hours';

        var factory = {
            

            getUserEvents: function(id, cb){
                RestClient.get(model + '/' + id, function(err, result){
                    cb(err, result);
                })
            },

            getUserExceptions: function(id, fecha, cb){
                RestClient.get('user-exceptions'+ '/' + id + '/' + fecha, function(err, result){
                    cb(err, result);
                })
            },


            postUserEvents: function(obj, cb){
                RestClient.post(model, obj, function(err, result){
                    cb(err, result);
                })
            },


            postUserExceptions: function(obj, id, fecha, cb){
                RestClient.post('user-exceptions' + '/' + id + '/' + fecha, obj , function(err, result){
                    cb(err, result);
                })
            },


            RemoveEvents: function(obj, cb){
                RestClient.delete(model + '/delete-fixed-hours/' + obj.id, obj, function(err, result){
                    cb(err, result);
                })
            }

            















        };
        return factory;
    }]);

}(angular));