import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { apiService } from "../apiService"

function Profile() {

    const [user, setUser] = useState(null)
    const [profile, setProfile] = useState(null)
    // const history = useHistory();

    const getUserProfile = async () => {
        let userInfo = await localStorage.getItem("loggedInUser") && JSON.parse(localStorage.getItem("loggedInUser"))
        setUser(userInfo)
        if (userInfo) {
            apiService.getUserProfile(userInfo.email).then(function (data) {
                setProfile(data)
            })
        }
    }
    useEffect(() => {
        getUserProfile()
    }, [])


    const handleUpload = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("profile", e.target.files[0]);

        try {
            await apiService.profileUpload(formData, user.email)
            console.log("File uploaded successfully");
            // Refresh profile after upload
            const data = await apiService.getUserProfile(user.email);
            setProfile(data);

        } catch (error) {
            console.error('Error uploading file:', error);
            // Display error message to user
        }
    }



    // const handleUpload = (e)=>{
    //     e.preventDefault()
    //     const data = new FormData();
    //     data.append("profile",e.target.files[0])
    //     apiService.profileUpload(data,user.email).then(function(data){
    //         console.log("file uplaoded successfully")
    //     })
    // }


    // const handleLogout = () => {
    //     // Clear user session/state and redirect to login page
    //     localStorage.removeItem('loggedInUser');
    //     setUser(null);
    //     history.push('/login');
    // };

    return (
        <div className='row mt-5'>
            <div className='col-md-12'>
                <div className="card text-center">
                    <div className="card-header">
                        My Profile
                    </div>
                    <div>
                        <input type="file" onChange={(e) => handleUpload(e)} />
                    </div>
                    {profile && <div className="card-body">
                        <img src={`http://localhost:7000/uploads/${profile.profilepic}`} alt='Hi' />
                        <h5 className="card-title">{profile.fullName}</h5>
                        <p className="card-text">{profile.email}</p>
                        <div className='mb-3'>
                            <Link to="/changepassword" className="link-offset-2 link-underline link-underline-opacity-10">Change Password</Link>

                        </div>
                        <Link className="btn btn-primary" >Logout</Link>
                    </div>}
                </div>
            </div>
        </div>
    )
}

export default Profile
