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
}
