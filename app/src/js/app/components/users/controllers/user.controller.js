(function(ng) {

    'use strict';

    var Module = ng.module('Imm');

    Module.controller('UserCtrl', ['$scope', '$state', '$stateParams', '$filter', 'UserServices','ClientServices', 'ngDialog', 'EvaluateServices','TracksServices', 'WeeklyHourServices', function($scope, $state, $stateParams, $filter, UserServices, ClientServices,ngDialog, EvaluateServices, TracksServices, WeeklyHourServices) {

        $scope.user         = {};
        $scope.sendingData  = false;
        var idUser          = $stateParams.id;
        $scope.clients      = [];
        $scope.performance  = {};
        $scope.date         = {};


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

            var actualMonth = moment().month();
            var pastMonth   = moment().month()-1;
            var allMonths   = ['Enero','Febrero','Mayo','Abril','Marzo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
            
            $scope.date.minDate   = moment().subtract(6, 'year'); 
            $scope.date.maxDate   = moment().add(0, 'year'); 
            $scope.date.startDate = moment().subtract(1, 'year');
            $scope.performance.actual = {};
            $scope.performance.past   = {};
            $scope.performance.allMonths = {};

            $scope.performance.actual.month = {
                'idMonth': actualMonth+1,
                'month'  : allMonths[actualMonth],                
                'year': 2020,
                'idUser': idUser
            }

            $scope.performance.past.month = {
                'idMonth': pastMonth+1,
                'month'  : allMonths[pastMonth],
                'year'   : 2020,
                'idUser' : idUser
            };

            TracksServices.findByMonth($scope.performance.actual.month, function(err, result){
                $scope.performance.actual.month.salary = Object.values(result[0])[0];
                TracksServices.findByMonth($scope.performance.past.month, function (err, result){
                    $scope.performance.past.month.salary = Object.values(result[0])[0];

                    WeeklyHourServices.verifyUser(idUser, function(err, result){
                        $scope.performance.actual.month.costHour = result[0].costHour;
                        UserServices.savePerformance($scope.performance.actual.month, function(err, result){
                            console.log('save performance', err, result);
                        })
                    })
                })
            })

            UserServices.getPerformanceById($scope.performance.past.month, function(err,result){
                $scope.performance.past.month = result[0];
            })

            $scope.performance.allMonths = {
                'idUser'   : idUser,
                'year'     : 2020,
                'actMonth' : $scope.performance.actual.month.idMonth,
                'pastMonth': $scope.performance.past.month.idMonth
            }

            $scope.moreMonths = function(){
                UserServices.allPerformances($scope.performance.allMonths, function(err, result){
                    if (!err) {
                        $scope.performance.allMonths = result;
                    }
                })      
            }



        }

        $scope.tab2 = function(){

        }

        $scope.tab3 = function(){

            EvaluateServices.find(idUser, function(err, result){
                $scope.evaluacion = result;
            })
            
            $scope.showEval = function(value){
               ngDialog.open({
                  template: '/app/shared/views/alert.modal.html',
                  showClose: true,
                  scope: $scope,
                  disableAnimation: true,
                  data: {
                    titleRequired: "Evaluación",
                    evaluate: value,
                    confirm: function() {
                      ngDialog.close(windowIDs[1]);
                    },
                    cancel: function() {
                      var windowIDs = ngDialog.getOpenDialogs();

                      ngDialog.close(windowIDs[1]);
                    }
                  }
                });     
            }
        }

    }]);

}(angular));
