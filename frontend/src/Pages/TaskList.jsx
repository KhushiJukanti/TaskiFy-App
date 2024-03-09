import { useState, useEffect } from 'react'
import React from 'react'
import "../App.css"

function TaskList() {

    const [tasks, SetTasks] = useState([])
    const [searchKey, setSearchKey] = useState('')
    const [filteredTasks, setFilteredTasks] = useState([])
    const [status, setStatus] = useState(["All", "Inprogress", "completed", "not_started"])
    const [taskSummary, setTaskSummary] = useState({ TotalCount: 0, InProgressCount: 0, CompletedCount: 0, NotStartedCount: 0 })

    const getAllTasks = () => {
        fetch("http://localhost:7000/task/all").then((res) => {
            return res.json();
        }).then((result) => {
            SetTasks(result)
            setFilteredTasks(result)
        })
    }

    const getTaskSummary = () => {
        fetch(`http://localhost:7000/task/summary`).then((res) => {
            return res.json();
        }).then((result) => {
            console.log(result)
            setTaskSummary(result)
        })
    }

    useEffect(() => {
        // const fetchData = async () => {
        //     try {
        //         await getAllTasks();
        //         await getTaskSummary();
        //     }catch(error){
        //         console.log("Error fetching data: ", error);
        //     }
        // };
        // fetchData();
        getAllTasks();
        getTaskSummary();
    }, [])

    const deleteTask = (e, id) => {
        fetch("http://localhost:7000/task/" + id, { method: "DELETE" }).then((res) => {
            return res.text()
        }).then((result) => {
            getAllTasks();
        })
    }

    const searchTasks = (e) => {
        const searchValue = e.target.value;
        setSearchKey(searchValue)
        if (searchValue) {
            let filteredTasksData = tasks.filter((item) => {
                return item.taskName.toLowerCase().includes(searchValue.toLowerCase());
            })
            setFilteredTasks(filteredTasksData)
        } else {
            setFilteredTasks(tasks)
        }
    }

    const startTask = (e, id, status) => {
        if (status === "Inprogress") {
            status = 'completed'
        } else {
            status = 'Inprogress'
        }
        fetch("http://localhost:7000/task/update/" + id, { method: "PUT", headers: { 'Content-type': 'Application/Json' }, body: JSON.stringify({ status: status }) }).then((res) => {
            return res.json()
        }).then((result) => {
            getAllTasks();
        })
    }

    const getTaskByStatus = (status) => {
        fetch("http://localhost:7000/task/byStatus/" + status).then((res) => {
            return res.json();
        }).then((result) => {
            SetTasks(result)
            setFilteredTasks(result)
        })
    }

    const onStatuschange = (e) => {
        console.log(e.target.value)
        getTaskByStatus(e.target.value)
    }


    return (
        <div className='container mt-5'>

            <div className='row mt-3'>
                <div className='col-md-3'>
                    <div className="card text-center mb-3 card-Shadow" style={{ borderBottom: '5px solid Yellow' }}>
                        <div className="card-body">
                            <h5 className="card-title">All Tasks</h5>
                            <p className="card-text count-task">{taskSummary.TotalCount}</p>

                        </div>
                    </div>
                </div>
                <div className='col-md-3'>
                    <div className="card text-center mb-3 card-Shadow" style={{ borderBottom: '5px solid Red' }}>
                        <div className="card-body">
                            <h5 className="card-title">Not started Tasks</h5>
                            <p className="card-text count-task">{taskSummary.NotStartedCount}</p>

                        </div>
                    </div>
                </div>
                <div className='col-md-3'>
                    <div className="card text-center mb-3 card-Shadow" style={{ borderBottom: '5px solid Orange' }}>
                        <div className="card-body">
                            <h5 className="card-title">Inprogress Tasks</h5>
                            <p className="card-text count-task">{taskSummary.InProgressCount}</p>

                        </div>
                    </div>
                </div>
                <div className='col-md-3'>
                    <div className="card text-center mb-3 card-Shadow" style={{ borderBottom: '5px solid green' }}>
                        <div className="card-body">
                            <h5 className="card-title">Completed Tasks</h5>
                            <p className="card-text count-task">{taskSummary.CompletedCount}</p>

                        </div>
                    </div>
                </div>
            </div>


            <div className='row'>
                <div className='col-md-12'>

                    <input type="text" className='search-bar' style={{ width: '100%' }} placeholder='Search tasks here...' value={searchKey} onChange={(e) => searchTasks(e)} />

                </div>
            </div>

            <div className='row mt-3'>
                <div className='col-md-3'>
                    <h4 className='mt-3'>Task List</h4>
                </div>
                <div className='col-md-3'>
                    <select className="form-select" aria-label="Default select example" onChange={(e) => onStatuschange(e)}>
                        <option selected disabled value={"Filter Status here..."}>{"Filter Status here..."}</option>
                        {status.map((item) => {
                            return (
                                <option value={item}>{item}</option>
                            )
                        })}

                    </select>
                </div>
            </div>

            {filteredTasks.length === 0 && <h4 className='mt-4' >Currently No Task Available</h4>}
            <div className='row'>
                {filteredTasks.map((task) => {
                    return (
                        <div className='col-md-3'>
                            <div className="card mt-4 task-card" style={{ boxShadow: 'rgba(0, 0, 0, 0.12) 0px 4px 16px' }}>
                                {task.status === 'Inprogress' && <button style={{ position: 'absolute' }} className='btn btn-info btn-sm' onClick={(e) => startTask(e, task._id, task.status)}>{'Complete'}</button>}
                                {task.status === 'not_started' && <button style={{ position: 'absolute' }} className='btn btn-info btn-sm' onClick={(e) => startTask(e, task._id, task.status)}>{'Start'}</button>}
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

