

import { useState } from 'react';


const Task = ({task, updateTask ,deleteTask}) => {

    const [taskN, setTaskN] = useState(task);

    const updateDone = (e) => {
        const updatedTask = {...taskN, done: !taskN.done};
        setTaskN(updatedTask);
        updateTask((prevTasks) => prevTasks.map((prevTask) => prevTask.id === updatedTask.id ? updatedTask : prevTask));
        setTaskN({...taskN, done: [e.target.checked]});
    }
 
    return(
        <div className="cita">

            <div>
                <div>
                    <p>Title: <span>{task.title}</span></p>
                    <p>Description: <span>{task.description}</span></p>
                </div>
                <div>
                    <label htmlFor="done" style={{display: 'inline-block', color: 'black'}}>Done</label>
                    <input id="done" type="checkbox" name="done" checked={taskN.done} onChange={updateDone} />
                </div>
            </div>

            <button className="button u-full-width" onClick={() => deleteTask(task.id)}>Delete task !!!</button>

        </div>
    );
}

export default Task;