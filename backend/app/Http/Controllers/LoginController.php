<?php

namespace App\Http\Controllers;

use App\Models\SessionUser;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class LoginController extends Controller
{
    function Login(Request $request)
    {
        $datalogin = [
            "email" => $request->email,
            "password" => $request->password
        ];
        if (auth()->attempt($datalogin)) {
            $checkTokenExit = SessionUser::where('user_id', auth()->id())->first();
            $UserLogin = null;
            if (empty($checkTokenExit)) {
                $UserLogin = SessionUser::create([
                    "token" => Str::random(40),
                    'refresh_token' => Str::random(40),
                    'token_expired' => date('Y-m-d H:i:s', strtotime(' +1 day')),
                    'refresh_token_expired' => date('Y-m-d H:i:s', strtotime(' +360 day')),
                    'user_id' => auth()->id()
                ]);
            } else {
                $UserLogin = $checkTokenExit;
            }
            return response()->json([
                'code' => 200,
                'data' => $UserLogin,
                'message' => "Login successful"
            ], 200);
        } else {
            return response()->json([
                'code' => 401,
                'message' => "Email or password incorrect"
            ], 200);
        }
    }
}
