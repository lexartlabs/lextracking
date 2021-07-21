(function (ng) {

  'use strict';

  var Module = ng.module('Imm');

  Module.controller('CalendarCtrl', ['$scope', 'CalendarServices', '$timeout', 'uiCalendarConfig', 'ngDialog', 'UserServices', '$rootScope', '$filter',
    function ($scope, CalendarServices, $timeout, uiCalendarConfig, ngDialog, UserServices, $rootScope, $filter) {

      $scope.date = moment();
      var id = 0;
      var userRole = $rootScope.userRole;

      $scope.selectedEvent = null;
      $scope.isFirstTime = true;
      $scope.changeView = {};
      $scope.events = [];
      $scope.eventSources = [$scope.events];
      $scope.startTime = [];
      $scope.endTime = [];
      $scope.diaSeleccionado = {
        selected: {
          name: "Lunes", horarios: []
        }
      };

      $scope.mostrarInfo = [{
        name: '',
        horarios: ''
      }];

      $scope.arrayAux = [];
      var parseDate = moment($scope.date).toDate()








      CalendarServices.getUserEvents(0, function (err, result) {

      });

      $scope.event = {
        day: $scope.date.get('date'),

        title: 'Test',
        start: parseDate,
        end: parseDate,
        hourStart: null,
        hourEnd: null,
        allDay: false
      }
      $scope.events.push($scope.event);


      //CONFIGURACION DEL CALENDARIO
      $scope.uiConfig = {
        calendar: {
          customButtons: {
            agragarHorario: {
              text: 'Agregar Horario Fijo',
              click: function () { $scope.modalHorarioFijo() }
            }

          },
          locale: 'es',
          height: 500,
          editable: true,
          selectable: true,
          nowIndicator: true,
          header: {
            left: 'today prev,next',
            center: 'title',
            right: 'agragarHorario month  agendaWeek',
          },

          dayClick: function (selectedDate) {
            $scope.date = angular.copy(selectedDate);
            $scope.checkDate = moment($scope.date).toDate();
            $scope.checkDate = $scope.checkDate.getDate() + 1;
            $scope.modalEventos();
            $scope.selectedDay = angular.copy(selectedDate.format('DD/MM/YYYY'));
          },

          eventClick: function (event) {
            $scope.eventSources = []
            $scope.date = angular.copy(event.start);
            $scope.checkDate = moment($scope.date).toDate();
            $scope.checkDate = $scope.checkDate.getDate();
            ngDialog.open({
              template: '/app/components/calendar/views/createTable.modal.html',
              showClose: true,
              scope: $scope,
              disableAnimation: true,
              data: {
                confirm: function () {
                  $scope.eventSources = [$scope.events];
                  ngDialog.close();
                },
                cancel: function () {
                  ngDialog.close();
                }
              }
            })
          },

          eventDrop: $scope.alertOnDrop,
          eventResize: $scope.alertOnResize,
          eventRender: $scope.eventRender
        }
      };

      //AGREGAR EVENTO
      $scope.addEvent = function () {

        $scope.eventSources = []
        $scope.parseDate = moment($scope.date).toDate()
        $scope.parseDate.setDate($scope.parseDate.getDate() + 1)

        $scope.events.push({
          day: $scope.date.get('date'),
          title: 'Agregar descripción',
          start: $scope.parseDate,
          end: $scope.parseDate,
          hourStart: null,
          hourEnd: null,
          allDay: false
        });
      };

      //MOSTRAR FECHA DE HOY
      $scope.todayIs = moment().format('DD/MM/YYYY');

      //CAMBIAR VISTA CALENDARIO
      $scope.changeView = function (view, calendar) {
        uiCalendarConfig.calendars[calendar].fullCalendar('changeView', view);
      };

      $scope.selectedDates = function (evento, fechaMonth, fechaDiaAnio) {
        var month = fechaMonth.getMonth()
        var dateStr = fechaDiaAnio.get('date') + '/' + (month + 1) + '/' + fechaDiaAnio.get('year')
        $scope.newDateStart = dateStr + ' ' + evento.hourStart
        $scope.newDateEnd = dateStr + ' ' + evento.hourEnd
        var dateParsedStart = moment($scope.newDateStart, "DD-MM-YYYY hh:mm:ss")
        var dateParsedEnd = moment($scope.newDateEnd, "DD-MM-YYYY hh:mm:ss")
        evento.start = moment(dateParsedStart).toDate()
        evento.end = moment(dateParsedEnd).toDate()
        return evento
      };

      //ELIMINAR
      $scope.remove = function (index) {
        $scope.events.splice(index, 1);
      };

      //MODAL EDITAR EVENTOS
      $scope.modalEventos = function (event) {
        ngDialog.open({
          template: '/app/components/calendar/views/createEvent.modal.html',
          showClose: true,
          scope: $scope,
          disableAnimation: true,
          data: {
            confirm: function () {
              $scope.eventSources = [$scope.events];

              ngDialog.close();
            },
            cancel: function () {
              ngDialog.close();
            }
          }
        })
      };

      //USUARIOS
      $scope.users = [];
      if (userRole == "admin" || userRole == "pm") {
        UserServices.find(0, "", function (err, users) {
          if (!err) {
            users.unshift({ id: 0, name: $filter("translate")("users.all") });
            $scope.users = users;
          }
        })
      };

      //MODAL AGREGAR HORARIO FIJO
      $scope.modalHorarioFijo = function (event) {
        ngDialog.open({
          name: 'modalHorarioFijo',
          template: '/app/components/calendar/views/definirHorarioFijo.modal.html',
          showClose: true,
          scope: $scope,
          disableAnimation: true,
          data: {
            confirm: function () {
              $scope.actualizarHorariosFijos();

              ngDialog.close();
            },
            cancel: function () {
              ngDialog.close();
            }
          }
        })
      };

      //MOMENT-PICKER MODAL DEFINIR HORARIO FIJO
      $scope.startTimeFijo = {}
      $scope.endTimeFijo = {}
      $scope.startEnd = {}
      $scope.mostrarHorariosModal = []

      $scope.horariosFijos = [
        { name: 'Lunes', horarios: [] },
        { name: 'Martes', horarios: [] },
        { name: 'Miercoles', horarios: [] },
        { name: 'Jueves', horarios: [] },
        { name: 'Viernes', horarios: [] },
        { name: 'Sabado', horarios: [] },
        { name: 'Domingo', horarios: [] }
      ];

      $scope.selectedTime = function (time) {
        // $scope.startTimeFijo = time.hourStart
        // $scope.endTimeFijo = time.hourEnd
        // $scope.startEnd.desde = angular.copy($scope.startTimeFijo)
        // $scope.startEnd.hasta = angular.copy($scope.endTimeFijo)
        // console.log('StartEnd', $scope.startEnd)
      };

      //GUARDAR HORARIOS FIJOS SELECCIONADOS EN LOS DIAS
      $scope.addHorarioFijo = function (day, t) {
        if (t == undefined || t.hourStart == undefined || t.hourEnd == undefined) {
          $scope.modalHorarioError()
        } else {
          $scope.mostrarInfo.push({ name: day, desde: t.hourStart, hasta: t.hourEnd })
        }
      };

      //ACTUALIZAR HORARIOSFIJOS CON LA INFO DE LA TABLA
      $scope.actualizarHorariosFijos = function () {
        
        angular.forEach($scope.horariosFijos, function (day, index) {
          angular.forEach($scope.mostrarInfo, function (dayInfo, indexInfo) {
            if (dayInfo.name == day.name) {
              $scope.arrayAux.push({ desde: dayInfo.desde, hasta: dayInfo.hasta });
              day.horarios = $scope.arrayAux;
              $scope.arrayAux = [];

            }
          })
        });
        setHorariosFijos()
      };

      //ELIMINAR REGISTRO DE HORARIO EN MODAL HORARIO FIJO
      $scope.eliminarRegistro = function (index) {
        $scope.mostrarInfo.splice(index, 1);
      };

      //MOSTRAR MODAL ERROR
      $scope.modalHorarioError = function () {
        ngDialog.open({
          id: 'modalError',
          name: 'modalError',
          template: '/app/components/calendar/views/horarioError.modal.html',
          showClose: true,
          scope: $scope,
          disableAnimation: true,
          data: {
            cancel: function () {
              ngDialog.close();
            }
          }
        })
      };


      //MOSTRAR HORARIO FIJO EN EL CALENDARIO



      var fechaActual = moment().format('MM-YYYY');
      var mesSelected = fechaActual.split('-')[0];
      var anioSelected = fechaActual.split('-')[1];
      var lunesAllDias = [];
      var eventosFijos = [];
      var eventoFijo = {};
      var diasAgregados = [];

      var eventoAux = {
        title: 'Activo',
        start: null,
        end: null,
        hourStart: null,
        hourEnd: null,
        allDay: false,
      };


      function setHorariosFijos() {
        var cantDias = moment(fechaActual, "YYYY-MM").daysInMonth()
        eventosFijos = [];
        for (var i = 1; i <= cantDias; i++) {
          var dia = angular.copy(i)
          var weekDayName = moment(dia + '-' + fechaActual, 'DD-MM-YYYY').format('dddd').toLowerCase();
          angular.forEach($scope.horariosFijos, function (hF, index) {
            if (hF.horarios.length > 0 && hF.name.toLowerCase() == normalize(weekDayName)) {
              if (diasAgregados.includes(i)) {
                return
              } else {
                angular.forEach(hF.horarios, function (h, index) {
                  eventoAux.title = 'Horario Fijo';
                  eventoAux.hourStart = angular.copy(h.desde)
                  eventoAux.hourEnd = angular.copy(h.hasta)
                  var fecha = moment(dia + '-' + fechaActual, 'DD-MM-YYYY')
                  eventoFijo = angular.copy($scope.selectedDates(eventoAux, fecha.toDate(), fecha))
                  $scope.eventSources[0].push(eventoFijo)
                  console.log( 'eventoFijo' ,eventoFijo)
                  eventoFijo = {}

                })
                diasAgregados.push(i);
              }
              console.log('i', i, 'diasAgregados', diasAgregados)

            }
          })
        };
        console.log(angular.copy($scope.eventSources))

      };

      var normalize = (function() {
        var from = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç", 
            to   = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc",
            mapping = {};
       
        for(var i = 0, j = from.length; i < j; i++ )
            mapping[ from.charAt( i ) ] = to.charAt( i );
       
        return function( str ) {
            var ret = [];
            for( var i = 0, j = str.length; i < j; i++ ) {
                var c = str.charAt( i );
                if( mapping.hasOwnProperty( str.charAt( i ) ) )
                    ret.push( mapping[ c ] );
                else
                    ret.push( c );
            }      
            return ret.join( '' );
        }
       
      })();






      // //TOMAR TODOS LOS DIAS LUNES DEL MES
      // function lunesTodos(m, y) {
      //   var days = new Date(y, m, 0).getDate();
      //   var lunes = new Date(m + '/01/' + y).getDay();
      //   if (lunes != 1) {
      //     lunes = 9 - lunes;
      //   }
      //   lunes = [lunes];
      //   for (var i = lunes[0] + 7; i <= days; i += 7) {
      //     lunesAllDias.push(i);
      //   }
      // } console.log('mondaysInMonth', lunesTodos(mesSelected, anioSelected), 'lunesAllDias', lunesAllDias)




      // $scope.mostrarHorarioFijo = function () {
      //   angular.forEach($scope.horariosFijos, function (day, index) {
      //     angular.forEach(day.horarios, function (hora, index) {
      //       if (day.name == 'Lunes') {
      //         eventoAux.hourStart = angular.copy(hora.desde)
      //         eventoAux.hourEnd = angular.copy(hora.hasta)
      //         $scope.eventoFechaRender(eventoAux);
      //         $scope.eventSources[0].push(eventoAux);
      //         console.log('$scope.eventoAux', eventoAux)
      //         console.log('$scope.eventSources', $scope.eventSources)
      //       }
      //     })
      //   })
      // }

      // //RE-ARMAR LAS FECHAS COMPLETAS CON TODOS LOS DIAS LUNES DEL MES
      // var lunesAllFecha = [];


      // angular.forEach(lunesAllDias, function (dia) {
      //   lunesAllFecha.push(dia.toString() + '/' + mesSelected + '/' + anioSelected)
      // })
      // $scope.eventoFechaRender = function (evento) {
      //   angular.forEach(lunesAllFecha, function (l) {
      //     $scope.eventoStart = angular.copy(l + ' ' + evento.hourStar);
      //     $scope.eventoEnd = angular.copy(l + ' ' + evento.hourEnd);
      //     var dateParsedStart = moment($scope.eventoStart, "DD-MM-YYYY hh:mm:ss")
      //     var dateParsedEnd = moment($scope.eventoEnd, "DD-MM-YYYY hh:mm:ss")
      //     evento.start = moment(dateParsedStart).toDate()
      //     evento.end = moment(dateParsedEnd).toDate()
      //     console.log('ele', l, 'evento', evento)
      //   })
      // }; console.log('lunesAllFecha', lunesAllFecha)



























      //TOMAR USER ID Y TRAER EVENTOS
      // var idUser = $rootScope.idUser
      // if (userRole != "admin" || userRole != "pm"){
      //   CalendarServices.getUserEvents(idUser, function (err, events){
      //     if (!err) {
      //       $scope.events = events
      //     }else {
      //       var allIdUsers = UserServices.findAll();
      //       console.log('Todos los usuarios', allIdUsers)
      //       CalendarServices.getUserEvents(allIdUsers, function (err, events){
      //         if (!err) {

      //         }
      //       })
      //     }
      //   })
      // };





    }]);

}(angular));