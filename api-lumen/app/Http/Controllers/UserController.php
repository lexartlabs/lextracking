<?php

namespace App\Http\Controllers;

use App\Models\User;
use Exception;
use Laravel\Lumen\Routing\Controller as BaseController;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Http\Controllers\AuthController;
use App\Models\UserExceptions;
use App\Models\UsersHours;
use App\Models\Weeklyhours;
use Laravel\Ui\Presets\React;
use Illuminate\Support\Facades\DB;
use WeeklyHour;
use Illuminate\Validation\Rule;

class UserController extends BaseController
{

    public function login(Request $request)
    {
        $this->validate($request, [
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        $email = $request->input('email');
        $password = md5($request->input('password'));

        try {

            $user = User::where('email', $email)->where('status', 1)->first();

            if (!$user) {
                return (new Response(array("Error" => INVALID_LOGIN, "Operation" => "login"), 400));
            }

            if ($user->password !== $password) {
                return (new Response(array("Error" => INVALID_LOGIN, "Operation" => "login"), 400));
            }

            $auth = new AuthController();
            return array('response' => json_decode($auth->login($user)));

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

        $user = $request->only(["name", "email", "password", "role"]);

        try {
            $user["password"] = $password;
            $user = User::create($user);
            $id = $user->id;

            if(!empty($id)){
                Weeklyhours::create(array(
                    "idUser" => $id,
                    "userName" => $name,
                    "costHour" => 1,
                    "workLoad" => 40,
                    "currency" => "USD",
                    "borrado" => 0
                ));
            }

            return array("response" => array("status" => REGISTRED, "operation" => "register"));
        } catch (Exception $e) {
            return (new Response(array("Error" => BAD_REQUEST, "Operation" => "register"), 500));
        }
    }

    public function all(Request $request)
    {
        try {
            return array("response" => json_decode(User::get(['id', 'name'])));
        } catch (Exception $e) {
            return (new Response(array("Error" => BAD_REQUEST, "Operation" => "all"), 500));
        }
    }

    public function allAdmin(Request $request)
    {
        $role = AuthController::current()->role;

        try {
            $users = new User;

            if($role != "admin"){
                $users = $users->where("role", "!=", "admin");
            }

            $users = $users->get();

            return array("response" => $users);
        } catch (Exception $e) {
            return (new Response(array("Error" => BAD_REQUEST, "Operation" => "all-admin"), 500));
        }
    }

    public function userById(Request $request, $id)
    {

        $request["id"] = $id;

        $this->validate($request, [
            "id" => "exists:Users"
        ]);

        try {
            $user = User::where('id', $id)->first();

            return array("response" => $user);
        } catch (Exception $e) {
            return (new Response(array("Error" => BAD_REQUEST, "Operation" => "user by id"), 500));
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
            "id" => "required|exists:Users,id",
        ]);

        $id = $request->input("id");

        try{
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
        $this->role = AuthController::current()->role;

        $this->validate($request, [
            "id" => ["required", Rule::exists("Users", "id")->where(function($query) {
                if($this->role != "admin") $query->where("role", "!=", "admin");
            })],
            "email" => "email",
            "password" => "string",
            "role" => "string",
            "name" => "string"
        ]);

        $update = $request->only(['email', 'password', 'name']);

        if($this->role == "admin") {
            $update["role"] = $request->input('role');
        }

        try{
            $user = User::where("id", $id)->update($update);

            return array("response" => $user);
        }catch(Exception $e) {
            return array('response' => 'Update User');
        }
    }

    public function hours(Request $request, $userId)
    {
        try{
            $hours = new UsersHours;
            if($userId != 0) {
                $request["userId"] = $userId;
                $this->validate($request, ["userId" => "required|exists:Users,id"]);

                $hours = $hours->where('user_id', $userId);
            }

            $hours = $hours->get();

            if(count($hours) == 0) {
                return array('response' => 'Error al asignar proyecto');
            }

            return array('response' => $hours);
        }catch(Exception $e) {

        }
    }

    public function currentHours(Request $request)
    {
        $user_id = AuthController::current()->id;

        return $this->hours($request, $user_id);
    }

    public function exceptions(Request $request, $userId, $date)
    {

        $fullDate = explode("-", $date);

		$month = $fullDate[0];
		$year = $fullDate[1];

        try{
            $userExceptions = new UserExceptions;

            if($userId != 0) {
                $request["user_id"] = $userId;
                $this->validate($request, ["user_id" => "required|exists:Users,id"]);

                $userExceptions = $userExceptions->where("user_id", $userId);
            }

            $userExceptions = $userExceptions->whereRaw("MONTH(start) = ?", [$month])
                ->whereRaw("YEAR(start) = ?", [$year])
            ->get();

            return array('response' => $userExceptions);
        }catch(Exception $e){

        }
    }

    public function currentExceptions(Request $request, $date)
    {
        $user_id = AuthController::current()->id;

        return $this->exceptions($request, $user_id, $date);
    }
}
