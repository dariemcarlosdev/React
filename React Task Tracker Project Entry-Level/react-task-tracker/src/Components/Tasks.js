//import PropTypes from 'prop-types';
import  Task  from './Task';



const Tasks = (/*title*/{tasks_array_prop, onDelete, onToggle}) => {


  return (
    // <div>
    //   <h1>{title}</h1>
    // </div>
<>
    {tasks_array_prop.map((task) => (  //task represent each object into array asks_Prop_Array
    <Task 
    key={task.id} 
    _task={task} 
    onDelete={onDelete} //I need to pass onDelete prop here cuz it´s when I wan to use it, into Task component.
    onToggle = {onToggle}//I need to pass onToggle prop here cuz it´s when I wan to use it, into Task component.
    />
   
    ))}
</>

  )
}

export default Tasks
