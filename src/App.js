

import React, { useState, useEffect } from 'react';

// IMPORTACION DE COMPOMEMTES
import Formulario from './components/Formulario';
import Task from './components/Task';


function App() {

  let taskInit = JSON.parse(localStorage.getItem("tasks"));
  
  if(!taskInit) {
    taskInit = []; 
  }
  

  let [tasks, saveTasks] = useState(taskInit);

  useEffect(() => {
    if(taskInit){
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }else{
      localStorage.setItem('tasks', JSON.stringify([]));
    }
  },[tasks, taskInit]);

  const create = (task) => {
    saveTasks([...tasks, task]);
  }

  const updateTask = (updatedTask) => {
    saveTasks((prevTasks) => prevTasks.map((prevTask) => (prevTask.id === updatedTask.id ? updatedTask : prevTask)));
  }

  const deleteTask = (id) => {

    const restTasks = tasks.filter(task => {
      return task.id !== id;
    });
    
    saveTasks(restTasks);
    
  }

  return (
    <div className="App">
      <h1>Task app</h1>

      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario create={create}/>
          </div>
          <div className="one-half column">
            <h1>List</h1>
              {tasks.length === 0
                ?
                  <h2>No tasks !!!</h2>
                :
                tasks.map((task,index) =>{
                    return(
                      <Task task={task} updateTask={updateTask} deleteTask={deleteTask} key={index}/>
                    );
                  }
                )
              }
            
          </div>
        </div>
      </div>

    </div>
  );
}



export default App;
