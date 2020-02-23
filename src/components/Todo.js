import React, { useState, useEffect } from 'react';

const Todo = ({ title, id, completed, deleteTodo, toggleTodo, editTodo }) => {
  const [ editing, setEditing ] = useState(false);
  const [ editedTitle, setEditedTitle ] = useState(title);

  const editor = React.createRef();

  useEffect(() => {
    setEditedTitle(title);
  }, [title]);

  useEffect(() => {
    editor.current.focus();
  }, [editing]);

  const changeTodo = (e) => {
    if (e.target.value.length > 30) {
      return ;
    };
    setEditedTitle(e.target.value)
  };

  const handleEnter = (e, id) => {
    if (e.keyCode !== 13) {
      return ;
    }
    editTodo(id, editedTitle);
    setEditing(false);
  };

  const handleBlur = (id) => {
    editTodo(id, editedTitle);
    setEditing(false);
  };

  const todoState = completed
    ? 'completed'
    : editing 
      ? 'editing'
      : '';

  return (
    <li
    className={todoState}>
      <div
      className="view">
        <input
        type="checkbox"
        className="toggle"
        checked={completed}
        id={'todo-' + id}
        onChange={() => toggleTodo(id, completed)} />
        <label
        onDoubleClick={() => {setEditing(true)}}
        onBlur={handleBlur}>
          {title}
        </label>
        <button
        type="button"
        className="destroy"
        onClick={() => deleteTodo(id)} />
      </div>
      <input
        type="text"
        className="edit"
        value={editedTitle}
        autoFocus={true}
        ref={editor}
        onChange={changeTodo} 
        onBlur={() => handleBlur(id)}
        onKeyUp={(event) => handleEnter(event, id)} />
    </li>
  );
};

export default Todo;