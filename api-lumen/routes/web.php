<?php

/** @var \Laravel\Lumen\Routing\Router $router */

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

Route::group(['prefix' => 'api'], function ($router) {
    Route::post('login', 'UserController@login');

    //SOMENTE AUTHENTICADOS
    Route::group(['middleware' => 'auth:api'], function () {
        
        //SOMENTE ADMIN
        Route::group(['middleware' => 'admin:api'], function () {
            
            Route::post('register', 'UserController@register');
            Route::get('all', 'UserController@all');
        });
    });
});
