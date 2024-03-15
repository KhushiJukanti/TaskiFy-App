import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
function NavBar() {

    const navigae = useNavigate();
    const [user, setUser] = useState(null)

    const logout = async () => {
        await localStorage.clear();
        navigae("login");
    }

    const getUserInfo = async () => {
        const userInfo = await localStorage.getItem("loggedInUser") && JSON.parse(localStorage.getItem("loggedInUser"))
        setUser(userInfo)
    }

    useEffect(() => {

        getUserInfo();

    }, [])
    return (

        <nav className="navbar navbar-expand" style={{ backgroundColor: "#009688" }}>
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">TaskiFy</Link>
                <div className="collapse navbar-collapse" id="navbarSupportedContent" >
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {user?.role === "Admin" && <li className="nav-item">
                            <Link class="nav-link" to="/createtask">Create Task</Link>
                        </li>}
                        {user?.role !== "Admin" && <li className="nav-item">
                            <Link to="/tasks" class="nav-link active" aria-current="page">TaskList</Link>
                        </li>}
                        {user?.role === "Admin" && <li className="nav-item">
                            <Link to="/adminTasks" class="nav-link active" aria-current="page">TaskList</Link>
                        </li>}
                        {user?.role !== "Admin" && <li className="nav-item">
                            <Link to="/mytask" class="nav-link active" aria-current="page">My Task List</Link>
                        </li>}

                        {user?.role === "Admin" && <li className="nav-item">
                            <Link class="nav-link" to="/users">Users</Link>
                        </li>}


                    </ul>

                    <ul className="navbar-nav">
                        <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                User Info
                            </Link>
                            <ul className="dropdown-menu dropdown-menu-end">
                                <Link className="dropdown-item" to="profile" >Profile</Link>
                                <Link className="dropdown-item" href="#">settings</Link>
                                <hr className="dropdown-divider" />
                                <Link className="dropdown-item" onClick={logout}>Logout</Link>
                            </ul>
                        </li>
                    </ul>


                </div>
            </div>

        </nav>

    )
}

export default NavBar; 