<?php

namespace App\Http\Controllers;

use App\Models\User;
use Exception;
use Laravel\Lumen\Routing\Controller as BaseController;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Http\Controllers\AuthController;

class UserController extends BaseController
{
    public function login(Request $request)
    {
        $this->validate($request, [
            'email' => 'required|email',
            'password' => 'required|min:8|string',
        ]);

        $email = $request->input('email');
        $password = md5($request->input('password'));

        try {

            $user = User::where('email', $email)->first();

            if (!$user) {
                return (new Response(array("Error" => INVALID_LOGIN, "Operation" => "login"), 400));
            }

            if ($user->password !== $password) {
                return (new Response(array("Error" => INVALID_LOGIN, "Operation" => "login"), 400));
            }

            $auth = new AuthController();
            return $auth->login($user);
        } catch (Exception $e) {
            return (new Response(array("Error" => BAD_REQUEST, "Operation" => "login"), 500));
        }
    }

    public function register(Request $request)
    {
        $this->validate($request, [
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:8|string',
            'password_confirm' => 'required|same:password|string',
            'role' => 'required'
        ]);

        $name = $request->input('name');
        $email = $request->input('email');
        $password = md5($request->input('password')); //REVER O METODO DE ENCRYPT
        $role = $request->input('role');

        try {
            User::create(array(
                "name" => $name,
                "email" => $email,
                "password" => $password,
                "role" => $role
            ));

            return (new Response(array("status" => REGISTRED, "operation" => "register")));
        } catch (Exception $e) {
            return (new Response(array("Error" => BAD_REQUEST, "Operation" => "login"), 500));
        }
    }

    public function all()
    {
        try {
            return json_encode(User::all());
        } catch (Exception $e) {
            return (new Response(array("Error" => BAD_REQUEST, "Operation" => "login"), 500));
        }
    }

    public function userById($id)
    {
        try {
            $user = User::where('id', $id)->first();
            if(!$user) {
                return (new Response(array("Error" => USER_NOT, "Operation" => "user"), 500));
            }

            return json_encode($user);
        } catch (Exception $e) {
            return (new Response(array("Error" => BAD_REQUEST, "Operation" => "user"), 500));
        }
    }

    public function current()
    {
        return json_encode(AuthController::current());
    }
}
