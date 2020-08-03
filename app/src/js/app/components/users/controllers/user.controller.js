(function(ng) {

    'use strict';

    var Module = ng.module('Imm');

    Module.controller('UserCtrl', ['$scope', '$state', '$stateParams', '$filter', 'UserServices','ClientServices', 'ngDialog', function($scope, $state, $stateParams, $filter, UserServices, ClientServices,ngDialog) {

        $scope.user         = {};
        $scope.sendingData  = false;
        var idUser          = $stateParams.id;
        $scope.clients=[];


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

    }]);

}(angular));
