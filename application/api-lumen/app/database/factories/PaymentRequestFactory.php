<?php

namespace Database\Factories;

use App\Models\PaymentRequest;
use Illuminate\Database\Eloquent\Factories\Factory;

class PaymentRequestFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = PaymentRequest::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'status' => 'Pending', 
            'reply' => null,
            'created_at' => null,
            'updated_at' => null
        ];
    }
}
