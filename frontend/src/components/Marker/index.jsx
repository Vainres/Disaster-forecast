import { drawCircle,angleCal } from '../../components/helper';
import { MarkerF, Polyline,Polygon ,Circle,InfoWindow} from '@react-google-maps/api';
import { React,useState,useMemo,useCallback ,useRef, useEffect,} from 'react';

export default function Marker({marker,AllStormData=[]})
{
    const [displayInfo,setDisplayInfo] = useState(false);
    const listStormInside = useMemo(()=>{
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
                    let bermudaTriangle = new window.google.maps.Polygon({path:fin});
                    if(window.google.maps.geometry.poly.containsLocation(marker.position,bermudaTriangle))
                      listInside.push({orbit:data,eye:eye,storm:storm});
                  })
                }
              })
            })
        return listInside
    },[])

    return(
        <div>
            {displayInfo&& <InfoWindow   options={{backgroundColor:'black'}}
                                                        position={marker.position} 
                                                        onCloseClick={()=> setDisplayInfo(false)} >
                    <div>
                        {marker.position.lat.toFixed(4)}:{marker.position.lng.toFixed(4)}<br/>

                        {
                        listStormInside.length>0&&
                            <div>{listStormInside[0].orbit.radius}</div>
                        }
                    </div>
                    </InfoWindow>}

            <MarkerF 
            position={marker.position} 
            onClick = {()=> setDisplayInfo(true)}
            key={'MarkerF '}
            />
        </div>
    );
}