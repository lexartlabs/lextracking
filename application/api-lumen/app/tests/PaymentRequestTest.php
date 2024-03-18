<?php

use App\Enums\PaymentRequestDetailConcepts;
use App\Enums\PaymentRequestStatus;
use App\Models\Clients;
use App\Models\PaymentRequest;
use App\Models\PaymentRequestDetail;
use App\Models\Projects;
use App\Models\Tasks;
use App\Models\Tracks;
use App\Models\User;
use App\Models\Weeklyhours;
use Laravel\Lumen\Testing\DatabaseMigrations;

class PaymentRequestTest extends TestCase
{
    private string $token = '';
    use DatabaseMigrations;

    public function test_create_payment_request_should_return_unauthorized()
    {
        $response = $this->post('/api/payment_requests/create');

        $response->seeStatusCode(401);
        $response->seeJsonEquals(["message" => "Unauthorized"]);
    }

    public function test_create_payment_request_should_return_details_missing()
    {
        $user = User::factory()->count(1)->create(['role' => 'employee', 'status' => 1])->first();
        $this->actingAs($user);

        $response = $this->post('/api/payment_requests/create', ['details' => []]);

        $response->seeStatusCode(422);
        $response->seeJsonEquals([
            "details" => [
                "The details field is required."
            ]
        ]);
    }

    public function test_create_payment_request_should_return_details_properties_missing()
    {
        $user = User::factory()->count(1)->create(['role' => 'employee', 'status' => 1])->first();
        $this->actingAs($user);

        $response = $this->post('/api/payment_requests/create', ['details' => ['']]);

        $response->seeStatusCode(422);
        $response->seeJsonEquals([
            "details.0.concept" => [
                "The details.0.concept field is required."
            ],
            "details.0.concept_description" => [
                "The details.0.concept_description field is required."
            ],
            "details.0.amount" => [
                "The details.0.amount field is required."
            ]
        ]);
    }

    public function test_create_payment_request_returns_success()
    {
        $this->actingAs(User::factory()->count(1)->create(['role' => 'employee', 'status' => 1])->first());

        $data = [
            "details" => [
                [
                    "concept" => "Closure",
                    "concept_description" => "Some description",
                    "amount" => 19900.98
                ]
            ]
        ];

        $response = $this->post('/api/payment_requests/create', $data);

        $response->seeStatusCode(201);
        $response->seeJsonStructure(([
            'response' => [
                'user_id',
                'status',
                'reply',
                'updated_at',
                'created_at',
                'id',
                'details' => [
                    '*' => [
                        'payment_request_id',
                        'concept',
                        'concept_description',
                        'amount',
                        'id',
                    ],
                ],
            ],
        ]));
    }

    public function test_read_user_payment_request_history_should_return_invalid_id()
    {
        $user = User::factory()->count(1)->create(['role' => 'employee', 'status' => 1])->first();
        $this->actingAs($user);

        $response = $this->get("/api/payment_requests/non_numerical_id");

        $response->seeStatusCode(400);
        $response->seeJsonContains([
            "Error" => INVALID_NUMERIC_ID,
        ]);
    }

    public function test_read_user_payment_request_history()
    {
        $user = User::factory()->count(1)->create(['role' => 'employee', 'status' => 1])->first();
        $payment_request = PaymentRequest::factory()->count(1)->create(['user_id' => $user->id])->first();
        $payment_request_detail = PaymentRequestDetail::factory()->count(1)
            ->create([
                'payment_request_id' => $payment_request->id,
                'concept' => PaymentRequestDetailConcepts::Closure
            ])->first();

        $this->actingAs($user);

        $response = $this->get("/api/payment_requests/$user->id");
        $payment_request->payment_request_details = [$payment_request_detail];

        $response->seeStatusCode(200);
        $response->seeJsonEquals(['response' => [$payment_request]]);
    }

    public function test_cancel_payment_request_should_return_not_found()
    {
        $user = User::factory()->count(1)->create(['role' => 'employee', 'status' => 1])->first();

        $this->actingAs($user);

        $response = $this->put("/api/payment_requests/1/cancel");

        $response->seeStatusCode(400);
        $response->seeJsonContains([
            "Error" => PAYMENT_REQUEST_NOT_FOUND,
        ]);
    }

