import classNames from 'classnames/bind';
import Button from '~/components/Button';
import Input from '~/components/Input';
import styles from './Info.module.scss';
import { useState } from 'react';
import request from '~/utils/request';

const cx = classNames.bind(styles);

function AddAdmin({ close, funsub = () => {} }) {
    const [info, setinfo] = useState({ name: '', email: '', password: '' });
    const [msg, setmsg] = useState('Thêm');
    const AddNewAD = () => {
        request
            .post(`admin/add?name=${info.name}&email=${info.email}&password=${info.password}`)
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
    return (
        <div className={cx('modal')}>
            <a className={cx('close')} onClick={close}>
                &times;
            </a>
            <div className={cx('header')}> Thêm Admin </div>
            <div className={cx('cxcontent')}>
                <div className={cx('wapper')}>
                    {/* <h2 className={cx('title')}>Thêm Quản Trị</h2> */}
                    <Input
                        name="name"
                        title="Name"
                        placeholder="Nguyễn Văn A"
                        forpopup
                        onChange={(e) => {
                            setmsg('Thêm');
                            setinfo((pre) => ({ ...pre, name: e.target.value }));
                        }}
                    ></Input>
                    <Input
                        name="email"
                        title="Email"
                        placeholder="Nguyễn Văn A"
                        forpopup
                        onChange={(e) => {
                            setmsg('Thêm');
                            setinfo((pre) => ({ ...pre, email: e.target.value }));
                        }}
                    ></Input>
                    <Input
                        title="Password"
                        type="password"
                        placeholder="Passs1xy#"
                        forpopup
                        onChange={(e) => {
                            setmsg('Thêm');
                            setinfo((pre) => ({ ...pre, password: e.target.value }));
                        }}
                    ></Input>
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

export default AddAdmin;
