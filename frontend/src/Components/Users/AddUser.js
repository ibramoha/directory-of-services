import React, { Component, Fragment } from 'react';
import TextField from 'material-ui/TextField';
import { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';
import Button from 'material-ui/Button';
import Select from 'material-ui/Select';
import Users from './index';

export default class AddUser extends Component {
  state = {
    fullName: "",
    email: "",
    role: "editor",
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({
      fullName: "",
      email: "",
      role: "editor",
    })
  }

  handleFieldUpdate = (e) => (
    this.setState({
      [e.target.name]: e.target.value,
    })
  );

  render() {
    return (
      <Fragment>
        <Users />
        <form className="add-user">
          <TextField
            label="Full name"
            className="full-name"
            name="fullName"
            value={this.state.fullName}
            onChange={this.handleFieldUpdate}
          />
          <TextField
            className="email"
            label="Email"
            name="email"
            value={this.state.email}
            onChange={this.handleFieldUpdate}
          />
          <span>
            <button className="select-button" onClick={this.handleOpen} />
            <FormControl className="form-control-filed">
              <InputLabel htmlFor="controlled-open-select">Role</InputLabel>
              <Select
                open={this.state.open}
                onClose={this.handleClose}
                onOpen={this.handleOpen}
                value={this.state.role}
                onChange={this.handleFieldUpdate}
                inputProps={{
                  name: 'role',
                  id: 'controlled-open-select',
                }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="editor">editor</MenuItem>
                <MenuItem value="admin">admin</MenuItem>
              </Select>
            </FormControl>
          </span>
          <Button
            variant="raised"
            type="submit"
            className="add-user-button"
            onClick={this.handleSubmit}
          >
          SAVE CHANGES  
          </Button>
        </form >
      </Fragment>
    )
  }
};