import './App.css';
import CreateTask from './Pages/CreateTask';
import DashBoard from './Pages/DashBoard';
import Login from './Pages/Login';
import NavBar from './Pages/NavBar';
import Signup from './Pages/Signup';
import TaskList from './Pages/TaskList';
import { BrowserRouter , Router, Route, Link, Routes } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
     
        <Routes>
        {/* <Route path="/" element={<TaskList/>}></Route> */}
        <Route path="/Login" element={<Login/>}></Route>
        <Route path="/Signup" element={<Signup/>}></Route>
        <Route path="/" element={<DashBoard/>}>
          <Route path="/tasks" element={<TaskList/>}></Route>
          <Route path="/createtask" element={<CreateTask/>}></Route>
          
          </Route>
          <Route path="/dashboard" element={<DashBoard/>}></Route>
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
