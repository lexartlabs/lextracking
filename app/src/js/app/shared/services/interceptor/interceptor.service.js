(function (ng) {

    'use strict';

    var Module = ng.module('Imm');
    
    Module.factory('myHttpInterceptor', ['$injector', '$window', function ($injector, $window, $q) {
        return {
            response: function (response) {
                // do something on success
                if(response.headers()['content-type'] == "application/json"){
                    if(response.status == 200){
                        if (typeof response.data !== 'undefined') {
                            if (response.data && response.data.response &&  !response.data.response.token && !response.data.response.email) {
                                var rest = $injector.get('UserServices');
                                rest.persistence( function(error, response){
                                    var user = angular.copy(response);
                                    console.log("SETEA LOCALSTORE::", user)
                                    $window.localStorage[TOKEN_KEY]   = user.token;
                                    $window.localStorage["userId"]    = user.id;
                                    $window.localStorage["userName"]  = user.name;
                                    $window.localStorage["userEmail"] = user.email;
                                    $window.localStorage["userRole"]  = user.role;
                                    $window.localStorage["isAdmin"]   = user.role == 'admin';
                                    $window.localStorage["isClient"]  = user.role == 'client';
                                    $window.localStorage["isDeveloper"]  = user.role == 'developer';
                                    $window.localStorage["idUserClient"]  =user.idClient;
                                    return;
                                });
                            } else if(response.data.code === 401){
                                console.log("LIMPIA LOCALSTORE")
                                $window.localStorage.clear();
                            }
                        }
                    }                   
                }
                return response;
            },
            responseError: function (response) {
                // do something on error
                if (typeof $q !== 'undefined') {
                    return $q.reject(response);
                }
            }
        };
    }]);

}(angular));