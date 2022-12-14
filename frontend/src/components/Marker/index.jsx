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
          title:"B???n ??ang trong v??ng " +AlertMessage[Number(stormIn.Orbit.type)-1] +" c???a b??o "+stormIn.storm.name,
          content:"??? v??? tr?? marker: "+marker.namelocation+". B??o s??? ?????n trong v??ng " +Math.floor(dates)
          +" ng??y t???i. H??y di chuy???n ?????n n??i an to??n c?? th???.",
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
                            <div>V??? tr?? n??y n???m trong b??o {stormIn.storm.name}</div>
                            <div>V??? tr?? {AlertMessage[Number(stormIn.Orbit.type)-1]}</div>{console.log('type',Number(stormIn.Orbit.type)-1)}
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


const AlertMessage =['C?? ???nh h?????ng','Nguy hi???m','C???c k??? nguy hi???m'];