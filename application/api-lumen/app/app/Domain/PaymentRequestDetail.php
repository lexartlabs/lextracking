<?php

namespace App\Domain;

use App\Enums\PaymentRequestDetailConcepts;

class PaymentRequestDetail extends PaymentRequest
{
    private function __construct(
        int $payment_request_id,
        PaymentRequestDetailConcepts $concept,
        string $concept_description,
        float $amount
    ){
    }

    static function create() : PaymentRequestDetail {
        return new PaymentRequestDetail();
    }
}
