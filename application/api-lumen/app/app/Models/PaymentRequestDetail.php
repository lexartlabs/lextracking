<?php

namespace App\Models;

use App\Enums\PaymentRequestDetailConcepts;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PaymentRequestDetail extends Model
{
    use HasFactory;

    protected $table = 'PaymentRequestDetail';
    public $timestamps = false;

    protected $fillable = ['id', 'payment_request_id', 'status', 'reply', 'created_at', 'updated_at'];

    protected $casts = [
        'id' => 'string',
        'payment_request_id' => 'string',
        'concept' => PaymentRequestDetailConcepts::class,
        'concept_description' => 'string',
        'amount' => 'double',
        'created_at' => 'timestamp',
        'updated_at' => 'timestamp',
    ];
}