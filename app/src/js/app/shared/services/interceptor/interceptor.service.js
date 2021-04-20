(function (ng) {

    'use strict';

    var Module = ng.module('Imm');

    Module.factory('myHttpInterceptor', function ($q) {
        return {
            response: function (response) {
                // do something on success
                if(response.headers()['content-type'] == "application/json"){
                    // Validate response, if not ok reject
                    var data = response; // assumes this function is available
                    if(!data)
                        return $q.reject(response);
                }
                console.log(response)
                return response;
            },
            responseError: function (response) {
                // do something on error
                return $q.reject(response);
            }
        };
    });

}(angular));