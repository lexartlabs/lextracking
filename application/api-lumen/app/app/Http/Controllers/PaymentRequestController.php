<?php

namespace App\Http\Controllers;

use App\Enums\PaymentRequestStatus;
use App\Models\PaymentRequest;
use App\Models\PaymentRequestDetail;
use App\Models\Weeklyhours;
use App\Models\Tracks;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Enum;
use Laravel\Lumen\Routing\Controller as BaseController;

class PaymentRequestController extends BaseController
{
    public function create(Request $request)
    {
        $this->validate($request, [
            'user_id' => 'required',
            'status' => Rule::in(PaymentRequestStatus::class),
            'reply' => 'required|string'
        ]);
    }

    public function getUserInfosSinceLastClosure(Request $request)
    {
        $this->validate($request, [
            'user_id' => 'required|int',
            'status' => ['required', new Enum(PaymentRequestStatus::class)],
            'reply' => 'required|string'
        ]);
    }

    public function getUserHistory()
    {
    }
}
