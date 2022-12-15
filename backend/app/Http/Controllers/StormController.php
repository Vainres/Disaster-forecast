<?php

namespace App\Http\Controllers;

use App\Models\Disaster;
use App\Models\Point;
use Illuminate\Http\Request;

class StormController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = Disaster::all()->toArray();


        return response()->json(['data' => $data], 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $storm = new Disaster();
        $storm->name = $request->name;
        $storm->level = $request->level;
        $storm->type = $request->type;
        $storm->startTime = $request->startTime;
        $storm->endTime = $request->endTime;
        $pointstart = Point::firstOrCreate(['X' => $request->pointstart['lat'], "Y" => $request->pointstart['long']]);
        $storm->startPointID = $pointstart->id;
        $pointend = Point::firstOrCreate(['X' => $request->pointend['lat'], "Y" => $request->pointend['long']]);
        $storm->endPointID = $pointend->id;
        $storm->save();
        return response()->json(['data' => $storm, 'message' => "create successfully", 'result' => 0], 201);

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
        try {
            $storm = Disaster::find($id);
            $storm->update($request->data);
        } catch (\Exception $e) {
            return response()->json(['message' => $e, 'result' => -1], 202);
        }

        return response()->json(['data' => $storm, 'message' => 'data update', 'result' => 0], 202);
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
            $storm = Disaster::find($id);
            $storm->delete();
        } catch (\Exception $e) {
            return response()->json(['message' => $e, 'result' => -1], 202);
        }

        return response()->json(['message' => 'delete sucessful', 'result' => 0], 202);
    }
}