import React, { Component } from 'react';
import OrganisationForm from './OrganisationForm';
import './add-org.css';
import TopNav from '../TopNav';

export default class AddOrganisation extends Component {
  state = {
    name: "",
    area: "",
    borough: "Highbury and Islington",
    process: "Email, then call",
    day: "Monday",
    telephone: "028 297 4111",
    email: "",
    website: "",
    service: "",
    category: [],
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({
      area: "",
      borough: "",
      name: "",
      process: "",
      day: "",
      telephone: "",
      email: "",
      website: "",
      service: "",
      category: []
    })
  }

  updateNameField = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleCheckbox = e => {
    const listOfCategories = this.state.category;
    listOfCategories.push(e.target.value);
    this.setState({
      category: listOfCategories
    })
  }

  render() {
    return (
      <div>
        <TopNav />
        <div className="add-orgonaization">
          <h1>Add new orgonaization</h1>
          <OrganisationForm
            name={this.state.name}
            area={this.state.area}
            borough={this.state.borough}
            process={this.state.process}
            day={this.state.day}
            telephone={this.state.telephone}
            email={this.state.email}
            website={this.state.website}
            service={this.state.service}

            formType="org-content"
            onChange={this.updateNameField}
            onChangeCheckbox={this.handleCheckbox}
          />
          <button className="add-orgonaization-link" onClick={event => this.handleSubmit(event)}>SAVE CHANGES</button>
        </div>
      </div>
    )
  }
}