//import PropTypes  from 'prop-types';
import { ImBin } from "react-icons/im";

const Task = ({_task, onDelete, onToggle}) => {
  return (
    
    <div 
    className={`task ${_task.reminder ? 
    'reminder' : " "}`} 
    onDoubleClick={() => onToggle(_task.id)}
    >

      {/*On the event onClick(() instead call onDelete() function directly
    I gonna call a function and then call oDelete and pass in _task.id*/}

      <h3>{_task.text} <ImBin style={{color: 'red',cursor: 'pointer'}} 
      onClick={() => onDelete(_task.id)}      
      />
      </h3>
      <p>{_task.day}</p>
    </div>
  )
}



export default Task
