import React, { useState } from "react";
import "~/Layout/Login-Register/Login-Register.css"
import validation from "./validation";

const Login = () =>{
    const [values, setValues] = useState({
        fullname: "",
        email: "",
        password: "",
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
                    <h2 className="title">Create Account</h2>
                </div>
                <form className="form-wrapper">
                    <div className="Name">
                        <label className="label">Name</label>
                        <input className="input" type="text" 
                        name="fullname" 
                        value={values.fullname}
                        onChange={handleChange}/>
                    </div>
                    {errors.fullname && <p className="error">{errors.fullname}</p>}

                    <div className="Email">
                        <label className="label">Email</label>
                        <input className="input" type="email" 
                        name="email"
                        value={values.email}
                        onChange={handleChange}/>
                    </div>
                    {errors.email && <p className="error">{errors.email}</p>}

                    <div className="Password">
                        <label className="label">Password</label>
                        <input className="input" type="password" 
                        name="password"
                        value={values.password}
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

export default Login;
