<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class RegisterController extends Controller
{
    function Register(Request $request)
    {
        //dd("aaaaa");
        $UserCreate = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'isUser' => 1,
            'password' => bcrypt($request->password)
        ]);
        return response()->json([
            'code' => 201,
            'data' => $UserCreate
        ], 201);
    }
}
