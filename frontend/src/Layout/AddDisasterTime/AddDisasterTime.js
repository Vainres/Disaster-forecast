import styles from './AddDisaster.module.scss';
import classNames from 'classnames/bind';
import React, { useState } from 'react';
import Button from '~/components/Button';
import Input from '~/components/Input';
import request from '~/utils/request';
import { DatePicker, DateTimePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import TextField from '@mui/material/TextField';
import { fontSize } from '@mui/system';

const cx = classNames.bind(styles);

function AddDisasterTime({ close, funsub = () => {} }) {
    const [info, setinfo] = useState({ name: '', time: '', level: '', country: '', lat: '', long: '' });
    const [msg, setmsg] = useState('Thêm');
    const AddNewDisaster = () => {
        request
            .post(
                `admin/add?name=${info.name}&time=${info.time}&level=${info.level}
            &country=${info.country}&lat=${info.lat}&long=${info.long}`,
            )
            .then((res) => {
                if (res.data.code === '200') {
                } else {
                }
            })
            .catch((e) => {
                console.log(e);
            });
        setmsg('Đã Thêm');
        funsub(info.email);
    };
    // -------------------Tạo list chi tiết bão-------------
    const [inputList, setinputList] = useState([{ range: '', windspeed: '', type: '' }]);

    const handleinputchange = (e, index) => {
        const { name, value } = e.target;
        const list = [...inputList];
        list[index][name] = value;
        setinputList(list);
    };
    //---------------------Thêm list------------------
    const handleaddclick = () => {
        setinputList([...inputList, { range: '', windspeed: '', type: '' }]);
    };

    //---------------------Xóa 1 list-------------------
    const handleDelete = (index) => {
        const list = [...inputList];
        list.splice(index, 1);
        setinputList(list);
    };

    return (
        <div className={cx('modal')}>
            <a className={cx('close')} onClick={close}>
                &times;
            </a>
            <div className={cx('header')}> Thêm Mốc Thời Gian Thiên Tai </div>
            <div className={cx('cxcontent')}>
                <div className={cx('wapper')}>
                    {/* <h2 className={cx('title')}>Thêm Quản Trị</h2> */}
                    <LocalizationProvider className={cx('padding10dt')} dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                            className={cx('datetimepicker')}
                            label="Ngày:"
                            onChange={(value) => {
                                console.log(value);
                            }}
                            renderInput={(params) => (
                                <TextField
                                    sx={{
                                        '& .MuiInputBase-input': {
                                            height: '30px',
                                            fontSize: '16px',
                                            fontWeight: '700',
                                            padding: '6px',
                                            borderRadius: '4px',
                                            //border: ' 2px solid black',
                                            //margin: '0px 54px',
                                        },
                                        '&': {
                                            height: '44px',
                                            border: ' 2px solid black',
                                            margin: '5px 54px',
                                            fontSize: '16px',
                                        },
                                        '&:focus': {
                                            height: '44px',
                                            border: ' 2px solid black',
                                            margin: '5px 54px',
                                            fontSize: '16px',
                                        },
                                        '& >label': {
                                            backgroundColor: 'white',
                                            color: 'black',
                                            fontSize: '16px',
                                            fontWeight: '700',
                                        },
                                    }}
                                    {...params}
                                ></TextField>
                            )}
                        />
                    </LocalizationProvider>
                    <Input
                        name="level"
                        title="Level"
                        placeholder="Cấp bão, hãy nhập 1 số"
                        forpopup
                        onChange={(e) => {
                            setmsg('Thêm');
                            setinfo((pre) => ({ ...pre, level: e.target.value }));
                        }}
                    ></Input>
                    <Input
                        name="country"
                        title="Country"
                        placeholder="Địa điểm xảy ra bão"
                        forpopup
                        onChange={(e) => {
                            setmsg('Thêm');
                            setinfo((pre) => ({ ...pre, country: e.target.value }));
                        }}
                    ></Input>
                    <Input
                        name="lat"
                        title="Lat"
                        placeholder="Lat"
                        forpopup
                        onChange={(e) => {
                            setmsg('Thêm');
                            setinfo((pre) => ({ ...pre, lat: e.target.value }));
                        }}
                    ></Input>
                    <Input
                        name="long"
                        title="Long"
                        placeholder="Long"
                        forpopup
                        onChange={(e) => {
                            setmsg('Thêm');
                            setinfo((pre) => ({ ...pre, long: e.target.value }));
                        }}
                    ></Input>

                    {/* -----------------addlist------------------*/}

                    {inputList.map((x, i) => {
                        return (
                            <div className={cx('AddListwapper')}>
                                <Input
                                    name="range"
                                    title="Range"
                                    placeholder="..."
                                    forpopup
                                    onChange={(e) => handleinputchange(e, i)}
                                ></Input>
                                <Input
                                    name="windspeed"
                                    title="Windspeed"
                                    placeholder="..."
                                    forpopup
                                    onChange={(e) => handleinputchange(e, i)}
                                ></Input>
                                <Input
                                    name="type"
                                    title="Type"
                                    placeholder="..."
                                    forpopup
                                    onChange={(e) => handleinputchange(e, i)}
                                ></Input>
                                {inputList.length !== 1 && (
                                    <button className={cx('DelListbutton')} onClick={() => handleDelete(i)}>
                                        Del
                                    </button>
                                )}
                                {inputList.length - 1 === i && (
                                    <button className={cx('AddListbutton')} onClick={handleaddclick}>
                                        Add
                                    </button>
                                )}
                            </div>
                        );
                    })}
                    <div className={cx('colum2')}>
                        <div className={cx('insertcolumn')}></div>
                        <Button success small onClick={AddNewDisaster}>
                            {msg}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddDisasterTime;
