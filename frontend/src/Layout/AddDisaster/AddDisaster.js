import styles from './AddDisaster.module.scss';
import classNames from 'classnames/bind';
import React, { useState, useEffect } from 'react';
import Button from '~/components/Button';
import Input from '~/components/Input';
import Request from '~/utils/requests';
import { DatePicker, DateTimePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import TextField from '@mui/material/TextField';
import { fontSize } from '@mui/system';

const cx = classNames.bind(styles);

function AddDisaster({ close, funsub = () => {}, reload }) {
    const [info, setinfo] = useState({});
    const [msg, setmsg] = useState('Thêm');
    const request = new Request();
    const AddNewDisaster = () => {
        console.log('post', info);
        request.Post('admin/storm', info, (res) => {
            console.log(res);
            reload('thay');
        });

        setmsg('Đã Thêm');
        funsub(info.email);
    };
    useEffect(() => {
        setmsg('Thêm');
    }, [info]);
    useEffect(() => {
        console.log(info);
    }, [info]);
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
            <div className={cx('header')}> Thêm Thiên Tai </div>
            <div className={cx('cxcontent')}>
                <div className={cx('wapper')}>
                    {/* <h2 className={cx('title')}>Thêm Quản Trị</h2> */}
                    <Input
                        name="name"
                        title="Name"
                        placeholder="Tên bão"
                        forpopup
                        onChange={(e) => {
                            setmsg('Thêm');
                            setinfo((pre) => ({ ...pre, name: e.target.value }));
                        }}
                    ></Input>

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
                        name="type"
                        title="type"
                        placeholder="Loại Thiên Tai(Bão, Động Đấtm,..)"
                        forpopup
                        onChange={(e) => {
                            setmsg('Thêm');
                            setinfo((pre) => ({ ...pre, type: e.target.value }));
                        }}
                    ></Input>
                    {/* <LocalizationProvider className={cx('padding10dt')} dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                            className={cx('datetimepicker')}
                            label="Start Time"
                            onChange={(value) => {
                                setinfo((pre) => ({ ...pre, startTime: `${value.Y}-${value.M}-${value.D}` }));
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
                        <DateTimePicker
                            label="EndTime"
                            onChange={(value) => {
                                setinfo((pre) => ({ ...pre, endTime: value }));
                            }}
                            className={cx('datetimepicker')}
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
                    </LocalizationProvider> */}
                    <Input
                        name="startTime"
                        title="startTime"
                        placeholder="Nhập dưới dạng Năm - Tháng - Ngày"
                        forpopup
                        onChange={(e) => {
                            setmsg('Thêm');
                            setinfo((pre) => ({ ...pre, startTime: e.target.value }));
                        }}
                    ></Input>
                    <Input
                        name="endTime"
                        title="endTime"
                        placeholder="Nhập dưới dạng Năm - Tháng - Ngày"
                        forpopup
                        onChange={(e) => {
                            setmsg('Thêm');
                            setinfo((pre) => ({ ...pre, endTime: e.target.value }));
                        }}
                    ></Input>
                    <label>Điểm Bắt Đầu:</label>
                    <Input
                        name="lat"
                        title="Lat"
                        placeholder="Lat"
                        forpopup
                        onChange={(e) => {
                            setmsg('Thêm');
                            setinfo((pre) => ({ ...pre, pointstart: { ...pre.pointstart, lat: e.target.value } }));
                        }}
                    ></Input>
                    <Input
                        name="long"
                        title="Long"
                        placeholder="Long"
                        forpopup
                        onChange={(e) => {
                            setmsg('Thêm');
                            setinfo((pre) => ({ ...pre, pointstart: { ...pre.pointstart, long: e.target.value } }));
                        }}
                    ></Input>
                    <label>{'Điểm Kết thúc (Dự đoán):'}</label>
                    <Input
                        name="lat"
                        title="Lat"
                        placeholder="Lat"
                        forpopup
                        onChange={(e) => {
                            setmsg('Thêm');
                            setinfo((pre) => ({ ...pre, pointend: { ...pre.pointstart, lat: e.target.value } }));
                        }}
                    ></Input>
                    <Input
                        name="long"
                        title="Long"
                        placeholder="Long"
                        forpopup
                        onChange={(e) => {
                            setmsg('Thêm');
                            setinfo((pre) => ({ ...pre, pointend: { ...pre.pointstart, long: e.target.value } }));
                        }}
                    ></Input>
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

export default AddDisaster;
