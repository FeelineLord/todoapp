import React, {useState} from 'react';

const Header = ({ allCompleted, toggleAll, createTodo }) => {
  const [title, setTitle] = useState('');

  const changeTitle = (e) => {
    if (e.target.value.length > 30) {
      return ;
    };
    setTitle(e.target.value);
  };

  const handleEnter = (e) => {
    if (e.keyCode !== 13) {
      return ;
    }

    createTodo(title);
    setTitle('');
  };

  const handleBlur = () => {
    createTodo(title);
    setTitle('');
  };

  return (
    <header
      className="header">
      <h1>
        todos
      </h1>
      <input
      className="new-todo"
      placeholder="What needs to be done?"
      value={title}
      onChange={changeTitle}
      onKeyUp={handleEnter}
      onBlur={handleBlur}
      />
      <input
      type="checkbox" 
      id="toggle-all" 
      className="toggle-all"
      checked={allCompleted}
      onChange={() => toggleAll(allCompleted)} />
      <label
      htmlFor="toggle-all">
        Mark all as complete
      </label>
    </header>
  );
};

export default Header;