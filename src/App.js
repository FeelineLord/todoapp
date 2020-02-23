import React , { useState, useEffect } from 'react';

import Header from './components/Header';
import Todo from './components/Todo';
import Footer from './components/Footer';
import { Switch, Route } from 'react-router-dom';

const App = () => {
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem('todos')) || []
  );

  const [allCompleted, setAllCompleted] = useState(
    false
  );

  const [left, setLeft] = useState(
    0
  );

  let activeTodos = [ ...todos ].filter(item => {
    return item.completed === false;
  });

  let completedTodos = [ ...todos ].filter(item => {
    return item.completed === true;
  });

  useEffect(() => {
    if (!todos.length) {
      return ;
    } 

    checkCompleted(todos);
    checkLeft(todos);
  });

  useEffect(() => {
    activeTodos = [ ...todos ].filter(item => {
      return item.completed === false;
    });
    completedTodos = [ ...todos ].filter(item => {
      return item.completed === true;
    });
  }, [todos]);

  const createTodo = (title) => {
    if (!title) {
      return ;
    };
    const newTodo = {
      title,
      id: todos.length + 1,
      completed: false
    };

    const currentTodos = [ ...todos, newTodo ];
    setTodos([...currentTodos]);
    setAllCompleted(false);
    setLeft(left + 1);
    localStorage.setItem('todos', JSON.stringify(currentTodos));
  };

  const toggleAll = (bool) => {
    if (!todos.length) {
      return ;
    };
    const newTodos = [ ...todos ].map(item => {
      item.completed = !bool;
      return item;
    });

    setTodos([...newTodos]);
    setAllCompleted(!bool);
    checkLeft(newTodos);
    localStorage.setItem('todos', JSON.stringify(newTodos));
  };

  const checkCompleted = (currentArray) => {
    let bool = true;

    if (!currentArray.length) {
      bool = false
    } else {
      for (const item of currentArray) {
        if (item.completed === false) {
          bool = false;
          break;
        }
      };
    };
    setAllCompleted(bool);
  };

  const checkLeft = (currentArray) => {
    let count = 0;

    for (const todo of currentArray) {
      if (todo.completed === false) {
        count ++;
      };
    };

    setLeft(count);
  };

  const normalizeIds = (currentArray) => {
    const newTodos = [ ...currentArray ].map((item, index) => {
      item.id = index;
      return item;
    });

    setTodos([ ...newTodos ]);
  };

  const deleteTodo = (id) => {    
    const newTodos = [ ...todos ].filter(item => {
      return item.id !== id;
    });

    setTodos([...newTodos]);
    normalizeIds(newTodos);
    localStorage.setItem('todos', JSON.stringify(newTodos));
    checkCompleted(newTodos);
    checkLeft(newTodos);
  };

  const toggleTodo = (id, bool) => {
    const newTodos = [ ...todos ].map(item => {
      if (item.id === id) {
        item.completed = !bool;
      }
      return item;
    });
    
    setTodos([...newTodos]);
    localStorage.setItem('todos', JSON.stringify(newTodos));
    checkCompleted(newTodos);
    checkLeft(newTodos);
  };

  const editTodo = (id, newTitle) => {
    if (!newTitle) {
      deleteTodo(id);
      return ;
    };
    const newTodos = [ ...todos ].map(item => {
      if (item.id === id) {
        item.title = newTitle;
      }
      return item;
    });

    setTodos([...newTodos]);
    localStorage.setItem('todos', JSON.stringify(newTodos));
  };

  const clearCompleted = () => {
    const newTodos = [ ...todos ].filter(item => {
      return item.completed === false;
    });

    setTodos([...newTodos]);
    setAllCompleted(false);
    localStorage.setItem('todos', JSON.stringify(newTodos));
    normalizeIds(newTodos);
  };

  return (
    <section
    className="todoapp">
      <Header
      createTodo={createTodo}
      allCompleted={allCompleted}
      toggleAll={toggleAll}>
      </Header>
      <section
      className="main">
        <ul
        className="todo-list">
          <Switch>
            <Route
            path='/'
            exact render={() => 
              todos.map((todo, i) => (
                <Todo
                key={JSON.stringify(todo) + i}
                title={todo.title}
                id={todo.id}
                completed={todo.completed}
                deleteTodo={deleteTodo}
                toggleTodo={toggleTodo}
                editTodo={editTodo}>
                </Todo>
              ))}>
            </Route>
            <Route
            path='/active'
            render={() => 
              activeTodos.map((todo, i) => (
                <Todo
                key={JSON.stringify(todo) + i}
                title={todo.title}
                id={todo.id}
                completed={todo.completed}
                deleteTodo={deleteTodo}
                toggleTodo={toggleTodo}
                editTodo={editTodo}>
                </Todo>
              ))}>
            </Route>
            <Route
            path='/completed'
            render={() => 
              completedTodos.map((todo, i) => (
                <Todo
                key={JSON.stringify(todo) + i}
                title={todo.title}
                id={todo.id}
                completed={todo.completed}
                deleteTodo={deleteTodo}
                toggleTodo={toggleTodo}
                editTodo={editTodo}>
                </Todo>
              ))}>
            </Route>
          </Switch>
        </ul>
      </section>
      <Footer
        left={left}
        clearCompleted={clearCompleted}>
      </Footer>
    </section>
  );
};

export default App;
