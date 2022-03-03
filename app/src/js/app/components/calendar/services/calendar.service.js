(function (ng) {

    'use strict';

    var Module = ng.module('Imm');

    Module.factory('CalendarServices', ['RestClient', function(RestClient){
        var model = 'user';

        var factory = {
            

            getUserEvents: function(id, cb){
                const authUserId = window.localStorage.userId; //se for mudado o backend retorna erro

                let path = authUserId == id ? '/current/hours' : '/' + id +'/hours';

                RestClient.get(model + path, function(err, result){
                    cb(err, result);
                })
            },

            getUserExceptions: function(id, fecha, cb){
                const authUserId = window.localStorage.userId; //se for mudado o backend retorna erro

                let path = authUserId == id ? '/current/exceptions/' : '/' + id +'/exceptions/';

                RestClient.get(model + path + fecha, function(err, result){
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


            removeEvents: function(obj, cb){
                RestClient.delete(model + '/delete-fixed-hours/' + obj.id, obj, function(err, result){
                    cb(err, result);
                })
            },

            getTrackedHours: function(id, fecha, cb){
                const authUserId = window.localStorage.userId; //se for mudado o backend retorna erro

                let path = authUserId == id ? 'tracks/user/current' : 'tracks/user/' + id;

                RestClient.get(path + '/calendar/' + fecha, function(err, result){
                    cb(err, result); 
                })
            },
        };
        return factory;
    }]);

}(angular));