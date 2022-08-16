(function(ng) {

  'use strict';

  var Module = ng.module('LexTracking');

  Module.controller('DashboardCtrl', ['$scope', '$rootScope', '$state', '$stateParams', '$filter', 'TracksServices','TasksServices', 'ngDialog', function($scope, $rootScope, $state, $stateParams, $filter, TracksServices,TasksServices, ngDialog) {

    $scope.tracks   = [];
    $scope.allTasks = [];
    $scope.developerTracks = [];
    $scope.total    = '';
    $scope.trackDates = {
      start: '',
      end: '',
    }
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

    function getUserHistory () {
      TracksServices.findHistory(function (err, tracks) {
        if (!err) {
          console.table(tracks)
          $scope.history = tracks;
          $scope.history.forEach(function (item) { 
            item.startTimeDisplay = moment(item.startTime).format("ddd DD MMMM YYYY HH:mm");
            item.endTimeDisplay = moment(item.endTime).format("HH:mm");
            item.timeTracked = moment.duration(moment(item.endTime).diff(moment(item.startTime))).asHours().toFixed(2);
          });
        }
      });
    }

    function toSQLFormat(d) {
      return new Date(d).toISOString().slice(0, 19).replace('T', ' ');
    }

    $scope.handleTrack = function(item) {
      if($rootScope.timerRunning) {
        $scope.stopTrack();
        getUserHistory();
      } else {
        $scope.startTrack(item);
      }
    }

    $scope.createTrackDirectly = function(task) {
      console.log('Lucas ->', $scope.trackDates);
      // criar validação
      const payload = {
        idUser: $rootScope.userId,
        idTask: task.idTask,
        taskName: task.name,
        projectName: task.projectName,
        startTime: toSQLFormat($scope.trackDates.start),
        endTime: toSQLFormat($scope.trackDates.end),
        idProyecto: task.projectId,
        typeTrack: task.typeTrack,
        currency: task.currency,
      };

      console.log('Lucas ->', payload);

      // Criar task
      // TracksServices.create(payload, function (err, result) {
      //   if (!err) {
      //       console.log("🚀  Lucas --> result", result);
      //       result = result[0];
      //       console.log('saved task', result);
      //   }
      // });
    }


    if (userRole=='client') {
      TasksServices.findByIdClient($rootScope.userIdClient,function (err,tasks) {
        if (!err) {
          $scope.allTasks = angular.copy(tasks);

          console.log('tasksClient',$scope.allTasks);
        }

      });

    }


    if (userRole == 'admin' || userRole == 'pm') {
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

    }else if (userRole=='developer') {
      //Tomar nueva Api.
      TracksServices.findHistory(function (err, tracks) {
        if (!err) {
          console.table(tracks)
          $scope.history = tracks;
          $scope.history.forEach(function (item) { 
            item.startTimeDisplay = moment(item.startTime).format("ddd DD MMMM YYYY HH:mm");
            item.endTimeDisplay = moment(item.endTime).format("HH:mm");
            item.timeTracked = moment.duration(moment(item.endTime).diff(moment(item.startTime))).asHours().toFixed(2);
          });
          // $scope.tracks = [];
          // _.each(tracks, function (track, index) {
          //   track.startTime = new Date(track.startTime).getTime();

          //   $scope.allTasks.forEach(function (task, index) {
          //     if (task.id == track.idTask) {
          //       $scope.tracks.push(track);
          //       return false;
          //     }
          //   })

          // });
        }
      });

    }else {
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
