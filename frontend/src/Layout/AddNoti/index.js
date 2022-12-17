import classNames from 'classnames/bind';
import Button from '~/components/Button';
import Input from '~/components/Input';
import styles from './Info.module.scss';
import { useState } from 'react';
import Request from '~/utils/requests';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';

const cx = classNames.bind(styles);

function AddNoti({ close, funsub = () => {} }) {
    const [info, setinfo] = useState({ isread: 0, ispass: 0, important: 0 });
    const [msg, setmsg] = useState('Thêm');
    const request = new Request();
    const AddNewAD = () => {
        console.log(info);
        request.Post('/admin/noti', info, (res) => {
            console.log(res);
        });
        // request
        //     .post(`admin/add?name=${info.name}&email=${info.email}&password=${info.password}`)
        //     .then((res) => {
        //         if (res.data.code === '200') {
        //         } else {
        //         }
        //     })
        //     .catch((e) => {
        //         console.log(e);
        //     });
        setmsg('Đã Thêm');
        //(info.email);
    };

    return (
        <div className={cx('modal')}>
            <a className={cx('close')} onClick={close}>
                &times;
            </a>
            <div className={cx('header')}> Thêm </div>
            <div className={cx('cxcontent')}>
                <div className={cx('wapper')}>
                    {/* <h2 className={cx('title')}>Thêm Quản Trị</h2> */}
                    <Input
                        name="title"
                        title="title"
                        placeholder="Nguyễn Văn A"
                        forpopup
                        onChange={(e) => {
                            setmsg('Thêm');
                            setinfo((pre) => ({ ...pre, title: e.target.value }));
                        }}
                    ></Input>
                    <Input
                        name="content"
                        title="content"
                        forpopup
                        onChange={(e) => {
                            setmsg('Thêm');
                            setinfo((pre) => ({ ...pre, content: e.target.value }));
                        }}
                    ></Input>
                    <Input
                        name="important"
                        title="important"
                        forpopup
                        onChange={(e) => {
                            setmsg('Thêm');
                            setinfo((pre) => ({ ...pre, important: e.target.value }));
                        }}
                    ></Input>
                    <Input
                        name="user_ list"
                        title="user list"
                        forpopup
                        onChange={(e) => {
                            setmsg('Thêm');
                            let value = e.target.value;
                            value = value.split(',');
                            setinfo((pre) => ({ ...pre, user_id: [...value] }));
                        }}
                    ></Input>
                    {/* <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={0}
                        label="Age"
                        onChange={() => {
                            setinfo((pre) => ({ ...pre }));
                        }}
                    >
                        {names.map((name) => (
                            <MenuItem key={name} value={name}>
                                <ListItemText primary={name} />
                            </MenuItem>
                        ))}
                    </Select> */}

                    <div className={cx('colum2')}>
                        <div className={cx('insertcolumn')}></div>
                        <Button success small onClick={AddNewAD}>
                            {msg}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddNoti;
