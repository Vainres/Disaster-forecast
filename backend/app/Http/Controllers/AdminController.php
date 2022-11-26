<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

use function PHPUnit\Framework\isEmpty;

class AdminController extends Controller
{
    function GetListAdmin(Request $request)
    {
        $user = User::where('isUser', 0)->get();
        return response()->json([
            'data' => $user,
            'message' => "token expired",
            'code' => '200'

        ], 200);
    }
    function FindID(Request $request)
    {

        $user = User::where('id', $request->id)->first();


        if ($user->count() > 0) {
            return response()->json([
                'data' => $user,
                'message' => "get successful",
                'code' => '200'

            ], 200);
        } else {
            return response()->json([
                'data' => '',
                'message' => "no data found",
                'code' => '204'

            ], 200);
        }
    }
    function UpdateIF(Request $request)
    {

        $user = User::where('id', $request->id)->first();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->save();
    }
    function DeleteID(Request $request)
    {
        $user = User::where('id', $request->id)->first();
        $user->delete();
    }
    function AddAdmin(Request $request)
    {
        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = bcrypt($request->password);
        $user->isUser = 0;
        $user->save();
    }
}
