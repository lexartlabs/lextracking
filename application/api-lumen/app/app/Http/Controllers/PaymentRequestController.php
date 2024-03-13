<?php

namespace App\Http\Controllers;

use App\Enums\PaymentRequestDetailConcepts;
use App\Enums\PaymentRequestStatus;
use App\Models\PaymentRequest;
use App\Models\PaymentRequestDetail;
use App\Models\Weeklyhours;
use App\Models\Tracks;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Validation\Rules\Enum;
use Laravel\Lumen\Routing\Controller as BaseController;

class PaymentRequestController extends BaseController
{
    public function create(Request $request)
    {
        $this->validate($request, [
            'details' => 'required|array',
            'details.*.concept' => ['required', new Enum(PaymentRequestDetailConcepts::class)],
            'details.*.concept_description' => 'required|string',
            'details.*.amount' => 'required|numeric',
        ]);

        try {
            $user_id = $request->user()->id;
            $details = $request->input('details');

            $attributes = [
                "user_id" => $user_id,
                "status" => PaymentRequestStatus::Pending,
                "reply" => null
            ];

            $paymentRequest = PaymentRequest::create($attributes);

            $paymentRequestDetails = [];

            foreach ($details as $detail) {
                $attributes = [
                    "payment_request_id" => $paymentRequest->id,
                    "concept" => $detail["concept"],
                    "concept_description" => $detail["concept_description"],
                    "amount" => $detail["amount"],
                ];

                $paymentRequestDetail = PaymentRequestDetail::create($attributes);

                array_push($paymentRequestDetails, $paymentRequestDetail);
            };

            $paymentRequest->details = $paymentRequestDetails;

            return new Response($paymentRequest, 201);
        } catch (Exception $e) {
            echo $e;
            return (new Response(array("Error" => INTERNAL_SERVER_ERROR, "Operation" => "Create payment request"), 500));
        }
    }

    public function approvePaymentRequest()
    {
    }

    public function rejectPaymentRequest()
    {
    }

    public function getUserInfosSinceLastClosure(Request $request)
    {
        if (!is_numeric($request->route('user_id'))) {
            return new Response(array("Error" => INVALID_NUMERIC_ID, "Operation" => "Get user infos since last closure"), 400);
        }

        $lastClosure = PaymentRequest::where('user_id', intval($request->route('user_id')))
            ->where('status', PaymentRequestStatus::Approved)
            ->orWhere('status', PaymentRequestStatus::Rejected);

        return new Response(json_encode($lastClosure), 200);
    }

    public function getUserHistory()
    {
    }
}
