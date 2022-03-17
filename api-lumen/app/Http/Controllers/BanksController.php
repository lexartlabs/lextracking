<?php

namespace App\Http\Controllers;

use App\Models\Banks;
use Laravel\Lumen\Routing\Controller as BaseController;
use Exception;
use Illuminate\Http\Response;
use Illuminate\Http\Request;
use App\Http\Controllers\AuthController;


class BanksController extends BaseController
{
    public function all(Request $request, $id = null)
    {   
        $request['id'] = $id;

        if(!empty($request['id'])){
            $this->validate($request, ["id" => "numeric|exists:banks"]);  //Validations
        }

        try{
            if(!empty($id)){

                $banks = Banks::where("id", $id)->where("borrado", 0)->get();

                return array("response" => $banks);
            }

            $banks = Banks::where("borrado", 0)->get();

            return array("response" => $banks);
        }catch(Exception $e){
            return (new Response(array("Error" => BAD_REQUEST, "Operation" => "banks all"), 500));
        }
    }

    public function user(Request $request, $id)
    {
        $request['id'] = $id;
        $this->validate($request, ["id" => "required|exists:banks,userId|numeric"]);  //Validations

        try{
            $banks = Banks::where("userId", $id)->where("borrado", 0)->get();

            return array("response" => $banks);
        }catch(Exception $e){
            return (new Response(array("Error" => BAD_REQUEST, "Operation" => "banks user"), 500));
        }
    }

    public function current(Request $request)
    {
        $userId = AuthController::current()->id;

        return $this->user($request, $userId);
    }

    public function update()
    {
        
    }

    public function new()
    {

    }

    public function active(Request $request, $id, $userID){
        $request['id'] = $id;
        $request['userID'] = $userID;

        $this->validate($request, ["id" => "required|numeric|exists:banks"]);

        try{
            $banks = Banks::where("id", $id)->where("borrado", 0);

            if(!empty($userID)){
                $this->validate($request, ["userID" => "numeric|exists:banks,userId"]);
                
                $getBanks = Banks::where("active", 1)->where("borrado", 0)->where("userId", $userID)->get();

                if(count($getBanks) >= 4) {
                    return array("response" => MAX_BANKS_ENABLED);
                }

                $banks = $banks->where("userId", $userID);
            }
            $banks = $banks->update(["active" => 1]);
            
            return array("response" => $banks);
        }catch(Exception $e){
            
        }
    }

    public function deActive(Request $request, $id, $userID){
        $request['id'] = $id;
        $request['userID'] = $userID;

        $this->validate($request, ["id" => "required|numeric|exists:banks"]);

        try{
            $banks = Banks::where("id", $id)->where("borrado", 0);

            if(!empty($userID)){
                $this->validate($request, ["userID" => "numeric|exists:banks,userId"]);
                $banks = $banks->where("userId", $userID);
            }

            $banks = $banks->update(["active" => 0]);
            
            return array("response" => $banks);
        }catch(Exception $e){

        }
    }

    public function currentActive(Request $request, $id){
        $user_id = AuthController::current();
        
        return $this->active($request, $id, $user_id);
    }

    public function currentDeActice(Request $request, $id){
        $user_id = AuthController::current();
        
        return $this->deActive($request, $id, $user_id);
    }

    public function delete(Request $request, $userID, $id)
    {
        $request['id'] = $id;
        $request['userID'] = $userID;

        $this->validate($request, ["id" => "required|numeric|exists:banks"]);

        try{
            $banks = Banks::where("id", $id)->where("active", 1)->get();
            
            if(count($banks) > 0){
                return array("response" => BANK_ENABLED);
            }
            
            $banks = Banks::where("id", $id);
            
            if(!empty($request['userID'])){
                $this->validate($request, ["userID" => "numeric|exists:banks,userId"]);
                $banks = $banks->where("userId", $userID);
                
                var_dump(count($banks->get()));

                if(count($banks->get()) == 0){
                    return array("response" => ID_INVALID);
                }
            }
            
            $banks = $banks->update(["borrado" => 1]); // 1 deleted
            return array("response" => $banks);
        }catch(Exception $e){
            return (new Response(array("Error" => BAD_REQUEST, "Operation" => "banks delete"), 500));
        }
    }

    public function undelete(Request $request, $userID, $id)
    {   
        $request['id'] = $id;
        $request['userID'] = $userID;

        $this->validate($request, ["id" => "required|numeric|exists:banks"]);

        try{
            $banks = Banks::where("id", $id);
            
            if(!empty($request['userID'])){
                $this->validate($request, ["userID" => "numeric|exists:banks,userId"]);
                $banks = $banks->where("userId", $userID);
            }

            $banks = $banks->update(["borrado" => 0]);  // 0 not deleted
            return array("response" => $banks);
        }catch(Exception $e){
            return (new Response(array("Error" => BAD_REQUEST, "Operation" => "banks undelete"), 500));
        }
    }

    public function currentDelete(Request $request, $id)
    {
        $userId = AuthController::current()->id;
        return $this->delete($request,$userId, $id);
    }

    public function currentUndelete(Request $request, $id)
    {
        $userId = AuthController::current()->id;
        return $this->undelete($request,$userId, $id);
    }
}
