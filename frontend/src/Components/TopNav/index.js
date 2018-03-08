import React from 'react';
import { Link } from "react-router-dom";
import './top-nav.css';

const TopNav = () =>(
  <div>
    <div className="main-nav">
      <div>
        <span>HEALTHCARE</span>
        <Link to="/organisations/add" className="add-orgnaization"><span className="add-orgonaization-button">Add new</span></Link>
      </div>
      <div className="login-section">
        <h4>Loggedin as <strong>Carmela</strong></h4>
      </div>
    </div>   
  </div>
);


export default TopNav;