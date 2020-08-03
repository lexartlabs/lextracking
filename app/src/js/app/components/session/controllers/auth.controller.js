(function(ng) {

    'use strict';

    var Module = ng.module('Imm');

    Module.controller('AuthCtrl', ['$scope', '$rootScope', '$window', 'RestClient', '$log', '$state', '$filter', 'WeeklyHourServices', function($scope, $rootScope, $window, RestClient, $log, $state, $filter, WeeklyHourServices) {

            $scope.user = {
                user: '',
                password: ''
            };

            // AUTO FOCUS
            jQuery('input[type=email]').focus();

            $window.localStorage["userName"]  = "";
            $window.localStorage["userRole"]  = "";
            $window.localStorage["userId"]    = "";

            $scope.isChecked = false;

            if ($window.localStorage[TOKEN_KEY]) {
                $state.go('app.dashboard');
            }

            $scope.authenticate = function() {
                RestClient.post('login', $scope.user, function(err, result) {
                    if (result == null) {
                        console.log("err = ",err);
                        if (typeof callback === 'function') {
                            callback(err, result);
                        }

                        $scope.error = $filter('translate')('session.error_email_password');
                        console.log($scope.error);
                    }
                    else {
                        // LOCAL STORAGE


                        console.log("result = ",result);

                        var user = result;

                        $window.localStorage[TOKEN_KEY]   = user.token;
                        $window.localStorage["userId"]    = user.id;
                        $window.localStorage["userName"]  = user.name;
                        $window.localStorage["userEmail"] = user.email;
                        $window.localStorage["userRole"]  = user.role;
                        $window.localStorage["isAdmin"]   = user.role == 'admin';
                        $window.localStorage["isClient"]  = user.role == 'client';
                        $window.localStorage["isDeveloper"]  = user.role == 'developer';
                        $window.localStorage["idUserClient"]  =user.idClient;





                        $rootScope.userId     = $window.localStorage["userId"];
                        $rootScope.userName   = $window.localStorage["userName"];
                        $rootScope.userEmail  = $window.localStorage["userEmail"];
                        $rootScope.userRole   = $window.localStorage["userRole"];
                        $rootScope.isAdmin    = $window.localStorage["isAdmin"];
                        $rootScope.isClient   = $window.localStorage["isClient"];
                        $rootScope.isDeveloper   = $window.localStorage["isDeveloper"];
                        if ($rootScope.isClient=='true') {
                          $rootScope.userIdClient = $window.localStorage["idUserClient"] ;
                        }


                        console.log("logged = ",$rootScope);

                        if (typeof callback === 'function') {
                            callback(err, result);
                        }
                        WeeklyHourServices.verifyUSer(user, function(err, result) {
                            console.log("USER VERIFY");
                            console.log("verify hourcost",err, result);
                        })

                        $state.go('app.dashboard');

                    }
                });
            };
        }

    ]);

}(angular));
