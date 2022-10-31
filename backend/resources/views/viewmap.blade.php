<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <body>
        <h1>View MAP</h1>
       
    
    
      <body>
        <!-- Khai bao the div chua Map -->
        <div id="googleMap" style="width:500px;height:380px;"></div>
      </body>
    </body>
    <script src="http://maps.googleapis.com/maps/api/js?key=AIzaSyD8Oywi2-oGz35DFGhA7uV39kdkULR11ss&sensor=false">
    </script>
    <script>
        

      //Khoi tao Map
    //   function initialize() {
    //     var lat=0;
    //     var long=0;
    //     window.navigator.geolocation.getCurrentPosition(function(pos){
    //         lat = pos.coords.latitude;
    //         long = pos.coords.longtitude;
    //         console.log(lat);
    //         var mapProp = {
    //       //Tam ban do, quy dinh boi kinh do va vi do
    //       center:new google.maps.LatLng(lat, long),
    //       //set default zoom cua ban do khi duoc load
    //       zoom:5,
    //       //Dinh nghia type
    //       mapTypeId:google.maps.MapTypeId.ROADMAP
    //     };
    //     var map=new google.maps.Map(document.getElementById("googleMap"), mapProp);
    //     }
    //     //Khai bao cac thuoc tinh
        
    //     //Truyen tham so cho cac thuoc tinh Map cho the div chua Map
        
    //   }

    function initialize() {
        var lat=0;
      var long=0;
      window.navigator.geolocation.getCurrentPosition(function(pos){
             lat = pos.coords.latitude;
             long = pos.coords.longitude;
             console.log(long);
           
            
            var mapProp = {
              center:new google.maps.LatLng(lat,long),
              zoom:15,
              mapTypeId:google.maps.MapTypeId.ROADMAP
            };
            var map1=new google.maps.Map(document.getElementById("googleMap"), mapProp);
            var localmark=new google.maps.Marker({
                position:{lat:lat,lng:long},
                map:map1
            });
            const cityCircle = new google.maps.Circle({
      strokeColor: "#FF0000",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#FF0000",
      fillOpacity: 0.35,
      map:map1,
      center:{lat:lat,lng:long},
      radius: 5 * 10,
    });
            
         });  }
      google.maps.event.addDomListener(window, 'load', initialize);
    </script>
</body>
</html>