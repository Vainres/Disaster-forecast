import { GoogleMap, useLoadScript, Marker, Polyline } from '@react-google-maps/api';
import { useState } from 'react';

function MapLo(props) {
    const stormlist = {
        id: 1,
        name: 'Noru',
        vitri: [
            {
                day: 1,
                localeye: { lat: 0, lng: 5 },
                descript: 'Bão rất mạnh',
            },
            {
                day: 2,
                localeye: { lat: 0, lng: 5 },
                descript: 'Bão rất mạnh',
            },
        ],
    };
    const StormListmaker = (
        <div>
            {stormlist.vitri.map((data, index) => {
                <Marker key={index} position={data.localeye}></Marker>;
            })}
        </div>
    );
    console.log(StormListmaker);
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: 'AIzaSyD8Oywi2-oGz35DFGhA7uV39kdkULR11ss',
    });
    const containerStyle = {
        width: '100%',
        height: '500px',
    };
    var locationUser = { lat: 10, long: 10 };
    function getLocation(pos) {
        localStorage.setItem('lat', pos.coords.latitude);
        localStorage.setItem('long', pos.coords.longitude);
        //console.log('ss', locationUser);
        //return lat, long;
    }
    navigator.geolocation.getCurrentPosition(getLocation);
    //getLocation();
    locationUser.lat = localStorage.getItem('lat');
    locationUser.long = localStorage.getItem('long');
    console.log('ss', locationUser);

    console.log(Object.values(locationUser));
    const positions = [
        {
            lat: 10.027763,
            lng: 105.83416,
            label: 'position 1',
        },
        {
            lat: 10.027763,
            lng: 106,
            label: 'position 2',
        },
        {
            lat: 10.127763,
            lng: 106.1,
            label: 'position 3',
        },
        {
            lat: 10.027763,
            lng: 105.83416,
            label: 'position 1',
        },
    ];
    const optionsPolyline = {
        strokeColor: 'red',
        strokeOpacity: 0.8,
        strokeWeight: 3,
        fillColor: '#085daa',
        fillOpacity: 0.35,
        clickable: false,
        draggable: false,
        editable: false,
        visible: true,
        radius: 30000,
        zIndex: 1,
    };
    const [akey, setakey] = useState(0);
    //setTimeout(() => setakey(Math.floor(Math.random() * 10)), 10000000);
    return (
        <div>
            {locationUser.lat}-{locationUser.long}
            <GoogleMap
                zoom={15}
                center={{ lat: parseFloat(locationUser.lat), lng: parseFloat(locationUser.long) }}
                mapContainerStyle={containerStyle}
            >
                <Marker key={{ akey }} position={{ lat: props.lat, lng: props.long }}></Marker>
            </GoogleMap>
        </div>
    );
}

export default MapLo;
