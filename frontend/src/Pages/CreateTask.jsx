
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'


function CreateTask() {

    const [taskName, setTaskName] = useState("")
    const [taskDesc, setTaskDesc] = useState("")
    const [showAlert, setShowAlert] = useState(false)
    const [errors, setErrors] = useState({})

    const navigate = useNavigate()

    const onTaskNameChange = (e) => {
        setTaskName(e.target.value)
    }

    const onTaskDescChange = (e) => {
        setTaskDesc(e.target.value)
    }
    const validateTaskFields = () => {
        let errors = {}
        if (!taskName) {
            errors.taskName = "Please enter a task name."
        } if (!taskDesc) {
            errors.taskDesc = "Please enter a task description."
        }
        return errors;

    }

    const createTask = (taskData) => {
        let errors = validateTaskFields()
        setErrors(errors)
        if (Object.keys(errors).length === 0) {
            fetch("http://localhost:7000/task/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(taskData)
            }).then(function (res) {
                return res.json()
            }).then(function (result) {
                if (result._id) {
                    setShowAlert(true)
                    setTaskName("")
                    setTaskDesc("")
                }
                console.log("data saved successfully")
                // navigate("/task")
            })
        } else {
            return
        }
    }

    const saveTask = (e) => {
        e.preventDefault();
        let taskData = {
            taskName,
            taskDesc,
            status: "not_started",
            assigned: true
        }

        createTask(taskData)
    }


    return (
        <div className='container'>
            <h4>Create task page</h4>

            <div className='card' style={{ 'padding': '20px', 'marginTop': '50px', width: '30%' }}>
                <div className='body'>

                    <form onSubmit={saveTask}>
                        <div className='form-group' style={{ padding: "20px" }}>
                            <label>Name: </label><br />
                            <input className='form-controle'  onChange={onTaskNameChange} /><br />
                        </div>
                        <p className='error-text'>{errors?.taskName}</p>

                        <div className='form-group' style={{ padding: "20px" }}>
                            <label>Description: </label><br />
                            <textarea className='form-controle' value={taskDesc} onChange={onTaskDescChange}></textarea><br />
                        </div>
                        <p className='error-text'>{errors?.taskDesc}</p>

                        <button style={{ marginLeft: "20px" }} type="submit" className='btn btn-primary'>Submit Task</button>
                    </form>
                </div>
            </div>
            {showAlert && <div className="row">
                <div className="col-md-3 mt-4">
                    <div class="alert alert-success" role="alert">
                        Task Create Successfully!!
                    </div>
                </div>
            </div>}
        </div>
    )
}

export default CreateTask
