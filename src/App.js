

import React, { useState, useEffect } from 'react';

// IMPORTACION DE COMPOMEMTES
import Formulario from './components/Formulario';
import Task from './components/Task';


function App() {

  
  // CHECAR SI EXISTE LA CLAVE 'citas' en el localStorage
  let taskInit = JSON.parse(localStorage.getItem("tasks"));
  
  if(!taskInit) {
    taskInit = []; 
  }
  // ARREGLO DE CITAS
  let [tasks, saveTasks] = useState(taskInit);


  // use efect para realizar ciertas operaciones cuando el state cambia
  useEffect(() => {
    //console.log("DOCUMENTO LISTO O SE ACTUALIZO EL STATE CITAS");
    if(taskInit){
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }else{
      //console.log("ENTRO AL ELSE");
      localStorage.setItem('tasks', JSON.stringify([]));
    }
  },[tasks, taskInit]);



  // GUARDAR CITA EN EL STATE DE CITAS
  const create = (task) => {
    saveTasks([...tasks, task]);
    //console.log("ESTE LA CITA DESDE EL COM. App ", cita);
  }

  const updateTask = (updatedTask) => {
    saveTasks((prevTasks) => prevTasks.map((prevTask) => (prevTask.id === updatedTask.id ? updatedTask : prevTask)));
  }

  // ELIMINAR CITA DE CITAS POR ID
  const deleteTask = (id) => {

    const restTasks = tasks.filter(cita => {
      return cita.id !== id;
    });
    
    saveTasks(restTasks);
    //console.log("SE ELIMINARA EL: ",id);
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
