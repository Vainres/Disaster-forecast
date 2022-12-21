import { drawCircle,angleCal,convertToLatLng} from '../../components/helper';
import { MarkerF, Polyline,Polygon ,Circle,InfoWindow} from '@react-google-maps/api';
import { React,useState,useMemo,useCallback ,useRef, useEffect,} from 'react';
import Request from '~/utils/requests';

export default function Marker({marker,AllStormData=[]})
{
    const request = new Request();
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
                  let INDD = 0
                  let shit = eye.Orbit.map((data,index)=>
                  {
                    let angl=angleCal(eye,storm.DisasterTime[ind+1]);
                    let arr1 = drawCircle(eye.position,data.range/1609.344,-1,angl,64);
                    let arr2 = drawCircle(storm.DisasterTime[ind+1].position,
                                          storm.DisasterTime[ind+1].Orbit[index].range/1609.344,1,angl,64);
                    let fin =[...arr1,...arr2.reverse()];
                    let bermudaTriangle = new window.google.maps.Polygon({path:fin});
                    let Dat = new Date();
                    if(window.google.maps.geometry.poly.containsLocation(convertToLatLng(marker.point_id),bermudaTriangle)
                    && Dat.getTime()< Date.parse(storm.DisasterTime[ind+1].Time)
                    )

                      if(type<data.type){
                        INDD = index
                        type=data.type
                      }
                  })
                  if(type!=0)
                  listInside.push({Orbit:eye.Orbit[INDD],eye:eye,storm:storm,Time:storm.DisasterTime[ind+1].Time});

                }

              })
            })

            
        return listInside
    },[])
    useEffect(()=>{
      listStormInside.map((stormIn)=>{
        let Dat = new Date();
        let dates=(Date.parse(stormIn.Time)-Dat.getTime())/86400000;
        let postData = {
          title:"Bạn đang trong vùng " +AlertMessage[Number(stormIn.Orbit.type)-1] +" của bão "+stormIn.storm.name,
          content:"Ở vị trí marker: "+marker.namelocation+". Bão sẽ đến trong vòng " +Math.floor(dates)
          +" ngày tới. Hãy di chuyển đến nơi an toàn có thể.",
          isread:0,
          ispass:0,
          important:Number(stormIn.Orbit.type)
        }
        console.log(postData);

        request.Post('user/noti',postData,(res) => {
          if (res.status === 201) {
              console.log(res.data);
          } else {
          }
        });
      })
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
                            <div>Vị trí {AlertMessage[Number(stormIn.Orbit.type)-1]}</div>{console.log('type',Number(stormIn.Orbit.type)-1)}
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