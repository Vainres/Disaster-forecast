import { Polygon } from '@react-google-maps/api';
import { useCallback } from 'react';

import Storm from '~/components/Storm';
import { drawCircle,angleCal } from '../../components/helper';






export default function FullStorm({StormData})
{
    


    

    const aPath = useCallback((EyeA,EyeB)=>{
        let angl=angleCal(EyeA,EyeB);
        const lon = EyeA.Orbit.length;
        return EyeA.Orbit.map((data,index)=>{
            let arr1 = drawCircle(EyeA.position,EyeA.Orbit[index].range/1609.344,-1,angl);
            let arr2 = drawCircle(EyeB.position,EyeB.Orbit[index].range/1609.344,1,angl);
            let fin =[...arr1,...arr2.reverse()];
            return <Polygon paths={fin}  options={Options[lon-index-1]}/>
        });

    },[]);

    
    return(<div>
        {
            StormData.DisasterTime.map((data,index)=>{
                if(index<StormData.DisasterTime.length-1){
                    return <div key={index}>
                        {aPath(data,StormData.DisasterTime[index+1])}
                    </div>;
                }
            })

            
        }
        {
            StormData.DisasterTime.map((data,index)=>{
                    return <Storm key={'Storm'+index} storm={data} name={StormData.name}/>})
        }
    </div>);
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
    zIndex: 1,
    fillOpacity: 0.2,
    strokeColor: "#8BC34A",
    fillColor: "#8BC34A",
  };
  const neutralOptions = {
    ...defaultOptions,
    zIndex: 2,
    fillOpacity: 0.2,
    strokeColor: "#FBC02D",
    fillColor: "#FBC02D",
  };
  const dangerOptions = {
    ...defaultOptions,
    zIndex: 3,
    fillOpacity: 0.2,
    strokeColor: "#FF5252",
    fillColor: "#FF5252",
  };
  const extremelyDangerousOptions = {
    ...defaultOptions,
    zIndex: 4,
    fillOpacity: 0.05,
    strokeColor: "#6c04aa",
    fillColor: "#6c04aa",
  };
const Options = [safeOptions,neutralOptions,dangerOptions,extremelyDangerousOptions];