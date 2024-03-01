import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import React from 'react'

function Signup() {

    const [userAuth,setUserAuth] = useState({email:"",fullName:"",password:"",repassword:""}) 
    const [errors,setErrors] = useState({})
    const [isError,setIsError] = useState(false)
    const [errMessage,setErrMessage] = useState("")
    
    const navigate = useNavigate();

    const onFieldChange = (e)=>{
        // console.log(e.target.name, e.target.value)
        setUserAuth((prevState)=>{
            
            return{
                ...prevState,
                [e.target.name]:e.target.value
            }
        })
    }

    const  validateFormFields = ()=>{
        let errors = {};
        if(!userAuth.fullName){
            errors.fullName = "please Enter the full name"
        }if(!userAuth.email){
            errors.email="Please enter a valid email address"
        }if(!userAuth.password){
            errors.password="Password is required"
        }if(!userAuth.repassword){
            errors.rePassword="Re-Password is required"
        }else if(userAuth.password !== userAuth.repassword){
            errors.rePassword="Passwords do not match"
        }
        return errors
        // let errorObject={}
        
        // if(!userAuth.email || userAuth.email===""){
        //     errorObject["email"]='Email is required.'
        // }else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userAuth.email)) {
        //     errorObject['email']= "Email is not valid.";
        //   }
          
        // if(userAuth.password !== userAuth.repassword || !userAuth.password){
        //     errorObject["password"] ="Password fields do not match or empty."
        // }

        // setErrors(errorObject)
        // return Object.values(errorObject).length===0 ? true : false
    }

    const signup = ()=>{
        fetch("http://localhost:7000/auth/signup", {method:"POST", headers:{"Content-Type" : "application/json"}, body:JSON.stringify(userAuth)}).then((res)=>{
            return res.json()
        }).then((result)=>{
            if(result.success){
                navigate("/login")
            }else{
                setIsError(true);
                setErrMessage(result.message)
            }
        })
    }
    
    const register = (e)=>{
        e.preventDefault();
        let errors = validateFormFields()
        setErrors(errors)
        if(Object.keys(errors).length ===0){
            // no errors here please call to backend
            signup()
        }else{
            return;
        }
        
        
        
    }
    
    return (
        <div className='container'>
            <div className='d-flex justify-content-center align-items-center' style={{ minHeight: "100vh" }}>
                <div className='col-md-4'>

                    <div className='card'>
                        <div className='card-body'>
                            <h2 className='text-center'>Signup</h2>
                            <form onSubmit={register}>
                                
                                <div className='mb-3'>
                                    <label className='form-label'>Full Name</label>
                                    <input type='text' className='form-control' value={userAuth.fullName} onChange={onFieldChange} name='fullName'/>
                                </div>
                                <p className='error-text'>{errors?.fullName}</p>
                                
                                <div className='mb-3'>
                                    <label className='form-label'>Email address</label>
                                    <input type='email' className='form-control' value={userAuth.email} onChange={onFieldChange} name='email'/>
                                </div>
                                <p className='error-text'>{errors?.email}</p>
                                
                                <div className='mb-3'>
                                    <label className='form-label'>Password</label>
                                    <input type='password' className='form-control' value={userAuth.password} onChange={onFieldChange} name='password'/>
                                </div>
                                <p className='error-text'>{errors?.password}</p>
                                
                                <div className='mb-3'>
                                    <label className='form-label'>Re-enter Password</label>
                                    <input type='password' className='form-control' value={userAuth.rePassword} onChange={onFieldChange} name='repassword'/>
                                </div>
                                <p className='error-text'>{errors?.rePassword}</p>
                                <input type="submit" value="Signup" className='btn btn-primary w-100' style={{ backgroundColor: "#009688", border: "1px solid #009688" }} />

                                {isError && <div className='mb-3'>
                                   <h4 style={{color:'red'}}>{errMessage}</h4>
                                </div>}
                            </form>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Signup