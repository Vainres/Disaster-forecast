<?php

namespace App\Http\Middleware;

use App\Models\SessionUser;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CheckTokenTimeOut
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
        // $checktime=SessionUser::where(Auth->id());
        if (empty($sessionUser)) {
            return response()->json([
                'message' => "token not exist",
                'code' => '401'

            ], 200);
        } elseif ($sessionUser->token_expired < date("Y-m-d H:i:s")) {
            $sessionUser->delete();
            return response()->json([
                'message' => "token expired",
                'code' => '401'

            ], 200);
        }

        return $next($request);
    }
}
