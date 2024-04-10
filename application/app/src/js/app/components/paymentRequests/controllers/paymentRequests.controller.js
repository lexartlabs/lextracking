(function (ng) {
	"use strict";

	var Module = ng.module("LexTracking");

	Module.controller("PaymentRequestsCtrl", ["$scope", "$rootScope", "$translate", "PaymentRequestsService", function ($scope, $rootScope, $translate, PaymentRequestsService) {
    const USER_ID = localStorage.getItem("userId");
    const INITIAL_STATE_PAYMENT_REQUEST = {
      concept: null,
      concept_description: null,
      amount: null
    };
    $scope.conceptTexts = {
      Closure: $translate.instant('payment_requests.concepts.closure'),
      Benefits: $translate.instant('payment_requests.concepts.benefits'),
      Compensation: $translate.instant('payment_requests.concepts.compensation')
    }

    $scope.isAmountInputDisabled = false;
    $scope.paymentRequests = [];
    $scope.concepts = ["Closure", "Benefits", "Compensation"];
    $scope.paymentRequest = {...INITIAL_STATE_PAYMENT_REQUEST};

    function getClosureAmount() {
      PaymentRequestsService.getAmountSinceLastClosure(USER_ID, function (err, result) {
        if(err) return $rootScope.showToaster(err.Error, 'error');
        $scope.paymentRequest.amount = result.amount
      })
    }

    $scope.changeConcept = function () {
      if($scope.paymentRequest.concept != "Closure") {
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
      $scope.isAmountInputDisabled = false;
    }

    $scope.removePaymentRequestFromList = function (paymentRequestId) {
      $scope.paymentRequests = $scope.paymentRequests.filter(request => request.id != paymentRequestId);
    }

    $scope.calcTotalAmount = function() {
      return $scope.paymentRequests.reduce((acc, paymentRequest) => acc += paymentRequest.amount, 0).toFixed(2);
    }

    $scope.savePaymentRequest = function() {
      PaymentRequestsService.save($scope.paymentRequests, function (err, result) {
        if(err) {
          if(!err.Error) return $rootScope.showToaster($translate.instant('payment_requests.error_messages.error_to_save'), 'error');

          return $rootScope.showToaster(err.Error, 'error');
        }
        
        $rootScope.showToaster($translate.instant('payment_requests.success_messages.payment_request_created'), 'success');

        $scope.paymentRequests = [];
        $scope.paymentRequest = {...INITIAL_STATE_PAYMENT_REQUEST};
        $scope.isAmountInputDisabled = false;
      })
    }
  }]);
}(angular));
