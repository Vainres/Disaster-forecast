import { MarkerF,Circle,InfoWindow} from '@react-google-maps/api';
import { React,useState,useMemo,useCallback ,useRef, useEffect,} from 'react';




export default function Storm({storm,name}){

    const [displayDetail,setDisplayDetail] = useState(false);


    return (
        <div>
            <MarkerF position={storm.position} onClick={()=> setDisplayDetail(!displayDetail)} icon={{
                                                                                                      url: "https://static.wikia.nocookie.net/gensin-impact/images/6/6f/Enemy_Eye_of_the_Storm_Icon.png", // url
                                                                                                      scaledSize: new window.google.maps.Size(30, 30)}}>
              {displayDetail && <InfoWindow position={storm.position}>
                <span>
                  {name}

                  {storm.label}
                </span>
              </InfoWindow>}
            </MarkerF>
            {/* {
                storm.orbit.map((data,index)=>{
                                                return <Circle center={storm.position} 
                                                              radius={data.radius} 
                                                              options={Options[storm.orbit.length-index-1]}/>})
            } */}

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
  fillOpacity: 0.2,
  strokeColor: "#8BC34A",
  fillColor: "#8BC34A",
};
const neutralOptions = {
  ...defaultOptions,
  zIndex: 2,
  fillOpacity: 0.2,
  strokeColor: "#FBC02D",
  fillColor: "#FBC02D",
};
const dangerOptions = {
  ...defaultOptions,
  zIndex: 3,
  fillOpacity: 0.2,
  strokeColor: "#FF5252",
  fillColor: "#FF5252",
};
const extremelyDangerousOptions = {
  ...defaultOptions,
  zIndex: 4,
  fillOpacity: 0.05,
  strokeColor: "#6c04aa",
  fillColor: "#6c04aa",
};
const Options = [safeOptions,neutralOptions,dangerOptions,extremelyDangerousOptions];