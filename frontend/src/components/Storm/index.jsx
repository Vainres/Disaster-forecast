import { MarkerF,Circle,InfoWindow} from '@react-google-maps/api';
import { React,useState,useMemo,useCallback ,useRef, useEffect,} from 'react';




export default function Storm({storm}){

    const [displayDetail,setDisplayDetail] = useState(false);


    return (
        <div>
            <MarkerF position={storm.position} onClick={()=> setDisplayDetail(!displayDetail)} icon={{
                                                                                                      url: "https://static.wikia.nocookie.net/gensin-impact/images/6/6f/Enemy_Eye_of_the_Storm_Icon.png", // url
                                                                                                      scaledSize: new window.google.maps.Size(30, 30)}}>
              {displayDetail && <InfoWindow position={storm.position}>
                <span>
                  <button>mark this</button>
                
                </span>
              </InfoWindow>}
            </MarkerF>
            <Circle center={storm.position} radius={storm.radius1} options={dangerOptions}/>
            <Circle center={storm.position} radius={storm.radius2} options={neutralOptions}/>
            <Circle center={storm.position} radius={storm.radius3} options={safeOptions}/>
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
  zIndex: 3,
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
  zIndex: 1,
  fillOpacity: 0.05,
  strokeColor: "#FF5252",
  fillColor: "#FF5252",
};