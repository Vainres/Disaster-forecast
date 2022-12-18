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
              return storm.DisasterTime.map((eye,ind)=>
              {
                if(ind+1<storm.DisasterTime.length)
                {
                  let type=0
                  return eye.Orbit.map((data,index)=>
                  {
                    let angl=angleCal(eye,storm.DisasterTime[ind+1]);
                    let arr1 = drawCircle(eye.position,data.range/1609.344,-1,angl,64);
                    let arr2 = drawCircle(storm.DisasterTime[ind+1].position,
                                          storm.DisasterTime[ind+1].Orbit[index].range/1609.344,1,angl,64);
                    let fin =[...arr1,...arr2.reverse()];
                    let bermudaTriangle = new window.google.maps.Polygon({path:fin});

                    if(window.google.maps.geometry.poly.containsLocation(convertToLatLng(marker.point_id),bermudaTriangle))
                      if(type<data.type){
                        listInside.push({Orbit:data,eye:eye,storm:storm});
                        type=data.type
                      }
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
                        <p style={{textAlign:"center"}}>{convertToLatLng(marker.point_id).lat.toFixed(4)}:{convertToLatLng(marker.point_id).lng.toFixed(4)}</p>
                        <br/>

                        {
                        listStormInside.length>0&&listStormInside.map((stormIn)=><div>
                            <div>Vị trí này nằm trong bão {stormIn.storm.name}</div>
                            <div>Vị trí {AlertMessage[Number(stormIn.Orbit.type)-1]}</div>{console.log('type',Number(stormIn.Orbit)-1)}
                            </div>)
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


const AlertMessage =['Có ảnh hưởng','Nguy hiểm','Cực kỳ nguy hiểm'];