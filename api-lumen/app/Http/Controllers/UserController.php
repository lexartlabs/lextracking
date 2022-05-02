<?php

namespace App\Http\Controllers;

use App\Models\User;
use Exception;
use Laravel\Lumen\Routing\Controller as BaseController;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Http\Controllers\AuthController;
use App\Models\UserExceptions;
use App\Models\UserHours;
use Laravel\Ui\Presets\React;
use Illuminate\Support\Facades\DB;

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

    public function all(Request $request)
    {
        try {
            return array("response" => json_decode(User::get(['id', 'name'])));
        } catch (Exception $e) {
            return (new Response(array("Error" => BAD_REQUEST, "Operation" => "login"), 500));
        }
    }

    public function allAdmin(Request $request)
    {
        try {
            return array("response" => json_decode(User::get()));
        } catch (Exception $e) {
            return (new Response(array("Error" => BAD_REQUEST, "Operation" => "login"), 500));
        }
    }

    public function userById(Request $request, $id)
    {

        $request["id"] = $id;

        $this->validate($request, [
            "id" => "exists:users"
        ]);

        try {
            $user = User::where('id', $id)->first();

            return array("response" => $user);
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

    public function update(Request $request, $id) 
    {
        $request["id"] = $id;
        $this->validate($request, [
            "id" => "required|exists:users,id",
            "email" => "email",
            "password" => "min:8",
            "role" => "string",
            "name" => "string"
        ]);

        $update = $request->only(['email', 'password', 'role', 'name']);

        try{
            $user = User::where("id", $id)->update($update);
            
            return array("response" => $user);
        }catch(Exception $e) {
            return array('response' => 'Update User');
        }
    }

    public function hours($id) 
    {
        try{
            $user = User::where('id', $id)->first();

            if(!$user){
                return (new Response(array("Error" => INVALID_LOGIN, "Operation" => "hours"), 400));
            }

            $hours = UserHours::where('user_id', $id)->get();

            if(count($hours) == 0) {
                return array('response' => 'Error al asignar proyecto');
            }

            return array('response' => $hours);
        }catch(Exception $e) {

        }
    }

    public function currentHours(Request $request)
    {
        $user = $this->current($request);
        $user_id = $user['response']->id;

        return $this->hours($user_id);
    }

    public function exceptions($id, $date)
    {

        $fullDate = explode("-", $date);
        
		$month = $fullDate[0];
		$year = $fullDate[1];

        try{
            $user = User::where("id", $id)->first();
            
            if(!$user) {
                return (new Response(array("Error" => INVALID_LOGIN, "Operation" => "hours"), 400));
            }

            $userExceptions = DB::select("SELECT * FROM user_exceptions WHERE user_id = ".$id." AND MONTH(`start`) =".$month." AND YEAR(`start`) = " .$year);
            
            return array('response' => $userExceptions);
        }catch(Exception $e){
            
        }
    }

    public function currentExceptions(Request $request, $date)
    {
        $user = $this->current($request);
        $user_id = $user['response']->id;

        return $this->exceptions($user_id, $date);
    }
}
