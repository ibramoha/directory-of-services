import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './categories.css';

export default class Categories extends Component {
  state = {
    categoriesList: false,
  };

  onClickChange = () => {
    this.setState({
      categoriesList: !this.state.categoriesList,
    });
  };

  showListOfcategories = () => {
    if (this.state.categoriesList) {
      return (
        <ul>
          <li>
            <Link to="/services/debt">Debt</Link>
          </li>
          <li>
            <Link to="/services/ypfamilies">YP Families</Link>
          </li>
          <li>
            <Link to="/services/womendv">Women DV</Link>
          </li>
          <li>
            <Link to="/services/trafficking">Trafficking</Link>
          </li>
          <li>
            <Link to="/services/destitution">Destitution</Link>
          </li>
          <li>
            <Link to="/services/lgbtqi">LGBTQI</Link>
          </li>
          <li>
            <Link to="/services/mentalhealthservices">Mental Health Services</Link>
          </li>
          <li>
            <Link to="/services/healthcare">Healthcare</Link>
          </li>
          <li>
            <Link to="/services/womendv">Women DV</Link>
          </li>
        </ul>
      );
    }
  };

  render() {
    return (
      <div className="categories">
        <span
          tabIndex={0}
          role="button"
          className="categories-title"
          onClick={this.onClickChange}
          onKeyPress={this.onClickChange}
        >
          Categories
        </span>
        {this.showListOfcategories()}
      </div>
    );
  }
}
