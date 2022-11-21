import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '~/Layout/Login-Register/Login-Register.css';
import request from '~/utils/request';
import validation from './validation';

const Register = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        repassword: '',
    });
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        });
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        setErrors(validation(values));
        if (Object.keys(errors).length === 0) {
            console.log(values);

            request
                .post('register', values)
                .then((res) => {
                    if (res.status === 201) {
                        alert('Tạo tài khoản thành công, Vui lòng đăng nhập!!!');
                        // return <Redirect to="/login" />;

                        navigate('/login');
                    } else {
                        //this.props.history.push('/');
                        // return <Redirect to="/" />;

                        setErrors(() => {
                            var errors = {};
                            errors.register = 'Đăng kí lỗi, vui lòng thử lại!!!';
                            return errors;
                        });

                        navigate('/register');
                    }
                })
                .catch((e) => {
                    setErrors(() => {
                        var errors = {};
                        errors.register = 'Đăng kí lỗi, vui lòng thử lại!!!';
                        return errors;
                    });
                });
        }
    };

    return (
        <div className="container">
            <div className="app-wrapper">
                <div>
                    <h2 className="title">Tạo tài khoản</h2>
                </div>
                <form className="form-wrapper">
                    <div className="Name">
                        <label className="label">Họ và tên</label>
                        <input
                            className="input"
                            type="text"
                            name="name"
                            value={values.fullname}
                            onChange={handleChange}
                        />
                    </div>
                    {errors.name && <p className="error">{errors.name}</p>}

                    <div className="Email">
                        <label className="label">Tài khoản Email</label>
                        <input
                            className="input"
                            type="email"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                        />
                    </div>
                    {errors.email && <p className="error">{errors.email}</p>}

                    <div className="Password">
                        <label className="label">Mật khẩu</label>
                        <input
                            className="input"
                            type="password"
                            name="password"
                            value={values.password}
                            onChange={handleChange}
                        />
                    </div>
                    {errors.password && <p className="error">{errors.password}</p>}

                    <div className="rePassword">
                        <label className="label">Nhập lại mật khẩu</label>
                        <input
                            className="input"
                            type="password"
                            name="repassword"
                            value={values.repassword}
                            onChange={handleChange}
                        />
                    </div>
                    {errors.repassword && <p className="error">{errors.repassword}</p>}

                    <div>
                        <button className="submit" onClick={handleFormSubmit}>
                            Đăng kí
                        </button>
                    </div>

                    <div className="div">
                        Bạn đã có tài khoản? Đăng nhập
                        <Link to="/login"> tại đây</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
