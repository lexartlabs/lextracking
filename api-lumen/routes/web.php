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

Route::get('/', function ($router) {
    return $router->app->version();
});

Route::group(['prefix' => 'api'], function ($router) {

    Route::group(['prefix' => 'user'], function () {
        Route::post('login', 'UserController@login');
        
        Route::group(['middleware' => 'auth:api'], function () {
            Route::get('current', 'UserController@current');
            Route::get('current/performance', 'PerformanceController@current');
        });

        Route::group(['middleware' => 'admin:api'], function () {
            Route::post('register', 'UserController@register');
            Route::get('all', 'UserController@all');
            Route::get('{id}', 'UserController@userById');
            Route::delete('delete', 'UserController@delete');
            Route::post('undelete', 'UserController@undelete');

            //Performances
            Route::get('{id}/performance', 'PerformanceController@userId');
            Route::group(['prefix' => 'performance'], function() {
                Route::get('all', 'PerformanceController@all');
                Route::post('save', 'PerformanceController@save');
            });
        });
    });

    Route::group(['prefix' => 'projects', 'middleware' => 'auth:api'], function() {
        Route::get('all', 'ProjectsController@all');
        Route::get('{id}', 'ProjectsController@all');

        Route::get('client/{id}', 'ProjectsController@client');

        Route::group(['prefix' => 'tasks'], function() {
            Route::get('all', 'TasksController@all');
            Route::get('{id}', 'TasksController@all');
            Route::delete('delete', 'TasksController@delete');
            Route::post('undelete', 'TasksController@undelete');
            Route::put('update', 'TasksController@update');
            Route::post('create', 'TasksController@create');
            
            Route::get('project/{id}', 'TasksController@project');

            Route::group(['prefix' => 'user'], function(){
                Route::get('current', 'TasksController@currentUser');
                Route::get('{id}', 'TasksController@userId');
            });
            
            
            Route::group(['prefix' => 'trello'], function (){
                Route::get('all', 'TrelloTasksController@all');
                Route::get('{id}', 'TrelloTasksController@all');
                
                Route::post('new', 'TrelloTasksController@new');
                Route::put('update', 'TrelloTasksController@update');
    
                Route::group(['prefix' => 'boards'], function (){
                    Route::get('all', 'BoardTrelloController@all');
                    Route::get('{id}', 'BoardTrelloController@all');

                    Route::post('new', 'BoardTrelloController@new');
                });
            });
        });
    });

    Route::group(['prefix' => 'tracks', 'middleware' => 'auth:api'], function() {
        Route::get('all', 'TracksController@all');
        Route::get('{id}', 'TracksController@all');

        Route::post('new', 'TracksController@new');
        Route::put('update', 'TracksController@update');
        
        Route::group(['prefix' => 'user'], function(){
            Route::get('current', 'TracksController@current');
            Route::post('current/date', 'TracksController@currentUserDate');
        });
    });

    Route::group(['prefix' => 'weeklyhours', 'middleware' => 'auth:api'], function(){
        Route::get('all', 'WeeklyhoursController@all');
        Route::get('{id}', 'WeeklyhoursController@all');

        Route::put('update', 'WeeklyhoursController@update');
        Route::post('new', 'WeeklyhoursController@new');

        Route::group(['prefix' => 'user'], function(){
            Route::get('current', 'WeeklyhoursController@current');
            Route::get('{id}', 'WeeklyhoursController@user'); 
        });
    });

    Route::group(['prefix' => 'clients', 'middleware' => 'auth:api'], function(){
        Route::get('all', 'ClientsController@all');
        Route::get('{id}', 'ClientsController@all');
        
        Route::put('update', 'ClientsController@update');
        Route::post('new', 'ClientsController@new');
    });
});
