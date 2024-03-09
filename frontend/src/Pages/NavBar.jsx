import { Link, useNavigate } from "react-router-dom";
function NavBar() {

    const navigae = useNavigate();

    const logout = async () => {
        await localStorage.clear();
        navigae("login");
    }
    return (

        <nav className="navbar navbar-expand" style={{ backgroundColor: "#009688" }}>
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">TaskiFy</Link>
                <div className="collapse navbar-collapse" id="navbarSupportedContent" >
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link to="tasks" class="nav-link active" aria-current="page">TaskList</Link>
                        </li>
                        <li className="nav-item">
                            <Link class="nav-link" to="createtask">Create Task</Link>
                        </li>

                    </ul>

                    <ul className="navbar-nav">
                        <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle"  role="button" data-bs-toggle="dropdown" aria-expanded="false">
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