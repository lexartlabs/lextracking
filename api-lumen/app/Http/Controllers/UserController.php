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

        $user = User::where('email', $email)->where('status', 0)->first();

            if (!$user) {
                return (new Response(array("Error" => INVALID_LOGIN, "Operation" => "login"), 400));
            }

            if ($user->password !== $password) {
                return (new Response(array("Error" => INVALID_LOGIN, "Operation" => "login"), 400));
            }

            $auth = new AuthController();
            return array('response' => json_decode($auth->login($user)));

        try {

            
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
            return array("response" => json_decode(User::all()));
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

    public function current(Request $request)
    {
        $auth_code = $request->header()['authorization'][0];
        
        $current = AuthController::current();
        $current->token = $auth_code;
        return array('response' => $current);
    }

    public function delete(Request $request)
    {
        $this->validate($request, [
            "id" => "required",
        ]);

        $id = $request->input("id");
        
        try{
            $user = User::where("id", $id)->where("status", 0)->first();

            if(!$user) {
               return (new Response(array("Error" => USER_NOT, "Operation" => "delete"), 400));
            }

            return User::where("id", $id)->update(["status" => 1]);
        }catch (Exception $e){
            return (new Response(array("Error" => BAD_REQUEST, "Operation" => "delete"), 500));
        }
    }

    public function undelete(Request $request)
    {
        $this->validate($request, [
            "id" => "required",
        ]);
        
        $id = $request->input("id");
        
        try{
            $user = User::where("id", $id)->where("status", 1)->first();

            if(!$user) {
                return (new Response(array("Error" => USER_NOT, "Operation" => "undelete"), 400));
            }

            return User::where("id", $id)->update(["status" => 0]);
        }catch (Exception $e){
            return (new Response(array("Error" => BAD_REQUEST, "Operation" => "undelete"), 500));
        }
    }
}
