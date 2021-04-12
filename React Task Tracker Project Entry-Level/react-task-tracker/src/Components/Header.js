import PropTypes from 'prop-types';
import Button from './Button';
import { useLocation } from 'react-router-dom';

const Header = (/*props*/ { title, onShowTask, showAddTask }) => {
  const location = useLocation();
  return (
      <header className="header">
        <h1 /*style={{headerStyle}}*/>{/*props.title*/ title}</h1>
        {location.pathname === '/' &&  <Button //show button if not, show nothing.
          color={showAddTask ? 'red' : 'green'}
          text={showAddTask ? 'Close' : 'Add'}
          onClick={onShowTask}
        />}
      </header>
  );
};

Header.defaultProps = {
  title: 'Task Tracker',
};

Header.propTypes = {
  title: PropTypes.string,
};

//CSS in JS
/* const headerStyle = {
  color: 'red', backgroundColor: 'black'
} */

export default Header;
