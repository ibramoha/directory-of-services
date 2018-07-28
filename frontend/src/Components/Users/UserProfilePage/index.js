  import React, { Component } from 'react';
  import { connect } from 'react-redux';
  import PropTypes from 'prop-types';
  import TopNav from '../../TopNav';
  import './Userprofile.css'

  class UserProfile extends Component {
    constructor(props){
      super(props)
      this.state ={}
    }
    render(){
      const users = this.props.userInfo ? this.props.userInfo : [] ;
      return (
        <div className="user-page">
          <TopNav />
          <br />
          <h2>My Aaccount Details</h2>
          <br />
          <br />
          <h4><strong>Full Name: </strong>{users.fullname}</h4>
          <br />
          <br />
          <h4><strong>Email: </strong>{users.email}</h4>
          <br />
          <br />
          <h4><strong>Role: </strong>{users.role}</h4>
          <br />
          <br />
          <h4><strong>Organisation: </strong>{users.organisation}</h4>
        </div>
      )
    }
  }
    function mapStateToProps(state) {
      return {
        userInfo: state.loginAuth.user,
      }
    }

    UserProfile.PropsTypes = {
      userInfo: PropTypes.array.isRequired,
    }

    export default connect(mapStateToProps)(UserProfile);
