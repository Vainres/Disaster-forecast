
import * as FaIcon from 'react-icons/fa'
import * as AiIcon from 'react-icons/ai'

import classNames from 'classnames/bind';
import styles from "./MenuItem.module.scss"
import { useCallback, useState,useRef } from 'react';
const cx = classNames.bind(styles);




export default function Item({  name,
                                detail,
                                location,
                                onLocationClick=()=>{},
                                active,
                                onNameClick=()=>{},
                                stormID,
                                ismarker=false,
                                onDeleteClick=()=>{},
                                itemID=null
                            })
{
    const [activeItem,setActiveItem] = useState(active);
    var cln=cx('iteminfo');
    let clnMenu=cx('item');
    if(ismarker) clnMenu=cx('itemMarker');
    if(activeItem) {cln=cx('iteminfo','active')}
    function handleClickItem() {
        onNameClick(stormID);
        setActiveItem(!activeItem);
    }
    return (
            <div className={clnMenu}>
                <div className={cln} onClick={handleClickItem}>
                    <div className={cx('itemname')} >{name}</div>
                    <div className={cx('itemdetail')} > {detail}</div>
                </div>
                <div className={cx('location')} onClick={()=>onLocationClick(location)}><FaIcon.FaMapMarkerAlt size={20} className={cx('icon')}/></div>
                {ismarker&&<div className={cx('location')} onClick={()=>onDeleteClick(itemID)}><AiIcon.AiOutlineDelete size={20} className={cx('icon')}/></div>}

            </div>
    );
}
