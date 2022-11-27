<?php

namespace App\Http\Controllers;

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
}