    public function test_cancel_payment_request_should_return_invalid_id_error()
    {
        $user = User::factory()->count(1)->create(['role' => 'employee', 'status' => 1])->first();

        $this->actingAs($user);

        $response = $this->put("/api/payment_requests/NON_NUMERIC_ID/cancel");

        $response->seeStatusCode(400);
        $response->seeJsonContains([
            "Error" => INVALID_NUMERIC_ID,
        ]);
    }

    public function test_cancel_payment_request_returns_success()
    {
        $user = User::factory()->count(1)->create(['role' => 'employee', 'status' => 1])->first();
        $payment_request = PaymentRequest::factory()->count(1)->create(['user_id' => $user->id])->first();

        $this->actingAs($user);

        $response = $this->put("/api/payment_requests/$payment_request->id/cancel");

        $response->seeStatusCode(200);
        $response->seeJsonStructure([
            'response' => [
                'id',
                'user_id',
                'status',
                'reply',
                'created_at',
                'updated_at'
            ]
        ]);
        $response->seeJsonContains([
            'status' => PaymentRequestStatus::Canceled
        ]);
    }

    public function test_get_balance_since_last_closure_should_return_invalid_id_error()
    {
        $user = User::factory()->count(1)->create(['role' => 'employee', 'status' => 1])->first();

        $this->actingAs($user);

        $response = $this->get("/api/payment_requests/closure/INVALID_ID");

        $response->seeStatusCode(400);
        $response->seeJsonContains([
            "Error" => INVALID_NUMERIC_ID,
        ]);
    }

    public function test_get_balance_since_last_closure_should_return_missing_weekly_hours()
    {
        $user = User::factory()->count(1)->create(['role' => 'employee', 'status' => 1])->first();

        $this->actingAs($user);

        $response = $this->get("/api/payment_requests/closure/$user->id");

        $response->seeStatusCode(422);
        $response->seeJsonContains([
            "Error" => MISSING_WEEKLY_HOURS,
        ]);
    }

    public function test_get_balance_since_last_closure_should_return_the_first_month_day()
    {
        $user = User::factory()->count(1)->create(['role' => 'employee', 'status' => 1])->first();
        Weeklyhours::factory()->count(1)->create(['idUser' => $user->id])->first();

        $this->actingAs($user);

        $response = $this->get("/api/payment_requests/closure/$user->id");

        $response->seeStatusCode(200);
        $response->seeJsonContains([
            "start_date" => date("Y-m-01 00:00:00"),
        ]);
    }

    public function test_get_balance_since_last_closure_should_return_empty_array_when_there_are_no_tracks()
    {
        $user = User::factory()->count(1)->create(['role' => 'employee', 'status' => 1])->first();
        Weeklyhours::factory()->count(1)->create(['idUser' => $user->id])->first();

        $this->actingAs($user);

        $response = $this->get("/api/payment_requests/closure/$user->id");

        $response->seeStatusCode(200);
        $response->seeJsonContains([
            "tracks" => [],
            "amount" => 0
        ]);
    }

    public function test_get_balance_since_last_closure_returns_success()
    {
        $user = User::factory()->count(1)->create(['role' => 'employee', 'status' => 1])->first();

        $payment_request = PaymentRequest::factory()->count(1)->create(['user_id' => $user->id])->first();
        PaymentRequestDetail::factory()->count(1)
            ->create([
                'concept' => PaymentRequestDetailConcepts::Closure,
                'payment_request_id' => $payment_request->id
            ])->first();

        Weeklyhours::factory()->count(1)->create(['idUser' => $user->id])->first();

        $client = Clients::factory()->count(1)->create()->first();
        $project = Projects::factory()->count(1)->create(['idClient' => $client->id])->first();
        $task = Tasks::factory()->count(1)->create(['idProject' => $project->id])->first();
        Tracks::factory()->count(1)->create(['idUser' => $user->id, 'idTask' => $task->id])->first();

        $this->actingAs($user);

        $response = $this->get("/api/payment_requests/closure/$user->id");

        $response->seeStatusCode(200);
        $response->seeJsonStructure([
            'response' => [
                'amount',
                'currency',
                'tracks' => [
                    '*' => [
                        'taskName',
                        'trackDuration',
                        'trackCost'
                    ]
                ]
            ],
        ]);
    }
}
