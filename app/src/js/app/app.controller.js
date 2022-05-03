(function(ng) {

    'use strict';
    
    var Module = ng.module('Imm');

    Module.controller('AppCtrl', ['$scope', '$log', '$window', '$rootScope', '$state', '$translate', 'RestClient', 'ngDialog', 'toastr', function($scope, $log, $window, $rootScope, $state, $translate, RestClient, ngDialog, toastr) {
        // ---- Initialization

        $log.info('%cLEXTRACKING %cAPP STARTUP ', 'background: #203678; color: #fff; font-weight:bold; padding: 4px;', 'background: #666; color: #f9f9f9; padding: 4px;');

        // Put here stuff that can be deferred for the next digest
        $scope.$evalAsync(function() {
            $log.info("Async calls..");
        });
        
        $rootScope.showToast = function(title, subTitle, type){
            toastr[type](subTitle, title);
        }

        $rootScope.logout = function() {
            $window.localStorage.clear();
            $rootScope.userName = '';
            $rootScope.token = '';
            $state.go('login');
        };

        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
            //Close all dialogs
            ngDialog.closeAll();
        })

        $scope.$on('$routeChangeSuccess', function(e, currentRoute) {
            //Change page title, based on Route information
            if (currentRoute && currentRoute.title) {
                $window.title = currentRoute.title;
            }
        });

        $scope.changeLanguage = function(langKey){
            $translate.use(langKey);
        };
    }]);

}(angular));
