(function(ng) {

  'use strict';

  var Module = ng.module('Imm');

  Module.controller('EasyWebsCtrl', ['$scope','$interval', '$rootScope', '$filter', '$timeout', 'EasywebsServices', 'ngDialog', function($scope,$interval, $rootScope, $filter, $timeout, EasywebsServices, ngDialog) {

    	$scope.easywebs  = [];
    	
    	EasywebsServices.find($scope.currentPage, $scope.query, function(err, easywebs, countItems) {
	        if (!err) {
	          console.log(easywebs);
	            $scope.easywebs  	= easywebs;
	            $scope.total    	= countItems;
	        }
	    });
  }]);

}(angular));
