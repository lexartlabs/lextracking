<?php

namespace App\Http\Controllers;

use Exception;
use App\Enums\PaymentRequestDetailConcepts;
use App\Enums\PaymentRequestStatus;
use App\Models\PaymentRequest;
use App\Models\PaymentRequestDetail;
use App\Models\Tracks;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
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

    public function cancelPaymentRequest(Request $request)
    {
        try {
            $operation = 'Cancel payment request';
            $user_id = $request->user()->id;
            $payment_request_id = $request->route('payment_request_id');

            if (!is_numeric($payment_request_id)) {
                return new Response(array("Error" => INVALID_NUMERIC_ID, "Operation" => $operation), 400);
            }

            $payment_request = PaymentRequest::where('id', $payment_request_id)->where('user_id', $user_id)->first();

            if (!$payment_request) {
                return new Response(["Error" => PAYMENT_REQUEST_NOT_FOUND, "Operation" => $operation], 400);
            }

            $payment_request->status = PaymentRequestStatus::Canceled;

            $payment_request->save();

            return new Response(['response' => $payment_request]);
        } catch (Exception $e) {
            return new Response(["Error" => INTERNAL_SERVER_ERROR, "Operation" => $operation], 500);
        }
    }

    public function getBalanceSinceLastClosure(Request $request)
    {
        try {
            $operation = "Get balance since last closure";
            $user_id = $request->route('user_id');

            if (!is_numeric($user_id)) {
                return new Response(["Error" => INVALID_NUMERIC_ID, "Operation" => $operation], 400);
            }

            $lastClosure = PaymentRequest::latest()
                ->whereHas('payment_request_details', function ($query) {
                    $query->where('concept', PaymentRequestDetailConcepts::Closure);
                })
                ->where('user_id', $user_id)
                ->first();

            if ($lastClosure == null) {
                return new Response(['Error' => NO_CLOSURE_REGISTERED, "Operation" => $operation], 400);
            }

            $start_date = $lastClosure->created_at;

            $tracks = Tracks::join("Tasks", "Tracks.idTask", "=", "Tasks.id")
                ->where("Tracks.startTime", ">=", date('Y-m-d H:i:s', $start_date))
                ->where("Tracks.endTime", ">=", date('Y-m-d H:i:s', $start_date))
                ->where("Tracks.idUser", $user_id)
                ->select(
                    "Tracks.trackCost",
                    "Tasks.name AS taskName",
                    "Tracks.duracion AS trackDuration"
                )->get();

            $amount = 0;

            foreach ($tracks as $track) {
                $amount += $track->trackCost;
            };

            echo json_encode(['response' => ['tracks' => $tracks, 'amount' => $amount]]);

            return new Response(['response' => ['tracks' => $tracks, 'amount' => $amount]], 200);
        } catch (Exception $e) {
            return new Response(["Error" => INTERNAL_SERVER_ERROR, "Operation" => $operation], 500);
        }
    }

    public function getUserHistory(Request $request)
    {
        try {
            $operation = "Get user payment request history";

            $user_id = $request->route('user_id');

            if (!is_numeric($user_id)) {
                return new Response(["Error" => INVALID_NUMERIC_ID, "Operation" => $operation], 400);
            }

            $history = PaymentRequest::with("payment_request_details")->where("user_id", $user_id)->get();

            return new Response(['response' => $history], 200);
        } catch (Exception $e) {
            return new Response(["Error" => INTERNAL_SERVER_ERROR, "Operation" => $operation], 500);
        }
    }
}
