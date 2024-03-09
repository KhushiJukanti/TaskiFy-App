import { useState } from 'react'
import React from 'react'

function ChangePassword() {

    const [email, setEmail] = useState('');
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [showAlert, setShowAlert] = useState(false)

    const [errors, setErrors] = useState({})
    const [isError, setIsError] = useState(false)
    const [errMessage, setErrMessage] = useState("")

    const validateFormfield = () => {
        let errors = {}
        if (!oldPassword) {
            errors.oldPassword = "Please enter your Old password"
        } if (!newPassword) {
            errors.newPassword = "please enter your New password"
        } if (!confirmNewPassword) {
            errors.confirmNewPassword = "Please confirm your new Password"
        } else if (newPassword !== confirmNewPassword) {
            errors.confirmNewPassword = "Passwords do not match"
        }
        return errors;
    }

    const resetField = ()=>{
        setConfirmNewPassword("")
        setNewPassword("")
        setOldPassword("")
    }

    const applyChangePassword = async () => {
        const user = await localStorage.getItem("loggedInUser") && JSON.parse(localStorage.getItem("loggedInUser"))
        // clear previous errors
        setErrors({});
        setIsError(false);
        setErrMessage("");
        // Validate form fields
        let errors = validateFormfield();
        setErrors(errors);
        if (Object.keys(errors).length === 0) {
            fetch("http://localhost:7000/auth/changepassword", {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: user.email, oldPassword, newPassword })
            }).then(function (res) {
                return res.json()
            }).then(function (result) {
                if (result._id) {
                    setShowAlert(true)
                    resetField()

                }
                console.log("password update successfully")
             
            })
        } else {
            return
        }
    }


    const handleChangePass = (e) => {
        e.preventDefault();
        applyChangePassword();

    }


    return (
        <div className='d-flex justify-content-center align-items-center' style={{ minHeight: "100vh" }}>
            <div className='col-md-4'>

                <div className='card'>
                    <div className='card-body'>
                        <h2 className='text-center'>Change Password</h2>
                        <form onSubmit={handleChangePass}>

                            {/* <div className='mb-3'>
                                <label className='form-label'>Email</label>
                                <input type='email' className='form-control' value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div> */}


                            <div className='mb-3'>
                                <label className='form-label'>Old Password</label>
                                <input type='text' className='form-control' value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
                            </div>
                            <p className='error-text'>{errors?.oldPassword}</p>

                            <div className='mb-3'>
                                <label className='form-label'>New Password</label>
                                <input type='password' className='form-control' value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                            </div>
                            <p className='error-text'>{errors?.newPassword}</p>

                            <div className='mb-3'>
                                <label className='form-label'>Confirm NewPassword</label>
                                <input type='password' className='form-control' value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} />
                            </div>
                            <p className='error-text'>{errors?.confirmPassword}</p>

                            <input type="submit" value="Update" className='btn btn-primary w-100' style={{ backgroundColor: "#009688", border: "1px solid #009688" }} />
                        </form>
                        {showAlert && <div className="row">
                            <div className="col-md-3 mt-4">
                                <div class="alert alert-success" role="alert" style={{width:'300px'}}>
                                    Password Update Successfully!!
                                </div>
                            </div>
                        </div>}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ChangePassword
