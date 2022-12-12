<?php

namespace App\Http\Controllers;

use App\Models\DisasterTime;
use App\Models\Orbit;
use App\Models\Point;
use Illuminate\Http\Request;

class DisastertimeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
        //dd($request);
        try {
            $disastertime = new DisasterTime();
            $disastertime->DisasterID = $request->disasterID;
            $disastertime->Time = $request->Time;
            $disastertime->level = $request->level;
            $disastertime->country = $request->country;
            $point = Point::firstOrCreate(['X' => $request->point['lat'], "Y" => $request->point['long']]);
            $disastertime->pointID = $point->id;
            $disastertime->save();
            foreach ($request->listOrbits as $item) {
                $orbits = new Orbit();
                $orbits->DisasterTimeID = $disastertime->id;
                $orbits->range = $item['range'];
                $orbits->windspeed = $item['windspeed'];
                $orbits->type = $item['type'];
                $orbits->save();
            }
        } catch (\Exception $e) {
            return response()->json(['message' => $e, 'result' => -1], 202);
        }
        return response()->json(['data' => $disastertime, 'message' => "create successfully", 'result' => 0], 201);
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
        //
    }
}