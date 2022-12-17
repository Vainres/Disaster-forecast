<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\DisastertimeController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\PointController;
use App\Http\Controllers\StormController;
use App\Models\DisasterTime;
use App\Models\Notification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\UserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
//api đăng kí
Route::middleware(['checktoken'])->group(function () {
    Route::get(
        'info',
        function () {
            return response()->json([
                "message" => "lấy được thông tin"
            ], 200);
        }
    );
    Route::get('userinfo', [UserController::class, 'GetUserInfo']);
    Route::get('user/location', [UserController::class, 'UserLocation']);

    Route::post('user/addlocation', [UserController::class, 'UserAddLocation']);
    Route::post('user/deletelocation', [UserController::class, 'UserDeleteLocation']);

    Route::resource('point', PointController::class);
});

Route::middleware(['checktoken', 'checkadmin'])->group(function () {

    Route::post('admin/updateif', [AdminController::class, 'UpdateIF']);
    Route::delete('admin/deleteadmin', [AdminController::class, 'DeleteID']);
    Route::post('admin/add', [AdminController::class, 'AddAdmin']);
    Route::resource('/admin/storm', StormController::class);
    Route::resource('/admin/noti', NotificationController::class);
    Route::resource('/admin/disastertime', DisastertimeController::class);
    Route::get('admin/changepassword/checkpass', [UserController::class, 'ComparePassword']);
    Route::get('admin/listadmin', [AdminController::class, 'GetListAdmin']);
    Route::get('admin/listuser', [AdminController::class, 'GetListUser']);
});
Route::middleware(['checktoken'])->group(function () {

    Route::get('admin/getuserif', [AdminController::class, 'FindID']);
    Route::get('/admin/stormfillter', [StormController::class, 'filters']);
    Route::post('admin/changepassword/changePassword', [UserController::class, 'ChangePassword']);
});


Route::post('register', [RegisterController::class, 'Register']);
// api create token
Route::post('login', [LoginController::class, 'Login']);

Route::post('/storm', [StormController::class, 'filters']);
