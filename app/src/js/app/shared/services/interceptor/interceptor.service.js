(function (ng) {

    'use strict';

    var Module = ng.module('Imm');
    
    Module.factory('myHttpInterceptor', ['$injector', function ($injector, $q) {
        return {
            response: function (response) {
                // do something on success
                if(response.headers()['content-type'] == "application/json"){
                    if(response.status == 200){
                        if (typeof response.data.response !== 'undefined') {
                        if (!response.data.response.token && !response.data.response.email) {
                           console.log("IF :: ", response);
                           var rest = $injector.get('UserServices');
                           //rest.persistence({"token": "C3190BF40F8B78E2EF0ED89C2718D3E60B05968B"}, function(response, error){console.log(response,error)});
                           rest.persistence('', function(response, error){console.log(response,error)});
                           
                        }else {
                            console.log("ELSE :: " ,response);
                            
                        }
                    }
                    }
                    // Validate response, if not ok reject
                   
                }
                //console.log("INTERCEPTOR :: ",response)
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