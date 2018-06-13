import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import NotificationSystem from 'react-notification-system';
import { getListOfUsers} from '../../actions/getApiData';
import TopNav from '../TopNav';
import AddUser from './AddUser';
import UsersListTable from './UsersListTable';
import usersData from './usersData.json';

import './users.css';

class UsersPage extends Component {
  state = {
    fullname: '',
    organisation: '',
    role: '',
    notificationSystem: null,
    hideForm: null,
  };

  savedChangesSuccessfully = () => {
    this.state.notificationSystem.addNotification({
      title: 'Success',
      message: 'Your Changes have been saved successfully',
      level: 'success',
    });

    setTimeout(() => {
      this.setState({
        hideForm: !this.state.hideForm,
      });
    }, 500);
  };

  failedSavedChanges = () => {
    this.state.notificationSystem.addNotification({
      title: 'Unsuccess',
      message: 'We could not save your changes',
      level: 'error',
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.addNewUserHandler();
    this.setState({
      fullname: '',
      organisation: '',
      role: '',
    });
    this.savedChangesSuccessfully();
  };

  addNewUserHandler = () => {
    usersData.unshift({
      fullname: this.state.fullname,
      organisation: this.state.organisation,
      role: this.state.role,
    });
  };

  handleFieldUpdate = e =>
    this.setState({
      [e.target.name]: e.target.value,
    });
    
  render() {
    const users = this.props.listOfUsers.users ? this.props.listOfUsers.users.data : [] ;
    let userForm;
    const { params } = this.props.match;
    const { hideForm } = this.state;
    const isAddUsersPage = params && params.form === 'add';
    if (!isAddUsersPage) {
      userForm = null;
    } else {
      userForm = (
        <Fragment>
          <h2 className="add-users"> Add User </h2>
          <AddUser
            handleSubmit={this.handleSubmit}
            handleFieldUpdate={this.handleFieldUpdate}
            fullname={this.state.fullname}
            organisation={this.state.organisation}
            role={this.state.role}
            savedChangesSuccessfully={this.savedChangesSuccessfully}
          />
        </Fragment>
      );
    }

    return (
      <div className="users">
        <TopNav title="USERS" addLink="users/add" titleLink="users" />
        {userForm}
        <NotificationSystem ref="savedChanges" />
        <UsersListTable usersList={users} />
        {hideForm ? <Redirect to="/users" /> : null}
      </div>
    );
  }
}


function mapStateToProps (state) {
  return {
    listOfUsers:state.listOfUsers
  }
}

UsersPage.PropsTypes = {
  listOfUsers: PropTypes.array.isRequired,
}

UsersPage.contextTypes = {
  router: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, { getListOfUsers })(UsersPage);