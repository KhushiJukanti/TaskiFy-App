import './App.css';
import ChangePassword from './Pages/ChangePassword';
import CreateTask from './Pages/CreateTask';
import DashBoard from './Pages/DashBoard';
import Login from './Pages/Login';
import PrivateRoutes from './Pages/PrivateRoutes';
import Profile from './Pages/Profile';

import Signup from './Pages/Signup';
import TaskList from './Pages/TaskList';

import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <div className="App">

      <BrowserRouter>

        <Routes>
          {/* <Route path="/" element={<TaskList/>}></Route> */}
          <Route path="/Login" element={<Login />}></Route>
          <Route path="/Signup" element={<Signup />}></Route>
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<DashBoard />}>

              <Route path="/tasks" element={<TaskList />}></Route>
              <Route path="/createtask" element={<CreateTask />}></Route>
              <Route path="/profile" element={<Profile />}></Route>
              <Route path="changepassword" element={<ChangePassword />}></Route>
            </Route>


          </Route>

        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
