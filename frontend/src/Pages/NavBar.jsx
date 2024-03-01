import { Link } from "react-router-dom";
function NavBar() {
    return (
        
            <nav className="navbar navbar-expand" style={{ backgroundColor: "#009688" }}>
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">TaskiFy</Link>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to="tasks" class="nav-link active" aria-current="page">TaskList</Link>
                            </li>
                            <li className="nav-item">
                                <Link  class="nav-link" to="createtask">Create Task</Link>
                            </li>
                        </ul>
                    </div>
                </div>

            </nav>
            
    )
}

export default NavBar; 