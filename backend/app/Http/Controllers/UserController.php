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

    function UserLocation(Request $request)
    {
        $token = $request->header('token');
        $sessionUser = SessionUser::where('token', $token)->first();
        $user = User::where('id', $sessionUser->user_id)->first();
        $userLocation = Location::where('user_id', $user->id)->get();
        foreach ($userLocation as $key => $value) {
            $POINT = Point::where('id', $userLocation[$key]['point_id'])->first();
            $userLocation[$key]['point_id'] = $POINT;
        }
        return response()->json([
            'data' => $userLocation,
            'code' => '200',
            'result' => 0

        ], 200);
    }
    function GetListIDUser()
    {
        $list = User::get('id');
        return response()->json([
            'data' => $list,
            'code' => '200',
            'result' => 0

        ], 200);

    }

    function UserDeleteLocation(Request $request)
    {
        $userLocation = Location::find($request->id);
        if ($userLocation == null)
            return response()->json([
                'data' => 'Id not exist',
                'code' => '200',
                'result' => 0

            ], 401);
        $tpoint = Point::find($userLocation->point_id);
        $deletedLocation = $userLocation->delete();
        $deletedPoint = $tpoint->delete();

        if ($deletedLocation)
            return response()->json([
                'data' => $deletedPoint,
                'code' => '200',
                'result' => 0

            ], 201);

    }
}