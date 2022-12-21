<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use App\Models\UserNoti;
use Illuminate\Http\Request;
use App\Models\SessionUser;

class NotificationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = Notification::all()->toArray();


        return response()->json(['data' => $data], 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $insert = new Notification();
        $insert['title'] = $request->title;
        $insert['content'] = $request->content;
        $insert['isread'] = $request->isread;
        $insert['ispass'] = $request->ispass;
        $insert['important'] = $request->important;
        $insert->save();
        $id_noti = $insert->id;
        $userlist = $request->user_id;
        foreach ($userlist as $key => $value) {
            $user_noti = new UserNoti();
            $user_noti['user_id'] = $value;
            $user_noti['notifi_id'] = $id_noti;
            $user_noti->save();
        }
        return response()->json(['data' => $insert, 'message' => "create successfully", 'result' => 0], 201);

    }
    public function UserStore(Request $request)
    {
        // UserNoti::truncate();
        // Notification::truncate();
        // return response()->json(['data' => '', 'message' => "create successfully", 'result' => 0], 201);

        $token = $request->header('token');
        $sessionUser = SessionUser::where('token', $token)->first();
        $checkExistNoti = UserNoti::where('user_id',$sessionUser->user_id)->pluck('notifi_id')->toArray();
        
        if(isset($checkExistNoti)==true)
        {
            $checkExistContent = Notification::whereIn('id',$checkExistNoti)->where('content', $request->content)->get();
        }
        else
        {
            $insert = new Notification();
            $insert['title'] = $request->title;
            $insert['content'] = $request->content;
            $insert['isread'] = $request->isread;
            $insert['ispass'] = $request->ispass;
            $insert['important'] = $request->important;
            $insert->save();
            $id_noti = $insert->id;
            $user_noti = new UserNoti();
            $user_noti['user_id'] = $sessionUser->user_id;
            $user_noti['notifi_id'] = $id_noti;
            $user_noti->save();
            return response()->json(['data' => $insert, 'message' => "create successfully", 'result' => 0], 201);
        }

        if(count($checkExistContent) === 0)
        {
            $insert = new Notification();
            $insert['title'] = $request->title;
            $insert['content'] = $request->content;
            $insert['isread'] = $request->isread;
            $insert['ispass'] = $request->ispass;
            $insert['important'] = $request->important;
            $insert->save();
            $id_noti = $insert->id;
            $user_noti = new UserNoti();
            $user_noti['user_id'] = $sessionUser->user_id;
            $user_noti['notifi_id'] = $id_noti;
            $user_noti->save();
            return response()->json(['data' => $insert, 'message' => "create successfully", 'result' => 0], 201);

        }
        return response()->json(['data' => $checkExistContent, 'message' => "update successfully", 'result' => 0], 201);

    }
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
        $UserNoti = UserNoti::where('user_id',$id)->pluck('notifi_id')->toArray();
        $NotiContent = Notification::whereIn('id',$UserNoti)->get();
        return response()->json(['data' => $NotiContent, 'message' => "get successfully", 'result' => 0], 200);

    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {
            $storm = Notification::find($id);
            //dd($storm);
            $storm->delete();
        } catch (\Exception $e) {
            return response()->json(['message' => $e, 'result' => -1], 202);
        }

        return response()->json(['message' => 'delete sucessful', 'result' => 0], 202);
    }
}