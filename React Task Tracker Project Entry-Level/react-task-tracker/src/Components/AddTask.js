//each input is gonna have it own piece of state, component level state, not app level state.
import { useState } from 'react';

const AddTask = ({ onAdd }) => {
  const [text, setText] = useState('');
  const [day, setDayTime] = useState('');
  const [reminder, setReminder] = useState(false); //default for Reminder is gonna be false.

  //a few thing we need to do is we're not calling onAdd directly.
  const onSubmit = (e) => { //it's gonna take in, a event object cuz we need to e.preventDefault, so it doesn't actually submit to a page.
    e.preventDefault();
    //when we do that we need a litle bit of validation on text.
    if (!text) {
      alert('Insert valid Text');
      return;
    }
    //create an object type Task, into onAdd we´re gonna pass in the tex, day, and reminder prop.
    onAdd({ text, day, reminder });
    
    //here we're gonna clean the form.
    setText('');
    setDayTime('');
    setReminder(false);
  };
  return (
    <form className="add-form" onSubmit={onSubmit}>
      <div className="form-control">
        <label>Task</label>
        <input
          //take value from state
          type="text"
          placeholder="Add Task"
          value={text}
          /*Also we need Onchange() function because when I start to type in the input, that's gonna fire off(lanzar)
        this onChange, it's a controlled component and it's gonna have a function where we´re gonna pass in, the event object
        and directly call setText function to update the state by set it to e.target.value -> this is new value typed.
        */
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div className="form-control">
        <label>Day and Time</label>
        <input
          type="text"
          placeholder="Add Date"
          value={day}
          /*same as Task*/
          onChange={(e) => setDayTime(e.target.value)}
        />
      </div>
      <div className="form-control form-control-check">
        <label>Set Reminder</label>
        <input
          type="checkbox"
          checked={reminder}
          value={reminder}
          onChange={(e) => setReminder(e.currentTarget.checked)}
        />
      </div>
      <input type="submit" value="Save Task" className="btn btn-block" />
    </form>
  );
};

export default AddTask;
