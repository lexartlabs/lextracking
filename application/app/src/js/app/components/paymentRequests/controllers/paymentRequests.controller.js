(function (ng) {
	"use strict";

	var Module = ng.module("LexTracking");

	Module.controller("PaymentRequestsCtrl", [
		"$scope",
		"$rootScope",
		"$state",
		"$translate",
    "PaymentRequestsService",
		function ($scope, $rootScope, $state, $translate, PaymentRequestsService) {
			$scope.concepts = [
				{ text: $translate.instant('payment_requests.concepts.closure'), value: "closure" },
				{ text: $translate.instant('payment_requests.concepts.benefit'), value: "benefit" },,
				{ text: $translate.instant('payment_requests.concepts.compensation'), value: "compensation" },,
			];

      $scope.isAmountInputDisabled = false;
      $scope.paymentRequest = {
        concept: null,
        amount: null,
        observation: null
      };
			$scope.paymentRequests = [];

      async function getClosureAmount() {
        PaymentRequestsService.getAmountSinceLastClosure(1, function (err, result) {
          console.log(err, result);
          if(err) {
            $rootScope.showToaster(err.Error, 'error')
          }
        })
      }

      $scope.changeConcept = async function () {
        if($scope.paymentRequest.concept != "closure") return $scope.isAmountInputDisabled = false;

        $scope.isAmountInputDisabled = true;

        getClosureAmount()
      }

      $scope.addPaymentRequest = function (event) {
        event.preventDefault();

        $scope.paymentRequests.push($scope.paymentRequest);

        console.log($scope.paymentRequests)
      }
		},
	]);
})(angular);
