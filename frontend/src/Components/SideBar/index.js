import React from "react";
import { Link } from "react-router-dom";
import Categories from "../Categories";
import UsersMenu from '../Users/UsersMenu';
import "./side-bar.css";

const SideBar = () => (
  <nav className="mdc-drawer mdc-drawer--permanent mdc-typography">
    <div className="logo">
      <Link to="/">LOGO</Link>
    </div>
    <Categories />
    <UsersMenu />
  </nav>
);

export default SideBar;
