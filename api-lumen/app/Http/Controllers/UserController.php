<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

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
        
        echo "test";
    }

}
