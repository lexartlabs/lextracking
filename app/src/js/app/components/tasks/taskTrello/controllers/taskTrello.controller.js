(function(ng) {

    'use strict';

    var Module = ng.module('Imm');

    Module.controller('task_trelloCtrl', ['$scope', '$rootScope', '$state', '$stateParams', '$filter', 'tasks_trelloServices', 'ngDialog', 'ProjectsServices', 'ClientServices', function($scope, $rootScope, $state, $stateParams, $filter, tasks_trelloServices, ngDialog, ProjectsServices, ClientServices) {

        $scope.task_trello         = {};
        $scope.sendingData         = false;
        var idTask_trello          = $stateParams.id;
        $scope.tasks               = [];
        $scope.labels              = [];
        var task                   = {};
        $scope.selectLabels        = [];
        $scope.errorLabels         = [];
        $scope.compareLabel        = [];
        $scope.compareLabel.name   = [];
        $scope.result              = [];
        $scope.resultTotal         = [];
        $scope.filterLabel         = [];
        $scope.finalArray          = [];
        $scope.jsonObj             = [];
        $scope.nameLabel           = [];
        $scope.filterErrorLabel    = [];
        $scope.allFilterLabels     = [];
        $scope.repeatedLabel       = [];

        var key   = Trello_Key;
        var token = Trello_Token;
        var projectId;

      try {
        if(idTask_trello){
        //TRAER TAREAS TRELLO DESDE TABLERO SELECCIONADO
        tasks_trelloServices.findById(idTask_trello, function(err, tasks_trello, countItems) {
            if (!err) {
              $scope.task_trello             = tasks_trello;
              $scope.trelloname              = tasks_trello[0].projectName;
              $scope.urlBoard                = tasks_trello[0].url;
              $scope.task_trello.idboard     = tasks_trello[0].tablero_id;
            }


            var projectName = tasks_trello[0].projectName;
            var projectId   = tasks_trello[0].proyecto_id;
            console.log("Tarea trello id proj", projectId);
            var boardId = $scope.task_trello.idboard

            //GET PARA TRAER DATA CARDS
            tasks_trelloServices.getBoardsId(boardId, function(resp, err){
                $scope.lists = resp;
                //VERIFICA QUE EXISTAN LISTS EN EL TABLERO
                if ($scope.lists.length == 0) {
                  console.log("NO HAY LISTS");
                  //ELIMINA LOS LABELS POR DEFAULT EN UN TABLERO NUEVO
                  tasks_trelloServices.getLabels(boardId, function(resp, err){
                    var deleteDefault = resp;
                    for (var x = 0; x < deleteDefault.length; x++) {
                      tasks_trelloServices.deleteLabel(deleteDefault[x].id, function(resp, err){
                        console.log("Default Label Eliminada Correctamente", resp, "ERROR", err);
                      });
                    }
                  });
                } else {
                var cards = resp;
                ProjectsServices.findById(projectId, function(err, result){
                  ClientServices.findById(result.idClient, function(err, result){
                    $scope.nameClient = result.name;
                    console.log('Cliente',result);
                  })
                })
                // FOR EACH SEPARA ID'S
                cards.forEach(function(tasks){
                  tasks_trelloServices.getCards(tasks.id, function(resp, err){
                      var card = resp;
                      if(card.labels[0]){
                        card.status = card.labels[0]['name'];
                        task = {
                          id_project  : $stateParams.id,
                          idProyecto  : projectId,
                          idboard     : $scope.task_trello.idboard,
                          card_id     : card.idShort,
                          name        : card.name,
                          description : card.desc,
                          status      : card.status,
                          project     : projectName,
                          longIdCard  : card.id,
                          client      : $scope.nameClient
                        }
                        console.log(task);
                        $scope.tasks.push(task);
                        tasks_trelloServices.saveTaskTrello(task, function (err, result) {
                          //FOR EACH GUARDA EN DB A MEDIDA QUE RECORRE LAS CARDS
                        });

                      }else{
                          task = {
                            id_project  : $stateParams.id,
                            idProyecto  : projectId,
                            idboard     : $scope.task_trello.idboard,
                            card_id     : card.idShort,
                            name        : card.name,
                            description : card.desc,
                            status      : null,
                            project     : projectName,
                            longIdCard  : card.id,
                            client      : $scope.nameClient
                          }
                          $scope.tasks.push(task);
                          tasks_trelloServices.saveTaskTrello(task, function (err, result) {
                            //FOR EACH GUARDA SIN LABELS EN DB A MEDIDA QUE RECORRE LAS CARDS
                          });
                          //SI CARD.STATUS O LA CARD NO TIENE STATUS CREA UN LABEL TO-DO ACTIVO Y LOS OTROS 3 STATUS INACTIVOS
                          tasks_trelloServices.getLabels(boardId, function(resp, err){
                            var check = resp;
                            var limit = 1
                            for (var v = 0; v < limit; v++) {
                            if(check.length == 0){
                              var id    = card.id;
                              var color = ["red", "yellow", "orange", "green"];
                              var name  = ["To-Do", "In-Review", "In-Progress", "Done"];
                              tasks_trelloServices.activateLabel(id, color[0], name[0], function(err, result){
                                console.log("To-Do Agregado", result, "ERROR", err);
                                id = $scope.task_trello.idboard;
                                tasks_trelloServices.createLabel(id, color[1], name[1], function(err, result){
                                  console.log("In-Review Agregado", result, "ERROR", err);
                                  tasks_trelloServices.createLabel(id, color[2], name[2], function(err, result){
                                    console.log("In-Progress Agregado", result, "ERROR", err);
                                    tasks_trelloServices.createLabel(id, color[3], name[3], function(err, result){
                                      console.log("Done Agregado", result, "ERROR", err);
                                      $state.reload();
                                    });
                                  });
                                });
                              });
                            }
                            }
                          });
                      }
                  });
                  });

          //GET ID CARDS
          tasks_trelloServices.findByIdCard($scope.currentPage, $scope.query, function (err, idCard){
            $scope.idCard = idCard;
          })

            // LABELS PARA UI-SELECT STATUS
            tasks_trelloServices.getLabels(boardId, function(resp, err){
                $scope.labels = resp;
                if($scope.labels.length > 0){
                  for (var indexE = 0; indexE < $scope.labels.length; indexE++) {
                    $scope.allFilterLabels.push($scope.labels[indexE].id);
                    //console.log("LABELS", $scope.allFilterLabels);
                    var labelsArray = ["to-do", "in-progress", "done", "in-review"];
                    if($scope.labels[indexE].name.toLowerCase() == labelsArray[0] || $scope.labels[indexE].name.toLowerCase() == labelsArray[1] || $scope.labels[indexE].name.toLowerCase() == labelsArray[2] || $scope.labels[indexE].name.toLowerCase() == labelsArray[3]){
                      $scope.jsonObj.push($scope.labels[indexE]);
                      $scope.nameLabel.push($scope.labels[indexE].name.toLowerCase());
                      $scope.filterLabel.push($scope.labels[indexE].id);

                    //ELSE ELIMINAR LABELS CON NOMBRE INCORRECTO
                    } else {
                        console.log("LABELS TO DELETE",$scope.labels[indexE].name);
                        $scope.filterErrorLabel.push($scope.labels[indexE].id);
                        if($scope.filterErrorLabel[0]){
                          tasks_trelloServices.deleteLabel($scope.filterErrorLabel[0], function(resp, err){
                            console.log("Label incorrecta eliminada", $scope.filterErrorLabel[0]);
                            $state.reload();
                          });
                        }
                      }
                    }
                     //COMPROBAR QUE NO SE REPITAN ETIQUETAS

                      if($scope.nameLabel.length == 4){
                        var errorLabel = $scope.filterLabel;
                        var jsonArray       = labelsArray;
                        $scope.jsonObj.name = $scope.nameLabel;
                        $scope.jsonObj.name.forEach(function(e1){
                          jsonArray.forEach(function(e2)
                            {
                              if(e1===e2){
                                $scope.finalArray[e1]=$scope.finalArray[e1]+1||1;
                              }
                            })
                        });
                        var itemsLabels = Object.values($scope.finalArray).map(function(e){Number(e)});
                        if(itemsLabels.length != 4){
                          tasks_trelloServices.deleteLabel(errorLabel[0], function(resp, err){
                            tasks_trelloServices.deleteLabel(errorLabel[1], function(resp, err){
                              tasks_trelloServices.deleteLabel(errorLabel[2], function(resp, err){
                                tasks_trelloServices.deleteLabel(errorLabel[3], function(resp, err){
                                  $state.reload();
                                });
                              });
                            });
                          });
                        }
                        //ELSE ELIMINA SOBRANTE SI HAY MAS DE 4 STATUS CORRECTOS
                      } else if ($scope.nameLabel.length > 4) {
                        console.log("LABEL EXTRA", $scope.jsonObj[4]);
                        if($scope.jsonObj[4]){
                          tasks_trelloServices.deleteLabel($scope.jsonObj[4].id, function(resp, err){
                            console.log("Label extra correcta eliminada", resp);
                            $state.reload();
                          });
                        }
                      } else {
                        for (var k = 0; k < $scope.filterLabel.length; k++) {
                          tasks_trelloServices.deleteLabel($scope.filterLabel[k], function(resp, err){
                            console.log("Menos de 3 labels", resp);
                            $state.reload();
                          });
                        }
                      }
                  }
              });
              }

          });

          $scope.deleteTaskTrello = function (id) {
            console.log("Trello task id", id);
            tasks_trelloServices.remove(id, function(err, res){
              console.log("Tarea trello eliminada::", err, res);
            })
          }


           //MODAL DE LAS CARDS
           $scope.editTrello = function (index,task_trello) {
           $scope.task_trello = angular.copy(task_trello);

          //
          if ($scope.task_trello.users) {
            $scope.task_trello.users = JSON.parse($scope.task_trello.users);

          _.each($scope.task_trello.users, function (user){
            $scope.usersAux[user.idUser] = true;
          });
        } else {
          $scope.task_trello.users = [];
        }

          if ($scope.task_trello.startDate) {
            $scope.task_trello.startDate=moment($scope.task_trello.startDate).format("DD/MM/YYYY");
          }
          if ($scope.task_trello.endDate) {
            $scope.task_trello.endDate= moment($scope.task_trello.endDate).format("DD/MM/YYYY");
          }
          $scope.name    = $scope.task_trello.name;
          $scope.project = $scope.task_trello.project;
          $scope.IdCard  = $scope.task_trello.longIdCard;

          //GET ID LABELS DE LAS CARDS
          var data = null;

          if ($scope.itemsLabels = 4){
          $scope.selected  = { value: $scope.jsonObj };
          $scope.selected.status = $scope.task_trello.status;

          }

          tasks_trelloServices.getLabelsByCard($scope.IdCard, function (resp, err){
            var label = resp;
            if(label.length == 1){
            $scope.labelId = label[0].id;
            } else {
              $scope.labelId = [];
            }
          });

          //UI-SELECT STATUS

          ngDialog.open({
            template: '/app/components/taskTrello/views/taskTrello.modal.html',
            showClose: true,
            scope: $scope,
            disableAnimation: true,
            data: {
              confirm: function() {
                $scope.task_trello.comments =JSON.stringify($scope.comments);
                if ($scope.task_trello.id) {
                  if ($scope.task_trello.startDate) {
                  var arrStart= $scope.task_trello.startDate.split("/");
                  $scope.task_trello.startDate=new Date(arrStart[2],arrStart[1]-1,arrStart[0]);
                  }
                  if ($scope.task_trello.endDate) {
                    var arrStart= $scope.task_trello.endDate.split("/");
                    $scope.task_trello.endDate=new Date(arrStart[2],arrStart[1]-1,arrStart[0]);
                  }
                }

                //DELETE ACTUAL LABEL DE LA CARD
              if($scope.labelId.length > 0){
                tasks_trelloServices.desactiveLabel($scope.IdCard,$scope.labelId,function(resp,err){
                  //STATUS SELECCIONADO PARA GUARDAR EN BASE DE DATOS Y TRELLO
                  $scope.task_trello.status = $scope.selected.value.name;
                  var labelEdit = $scope.selected.value.id.id;

                  //POST LABELS A LA CARD DE TRELLO SELECCIONADA POR ID Y LABELS DE LA DB
                  tasks_trelloServices.saveTaskTrello($scope.task_trello, function (err, result) {
                    tasks_trelloServices.selectLabel($scope.IdCard, labelEdit, function(err, result){
                      $state.reload();
                    });
                  })
                });
              } else {
                  //STATUS SELECCIONADO PARA GUARDAR EN BASE DE DATOS Y TRELLO
                  $scope.task_trello.status = $scope.selected.value.name;
                  console.log("Status::", $scope.selected.value.id.id);
                  var labelEdit = $scope.selected.value.id.id;

                  //POST LABELS A LA CARD DE TRELLO SELECCIONADA POR ID Y LABELS DE LA DB
                  tasks_trelloServices.saveTaskTrello($scope.task_trello, function (err, result) {
                    tasks_trelloServices.selectLabel($scope.IdCard, labelEdit, function(err, result){
                      console.log("Label activada", result, "ERROR", err);
                      $state.reload();
                    });
                })
              }
                ngDialog.close()
              },
              cancel: function() {
                $scope.task_trello = {};
                $state.reload();
                ngDialog.close();
              }
            }
          });
          $scope.error = "";
        };

        // TUTORIAL WIZARD
        $scope.tutorial = function(){
            var vm = this;
            //Model
            vm.currentStep = 1;
            vm.steps = [
              {
                step: 1,
                name: "First step",
                template: "step1.html",
              },
              {
                step: 2,
                name: "Second step",
                template: "step2.html"
              },
              {
                step: 3,
                name: "Third step",
                template: "step3.html"
              },
            ];
            vm.user = {};

            //Functions
            vm.gotoStep = function(newStep) {
              vm.currentStep = newStep;
            }

            vm.getStepTemplate = function(){
              for (var i = 0; i < vm.steps.length; i++) {
                    if (vm.currentStep == vm.steps[i].step) {
                        return vm.steps[i].template;
                    }
                }
            }


          ngDialog.open({
            template: '/app/components/taskTrello/views/tutorial.modal.html',
            showClose: true,
            scope: $scope,
            disableAnimation: true,
            data: {
              confirm: function() {
                ngDialog.close();
              },
              cancel: function() {
                ngDialog.close();
              }
            }
          });
          $scope.error = "";
        };


        // TUTORIAL WIZARD
        $scope.tutorialBot = function(){
          var vm = this;
          //Model
          vm.currentStep = 1;
          vm.steps = [
            {
              step: 1,
              name: "First step",
              template: "step1.html",
            },
            {
              step: 2,
              name: "Second step",
              template: "step2.html"
            },
            {
              step: 3,
              name: "Third step",
              template: "step3.html"
            },
            {
              step: 4,
              name: "Fourth step",
              template: "step4.html"
            } ,
          ];
          vm.user = {};

          //Functions
          vm.gotoStep = function(newStep) {
            vm.currentStep = newStep;
          }

          vm.getStepTemplate = function(){
            for (var i = 0; i < vm.steps.length; i++) {
                  if (vm.currentStep == vm.steps[i].step) {
                      return vm.steps[i].template;
                  }
              }
          }


        ngDialog.open({
          template: '/app/components/taskTrello/views/tutorialBot.modal.html',
          showClose: true,
          scope: $scope,
          disableAnimation: true,
          data: {
            confirm: function() {
              ngDialog.close();
            },
            cancel: function() {
              ngDialog.close();
            }
          }
        });
        $scope.error = "";
      };
      });
      }

    } catch (error) {
       console.log("NO EXISTEN LISTS EN EL BOARD");
    }

    }]);

}(angular));
