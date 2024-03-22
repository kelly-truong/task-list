import React, { useEffect, useState } from 'react'
import './TaskForm.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const TaskForm = () => {
    const [input, setInput] = useState("")
    const [tasks, setTasks] = useState([])

    useEffect(() => {
        if (tasks.length === 0) {
            return
        }
        localStorage.setItem('tasks', JSON.stringify(tasks))
    }, [tasks])

    useEffect(() => {
        const tasks = JSON.parse(localStorage.getItem('tasks'))
        setTasks(tasks)
    }, [])

    const addTask = () => {
        setTasks([...tasks, { name: input, done: false }])
        setInput("")
    }

    const checkTask = (name, done) => {
        setTasks(tasks => tasks.map(task => {
            if (task.name === name) {
                return { ...task, done }
            }
            return task
        }))
    }

    const deleteTask = (name) => {
        setTasks(tasks => tasks.filter(task => task.name !== name))
    }

    return (
        <div className="container">
            <div className="input__box">
                <input
                    onKeyDownCapture={(event) => { if (event.key === "Enter") addTask() }}
                    type="text"
                    placeholder="My new task"
                    value={input}
                    onChange={event => setInput(event.target.value)}
                />

                <button
                    onClick={addTask}
                    disabled={!input} >
                    Add
                </button>
            </div>

            <ul>
                <div className="no__tasks">
                    {tasks.length === 0 && "Nothing to do :("}
                </div>
                {tasks.map(task => (
                    <li className="task__box" >
                        <input
                            type="checkbox"
                            checked={task.done}
                            onChange={event => checkTask(task.name, event.target.checked)}
                        />
                        <div className="task__name">
                            {task.name}
                        </div>
                        <button className="trash" onClick={() => deleteTask(task.name)}>
                            <FontAwesomeIcon icon="trash-can" />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default TaskForm