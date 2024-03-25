<?php

namespace App\Models;

use App\Enums\PaymentRequestStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PaymentRequest extends Model
{
    use HasFactory;

    protected $table = 'PaymentRequest';
    protected $fillable = ['id', 'user_id', 'status', 'reply', 'created_at', 'updated_at'];

    protected $casts = [
        'id' => 'string',
        'user_id' => 'string',
        'status' => PaymentRequestStatus::class,
        'reply' => 'string',
        'created_at' => 'timestamp',
        'updated_at' => 'timestamp',
    ];

    public function payment_request_details()
    {
        return $this->hasMany(PaymentRequestDetail::class);
    }
}
