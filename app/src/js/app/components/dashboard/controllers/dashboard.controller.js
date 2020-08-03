(function(ng) {

  'use strict';

  var Module = ng.module('Imm');

  Module.controller('DashboardCtrl', ['$scope', '$rootScope', '$state', '$stateParams', '$filter', 'TracksServices','TasksServices', 'ngDialog', function($scope, $rootScope, $state, $stateParams, $filter, TracksServices,TasksServices, ngDialog) {

    $scope.tracks   = [];
    $scope.allTasks = [];
    $scope.total    = '';
    var userId      = $rootScope.userId;
    var userRole    = $rootScope.userRole;

    function checkTime(i) {
      i = (i < 1) ? 0 : i;
      if (i < 10) i = "0" + i;
      return i;
    }

    function getTotalTime (ms) {
      var h =  checkTime(Math.floor(ms/3600));
      ms = Math.floor(ms%3600);
      var m = checkTime(Math.floor(ms/60));
      ms = Math.floor(ms%60);
      var s = checkTime(Math.floor(ms));
      return h + ":" + m + ":" + s;
    }

    if (userRole=='client') {
      TasksServices.findByIdClient($rootScope.userIdClient,function (err,tasks) {
        if (!err) {
          $scope.allTasks = angular.copy(tasks);

          console.log('tasksClient',$scope.allTasks);
        }

      });

    }


    if (userRole == 'admin') {
      TracksServices.findActives( function (err, tracks) {
        if (!err) {
          console.log('tracks', tracks);
          $scope.tracks = tracks;
          _.each(tracks, function (track){
            track.startTime = new Date(track.startTime).getTime();
          });
        }
      });
    }else if (userRole=='client') {
      TracksServices.findActives( function (err, tracks) {
        if (!err) {
          console.log('tracks', tracks);
          $scope.tracks = [];
          _.each(tracks, function (track,index){
            console.log(track);
            track.startTime = new Date(track.startTime).getTime();

            $scope.allTasks.forEach(function (task,index) {
              if (task.id== track.idTask) {
                $scope.tracks.push(track);
                return false;
              }
            })

          });
        }
      });

    } else {
      TracksServices.getUserTracks(userId, function (err, tracks){
        if (!err) {
          console.log('tracks', tracks);
          $scope.tracks = tracks;
          var ms = 0;
          _.each(tracks, function (track){
            track.startTime = new Date(track.startTime).getTime();
            track.endTime = new Date(track.endTime).getTime();
            if (track.duration.indexOf('-') !== -1) {
              track.duration = '';
            } else {
              ms += (track.endTime - track.startTime);
              console.log('ms: ' + ms);
            }
          });
          $scope.total = getTotalTime(ms/1000);
        }
      });
    }

  }]);

}(angular));
