<?php

namespace App\Models;

use App\Enums\PaymentRequestStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PaymentRequest extends Model
{
    use HasFactory;

    protected $table = 'PaymentRequest';
    public $timestamps = false;
    protected $fillable = ['id', 'user_id', 'status', 'currency', 'reply'];

    protected $casts = [
        'id' => 'string',
        'user_id' => 'string',
        'status' => PaymentRequestStatus::class,
        'currency' => 'string',
        'reply' => 'string'
    ];

    public function payment_request_details()
    {
        return $this->hasMany(PaymentRequestDetail::class);
    }
}
