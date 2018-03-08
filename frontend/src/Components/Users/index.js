import React from 'react';
import { Link } from "react-router-dom";
import './users.css';

const usersPage = () => (
  <div className="users">
    <div className="main-nav">
      <div>
        <span>USERS</span>
        <Link to="/users/add" className="add-user-title"><span className="add-new-user-button">Add new</span></Link>
      </div>
      <div className="login-section">
        <h4>Loggedin as <strong>Carmela</strong></h4>
      </div>
    </div>
  </div >
);
  
export default usersPage;