import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function Profile() {

    const [user, setUser] = useState(null)

    useEffect(() => {
        let user = localStorage.getItem("loggedInUser") && JSON.parse(localStorage.getItem("loggedInUser"))
        if (user) {
            fetch("http://localhost:7000/auth/profile/" + user.email).then((res) => {
                return res.json();
            }).then((data) => {
                setUser(data)
            })
        }

    }, [])
    return (
        <div className='row mt-5'>
            <div className='col-md-12'>
                <div className="card text-center">
                    <div className="card-header">
                        My Profile
                    </div>
                    {user && <div className="card-body">
                        <h5 className="card-title">{user.fullName}</h5>
                        <p className="card-text">{user.email}</p>
                        <div className='mb-3'>
                            <Link to="/changepassword" className="link-offset-2 link-underline link-underline-opacity-10">Change Password</Link>

                        </div>
                        <Link className="btn btn-primary">Logout</Link>
                    </div>}
                </div>
            </div>
        </div>
    )
}

export default Profile
