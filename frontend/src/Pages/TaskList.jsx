import { useState, useEffect } from 'react'
import React from 'react'
import "../App.css"

function TaskList() {

    const [tasks, SetTasks] = useState([])
    const [searchKey, setSearchKey] = useState('')
    const [filteredTasks,setFilteredTasks] = useState([])

    const getAllTasks = () => {
        fetch("http://localhost:7000/task/all").then((res) => {
            return res.json();
        }).then((result) => {
            SetTasks(result)
            setFilteredTasks(result)
        })
    }
    useEffect(() => {
        getAllTasks();
    }, [])

    const deleteTask = (e, id) => {
        fetch("http://localhost:7000/task/" + id, { method: "DELETE" }).then((res) => {
            return res.text()
        }).then((result) => {
            getAllTasks();
        })
    }

    const searchTasks = (e)=>{
        setSearchKey(e.target.value);
        if(e.target.value){
            let filteredTasksData = tasks.filter((item)=>{
                return item.taskName=== e.target.value
            })
            setFilteredTasks(filteredTasksData)
        }else{
            setFilteredTasks(tasks)
        }
    }

    const startTask = (e,id,status)=>{
        if(status==="Inprogress"){
            status = 'completed'
        }else{
            status = 'Inprogress'
        }
        fetch("http://localhost:7000/task/update/" + id, { method: "PUT",headers:{'Content-type':'Application/Json'},body:JSON.stringify({status:status})}).then((res) => {
            return res.json()
        }).then((result) => {
            getAllTasks();
        })
    }
    return (
        <div className='container mt-5'>
            <div className='row'>
                <div className='col-md-12'>

                    <input type="text" className='search-bar' style={{ width: '100%' }} placeholder='Search tasks here...' value={searchKey} onChange={(e)=>searchTasks(e)}/>

                </div>
            </div>
            {filteredTasks.length === 0 && <h4>Currently No Task Available</h4>}
            <div className='row'>
                {filteredTasks.map((task) => {
                    return (
                        <div className='col-md-3'>
                            <div className="card mt-4 task-card" style={{ boxShadow: 'rgba(0, 0, 0, 0.12) 0px 4px 16px' }}>
                                <button style={{position:'absolute'}} className='btn btn-info btn-sm' onClick={(e)=>startTask(e,task._id,task.status)}>{task.status === 'Inprogress' ? 'Complete': 'Start'}</button>
                                <img className="card-img-top" src="https://ionicframework.com/docs/img/demos/card-media.png" alt="Card image cap" />
                                <div className="card-body">
                                    <h5 className="card-title">{task.taskName}</h5>
                                    <p className="card-text">{task.taskDesc}</p>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <span class="badge bg-success">{task.status}</span>
                                        <span class="badge bg-danger" onClick={(e) => deleteTask(e, task._id)}>delete</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default TaskList

