(function (ng) {
	"use strict";

	var Module = ng.module("LexTracking");

	Module.controller("PaymentRequestsCtrl", ["$scope", "$rootScope", "$translate", "PaymentRequestsService", function ($scope, $rootScope, $translate, PaymentRequestsService) {
    const USER_ID = localStorage.getItem("userId");
    const INITIAL_STATE_PAYMENT_REQUEST = {
      concept: null,
      amount: null,
      observation: null
    };

    $scope.isAmountInputDisabled = false;
    $scope.paymentRequests = [];
    $scope.concepts = [
      { text: $translate.instant('payment_requests.concepts.closure'), value: "closure" },
      { text: $translate.instant('payment_requests.concepts.benefit'), value: "benefit" },
      { text: $translate.instant('payment_requests.concepts.compensation'), value: "compensation" },
    ];
    $scope.paymentRequest = {...INITIAL_STATE_PAYMENT_REQUEST};

    function getClosureAmount() {
      PaymentRequestsService.getAmountSinceLastClosure(USER_ID, function (err, result) {
        if(err) return $rootScope.showToaster(err, 'error');
        $scope.paymentRequest.amount = result.amount
      })
    }

    $scope.changeConcept = function () {
      if($scope.paymentRequest.concept != "closure") {
        $scope.paymentRequest.amount = null;
        $scope.isAmountInputDisabled = false;
        return;
      }

      $scope.isAmountInputDisabled = true;

      getClosureAmount();

      return;
    }

    $scope.addPaymentRequest = function () {
      if($scope.paymentRequest.amount === null || $scope.paymentRequest.concept === null) {
        $rootScope.showToaster($translate.instant('payment_requests.error_messages.null_values'), 'error');
        return;
      } else if($scope.paymentRequest.amount <= 0) {
        $rootScope.showToaster($translate.instant('payment_requests.error_messages.amount_greater_than_zero'), 'error');
        return;
      }
      
      $scope.paymentRequests.push({id: $scope.paymentRequests.length + 1, ...$scope.paymentRequest});

      $scope.paymentRequest = {...INITIAL_STATE_PAYMENT_REQUEST};
    }
    
  }]);
}(angular));
