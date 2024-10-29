(function (ng) {
	"use strict";

	var Module = ng.module("LexTracking");

	Module.controller("PaymentRequestsAdminCtrl", [
		"$scope",
		"$rootScope",
		"$translate",
		"ngDialog",
		"PaymentRequestsServiceAdmin",
		function ($scope, $rootScope, $translate, ngDialog, PaymentRequestsServiceAdmin) {
			const INITIAL_STATE_FILTERS = {
				concept: null,
				status: "Pending",
				user: null,
			};
			$scope.paymentRequestFilters = { ...INITIAL_STATE_FILTERS };
			$scope.allPaymentRequests = [];
			$scope.users = [];
			$scope.conceptTexts = {
				Closure: $translate.instant("payment_requests.concepts.closure"),
				Benefits: $translate.instant("payment_requests.concepts.benefits"),
				Compensation: $translate.instant("payment_requests.concepts.compensation"),
			};
			$scope.statusTexts = {
				Pending: $translate.instant("payment_requests.status.pending"),
				Canceled: $translate.instant("payment_requests.status.canceled"),
				Approved: $translate.instant("payment_requests.status.approved"),
				Rejected: $translate.instant("payment_requests.status.rejected"),
			};
			$scope.concepts = Object.keys($scope.conceptTexts);
			$scope.statuses = Object.keys($scope.statusTexts);

			this.$onInit = function () {
					getAllPaymentRequests();
					getAllUsers();
			};

			$scope.submitForm = function() {
				getAllPaymentRequests($scope.paymentRequestFilters);
		  };

		  function getAllUsers() {
			PaymentRequestsServiceAdmin.getAllUsers(function (err, result) {
					if (err) {
							$rootScope.showToaster(
									$translate.instant("payment_requests.error_messages.error_to_fetch"),
									"error"
							);
					} else {
						$scope.users = result;
					}
				});
	  	};

			$scope.showPaymentRequestDetailsDialog = function(paymentRequests) {
				ngDialog.open({
					template: '/app/components/paymentRequestsAdmin/views/showPaymentRequestDetailsAdmin.modal.html',
					scope: $scope,
					disableAnimation: true,
					data: {
						paymentRequests
					},
					controller: ['$scope', function ($scope) {
            $scope.updatePaymentRequestStatus = function (status) {
							const paymentRequest = $scope.ngDialogData.paymentRequests;
							PaymentRequestsServiceAdmin.updateStatus(paymentRequest.id, status, function(err, result) {
								if (err) {
										$rootScope.showToaster(
												$translate.instant("payment_requests.error_messages.error_to_update_status"),
												"error"
										);
								} else {
									getAllPaymentRequests();
									$rootScope.showToaster(
											$translate.instant("payment_requests.success_messages.status_updated"),
											"success"
									);
								}
							});
            };
        	}]
				});
			};

			$scope.updateFilters = function() {
				const query = {
						concept: $scope.paymentRequestFilters.concept,
						status: $scope.paymentRequestFilters.status,
						user: $scope.paymentRequestFilters.user ? $scope.paymentRequestFilters.user.id : null
				};

				getAllPaymentRequests(query);
			};

			function getAllPaymentRequests(query) {
				PaymentRequestsServiceAdmin.find(query, function (err, result) {
						if (err) {
								$rootScope.showToaster(
										$translate.instant("payment_requests.error_messages.error_to_fetch"),
										"error"
								);
						} else {
							  const allPaymentRequests = result.map((r) => {
									  const date = r.created_at;
									  r.created_at = new Date(date).toLocaleDateString('en-US', { timeZone: 'UTC' });
									  r.total = r.payment_request_details.reduce((acc, curr) => {
										return acc += curr.amount;
									}, 0).toLocaleString('pt-BR', { style: 'currency', currency: r.currency});
									return r;
								})
								$scope.allPaymentRequests = allPaymentRequests;
						}
				});
		  };
		},
	]);
})(angular);
