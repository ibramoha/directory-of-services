import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Grid from 'material-ui/Grid';
import EditOrganisation from './EditOrganisation';
import SingleOrganisation from './SingleOrganisation';
import { getBranchsByCategory } from '../../actions/getApiData';
import Search from './Search';
import TopNav from '../TopNav';
import helpers from '../../helpers';
import OrganisationCard from './OrganisationCard';
import categoriesData from '../../Data/Categories.json';
import './index.css';

function getSelectedCategory(match) {
  const { params } = match;
  const service =
    params && params.service
      ? helpers.linkMaker(params.service)
      : null;
  return service;
}

class Organisations extends Component {
  state = {
    organisations: [],
    editIdx: -1,
    category: getSelectedCategory(this.props.match),
    day: '',
    borough: '',
    postCode: '',
  };

  componentDidMount() {
    const category = helpers.addSpaceToCategName(categoriesData, this.props.match.url);
    this.props.getBranchsByCategory(category);
  }


  componentWillReceiveProps(newProps) {
    const { oganisation } = newProps;
    this.setState({
      category: getSelectedCategory(newProps.match),
      organisations: oganisation,
    });
  }

  handleSelectedDay = event => {
    this.setState({ day: event.target.value });
  };

  handleSelectedBorough = event => {
    this.setState({ borough: event.target.value });
  };

  filterByPostcode = postCode => {
    if (!postCode) {
      this.setState({
        organisations: this.state.organisations,
      });
    }
    const filteredOrg = this.state.organisations;
    if (filteredOrg && filteredOrg.filter) {
      this.setState({
        organisations: filteredOrg
      });

    }
  };

  handlePostCodeChange = (event, { newValue }) => {
    this.setState(
      {
        postCode: newValue,
      },
      this.filterByPostcode(newValue),
    );
  };


  editSelectedOrganisation = idex =>
    this.setState({
      editIdx: idex,
    });
  stopEditing = () => {
    this.setState({
      editIdx: -1,
    });
  };

  filterData = (data) => {
    const { day, borough } = this.state;
    if (day.length > 0 && borough.length > 0) {
      return data.filter(orgs =>
        orgs.service_days.includes(day) && orgs.borough.includes(borough)
      )
    } else if (day.length > 0 && borough.length <= 0) {
      return data.filter(orgs =>
        orgs.service_days.includes(day)
      )
    } else if (day.length <= 0 && borough.length > 0) {
      return data.filter(orgs =>
        orgs.borough.includes(borough)
      )
    }
    return data;
  }

  render() {
    const { editIdx, category, postCode, borough, day, organisations } = this.state;

    return (
      <div>
        <TopNav
          title={category}
          addLink={`services/${category}/add`}
          titleLink={`services/${category}`}
        />
        <Search
          service={category}
          borough={borough}
          day={day}
          postCode={postCode}
          handleSelectedDay={this.handleSelectedDay}
          handleSelectedBorough={this.handleSelectedBorough}
          handlePostCodeChange={this.handlePostCodeChange}
        />
        <Grid container className="organisation-page" spacing={24}>
          {this.filterData(organisations.sort(helpers.sortArrObj)).map((org, index) => {
            const currentlyEditing = editIdx === index;
            return currentlyEditing ? (
              <Fragment>
                <EditOrganisation
                  stopEditing={this.stopEditing}
                  editOrgData={org}
                  show
                />
                <SingleOrganisation
                  stopEditing={this.stopEditing}
                  handleShawDetails
                  org={org}
                />
              </Fragment>
            ) : (
              <Grid item xs={12} sm={6} key={org.id}>
                <OrganisationCard
                  getData={() => this.editSelectedOrganisation(index)}
                  org={org}
                  index={index}
                />
              </Grid>
              );
          })}
        </Grid>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    oganisation: state.filteredBranchsByCategory.branchs,
  }
}

export default connect(mapStateToProps, { getBranchsByCategory })(Organisations);
