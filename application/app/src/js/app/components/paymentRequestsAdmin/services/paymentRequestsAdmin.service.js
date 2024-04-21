(function (ng) {
	"use strict";

	var Module = ng.module("LexTracking");

	Module.factory("PaymentRequestsServiceAdmin", ["RestClient", function (RestClient) {
        var model = "payment_requests";
        var userModel = 'user';

        var factory = {
            getAllUsers: function (cb) {
                const endpoint = `${userModel}/all`
                RestClient.get(endpoint, function (err, result) {
                    cb(err, result);
                })
            },
            find: function (query, cb) {
                var endpoint = `${model}/all?status=Pending`;
                if (query) {
                    const { concept, status, user } = query;
                    const newEndpoint = `${model}/all?status=${status === null ? '' : status}&concept=${concept === null ? '' : concept }&user=${user === null ? '' : user.id}`;
                    endpoint = newEndpoint;
                }
                RestClient.get(endpoint, function (err, result) {
                    cb(err, result);
                });
            },
            updateStatus: function (paymentRequestId, status, cb) {
                var endpoint = `${model}/update/${paymentRequestId}`;
                RestClient.put(endpoint, { status: status }, function (err, result) {
                    cb(err, result);
                });
            }
        };

        return factory;
    }]);
}(angular));
