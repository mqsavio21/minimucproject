<?php

use App\Http\Controllers\Api\EmployeeController;
use App\Http\Controllers\Api\TaskController;
use Illuminate\Support\Facades\Route;

Route::prefix('api')->group(function () {
    Route::apiResource('employees', EmployeeController::class);
    Route::apiResource('tasks', TaskController::class);
}); 