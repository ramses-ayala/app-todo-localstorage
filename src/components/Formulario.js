import React, { useState } from 'react';

const Formulario = ({create}) => {

    const [task, setTask] = useState({
        'title': '',  
        'description': '',
        'done': false
    });

    let { title, description } = task;

    let [error, actualizarError] = useState(false);

    
    const uuid4 = () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c){
            let r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        })
    }

    const actualizarState = (event) => {
        setTask({...task, [event.target.name]: event.target.value});
    }

    const createTask = (event) => {
        event.preventDefault();

        if(title.trim() === '' || description.trim() === ''){
            actualizarError(true);
            console.log("HAY ERROR");
            return;
        }else{
            // RESETEAR EL STATE ERROR A FALSE
            actualizarError(false);

            // CREAR EL ID
            task.id = uuid4();          

            // CREATE TASK
            create(task);
    
            // RESET FORM
            //event.currentTarget.reset();
            setTask({
                'title': '',  
                'description': '',
                'done': false
            })
        }
    }

    return(
        <div id="caja-formulario">
            <h1>Form</h1>

            {/*MENSAJE DE ALERTA*/}
            {error ? <p className="alerta-error">All fields are required !!!</p> : null}


            <form id="formulario" name="form" onSubmit={createTask}>
                
                <label>Title:</label>
                <input className="u-full-width" type="text" name="title" value={title} placeholder="Task title"  onChange={actualizarState} />

                <label>Description:</label>
                <input className="u-full-width" type="text" name="description" value={description} placeholder="Task description" onChange={actualizarState}/>

                <input className="u-full-width button-primary" type="submit" value="Create task" />

            </form>
        </div>
    );
}

export default Formulario;