import React, { useState } from 'react';
import '~/Layout/Login-Register/Login-Register.css';
import validation from './validation';
import request from '~/utils/request';
import { Link, redirect, useNavigate } from 'react-router-dom';

const Login = () => {
    const [values, setValues] = useState({
        email: '',
        password: '',
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
        console.log(Object.keys(errors).length === 0);
        if (Object.keys(errors).length === 0) {
            console.log(values);

            request
                .post('login', values)
                .then((res) => {
                    if (res.status === 201) {
                        //alert('Bạn đã nhập sai tài khoản hoặc mật khẩu');
                        // return <Redirect to="/login" />;
                        setErrors(() => {
                            var errors = {};
                            errors.login = 'Sai tài khoản hoặc mật khẩu, vui lòng thử lại!!!';
                            return errors;
                        });
                        navigate('/login');
                    } else {
                        //this.props.history.push('/');
                        // return <Redirect to="/" />;

                        localStorage.setItem('token', res.data.data.token);

                        navigate('/profile');
                    }
                })
                .catch((e) => {
                    console.log(e);
                });
        }
    };

    return (
        <div className="container">
            <div className="app-wrapper">
                <div>
                    <h2 className="title">Đăng nhập</h2>
                </div>
                <form className="form-wrapper">
                    <div className="Email">
                        <label className="label">Email:</label>
                        <input
                            className="input"
                            type="email"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                            placeholder="Nhập vào email..."
                        />
                    </div>
                    {errors.email && <p className="error">{errors.email}</p>}

                    <div className="Password">
                        <label className="label">Mật khẩu:</label>
                        <input
                            className="input"
                            type="password"
                            name="password"
                            value={values.password}
                            onChange={handleChange}
                            placeholder="Nhập vào mật khẩu..."
                        />
                    </div>
                    {errors.password && <p className="error">{errors.password}</p>}
                    {errors.login && <p className="error">{errors.login}</p>}
                    <div>
                        <button className="submit" onClick={handleFormSubmit}>
                            Đăng nhập
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
