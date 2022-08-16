(function(ng) {

  'use strict';

  var Module = ng.module('LexTracking');

  Module.controller('DashboardCtrl', ['$scope', '$rootScope', '$state', '$stateParams', '$filter', 'TracksServices','TasksServices', 'ngDialog', function($scope, $rootScope, $state, $stateParams, $filter, TracksServices,TasksServices, ngDialog) {

    $scope.tracks   = [];
    $scope.allTasks = [];
    $scope.developerTracks = [];
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

    $scope.findHistory = function () {
      TracksServices.findHistory(function (err, tracks) {
        if (!err) {
          $scope.history = tracks;
          $scope.history.forEach(function (item) {
            item.startTimeDisplay = moment(item.startTime).format("ddd DD MMMM YYYY HH:mm");
            item.endTimeDisplay = moment(item.endTime).format("HH:mm");
            item.timeTracked = moment.duration(moment(item.endTime).diff(moment(item.startTime))).asHours().toFixed(2);
          });
        }
      });
    }

    $scope.startDashboardTrack = async function (item) {
      await $rootScope.startTrack(item, true);
      $scope.findHistory();
    };

    $scope.findDataForAdmin = () => {
      TracksServices.findActives(function (err, tracks) {
        if (!err) {
          console.log('tracks', tracks);
          $scope.tracks = tracks;
          _.each(tracks, function (track) {
            track.startTime = new Date(track.startTime).getTime();
          });
        }
      });  
    }

    $scope.findDataForClient = () => {
      TasksServices.findByIdClient($rootScope.userIdClient, function (err, tasks) {
        if (!err) {
          $scope.allTasks = angular.copy(tasks);

          console.log('tasksClient', $scope.allTasks);
        }

      });
      TracksServices.findActives(function (err, tracks) {
        if (!err) {
          console.log('tracks', tracks);
          $scope.tracks = [];
          _.each(tracks, function (track, index) {
            console.log(track);
            track.startTime = new Date(track.startTime).getTime();
            $scope.allTasks.forEach(function (task, index) {
              if (task.id == track.idTask) {
                $scope.tracks.push(track);
                return false;
              }
            })

          });
        }
      });
    }

    $scope.findDataForUser = () => {
      TracksServices.getUserTracks(userId, function (err, tracks) {
        if (!err) {
          console.log('tracks', tracks);
          $scope.tracks = tracks;
          var ms = 0;
          _.each(tracks, function (track) {
            track.startTime = new Date(track.startTime).getTime();
            track.endTime = new Date(track.endTime).getTime();
            if (track.duration.indexOf('-') !== -1) {
              track.duration = '';
            } else {
              ms += (track.endTime - track.startTime);
              console.log('ms: ' + ms);
            }
          });
          $scope.total = getTotalTime(ms / 1000);
        }
      });
    }
    

    if (userRole == 'admin' || userRole == 'pm') {
      $scope.findHistory();
      $scope.findDataForAdmin();
    } else if (userRole == 'client') {
      $scope.findDataForClient();
    }else if (userRole=='developer') {
      $scope.findHistory();
    }else {
      findDataForUser();
    }

  }]);

}(angular));
