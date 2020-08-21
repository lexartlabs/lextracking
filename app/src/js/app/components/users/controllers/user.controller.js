(function(ng) {

    'use strict';

    var Module = ng.module('Imm');

    Module.controller('UserCtrl', ['$scope', '$state', '$stateParams', '$filter', 'UserServices','ClientServices', 'ngDialog', 'EvaluateServices', function($scope, $state, $stateParams, $filter, UserServices, ClientServices,ngDialog, EvaluateServices) {

        $scope.user         = {};
        $scope.sendingData  = false;
        var idUser          = $stateParams.id;
        $scope.clients      = [];
        $scope.performance  = {};



        if (idUser) {
            UserServices.findById(idUser, function(err, user) {
                if (!err) {
                    console.log('user', user);
                    $scope.user = angular.copy(user);
                }
            });
        }


        ClientServices.find($scope.currentPage, $scope.query, function(err, clients, countItems) {
            if (!err) {
                console.log('clients', clients, countItems);
                $scope.clients = angular.copy(clients);
            }
        });

        $scope.save = function () {
            $scope.error = '';
            console.log('user to save', $scope.user);

            if (!$scope.user.name) {
                $scope.error = $filter('translate')('users.first_name');
                return;
            }

            if (!$scope.user.email) {
                $scope.error = $filter('translate')('users.email');
                return;
            }

            $scope.sendingData = true;
            console.log("RES: ", $scope.user);

            UserServices.save($scope.user, function (err, result) {
                if (err) {
                    console.log("error", err);
                    $scope.error = err.message || err.error.message || err.error || err;
                    $sendingData = false;
                } else {
                    $state.go('app.users');
                }
            });
        }

        $scope.delete = function () {
            $scope.sendingData = true;
            ngDialog.open({
                template: '/app/components/users/views/userModalView.html',
                showClose: true,
                scope: $scope,
                disableAnimation: true,
                data: {
                    title: $filter('translate')('users.delete_user'),
                    content: $filter('translate')('users.confirm_delete'),
                    confirm: function() {
                         UserServices.remove($scope.user.id, function(err, result) {
                            if (err) {
                                $scope.error = err.message || err.error.message || err.error || err;
                                $sendingData = false;
                            } else {
                                $state.go('app.users');
                            }
                        });
                    },
                    cancel: function () {
                        ngDialog.close();
                        $scope.sendingData = false;
                    }
                }
            });
        }

        $scope.tab1 = function (){
            $scope.performance.months = {
                0 : {"Month":"Enero", "Sueldo": 0, "Year": "2020", "HourCost": "220"},
                1 : {"Month":"Febrero", "Sueldo": 0, "Year": "2020", "HourCost": "220"},
                2 : {"Month":"Marzo", "Sueldo": 0, "Year": "2020", "HourCost": "220"},
                3 : {"Month":"Abril", "Sueldo": 0, "Year": "2020", "HourCost": "220"},
                4 : {"Month":"Mayo", "Sueldo": 0, "Year": "2020", "HourCost": "220"},
                5 : {"Month":"Junio", "Sueldo": 0, "Year": "2020", "HourCost": "220"},
                6 : {"Month":"Julio", "Sueldo": 0, "Year": "2020", "HourCost": "220"},
                7 : {"Month":"Agosto", "Sueldo": 0, "Year": "2020", "HourCost": "220"},
                8 : {"Month":"Septiembre", "Sueldo": 0, "Year": "2020", "HourCost": "220"},
                9 : {"Month":"Octubre", "Sueldo": 0, "Year": "2020", "HourCost": "220"},
                10 : {"Month":"Noviembre", "Sueldo": 0, "Year": "2020", "HourCost": "220"},
                11 : {"Month":"Diciembre", "Sueldo": 0, "Year": "2020", "HourCost": "220"}
            }
            console.log($scope.performance.months);
        }

        $scope.tab2 = function(){

        }

        $scope.tab3 = function(){

            EvaluateServices.find(idUser, function(err, result){
                $scope.evaluacion = result;
            })
            
        }

    }]);

}(angular));
