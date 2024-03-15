import { useState, useEffect } from 'react'
import React from 'react'
import "../App.css"

function MyTask() {

    const [tasks, SetTasks] = useState([])
    const [searchKey, setSearchKey] = useState('')
    const [filteredTasks, setFilteredTasks] = useState([])
    const [status, setStatus] = useState(["All", "Inprogress", "completed", "not_started"])
    const [taskSummary, setTaskSummary] = useState({ InProgressCount: 0, CompltedCount: 0 })

    const getMyTasks = async () => {
        const user = await localStorage.getItem("loggedInUser") && JSON.parse(localStorage.getItem("loggedInUser"))
        fetch("http://localhost:7000/user/task/myTask/" + user.userId).then((res) => {
            return res.json();
        }).then((result) => {
            SetTasks(result)
            setFilteredTasks(result)
        })
    }

    const getTaskSummaryByUser = async () => {
        const user = await localStorage.getItem("loggedInUser") && JSON.parse(localStorage.getItem("loggedInUser"))
        fetch("http://localhost:7000/user/task/summary/" + user.userId).then((res) => {
            return res.json();
        }).then((result) => {
            setTaskSummary(result)
            // setFilteredTasks(result)
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
        getMyTasks();
        getTaskSummaryByUser();

    }, [])

    const completeTask = (e, id) => {
        fetch("http://localhost:7000/user/task/completeTask", { method: "PUT", headers: { 'Content-type': 'Application/Json' }, body: JSON.stringify({ id: id, status: "completed" }) }).then((res) => {
            return res.json()
        }).then((result) => {
            getMyTasks();
        })
    }

    // const deleteTask = (e, id) => {
    //     fetch("http://localhost:7000/task/" + id, { method: "DELETE" }).then((res) => {
    //         return res.text()
    //     }).then((result) => {
    //         getMyTasks();
    //     })
    // }

    const deleteTask = (e, id) => {
        fetch(`http://localhost:7000/task/${id}`, { method: "DELETE" })
            .then((res) => {
                if (res.ok) {
                    // Task deleted successfully, refresh the task list
                    getMyTasks();
                } else {
                    // Task deletion failed
                    console.error('Error deleting task:', res.statusText);
                }
            })
            .catch(error => {
                console.error('Error deleting task:', error);
            });
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

    // const startTask = (e, id, status) => {
    //     if (status === "Inprogress") {
    //         status = 'completed'
    //     } else {
    //         status = 'Inprogress'
    //     }
    //     fetch("http://localhost:7000/task/update/" + id, { method: "PUT", headers: { 'Content-type': 'Application/Json' }, body: JSON.stringify({ status: status }) }).then((res) => {
    //         return res.json()
    //     }).then((result) => {
    //         getMyTasks();
    //     })
    // }


    const getTaskByStatus = async (status) => {
        const user = await localStorage.getItem("loggedInUser") && JSON.parse(localStorage.getItem("loggedInUser"))
        fetch(`http://localhost:7000/user/task/${user.userId}/byStatus/${status}`).then((res) => {
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
                            <h5 className="card-title">InProgress Tasks</h5>
                            <p className="card-text count-task">{taskSummary.InProgressCount}</p>

                        </div>
                    </div>
                </div>
                <div className='col-md-3'>
                    <div className="card text-center mb-3 card-Shadow" style={{ borderBottom: '5px solid Red' }}>
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
                    <h4 className='mt-3'>My Task List</h4>
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
                                {task.status === 'Inprogress' && <button style={{ position: 'absolute' }} className='btn btn-info btn-sm' onClick={(e) => completeTask(e, task._id)}>{'Complete'}</button>}
                                {/* {task.status === 'not_started' && <button style={{ position: 'absolute' }} className='btn btn-info btn-sm' onClick={(e) => startTask(e, task._id, task.status)}>{'Start'}</button>} */}
                                <img className="card-img-top" src="https://ionicframework.com/docs/img/demos/card-media.png" alt="logo" />
                                <div className="card-body">
                                    <h5 className="card-title">{task?.taskId?.taskName}</h5>
                                    <p className="card-text">{task?.taskId?.taskDesc}</p>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <span class="badge bg-success">{task?.status}</span>
                                        <span class="badge bg-danger" onClick={(e) => deleteTask(e, task._id)}>delete</span>
                                        {/* <span class="badge bg-danger" onClick={(e) => deleteTask(e, task._id)}>delete</span> */}
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

export default MyTask

