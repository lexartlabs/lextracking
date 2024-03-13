<?php

namespace App\Domain;

use App\Enums\PaymentRequestStatus;

class PaymentRequest
{
    private int $user_id;
    private PaymentRequestStatus $status;
    private string $reply;

    public function user_id(): int
    {
        return $this->user_id;
    }

    public function status(): PaymentRequestStatus
    {
        return $this->status;
    }

    public function reply(): string
    {
        return $this->reply;
    }

    private function __construct(int $user_id, PaymentRequestStatus $status, string $reply)
    {
        $this->status = $status;
        $this->user_id = $user_id;
        $this->reply = $reply;
    }

    static function create(int $user_id, string $reply): PaymentRequest
    {
        return new PaymentRequest($user_id, PaymentRequestStatus::Pending, $reply);
    }

    function addPaymentRequestDetail()
    {
        return PaymentRequestDetail.create()
    }
}
