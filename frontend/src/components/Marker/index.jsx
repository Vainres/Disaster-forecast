import { drawCircle,angleCal,convertToLatLng} from '../../components/helper';
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
                    if(window.google.maps.geometry.poly.containsLocation(convertToLatLng(marker.point_id),bermudaTriangle))
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
                                                        position={convertToLatLng(marker.point_id)} 
                                                        onCloseClick={()=> setDisplayInfo(false)} >
                    <div>
                        <h3 style={{textAlign:"center"}}>{marker.namelocation}</h3>
                        {convertToLatLng(marker.point_id).lat.toFixed(4)}:{convertToLatLng(marker.point_id).lng.toFixed(4)}<br/>

                        {
                        listStormInside.length>0&&
                            <div>{listStormInside[0].orbit.radius}</div>
                        }
                    </div>
                    </InfoWindow>}

            <MarkerF 
            position={convertToLatLng(marker.point_id)} 
            onClick = {()=> setDisplayInfo(true)}
            key={'MarkerF '}
            />
        </div>
    );
}