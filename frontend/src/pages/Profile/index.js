import SliderBarProfile from '~/Layout/SliderBar';
import styles from './Profile.module.scss';
import classNames from 'classnames/bind';
import InfoProfile from '~/Layout/Info';
import React, { useState } from 'react';
import request from '~/utils/request';
import { useNavigate } from 'react-router-dom';
const cx = classNames.bind(styles);
function Profile() {
    const [values, setValues] = useState({
        name: '',
        email: '',
    });
    const navigate = useNavigate();

    React.useEffect(() => {
        //const values = {};

        var headerdata = {
            token: localStorage.getItem('token'),
        };
        console.log(headerdata);

        request
            .get('userinfo', { headers: headerdata })
            .then((res) => {
                console.log(res.data.code);
                if (res.data.code === '401') {
                    alert('Phiên đăng nhập hết hạn');
                    navigate('/login');
                } else {
                    console.log(res.data.data.email);
                    setValues({ name: res.data.data.name, email: res.data.data.email });
                }
            })
            .catch((e) => {
                console.log(e);
            });
    }, []);
    return (
        <div className={cx('wapper')}>
            <SliderBarProfile className={cx('slider')} name="1" />
            <InfoProfile className={cx('contentpf')} type="pass" values={values} />
        </div>
    );
}

export default Profile;
