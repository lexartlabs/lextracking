<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
//use Illuminate\Support\Facades\DB;
use DB;
use Carbon\Carbon;

class UserController extends Controller
{
    private $User;
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->User = new User();
    }

    public function all(Request $request)
        {
            try {
                /* FILTER */
                $limit  = $request->get('limit') ? $request->get('limit') : "0" ;
                $offset = $request->get('offset') ? $request->get('offset') : "0" ;
                $where  = [];
                $request->get('id') ? array_push($where, ["id","=",$request->get('id')]) : false;
                $request->get('name') ? array_push($where, ["name","like","%".$request->get('name')."%"]) : false;
                $request->get('email') ? array_push($where, ["email","like","%".$request->get('email')."%"]) : false;
                
                /* QUERY */
                $count = DB::table('users')->where($where)
                                             ->count();
                $users = DB::table('users')->where($where)
                                             ->orderBy('id', 'asc')
                                             ->limit($limit)
                                             ->offset($offset)          
                                             ->get();
                                
                return response()->json(['response' => $users->all(),'count' => $count], 200);
            } catch (\Exception $e) {
                var_dump($e->getMessage());
                return response()->json(['error' => 'Fallo al obtener users!'], 409);
            }
        }

    public function single($id)
        {
            try {
                $user = DB::table('users')->where('id', $id)->first();
                unset($user->password);
                unset($user->token);
                
                return response()->json(['response' => $user], 200);
            } catch (\Exception $e) {
                var_dump($e->getMessage());
                return response()->json(['message' => 'Fallo al obtener single user!'], 409);
            }
        }

    public function new(Request $request)
    {
        // DELETE
		// $User = User::where("email","=",'nicoals@lexartlabs.xyz')->first();
        // $User->delete();

        // UPDATE
        // $User = User::where("email","=",'nicoals@lexartlabs.xyz')->first();
        // $User->delete_at = null;
        // $User->save();

        // CREATE
        // if(!empty($check_email)){
        //     //error
        // }else{
        //     $User = User::create([
        //         'nomrbe' => $request->get('')
        //     ]);
        // }
        try {
                $user = DB::table('users')->first();
                return response()->json(['response' => $user], 200);
            } catch (\Exception $e) {
                var_dump($e->getMessage());
                return response()->json(['message' => 'Fallo al obtener single user!'],409);
            }
        
    }

}
