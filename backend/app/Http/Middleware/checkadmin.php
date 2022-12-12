<?php

namespace App\Http\Middleware;

use App\Models\SessionUser;
use App\Models\User;
use Closure;
use Illuminate\Http\Request;

class checkadmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        $token = $request->header('token');
        $sessionUser = SessionUser::where('token', $token)->first();
        $user = User::where('id', $sessionUser->user_id)->first();
        //
        if ($user->isUser == 1) {
            return response()->json([
                "message" => "You are not admin, you are not allowed to admin pages",
                "result" => -1
            ], 200);
        }
        return $next($request);
    }
}