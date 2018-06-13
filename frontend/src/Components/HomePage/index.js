import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TopNav from '../TopNav';
import HomeSearch from './HomeSearch';
import { getBoroughs, getAreas, getOrganisationsList, getListOfUsers } from '../../actions/getApiData';

class HomePage extends Component {

  componentDidMount() {
    this.props.getBoroughs();
    this.props.getAreas();
    this.props.getOrganisationsList();
    this.props.getListOfUsers();
  }

  render() {
    return (
      <div>
        <TopNav homePage />
        <HomeSearch />
      </div>
    )
  }
}

HomePage.propTypes = {
  getBoroughs: PropTypes.func.isRequired,
  getAreas: PropTypes.func.isRequired,
  getOrganisationsList: PropTypes.func.isRequired,
  getListOfUsers: PropTypes.func.isRequired
}

export default connect(null, { getBoroughs, getAreas, getOrganisationsList, getListOfUsers })(HomePage);
