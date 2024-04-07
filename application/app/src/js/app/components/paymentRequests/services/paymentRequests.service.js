(function (ng) {
	"use strict";

	var Module = ng.module("LexTracking");

	Module.factory("PaymentRequestsService", ["RestClient", function (RestClient) {
        var model = "payment_requests";

        var factory = {
            getAmountSinceLastClosure: function (userId, cb) {
                RestClient.get(model + "/closure/" + userId, function (err, result) {
                    console.log("err", err, result);
                    cb(err, result);
                });
            },
        };

        return factory;
    }]);
})(angular);
