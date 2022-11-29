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
        console.log('mapset');

        mapRef.current = map;
    },[])

    const navigate = useCallback((location)=>mapRef.current.panTo(location),[])


    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);


    navigator.geolocation.getCurrentPosition(getLocation);
    const [locationUser,setLocationUser] = useState({ lat: Number(localStorage.getItem('lat')), lng: Number(localStorage.getItem('long')) });
    
    const StormData = useRef(myData.map( data => ({...data,active:false})));
    const [StormRender,setStormRender] = useState(StormData.current);
    const Rerender = useRef(false);

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyCZ-1P31RBKjlgL1UA2SYJ1KypcCg1Pdqs",
        libraries: ["places"],
      });



    useEffect(()=>{
        if(Rerender.current)
        {
            console.log('rerender');

            Rerender.current=false;
            setStormRender(StormData.current);
        }
    })

    const StormDisplay = (id)=>{
        console.log(StormRender);
        StormData.current[id].active=!StormData.current[id].active;
        Rerender.current=true;
        setStormRender(StormData.current);

    };

    const addMark = useCallback((ar) => {
        setLocationUser(ar);
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
                    <div className={cx('stormlist')}>


                    </div>
                  </div>

            </div>

            <div className={cx('map-container')} >
                <MapLo key={"AIzaSyCZ-1P31RBKjlgL1UA2SYJ1KypcCg1Pdqs"} className={cx('map')} StormData={StormRender} locationUser={locationUser} addMark ={addMark} setMapRef={setMapRef}/>
            </div>
        </div>
    );
}
export default Home;