import MapLo from '~/Layout/Map';
import {useLoadScript} from "@react-google-maps/api";
import styles from "./Home.module.scss"
import classNames from 'classnames/bind';
import { useCallback, useState,useRef, useEffect } from 'react';
import Places from '~/components/Places';
import myData from './stormdata.json';
import ReactDatePicker from '../../components/ReactDatePicker'
import * as FaIcon from 'react-icons/fa'
import * as BsIcon from 'react-icons/bs'
import * as AiIcon from 'react-icons/ai'

import Item from '../../components/MenuItem'


const cx = classNames.bind(styles);



function Home() {
    const getLocation = useCallback((pos) => {
        localStorage.setItem('lat', pos.coords.latitude);
        localStorage.setItem('long', pos.coords.longitude);
    },[])
    
    const mapRef = useRef();


    const setMapRef = useCallback((map)=>{
        mapRef.current = map;
    },[])

    const navigate = useCallback((location)=>mapRef.current.panTo(location),[])


    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);


    navigator.geolocation.getCurrentPosition(getLocation);
    const MarkerList = useRef([{    position:{   
                                                lat: Number(localStorage.getItem('lat')),
                                                lng: Number(localStorage.getItem('long'))
                                            },
                                    active:true}])
    const [locationUser,setLocationUser] = useState(MarkerList.current);
    
    const StormData = useRef(myData.map( data => ({...data,active:false})));
    const [StormRender,setStormRender] = useState(StormData.current);
    const countState = useRef(0);
    const [GoogleKey,setGoogleKey] = useState(countState.current);

    const liB= useRef(["places","geometry"]);
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyCZ-1P31RBKjlgL1UA2SYJ1KypcCg1Pdqs&libraries=geometry",
        libraries: liB.current,
      });




    const StormDisplay = (id)=>{
        StormData.current[id].active=!StormData.current[id].active;
        setStormRender(StormData.current);
        countState.current=countState.current+1;
        setGoogleKey(countState.current);

    };
    const MarkerDisplay = (id)=>{
        MarkerList.current[id].active=!MarkerList.current[id].active;
        setLocationUser(MarkerList.current);
        countState.current=countState.current+1;
        setGoogleKey(countState.current);

    };
    const addMark = useCallback((ar) => {
        console.log(ar,GoogleKey);
        setLocationUser(ar);
        countState.current=countState.current+1;
        setGoogleKey(countState.current);

    },[])


    if (!isLoaded) return <div>Loading...</div>;
    return ( 
        <div className={cx('container')}>
            <div className={cx('controls')}  >
                <AiIcon.AiOutlineFileSearch className={cx('icon')} size={20}/>
                <Places 
                    setLocationUser={(position) => setLocationUser(position)}
                />

                <FaIcon.FaCalendarTimes className={cx('icon')} size={18}/>
                <div className={cx('extendmenu')}>
                    <ReactDatePicker  value={startDate} setValue={setStartDate}/>
                    <ReactDatePicker  value={endDate} setValue={setEndDate} />
                </div>

                <BsIcon.BsTropicalStorm size={20} className={cx('icon')}/>
                 <div className={cx('itemwrapper')} > 
                    <div className={cx('button')}> Storm List </div>
                    <div className={cx('stormlist')}>
                        {StormData.current.map((item,index)=> <Item 
                                                        name={item.name} 
                                                        detail={item.startTime} 
                                                        key={index}
                                                        location={item.data[0].position} 
                                                        onLocationClick={navigate}
                                                        active={item.active}
                                                        onNameClick={StormDisplay}
                                                        stormID={index}
                                                        /> )}


                    </div>
                  </div>
                
                <FaIcon.FaMapMarkerAlt size={20} className={cx('icon')}/>
                <div className={cx('itemwrapper')} > 
                    <div className={cx('button')}> Marker List </div>
                    <div className={cx('stormlist')  }>
                        {locationUser.map((item,index)=><Item
                                                        name={index}
                                                        detail={item.position.lat.toFixed(4)+" "+item.position.lng.toFixed(4)} 
                                                        key={index}
                                                        gg={GoogleKey}
                                                        location={item.position} 
                                                        onLocationClick={navigate}
                                                        active={item.active}
                                                        onNameClick={MarkerDisplay}
                                                        stormID={index}
                                                        />)}

                    </div>
                  </div>

            </div>

            <div className={cx('map-container')} >
                <MapLo  key={"AIzaSyCZ-1P31RBKjlgL1UA2SYJ1KypcCg1Pdqs"}
                        className={cx('map')} 
                        AllStormData={StormRender} 
                        locationUser={locationUser} 
                        addMark ={addMark} 
                        setMapRef={setMapRef}/>
            </div>
        </div>
    );
}
export default Home;