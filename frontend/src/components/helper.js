export function drawCircle(point, radius, dir,angle=0,pts = 512)
{ 
    var d2r = Math.PI / 180;   // degrees to radians 
    var r2d = 180 / Math.PI;   // radians to degrees 
    var earthsradius = 3963; // 3963 is the radius of the earth in miles
    var points = pts; 

    // find the raidus in lat/lon 
    var rlat = (radius / earthsradius) * r2d; 
    var rlng = rlat / Math.cos(point.lat * d2r); 

    var extp = new Array(); 
    if (dir==1) {var start=0;var end=(points-1)/2} // one extra here makes sure we connect the
    else{var start=points+1;var end=(points-1)/2}
    for (var i=start; (dir==1 ? i < end : i > end); i=i+dir)  
    {
        var theta = angle+Math.PI * (i / (points/2)); 
        var ey = point.lng + (rlng * Math.cos(theta)); // center a + radius x * cos(theta) 
        var ex = point.lat + (rlat * Math.sin(theta)); // center b + radius y * sin(theta) 
        extp.push({lng:ey, lat:ex});
    }
    return extp;
}

export function angleCal(EyeA,EyeB)
{

    let vector = {lat:EyeA.position.lat-EyeB.position.lat,
        lng:EyeA.position.lng-EyeB.position.lng};

    let angl=(Math.acos((vector.lat+vector.lng)/
    Math.pow(Math.pow(vector.lat,2)+Math.pow(vector.lng,2),1/2))%(Math.PI/2));

    return angl;
}