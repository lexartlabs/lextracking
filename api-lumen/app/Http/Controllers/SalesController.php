<?php

namespace App\Http\Controllers;

use Exception;
use Laravel\Lumen\Routing\Controller as BaseController;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\Sales;

class SalesController extends BaseController
{
    public function all($id = null) 
    {
        try{
            if(!empty($id)){
                return Sales::where('id', $id)->where("active", 1)->first();
            }
            
            return Sales::where("active", 1)->get();
        }catch(Exception $e){
            return (new Response(array("Error" => BAD_REQUEST, "Operation" => "sales all"), 500));
        }
    }

    public function new(Request $request)
    {
        $this->validate($request, [
            "description" => "required",
            "concept" => "required",
            "amount" => "required|numeric",
            "type" => "required",
            "currency" => "required",
            "active" => "required|numeric",
            "date" => "required|date",
            "status" => "string",
            "client" => "required",
            "idClient" => "required|numeric|exists:clients,id",
            "seller" => "required",
            "payType" => "date",
            "card" =>  "",
            "idUser" => "required|numeric|exists:users,id"
        ]);

        $sales = $request->only([
            "description",
            "concept",
            "amount",
            "type",
            "currency",
            "active",
            "date",
            "status",
            "client",
            "idClient",
            "seller",
            "payType",
            "card",
            "idUser"
        ]);

        try{
            return Sales::create($sales);
        }catch(Exception $e){
            return (new Response(array("Error" => BAD_REQUEST, "Operation" => "sales all"), 500));
        }
    }

    public function update(Request $request)
    {
        $this->validate($request, [
            "id" => "required|exists:sales",
            "description" => "required",
            "concept" => "required",
            "amount" => "required|numeric",
            "type" => "required",
            "currency" => "required",
            "active" => "required|numeric",
            "date" => "required|date",
            "status" => "string",
            "client" => "required",
            "idClient" => "required|numeric|exists:clients,id",
            "seller" => "required",
            "payType" => "date",
            "card" =>  "",
            "idUser" => "required|numeric|exists:users,id"
        ]);

        $sale = $request->only([
            "id",
            "description",
            "concept",
            "amount",
            "type",
            "currency",
            "active",
            "date",
            "status",
            "client",
            "idClient",
            "seller",
            "payType",
            "card",
            "idUser"
        ]);

        try{

            $id = $sale["id"];

            $saleWhere = Sales::where("id", $id)->first();

            if(!$saleWhere){
                return (new Response(array("Error" => ID_INVALID, "Operation" => "sales update"), 400));
            }

            return Sales::where("id", $id)->update($sale);
        }catch(Exception $e){
            return (new Response(array("Error" => BAD_REQUEST, "Operation" => "sales update"), 500));
        }
    }

    public function delete(Request $request)
    {
        $this->validate($request, ["id" => "required|numeric|exists:sales,id"]);

        $id = $request->input("id");

        try{
            $sale = Sales::where("id", $id)->first();

            if(!$sale){
                return (new Response(array("Error" => ID_INVALID, "Operation" => "sales update"), 400));
            }

            return sales::where("id", $id)->update(["active" => "0"]);
        }catch(Exception $e){
            return (new Response(array("Error" => BAD_REQUEST, "Operation" => "sales update"), 500));
        }
    }

    public function undelete(Request $request)
    {
        $this->validate($request, ["id" => "required|numeric|exists:sales,id"]);

        $id = $request->input("id");

        try{
            $sale = Sales::where("id", $id)->first();
            
            if(!$sale){
                return (new Response(array("Error" => ID_INVALID, "Operation" => "sales undelete"), 400));
            }

            return Sales::where("id", $id)->update(["active" => "1"]);
        }catch(Exception $e){
            return (new Response(array("Error" => BAD_REQUEST, "Operation" => "sales undelete"), 500));
        }
    }

    public function getAllSaelsByMonth(Request $request, $dateIni, $dateEnd, $idUser)
    {

        $request["idUser"] = $idUser;

        try{
            $sales = Sales::whereRaw("date >= ?", [$dateIni])->whereRaw("date <= (? + INTERVAL 1 DAY)", [$dateEnd]);

            if(!empty($idUser)){
                $this->validate($request, [
                    "idUser" => "exists:users,id"
                ]);

                $sales = $sales->where("idUser", $idUser);
            }

            $sales = $sales->get();
            
            return array("response" => $sales);
        }catch(Exception $e){

        }
    }

}
