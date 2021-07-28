(function (ng) {

  'use strict';

  var Module = ng.module('Imm');

  Module.controller('CalendarCtrl', ['$scope', 'CalendarServices', '$timeout', 'uiCalendarConfig', 'ngDialog', 'UserServices', '$rootScope', '$filter',
    function ($scope, CalendarServices, $timeout, uiCalendarConfig, ngDialog, UserServices, $rootScope, $filter) {

      var id = $rootScope.userId;
      var userRole = $rootScope.userRole;
      var eventosFijos = [];
      var eventoFijo = {};
      var diasAgregados = [];
      $scope.horariosFijosAux = [];
      $scope.arrayAux = [];
      $scope.selectedEvent = null;
      $scope.isFirstTime = true;
      $scope.changeView = {};
      $scope.events = [];
      $scope.startTime = [];
      $scope.endTime = [];
      $scope.filter = { user: id };
      $scope.users = [];
      $scope.startTimeFijo = {};
      $scope.endTimeFijo = {};
      $scope.startEnd = {};
      $scope.mostrarHorariosModal = [];
      var endMonthViewDate = {};
      $scope.horariosFijosAux = [];
      $scope.date = moment();
      $scope.eventSources = [$scope.events];
      var fechaActual = moment().format('MM-YYYY');
      var parseDate = moment($scope.date).toDate();
      var fechaActualCompleta = moment().toDate()

      $scope.diaSeleccionado = {
        selected: {
          name: "Lunes", horarios: []
        }
      };

      $scope.mostrarInfo = [{
        name: '',
        horarios: ''
      }];

      $scope.horariosFijos = [
        { name: 'Lunes', horarios: [] },
        { name: 'Martes', horarios: [] },
        { name: 'Miercoles', horarios: [] },
        { name: 'Jueves', horarios: [] },
        { name: 'Viernes', horarios: [] },
        { name: 'Sabado', horarios: [] },
        { name: 'Domingo', horarios: [] }
      ];

      //EVENTO HARDCODED
      // $scope.event = {
      //   day: $scope.date.get('date'),
      //   title: 'Test',
      //   start: parseDate,
      //   end: parseDate,
      //   hourStart: null,
      //   hourEnd: null,
      //   allDay: false,
      //   user_id: id
      // }
      // $scope.events.push($scope.event);
    
      
      function getUserEvents(id) {
        CalendarServices.getUserEvents(id, function (err, result) {
          if (result) {
            angular.forEach(result, function (e) {
              e.dayCheck = moment(e.start).format('DD')
              $scope.mostrarInfo.push({ name: e.day, desde: moment(e.start).format('hh:mm'), hasta: moment(e.end).format('hh:mm') })
              $scope.actualizarHorariosFijos()
            });
            console.log('result', result)
          };
        });
        CalendarServices.getUserExceptions(id, function(err, result){
        });
      }; 
      getUserEvents($scope.filter.user);




      //CONFIGURACION DEL CALENDARIO
      $scope.uiConfig = {
        calendar: {
          customButtons: {
            agregarHorario: {
              text: 'Agregar Horario Fijo',
              click: function () { $scope.modalHorarioFijo() }
            }
          },
          // validRange:function (nowDate) {
          //   return {
          //     start: nowDate,
          //     end: nowDate.clone().add(1, 'months')
          //   }
          // },


          locale: 'es',
          height: 500,
          editable: true,
          selectable: true,
          nowIndicator: true,

          header: {
            left: 'today prev,next',
            center: 'title',
            right: 'agregarHorario month  agendaWeek',
          },

          viewRender: function (view, element) {
            $scope.currentMonth = view.intervalEnd._d
            endMonthViewDate = view.intervalEnd._d
            $scope.currentMonth = moment($scope.currentMonth).format('MM-YYYY')
            diasAgregados = [];
            setHorariosFijos($scope.currentMonth)

          },

          dayClick: function (selectedDate) {
            $scope.date = angular.copy(selectedDate);
            $scope.checkDate = moment($scope.date).toDate();
            $scope.checkDate = $scope.checkDate.getDate() + 1;
            $scope.modalEventos();
            $scope.mesCalendario =
              $scope.selectedDay = angular.copy(selectedDate.format('DD/MM/YYYY'));
            
          },

          eventDestroy: function (event, element, view) {

          },
          eventClick: $scope.modalEventos = function (event) {
            console.log('event', event)
            // $scope.eventSources = []
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
                  console.log('$scope.eventSources', $scope.eventSources)
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

      //FECHA DE HOY
      $scope.todayIs = moment().format('DD/MM/YYYY');

      //CAMBIAR VISTA CALENDARIO
      $scope.changeView = function () {
        uiCalendarConfig.calendars['calendar'].fullCalendar('changeView', 'basicWeek');
        uiCalendarConfig.calendars['calendar'].fullCalendar('changeView', 'month');
        uiCalendarConfig.calendars['calendar'].fullCalendar('refetchEvents')
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

      //USUARIOS
      if (userRole == "admin" || userRole == "pm") {
        UserServices.find(0, "", function (err, users) {
          if (!err) {
            users.unshift({ id: 0, name: $filter("translate")("users.all") });
            $scope.users = users;
          };
        })
      };

      //BORRAR EVENTOS DE HORARIO FIJO ALMACENADOS (MANTIENE EXEPCIONES)
      $scope.cleanEvents = function () {
        $scope.mostrarInfo = [];
        $scope.eventSources[0] = [];
        $scope.horariosFijos = [
          { name: 'Lunes', horarios: [] },
          { name: 'Martes', horarios: [] },
          { name: 'Miercoles', horarios: [] },
          { name: 'Jueves', horarios: [] },
          { name: 'Viernes', horarios: [] },
          { name: 'Sabado', horarios: [] },
          { name: 'Domingo', horarios: [] }
        ];
        $scope.eventSources[0] = $scope.events;
      };

      //CAPTURAR USUARIO SELECCIONADO EN EL SELECT 
      $scope.refreshEventos = function (id) {
        $scope.cleanEvents();
        getUserEvents($scope.filter.user)
        $scope.changeView()
          //uiCalendarConfig.calendars['calendar'].fullCalendar('refetchEvents')
      };

      //FORMATEAR ARRAY DE HORARIOS FIJOS PARA ENVIARLO A LA API
      $scope.armarHorarioFijoPost = function () {
        $scope.horariosFijosAux = angular.copy($scope.horariosFijos)
        angular.forEach($scope.horariosFijosAux, function (hF, index) {
          hF.name = hF.name.toLowerCase();
          angular.forEach(hF.horarios, function (h) {

            hF.user_id = $scope.filter.user
            hF.start = moment().format('YYYY-MM-DD') + ' ' + h.desde + ":00"
            hF.end = moment().format('YYYY-MM-DD') + ' ' + h.hasta + ":00"
            h.desde = moment().format('YYYY-MM-DD') + ' ' + h.desde + ":00"
            h.hasta = moment().format('YYYY-MM-DD') + ' ' + h.hasta + ":00"
          });

        });
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
              $scope.armarHorarioFijoPost();
              $scope.cleanEvents();
              $scope.horariosFijosAux.push({ id: $scope.filter.user });
              CalendarServices.postUserEvents($scope.horariosFijosAux, function (err, result) {
                if (result) {
                  getUserEvents($scope.filter.user)
                  $scope.changeView()
                }
              })
              console.log('$scope.eventSources', $scope.eventSources)
              
              $scope.horariosFijosAux = []

              ngDialog.close();
            },
            cancel: function () {
              ngDialog.close();
            }
          }
        })
      };

      //MODAL EDITAR EVENTOS

      // $scope.modalEventos = function (event) {
      //   console.log(event)
      //    $scope.eventSources = []
      //   $scope.date = angular.copy(event.start);
      //   $scope.checkDate = moment($scope.date).toDate();
      //   $scope.checkDate = $scope.checkDate.getDate();
      //   ngDialog.open({
      //     template: '/app/components/calendar/views/createTable.modal.html',
      //     showClose: true,
      //     scope: $scope,
      //     disableAnimation: true,
      //     data: {
      //       confirm: function () {
      //         $scope.eventSources = [$scope.events];
      //         ngDialog.close();
      //         console.log('$scope.eventSources', $scope.eventSources)
      //       },
      //       cancel: function () {
      //         ngDialog.close();
      //       }
      //     }
      //   })
      // },

      $scope.modalEventos = function (event) {
        uiCalendarConfig.calendars['calendar'].viewRender
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

      //TOMAR DATOS DE MODAL HORARIO FIJO Y PASARLOS A MOSTRAR INFO - MOSTRAR MODAL ERROR
      $scope.addHorarioFijo = function (day, t) {
        if (t == undefined || t.hourStart == undefined || t.hourEnd == undefined) {
          $scope.modalHorarioError()
        } else {
          $scope.mostrarInfo.push({ name: day.toLowerCase(), desde: t.hourStart, hasta: t.hourEnd })
        }
      };

      //ACTUALIZAR HORARIOS FIJOS CON INFO DE MOSTRAR INFO
      $scope.actualizarHorariosFijos = function () {

        angular.forEach($scope.horariosFijos, function (day, index) {
          angular.forEach($scope.mostrarInfo, function (dayInfo, indexInfo) {
            if (dayInfo.name.toLowerCase() == day.name.toLowerCase()) {
              $scope.arrayAux.push({ desde: dayInfo.desde, hasta: dayInfo.hasta });
              day.horarios = $scope.arrayAux;
              console.log('index', index)
            }

          });
          $scope.arrayAux = [];
        });

        console.log('$scope.horariosFijos', angular.copy($scope.horariosFijos))
        setHorariosFijos(fechaActual)
      };

      //ELIMINAR REGISTRO DE HORARIO EN MODAL HORARIO FIJO
      $scope.eliminarRegistro = function (index) {
        $scope.mostrarInfo.splice(index, 1);
        console.log('$scope.mostrarInfo', $scope.mostrarInfo)
        $scope.horariosFijos = [
          { name: 'Lunes', horarios: [] },
          { name: 'Martes', horarios: [] },
          { name: 'Miercoles', horarios: [] },
          { name: 'Jueves', horarios: [] },
          { name: 'Viernes', horarios: [] },
          { name: 'Sabado', horarios: [] },
          { name: 'Domingo', horarios: [] }
        ];
        $scope.actualizarHorariosFijos()
        
        

        console.log('index',index)
        
      };

      //DELETE EVENTO

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

      //MOSTRAR HORARIO FIJO EN EL CALENDARIO REPETIDO EN LOS DIAS CORRESPONDIENTES
      var eventoAux = {
        title: 'Activo',
        start: null,
        end: null,
        hourStart: null,
        hourEnd: null,
        allDay: false,
      };

      function setHorariosFijos(mesActual) {
        var cant = moment(mesActual, "YYYY-MM").daysInMonth()
        eventosFijos = [];
        setTimeout(function () {

          for (var i = 1; i <= cant; i++) {
            var dia = angular.copy(i)
            var weekDayName = moment(dia + '-' + mesActual, 'DD-MM-YYYY').format('dddd').toLowerCase();
            angular.forEach($scope.horariosFijos, function (hF, index) {
              if (hF.horarios.length > 0 && hF.name.toLowerCase() == normalize(weekDayName)) {
                if (diasAgregados.includes(i)) {
                  return
                } else {
                  angular.forEach(hF.horarios, function (h, index) {
                    eventoAux.day = (i)
                    eventoAux.title = 'Horario Fijo';
                    eventoAux.hourStart = angular.copy(h.desde)
                    eventoAux.hourEnd = angular.copy(h.hasta)
                    var fecha = moment(dia + '-' + mesActual, 'DD-MM-YYYY')
                    eventoFijo = angular.copy($scope.selectedDates(eventoAux, fecha.toDate(), fecha))
                    if (eventoFijo.start >= moment().add(-1, 'days').toDate()) {
                      $scope.eventSources[0].push(eventoFijo)
                      eventoFijo = {}
                    }
                  })
                  diasAgregados.push(i);
                  // uiCalendarConfig.calendars['calendar'].fullCalendar('refetchEvents')

                }
              }
            })
          };
        }, 600)
      };

      //SACAR TILDES ETC
      var normalize = (function () {
        var from = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç",
          to = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc",
          mapping = {};

        for (var i = 0, j = from.length; i < j; i++)
          mapping[from.charAt(i)] = to.charAt(i);

        return function (str) {
          var ret = [];
          for (var i = 0, j = str.length; i < j; i++) {
            var c = str.charAt(i);
            if (mapping.hasOwnProperty(str.charAt(i)))
              ret.push(mapping[c]);
            else
              ret.push(c);
          }
          return ret.join('');
        }

      })();






    }]);

}(angular));