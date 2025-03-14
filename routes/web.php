<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\EmployeeController;

Route::get('/', function () {
    return view('welcome');
});

// Test API routes in web.php
Route::get('/api/test', function() {
    return response()->json(['message' => 'API is working']);
});

Route::get('/api/employees', [EmployeeController::class, 'index']);
