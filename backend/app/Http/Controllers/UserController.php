<?php

namespace App\Http\Controllers;

use App\Models\Location;
use App\Models\Point;
use App\Models\SessionUser;
use App\Models\User;

use Illuminate\Http\Request;

class UserController extends Controller
{
    function GetUserInfo(Request $request)
    {
        $token = $request->header('token');
        $sessionUser = SessionUser::where('token', $token)->first();
        $user = User::where('id', $sessionUser->user_id)->first();
        return response()->json([
            'data' => $user,
            'message' => "token expired",
            'code' => '200'

        ], 200);
    }
    function ComparePassword(Request $request)
    {
        $token = $request->header('token');
        $sessionUser = SessionUser::where('token', $token)->first();
        $user = User::where('id', $sessionUser->user_id)->first();

        $datalogin = ['email' => $user->email, 'password' => $request->password];
        if (auth()->attempt($datalogin)) {
            return response()->json([
                'password' => true,
                'message' => "You can change your password",
                'code' => '200'

            ], 200);
        }

        return response()->json([
            'password' => false,
            'message' => "You check your password",
            'code' => '200'

        ], 200);
    }
    function ChangePassword(Request $request)
    {
        $token = $request->header('token');
        $sessionUser = SessionUser::where('token', $token)->first();
        $user = User::where('id', $sessionUser->user_id)->first();

        $password = bcrypt($request->newpassword);
        $user->password = $password;
        $user->save();
        echo $password;

        return response()->json([
            'message' => "ChangePassword successful",
            'code' => '200'

        ], 200);
    }
    function UserAddLocation(Request $request)
    {
        $token = $request->header('token');
        $sessionUser = SessionUser::where('token', $token)->first();
        $user = User::where('id', $sessionUser->user_id)->first();
        $location = new Location();
        $location->namelocation = $request->name;
        $location->user_id = $user->id;
        $point = Point::firstOrCreate(['X' => $request->point['lat'], "Y" => $request->point['long']]);
        $location->point_id = $point->id;
        $location->save();
        return response()->json([
            'data' => $location,
            'message' => "add successfully",
            'code' => '200',
            'result' => 0

        ], 201);
    }
}