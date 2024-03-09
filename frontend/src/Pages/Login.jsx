import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import React from 'react'

function Login() {

    const [email, setEmail] = useState(" ")
    const [password, setPassword] = useState("")
    const [isError, setIsError] = useState(false)
    const [errMessage, setErrMessage] = useState("")
    const [errors, setErrors] = useState({})

    const navigate = useNavigate();

    const onEmailchange = (e) => {
        setEmail(e.target.value)
    }

    const onPasswordchange = (e) => {
        setPassword(e.target.value)
    }

    const validateFormfield = () => {
        let errors = {}
        if (!email) {
            errors.email = "Please enter your email"
        } if (!password) {
            errors.password = "please enter your password"
        }
        return errors;
    }

    const login = (e) => {
        e.preventDefault();
        let errors = validateFormfield()
        setErrors(errors)
        if (Object.keys(errors).length === 0) {
            // console.log('No Errors')
            fetch("http://localhost:7000/auth/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, password }) }).then((res) => {
                return res.json()
            }).then((result) => {
                if (result.success) {
                    localStorage.setItem("loggedInUser",JSON.stringify({email:result.email}))
                    localStorage.setItem("isLoggedIn",true)
                    navigate("/")
                    
                } else {
                    setIsError(true);
                    setErrMessage(result.message)
                }
            })
        }else{
            return;
        }

    }
    return (
        <div className='d-flex justify-content-center align-items-center' style={{ minHeight: "100vh" }}>
            <div className='col-md-4'>

                <div className='card'>
                    <div className='card-body'>
                        <h2 className='text-center'>Login</h2>
                        <form onSubmit={login}>

                            <div className='mb-3'>
                                <label className='form-label'>Email address</label>
                                <input type='email' className='form-control' value={email} onChange={onEmailchange} />
                            </div>
                            <p className='error-text'>{errors?.email}</p>
                            <div className='mb-3'>
                                <label className='form-label'>Password</label>
                                <input type='password' className='form-control' value={password} onChange={onPasswordchange} />
                            </div>
                            <p className='error-text'>{errors?.password}</p>
                            <input type="submit" value="Login" className='btn btn-primary w-100' style={{ backgroundColor: "#009688", border: "1px solid #009688" }} />
                        </form>
                        {isError && <div className='mb-3'>
                            <h4 style={{ color: 'red' }}>{errMessage}</h4>
                        </div>}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Login
