import React from 'react';
import { NavLink } from 'react-router-dom';

const Footer = ({ left, clearCompleted }) => (
  <footer
  className="footer">
    <span
    className="todo-count">
      {
      left + (left === 1 
        ? ' item left'
        : ' items left')
      }
    </span>

    <ul
      className="filters">
      <li>
        <NavLink
        exact to='/'
        activeClassName='selected'>
          All
        </NavLink>
      </li>
      <li>
        <NavLink
        to='/active'
        activeClassName='selected'>
          Active
        </NavLink>
      </li>
      <li>
        <NavLink 
        to='/completed'
        activeClassName='selected'>
          Completed
        </NavLink>
      </li>
    </ul>

    <button
    type="button"
    className="clear-completed"
    onClick={clearCompleted}>
      Clear completed
    </button>
  </footer>
);

export default Footer;