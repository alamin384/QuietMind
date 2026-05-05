<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/register', [\App\Http\Controllers\Auth\RegisteredUserController::class, 'store']);
Route::post('/login', [\App\Http\Controllers\Auth\AuthenticatedSessionController::class, 'store']);
Route::post('/logout', [\App\Http\Controllers\Auth\AuthenticatedSessionController::class, 'destroy'])
    ->middleware('auth:sanctum');

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::post('/user/update', [\App\Http\Controllers\UserController::class, 'updateProfile']);
    Route::get('/user/stats', [\App\Http\Controllers\UserController::class, 'getStats']);
    Route::get('/user/export', [\App\Http\Controllers\UserController::class, 'exportData']);
    Route::delete('/user/clear-data', [\App\Http\Controllers\UserController::class, 'clearData']);
    
    Route::apiResource('posts', \App\Http\Controllers\PostController::class);
});
