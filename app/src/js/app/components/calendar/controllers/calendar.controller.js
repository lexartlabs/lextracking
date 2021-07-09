(function (ng) {

  'use strict';

  var Module = ng.module('Imm');

  Module.controller('CalendarCtrl', ['$scope', '$compile', '$timeout', 'uiCalendarConfig', 'ngDialog',
    function ($scope, $compile, $timeout, uiCalendarConfig, ngDialog) {

      $scope.date = moment();
      var id = 0;

      $scope.selectedEvent    = null;
      $scope.isFirstTime      = true;
      $scope.changeView       = {};
      $scope.events           = [];
      $scope.eventSources     = [$scope.events];
      $scope.startTime        = []
      $scope.endTime          = []




      //CONFIGURACION DEL CALENDARIO
      $scope.uiConfig = {
        calendar: {
          height: 500,
          editable: true,
          selectable:true,
          nowIndicator: true,

          header: {
            left: 'today prev,next',
            center: 'title',
            right: 'month  agendaWeek',
          },

          dayClick: function (selectedDate) {
            //$scope.events = [];
            $scope.date = angular.copy(selectedDate);
            $scope.modalEventos();
            $scope.selectedDay = angular.copy(selectedDate.format('DD/MM/YYYY'));
            console.log('DATE EXTRAIDO DEL CALENDARIO AL SELECCIONAR',$scope.date);
          },

          eventClick: $scope.alertOnEventClick,
          eventDrop: $scope.alertOnDrop,
          eventResize: $scope.alertOnResize,
          eventRender: $scope.eventRender
        }
      };

    
      // AGREGAR EVENTO
      $scope.addEvent = function () {
        var parseDate = moment($scope.date).toDate()
        $scope.parseDate = moment($scope.date).toDate()

        $scope.events.push({
          _id: $scope.date.get('date'),
          title: 'Agregar descripción',
          start: parseDate,
          end: parseDate
        });console.log('parseDate', parseDate )
      };

      //MOSTRAR FECHA DE HOY
      $scope.todayIs = moment().format('DD/MM/YYYY');

      //CAMBIAR VISTA CALENDARIO
      $scope.changeView = function (view, calendar) {
        uiCalendarConfig.calendars[calendar].fullCalendar('changeView', view);
      };

      $scope.selectedDates = function(evento){
        
        var month = $scope.parseDate.getMonth()
        var dateStr = $scope.date.get('date') + '/' + (month + 1) + '/' +$scope.date.get('year')
        $scope.newDateStart = dateStr + ' ' + $scope.startTime.t
        $scope.newDateEnd = dateStr + ' ' + $scope.endTime.t

        var dateParsedStart = moment($scope.newDateStart, "DD-MM-YYYY hh:mm:ss")
        var dateParsedEnd = moment($scope.newDateEnd, "DD-MM-YYYY hh:mm:ss")

        
        evento.start = moment(dateParsedStart).toDate()
        evento.end = moment(dateParsedEnd).toDate()

        console.log('NEW DATE START',$scope.newDateStart, 'NEW DATE END',$scope.newDateEnd)
        console.log(evento)
      };

      //MODAL
      $scope.modalEventos = function(event){
      ngDialog.open({
        template: '/app/components/calendar/views/createTable.modal.html',
        showClose: true,
        scope: $scope,
        disableAnimation: true,
        data: {
          confirm: function(){
            $scope.eventSources = [$scope.events];
            console.log($scope.eventSources);
            console.log('S E Time', $scope.startTime.t, $scope.endTime.t);
            console.log( 'Start Date', $scope.newDateStart, 'End Date' ,$scope.newDateEnd )
            ngDialog.close();
          },
          cancel: function() {
            ngDialog.close();
          }
        }
      })};


    














    }]);

}(angular));