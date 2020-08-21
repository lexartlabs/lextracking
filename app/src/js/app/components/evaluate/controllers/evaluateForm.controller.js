(function(ng) {

  'use strict';

  var Module = ng.module('Imm');

  Module.controller('EvalFormCtrl', ['$scope', '$state', '$rootScope', 'UserServices', '$stateParams', 'TasksServices', 'EvaluateServices', function($scope, $state, $rootScope, UserServices, $stateParams, TasksServices, EvaluateServices) {

    var user        = $stateParams.id;
    $scope.userEval = {};
    $scope.userTask = {};
    $scope.evaluacion = {};

    UserServices.findById(user, function(err, result){
      $scope.userEval = result;
    })

    TasksServices.findByUserEval(user, function(err, result){
      console.log('Task user', err, result);
      $scope.userTask = result;
      $scope.selected = { value: $scope.userTask };
      console.log('Projects select::', $scope.userTask, $scope.selected);    
    });

    $scope.save = function(userEval){
      userEval.idAdmin = $rootScope.userId;
      if (userEval.fecha) {
        var month = Number(moment(userEval.fecha).month()) + 1;
        userEval.fecha = moment(userEval.fecha).year() + "/" + month + "/" + moment(userEval.fecha).date();
        console.log (userEval.fecha);
      }
      console.log('userEval',userEval);
      EvaluateServices.save(userEval, function(err, result){
        console.log("Evaluacion guardada", err, result);
      })
    }

    EvaluateServices.find(user, function(err, result){
      console.log('Evaluaciones usuario::', err, result);
      $scope.evaluacion = result;
    })

  }]);

}(angular));