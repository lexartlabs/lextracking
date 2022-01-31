<?php

namespace App\Http\Controllers;

use App\Models\User;
use Laravel\Lumen\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Auth;

class AuthController extends BaseController
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login']]);
    }

    public function login(User $user)
    {
        if (! $token = Auth::guard()->login($user)) {
            return response()->json([
                'error' => 'Unauthorized'
            ], 401);
        }
        $bearer = $this->respondWithToken($token);

        return json_encode(array("token" => $bearer, "user" => Auth::user()));
    }

    public function logout()
    {
        auth()->logout();
        return response()->json([
            'message' => 'Logout with success!'
        ], 401);
    }

    public function current()
    {
        return Auth::user();
    }

    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => Auth::factory()->getTTL() * 60 // default 1 hour
        ]);
    }
}
