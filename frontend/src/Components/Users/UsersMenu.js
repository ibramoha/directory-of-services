import React from 'react';
import {Link} from 'react-router-dom';
import './users.css';

const usersMenu = () => (
  <div className="users-menu">
    <Link 
      to="/users"
      role="button"
    >
      Users
    </Link>
  </div>
);
  
export default usersMenu;