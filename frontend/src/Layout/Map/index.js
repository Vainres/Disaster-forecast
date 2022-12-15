import { GoogleMap, MarkerF, Polyline,Polygon ,Circle,InfoWindow,DirectionsRenderer, CircleF} from '@react-google-maps/api';
import { React,useState,useMemo,useCallback ,useRef, useEffect,} from 'react';
import styles from './Map.module.scss';
import classNames from 'classnames/bind';
import FullStorm from '../../components/FullStorm';
import Marker from '../../components/Marker';

import { drawCircle,angleCal } from '../../components/helper';
const cx = classNames.bind(styles);

export default function MapLo({AllStormData,locationUser,addMark=()=>{} ,setMapRef=()=>{},}) {

    
    const mapRef = useRef();
    const [markerList,setMarkerList] = useState(locationUser);
    const [rightClickLocation,setRightClickLocation] = useState(null);

    const [directions,setDirections] = useState();
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
    const onMark = useCallback(() => {
        const subLi = markerList;
        subLi.push(rightClickLocation);
        console.log(subLi);
        addMark(subLi)
        setRightClickLocation(null);
    })
  
  const fetchDirection = useCallback((currentPosition) => {
      let listInside =[];
      AllStormData.map((storm)=>
          {
            return storm.data.map((eye,ind)=>
            {
              if(ind+1<storm.data.length)
              {
                return eye.orbit.map((data,index)=>
                {
                  let angl=angleCal(eye,storm.data[ind+1]);
                  let arr1 = drawCircle(eye.position,data.radius/1609.344,-1,angl,64);
                  let arr2 = drawCircle(storm.data[ind+1].position,storm.data[ind+1].orbit[index].radius/1609.344,1,angl,64);
                  let fin =[...arr1,...arr2.reverse()];
                  var bermudaTriangle = new window.google.maps.Polygon({path:fin});
                  if(window.google.maps.geometry.poly.containsLocation(currentPosition,bermudaTriangle))
                    listInside.push({orbit:data,eye:eye,storm:storm});
                })
              }
            })
          })
      console.log(listInside);
    },[])

    const onLoad = useCallback((map) =>  {  mapRef.current = map;
                                            console.log('mapref',mapRef);
                                            setMapRef(map);
                                        },[]);
    return (
        <div className={cx('wrapper')}>
            <GoogleMap
                zoom={8}
                center={locationUser[0].position}
                mapContainerStyle={containerStyle}
                options = {options}
                onLoad={onLoad}
                onRightClick={(e)=>{setRightClickLocation({position:{lat:e.latLng.lat() ,lng:e.latLng.lng()},active:true})}}
            > 
                {rightClickLocation&& <InfoWindow   options={{backgroundColor:'black'}}
                                                    position={rightClickLocation.position} 
                                                    onCloseClick={()=> setRightClickLocation(null)} >
                  <div>
                    {rightClickLocation.position.lat.toFixed(4)}-{rightClickLocation.position.lng.toFixed(4)}<br/>
                    <button className={cx('infomenu')} style={{width:'100%'}}
                    onClick={onMark}>Mark this</button>
                  </div>
                </InfoWindow>}

                {directions && <Polyline path={directions}/> }

                {markerList.map((marker,id)=>{  if(!marker.active) return;
                                                return <Marker marker={marker} AllStormData={AllStormData}
                                                        />  })}
                                                        

                {AllStormData.map((storm,keyID) => { if(!storm.active) return;
                                                    return <FullStorm StormData={storm}/>})
                }
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