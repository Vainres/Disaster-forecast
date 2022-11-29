import React, { useState } from 'react';
import classNames from 'classnames/bind';
import Button from '~/components/Button';
import Input from '~/components/Input';
import styles from './Info.module.scss';
import validation from './validation';
import request from '~/utils/request';
import { useNavigate } from 'react-router-dom';
const cx = classNames.bind(styles);

function ChangePass(props) {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        password: '',
        repassword: '',
        newpassword: '',
    });
    const [errors, setErrors] = useState({});
    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        });
    };
    const [status, setstatus] = useState('Lưu Thay Đổi');
    const handleonclick = (event) => {
        event.preventDefault();
        setErrors(validation(values));
        if (Object.keys(errors).length === 0) {
            var headerdata = {
                token: localStorage.getItem('token'),
            };
            console.log(headerdata);

            request
                .post(`admin/changepassword/changePassword`, values, { headers: headerdata })
                .then((res) => {
                    if (res.data.code === '401') {
                        alert('Phiên đăng nhập hết hạn');
                        navigate('/login');
                    } else {
                        setstatus('Đã Thay Đổi');
                        console.log(res);
                    }
                })
                .catch((e) => {
                    setstatus('Lỗi');
                    console.log(e);
                });
        }
    };
    return (
        <div className={cx('wapper')}>
            <h2 className={cx('title')}>Thay đổi Mật Khẩu</h2>
            <Input
                longtitle
                name="name"
                title="Mật Khẩu Cũ"
                type="password"
                placeholder="Hãy nhập mật khẩu hiện tại"
                value={values.password}
                onChange={(e) => {
                    setstatus('Lưu Thay Đổi');
                    setValues((pre) => ({ ...pre, password: e.target.value }));
                }}
            ></Input>
            {errors.password && <p className="error">{errors.password}</p>}
            <Input
                longtitle
                name="email"
                title="Mật Khẩu Mới"
                type="password"
                placeholder="Hãy nhập mật khẩu mới"
                value={values.newpassword}
                onChange={(e) => {
                    setstatus('Lưu Thay Đổi');
                    setValues((pre) => ({ ...pre, newpassword: e.target.value }));
                }}
            ></Input>
            <span className={cx('errorForpopup')}>
                {errors.newpassword && <p className="error">{errors.newpassword}</p>}
            </span>
            <Input
                longtitle
                title="Xác Nhận Mật Khẩu"
                type="password"
                placeholder="Xác nhận mật khẩu mới"
                value={values.repassword}
                onChange={(e) => {
                    setstatus('Lưu Thay Đổi');
                    setValues((pre) => ({ ...pre, repassword: e.target.value }));
                }}
            ></Input>
            {errors.repassword && <p className="error">{errors.repassword}</p>}
            <div className={cx('colum2')}>
                <div className={cx('insertcolumn')}></div>
                <Button primary medium onClick={handleonclick}>
                    {status}
                </Button>
            </div>
        </div>
    );
}

export default ChangePass;
