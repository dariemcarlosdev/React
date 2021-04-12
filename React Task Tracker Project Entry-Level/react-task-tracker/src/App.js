import './App.css';
import Header from './Components/Header';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import React from 'react';
import Tasks from './Components/Tasks';
//In order to load the .json when the page loads, we use the useEffect hook, often is used to create/deal with side effects.
//And it often used when User want something to happen right away page loads.
import { useState, useEffect } from 'react';
import AddTask from './Components/AddTask';
import Footer from './Components/Footer';
import About from './Components/About';

// function App() {
//   return (
//     <div className='container'>
//     <Header />
//     </div>
//   )
// }

const App = () => {
  //Piece of state to toggle add new task form to make click on Add Task button.
  const [showAddTask, setShowAddTask] = useState(false);

  //Return a value with state(tasks_array) and a funtion to update it (setTasks ).
  const [tasks_array, setTasks] = useState([]);

  //Fetch Tasks Function. I put it apart cuz it's gonna be used somewhere else.
  const fetchTasks = async (id) => {    
    const response = await fetch(
     id === undefined ? `http://localhost:5000/tasks_array` : `http://localhost:5000/tasks_array/${id}`  /*u can replace this for any back-end API*/
    ); //fetch return a Promise
    const data = await response.json();
    console.log(data);
    return data;
  };

  // //Retrive single Tasks Function.
  // const RetrieveTask = async (id) => {
  //   const response = await fetch(`http://localhost:5000/tasks_array/${id}`);
  //   //fetch return a Promise so it's have to be await.
  //   const data = await response.json();
  //   console.log(data);
  //   return data;
  // };

  //useEffect Hook
  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    };
    getTasks();
  }, []); //here we pass an empty array cuz we do not have dependency, if we have a value where we want it run, if that value changes, we would pass it in here as a dependency.

  //Delete Task Function
  const DeleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks_array/${id}`, {
      //add second argument of an object where specify the method of this request to be a DELETE.
      method: 'DELETE',
    });
    //  console.log('task delete', id);
    //Here we call setTask cuz that's how we deal with our mutable state, and it used to update the initial state.
    setTasks(tasks_array.filter((task) => task.id !== id));
  };

  //Toggle Reminder
  const ToggleReminder = async (id) => {
    const taskToToggle = await fetchTasks(id);
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder };

    const response = await fetch(`http://localhost:5000/tasks_array/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updTask),
    });

    const data = await response.json();
    //Here we call setTasks cuz that's how we deal with our mutable state.
    setTasks(
      tasks_array.map((task) =>
        task.id === id
          ? //If id on element in array = id we passed in, we gonna have an specific object
            //else it gonna be same element in array, is no change. We only need to change the
            //one we´re dealing with, so for this object I gonna copy all of the properties and values using (...(obj))
            //but I wanna change the reminder property, so for remainder I'll set the opposite of whatever value reminder is. (if it's false it'll be tru and viceversa)
            { ...task, reminder: data.reminder }
          : task
      )
    );
  };

  //Add Task
  const addTask = async (task) => {
    /*Here we don't need to create a id, cuz it assign an id for us*/

    // //console.log(task);
    // //now instead of console.log I want to add the task to the state
    // const id = Math.floor(Math.random() * 1000) + 1;
    // console.log(id);

    // //create new Task with id and then add whatever the task has as parameters (text, day reminder)
    // const newTask = { id, ...task };
    // console.log(newTask);
    // //here I call setTasks hook function to update tasks array state, by copying newTask to the array tasks_array.
    // setTasks([...tasks_array, newTask]);

    const response = await fetch(`http://localhost:5000/tasks_array/`, {
      //add second argument of an object where specify the method of this request to be a DELETE.
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    });
    const data = await response.json(); //data that's returned is the new task that´s added.
    setTasks([...tasks_array, data]);
  };

  return (
    <Router>
      <div className="container">
        <Header /*title={1 + ' Task Tracker'}*/
          onShowTask={() => setShowAddTask(!showAddTask)}
          showAddTask={showAddTask}
        />

        <Route path="/" exact render={(props) =>
          (<>
          
        {
          /*&&-shortly ternary conditional expression:if showAddTask is true, show component*/
          showAddTask && <AddTask onAdd={addTask} />
        }
        {tasks_array.length > 0 ? (
          <Tasks
            tasks_array_prop={tasks_array}
            onDelete={DeleteTask} /*onDelete is gonna be a prop of Tasks*/
            onToggle={ToggleReminder}
          />
        ) : (
          <h3>No Tasks To-Do</h3>
        )}
          </>
          )} 
          />
        <Route path="/About" component={About} />
        <Footer />
      </div>
    </Router>
  );
};

export default App;
