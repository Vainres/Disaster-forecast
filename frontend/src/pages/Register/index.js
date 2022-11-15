import React, { useState } from "react";
import "~/Layout/Login-Register/Login-Register.css"
import validation from "./validation";

const Register = () =>{
    const [values, setValues] = useState({
        fullname: "",
        email: "",
        password: "",
        repassword: "",
    });

const [errors, setErrors] = useState({});

const handleChange = (event) =>{
    setValues({
        ...values,
        [event.target.name]: event.target.value
    })
}

const handleFormSubmit = (event) => {
    event.preventDefault();
    setErrors(validation(values));
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
                        <input className="input" type="text" 
                        name="fullname" 
                        value={values.fullname}
                        onChange={handleChange}/>
                    </div>
                    {errors.fullname && <p className="error">{errors.fullname}</p>}

                    <div className="Email">
                        <label className="label">Tài khoản Email</label>
                        <input className="input" type="email" 
                        name="email"
                        value={values.email}
                        onChange={handleChange}/>
                    </div>
                    {errors.email && <p className="error">{errors.email}</p>}

                    <div className="Password">
                        <label className="label">Mật khẩu</label>
                        <input className="input" type="password" 
                        name="password"
                        value={values.password}
                        onChange={handleChange}/>
                    </div>

                    <div className="rePassword">
                        <label className="label">Nhập lại mật khẩu</label>
                        <input className="input" type="password" 
                        name="repassword"
                        value={values.repassword}
                        onChange={handleChange}/>
                    </div>
                    {errors.password && <p className="error">{errors.password}</p>}

                    <div>
                        <button className="submit" onClick={handleFormSubmit}>
                            Sign Up
                        </button>
                    </div>

                </form>
            </div>
            
        </div>
    )
}

export default Register;