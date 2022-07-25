console.log('Reading BASE URL', BASE_URL);

(function(ng) {

    'use strict';

    var Module = ng.module('Imm');

    Module.factory('RestClient', ['$http', '$state', 'ngProgressFactory', '$window', '$rootScope', function($http, $state, ngProgressFactory, $window, $rootScope) {

        var K = {},
            progressbar   = ngProgressFactory.createInstance(),
            progressFlag  = true,
            PRIMARY_COLOR = "#F95C33",
            factory;

        function getConfig() {
            var config = {
                headers: {
                    Authorization: $window.localStorage[TOKEN_KEY]
                }
            };
            return config;
        }

        K.URL = BASE_URL;

        progressbar.setHeight('2px');
        progressbar.setColor(PRIMARY_COLOR);

        factory = {
            get: function(url, callback, options) {

                var progressFlag = (options && options.disableProgressFlag);

                if (!progressFlag)
                  progressbar.start();

                $http.get(K.URL + url, getConfig()).
                success(function(data, status, headers, config) {
                    if (!progressFlag)
                      progressbar.complete();

                    var countItems = headers()['x-count-items'];
                    callback(null, data.response, countItems);
                }).
                error(function(data, status, headers, config) {
                    if (!progressFlag)
                      progressbar.complete();

                    if (status == 401 && $state.current.name != "login" && $state.current.name != "recovery") { //Go to login
                        $state.go('login', {reload : true});
                        console.log($state.go('login'), status,$state.current.name);
                    } else {
                        callback(data);
                    }
                });
            },
            post: function(url, data, callback) {
                progressbar.start();                  
                    $http.post(K.URL + url, data, getConfig()).then(function (response) {
                        progressbar.complete();
                        if(response && response.data){
                            callback(null,response.data.response)
                        }else{
                            callback(null,response)

                        }                     
                    })
                    // .
                    // success(function(data, status, headers, config) {
                    //     progressbar.complete();
                    //     console.log(data);
                    //     callback(null, data.response);
                    // }).
                    // error(function(data, status, headers, config) {
                    //     progressbar.complete();
                    //     console.log(data);
                    //     if (status == 401 && $state.current.name != "login" && $state.current.name != "recovery") { //Go to login
                    //         $state.go('login');
                    //     } else {
                    //         callback(data);
                    //     }
                    // });

            },
            put: function(url, data, callback) {
                if (K.progressFlag) {
                    progressbar.start();
                }

                $http.put(K.URL + url, data, getConfig()).
                success(function(data, status, headers, config) {
                    if (K.progressFlag) {
                        progressbar.complete();
                    }
                    callback(null, data.response);
                }).
                error(function(data, status, headers, config) {
                    if (K.progressFlag) {
                        progressbar.complete();
                    }
                    if (status == 401 && $state.current.name != "login" && $state.current.name != "recovery") { //Go to login
                        $state.go('login');
                    } else {
                        callback(data);
                    }
                });
            },

            delete: function(url, callback) {
                progressbar.start();

                $http.delete(K.URL + url, getConfig()).
                success(function(data, status, headers, config) {
                    progressbar.complete();
                    callback(null, data);
                }).
                error(function(data, status, headers, config) {
                    progressbar.complete();
                    if (status == 401 && $state.current.name != "login" && $state.current.name != "recovery") { //Go to login
                        $state.go('login');
                    } else {
                        callback(data);
                    }
                });
            }
        }

        return factory;

    }]);

}(angular));
