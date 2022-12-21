import { GoogleMap, MarkerF, Polyline,Polygon ,Circle,InfoWindow,DirectionsRenderer, CircleF} from '@react-google-maps/api';
import { React,useState,useMemo,useCallback ,useRef, useEffect,} from 'react';
import styles from './Map.module.scss';
import classNames from 'classnames/bind';
import FullStorm from '../../components/FullStorm';
import Marker from '../../components/Marker';
import Popup from "reactjs-popup";



const cx = classNames.bind(styles);

export default function MapLo({AllStormData,locationUser,addMark=()=>{} ,setMapRef=()=>{},center={lat:0,lng:0}},reRenderMap) {

    const mapRef = useRef();
    const [rightClickLocation,setRightClickLocation] = useState(null);
    const [directions,setDirections] = useState();
    const [counter,setCounter] = useState(0);

    const containerStyle = useMemo(() => ({
        width: '100%',
        height: '100%',
    }),[]);

    const options = useMemo(
        () => ({
          mapId: "b181cac70f27f5e6",
          disableDefaultUI: true,
          clickableIcons: false,
        }),
        []
      );
    const onMark = useCallback((onc,close) => {
        let textName=document.getElementById("markerInputField").value;
        let newMarker = rightClickLocation;
        newMarker.name=textName;

        console.log(newMarker);
        addMark(newMarker);
        close(onc);
        setRightClickLocation(null);
    })

    const onLoad = useCallback((map) =>  {  mapRef.current = map;
                                            console.log('mapref',mapRef);
                                            setMapRef(map);
                                            reRenderMap=setCounter;
                                        },[]);
    return (
        <div className={cx('wrapper')}>
            <GoogleMap
              key={counter}
                zoom={8}
                center={center}
                mapContainerStyle={containerStyle}
                options = {options}
                onLoad={onLoad}
                onRightClick={(e)=>{setRightClickLocation({point:{lat:e.latLng.lat() ,long:e.latLng.lng(),lng:e.latLng.lng()},name:'New marker'})}}
            > 
                {rightClickLocation&& <InfoWindow   options={{backgroundColor:'black'}}
                                                    position={rightClickLocation.point} 
                                                    onCloseClick={()=> setRightClickLocation(null)} >
                  <div>
                    {rightClickLocation.point.lat.toFixed(4)}-{rightClickLocation.point.long.toFixed(4)}<br/>
                    <Popup modal trigger={<button className={cx('infomenu')} >Mark this</button>}>
                      {(close)=>

                              <div className={cx("cookiesContent")} id="cookiesPopup">
                                <button className={cx("close")} onClick={close}>✖</button>
                                <label >Marker Name</label>

                                <input type="input" className={cx("form__field")} placeholder="New Marker" 
                                  id='markerInputField' defaultValue='New Marker' required />
                                <button  className={cx("accept")} onClick={(onc)=>{onMark(onc,close)}}>Add</button>

                              </div>
                      }
                    </Popup>

                  </div>
                </InfoWindow>}

                {directions && <Polyline path={directions}/> }

                <MarkerF position={center} 
                
                icon={{
                  url: "https://cdn-icons-png.flaticon.com/512/4781/4781517.png", // url
                  scaledSize: new window.google.maps.Size(40, 40)}}
                />

                {AllStormData.map((storm,keyID) => { if(!storm.active) return;
                                                    return <FullStorm  key={keyID} StormData={storm}/>})
                }
                {locationUser.map((marker,id)=>{
                                                if(!marker.active) return;
                                                return <Marker marker={marker} key={id} AllStormData={AllStormData}
                                                        />  })}
            </GoogleMap>

        </div>
    );
}

const defaultOptions = {
    strokeOpacity: 0.5,
    strokeWeight: 2,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
  };
  const safeOptions = {
    ...defaultOptions,
    zIndex: 1,
    fillOpacity: 0.05,
    strokeColor: "#8BC34A",
    fillColor: "#8BC34A",
  };
  const neutralOptions = {
    ...defaultOptions,
    zIndex: 2,
    fillOpacity: 0.05,
    strokeColor: "#FBC02D",
    fillColor: "#FBC02D",
  };
  const dangerOptions = {
    ...defaultOptions,
    zIndex: 3,
    fillOpacity: 0.05,
    strokeColor: "#FF5252",
    fillColor: "#FF5252",
  };
//   icon="https://static.wikia.nocookie.net/gensin-impact/images/6/6f/Enemy_Eye_of_the_Storm_Icon.png"