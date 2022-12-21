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
import Request from '~/utils/requests';
import { drawCircle,angleCal,convertToLatLng} from '../../components/helper';

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
    const MarkerList = useRef([]);
    const center = useRef({   
                                                lat: Number(localStorage.getItem('lat')),
                                                lng: Number(localStorage.getItem('long'))
                                            })
    const request = new Request();
    const StormData = useRef([]);
    const [StormRender,setStormRender] = useState(StormData.current);

    const [locationUser,setLocationUser] = useState([]);
    const countState = useRef(0);
    const [GoogleKey,setGoogleKey] = useState(countState.current);
    
    const liB= useRef(["places","geometry"]);
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyDPro3AYHJw9GatrlmRRTz7DjztX3YCtwQ&libraries=geometry",
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
        request.Post('user/addlocation',ar,(res) => {
                if (res.status === 201) {
                    request.Get('user/location',[],(res) => {
                            if (res.status === 200) { 
                                MarkerList.current=res.data.data.map(data=>({...data,active:true}));
                                setLocationUser(MarkerList.current);
                            } else {
                            }
                        });
                } else {
                }
            });
        countState.current=countState.current+1;
        setGoogleKey(countState.current);

    },[])
    
    const deleteMark = useCallback((id) => {

        if(window.confirm('Do you want to delete marker?'))
            request.Post('user/deletelocation',{"id":id},(res) => {
                    if (res.status === 201) {
                        request.Get('user/location',[],(res) => {
                                if (res.status === 200) { 
                                    MarkerList.current=res.data.data.map(data=>({...data,active:true}));
                                    setLocationUser(MarkerList.current);
                                } else {
                                }
                            });
                    } else {
                    }
                });
                countState.current=countState.current+1;
                setGoogleKey(countState.current);
                
            },[])

    const reRenderMap = useRef();

    useEffect(() => {

        
        let postData =[];
        if(startDate&&endDate)
        {
            let part1 = startDate.getMonth()<9?'0'+(startDate.getMonth()+1):startDate.getMonth()+1;
            let part2 = startDate.getDate()<9?'0'+startDate.getDate():startDate.getDate();
            let part3 = endDate.getMonth()<9?'0'+(endDate.getMonth()+1):endDate.getMonth()+1;
            let part4 = endDate.getDate()<9?'0'+endDate.getDate():endDate.getDate();
            postData={
                data:{
                    startTime:startDate.getFullYear()+"-"+part1+"-"+part2,
                    endTime:endDate.getFullYear()+"-"+part3+"-"+part4
                }
            }
        }
        request.Post('storm',postData,(res) => {
            if (res.status === 200) {
                StormData.current=res.data.data.map(data=>({...data,active:false}));

                setStormRender(StormData.current);
                
            } else {
            }
        });

        request.Get('user/location',[],(res) => {
            if (res.status === 200) {
                MarkerList.current=res.data.data.map(data=>({...data,active:true}));
                setLocationUser(MarkerList.current);
            } else {
            }
        });
        countState.current=countState.current+1;
        setGoogleKey(countState.current);
    }, [startDate,endDate]);


    if (!isLoaded) return <div>Loading...</div>;
    return ( 
        <div className={cx('container')}>
            <div className={cx('controls')}  >
                <AiIcon.AiOutlineFileSearch className={cx('icon')} size={20}/>
                <Places 
                    setLocationUser={(position) => navigate(position)}
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
                                                        location={item.DisasterTime[0].position} 
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
                    <div className={cx('stormlist')} style={{right:-223}}>
                        {locationUser.map((item,index)=><Item
                                                        name={item.namelocation}
                                                        detail={item.point_id.X.toFixed(4)+" "+item.point_id.Y.toFixed(4)} 
                                                        key={index}
                                                        gg={GoogleKey}
                                                        location={convertToLatLng(item.point_id)} 
                                                        onLocationClick={navigate}
                                                        active={item.active}
                                                        onNameClick={MarkerDisplay}
                                                        stormID={index}
                                                        ismarker={true}
                                                        onDeleteClick={deleteMark}
                                                        itemID={item.id}
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
                        setMapRef={setMapRef}
                        center={center.current}
                        reRenderMap={reRenderMap.current}/>
            </div>
        </div>
    );
}
export default Home;