import { GoogleMap, MarkerF, Polyline,Polygon ,Circle,InfoWindow,DirectionsRenderer} from '@react-google-maps/api';
import { React,useState,useMemo,useCallback ,useRef, useEffect,} from 'react';
import styles from './Map.module.scss';
import classNames from 'classnames/bind';
import Storm from '~/components/Storm';

const cx = classNames.bind(styles);

export default function MapLo({StormData,locationUser,addMark=()=>{} ,setMapRef=()=>{} }) {
    const [stormData,setStormData] = useState(StormData);
  
    const mapRef = useRef();
    const [markerList,setMarkerList] = useState([locationUser]);
    const [rightClickLocation,setRightClickLocation] = useState(null);
    const [directions,setDirections] = useState();
    const containerStyle = useMemo(() => ({
        width: '100%',
        height: '100%',
    }),[]);

    const onRightClick = useCallback((map) =>  {mapRef.current = map;console.log('mapref',mapRef)},[]);
    
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
        const subMa = rightClickLocation;
        subLi.push(subMa);
        addMark(subMa)
        setRightClickLocation(null);
    })
  
    const fetchDirection = useCallback((StormData,currentPosition) => {
        setDirections([StormData[0].position,currentPosition]);
        
    })

    const onLoad = useCallback((map) =>  {  mapRef.current = map;
                                            console.log('mapref',mapRef);
                                            setMapRef(map);},[]);
    return (
        <div className={cx('wapper')}>
            <GoogleMap
                zoom={8}
                center={locationUser}
                mapContainerStyle={containerStyle}
                options = {options}
                onLoad={onLoad}
                onRightClick={(e)=>{setRightClickLocation({lat:e.latLng.lat() ,lng:e.latLng.lng()})}}
            >
                {rightClickLocation&& <InfoWindow position={rightClickLocation} onCloseClick={()=> setRightClickLocation(null)} >
                <span>
                  <button  onClick={onMark}>mark this</button>
                
                </span>
              </InfoWindow>}
                
                {directions && <Polyline path={directions}/> }

                {markerList.map((location)=><MarkerF position={location} onClick = {()=> fetchDirection(stormData,location)}/>  )}
                {Object.keys(stormData).length>0 && stormData.map((storm) => {
                                                                                console.log('ready',storm);
                                                                                if(storm.active)
                                                                                return storm.data.map(stormpoint=><Storm storm={stormpoint}/>)
                }) } 
            </GoogleMap>

        </div>
    );
}


//   icon="https://static.wikia.nocookie.net/gensin-impact/images/6/6f/Enemy_Eye_of_the_Storm_Icon.png"