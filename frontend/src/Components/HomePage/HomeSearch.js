import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest';
import { withStyles } from 'material-ui/styles';
import { withRouter } from 'react-router-dom';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import EditOrganisation from '../Organisation/EditOrganisation';
import SingleOrganisation from '../Organisation/SingleOrganisation';
import helpers from '../../helpers';
import OrganisationCard from '../Organisation/OrganisationCard';
import { getBranchesFilteredByPostCode } from '../../actions/postData';
import Spinner from '../Spinner';
import './HomePage.css'

const styles = theme => ({
  container: {
    flexGrow: 1,
    position: 'relative'
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0
  },
  suggestion: {
    display: 'block'
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none'
  }
});

class HomeSearch extends React.Component {
  state = {
    postcodeSuggestions: [],
    postcodeValue: '',
    organisations: [],
    suggestions: [],
    postcodes: [],
    postCode: '',
    editIdx: -1,
    search: '',
    value: '',
    postcodeError: '',
    isPostcode: false,
    isLoading: false,
    isHidden: true,
    sort: false,
  };

  componentWillReceiveProps(newProps) {
    const organisations = newProps.organisations
      ? newProps.organisations.data
      : [];
    const postcodes = newProps.organisations ? newProps.organisations.data
      .map(org => {
      const postcode = { postCode: org.postcode }
      return postcode;
      })
      .filter((elem, index, self) =>
        index === self.findIndex(orgs => orgs.postCode === elem.postCode)
      )
      : [];
    this.setState({ organisations, postcodes });
  }

  // allow user to press enter key for search
  handleKeyUp = (e) => {
    if (e.charCode === 13 || e.key === 'Enter') {
      this.updateSearchData();
    }
  }

  handleSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: helpers.getMainSearchSuggestions(value, this.state.organisations)
    });
  };

  handleSuggestionsClearRequested = () => {
    this.setState({ suggestions: [] });
  };

  handleChange = (event, { newValue }) => {
    this.setState({ value: newValue, isHidden: false, });
  };

  editSelectedOrganisation = idex => this.setState({ editIdx: idex });

  stopEditing = () => {
    this.setState({ editIdx: -1 });
  };

  // clear input value 
  clearSearchField = () => {
    this.setState({
      search: '',
      value: '',
      isHidden: true,
    })
  }

  clearPostcodeField = () => {
    this.setState({
      postCode: '',
      postcodeValue: '',
      isPostcode: false,
    })
  }

  handlePostSearch = async () => {
    if (this.state.postCode.length === 0) {
      return null;
    } else if (this.state.postCode.length < 5) {
      this.setState({ postcodeError: 'You have to inter valid postcode' })
    } else {
      const post = this.state.postCode.replace(/[' ']/g, '');
      this.setState({ isLoading: true, postcodeError: '' })
      const data = await fetch(`https://api.postcodes.io/postcodes/?q=${post}`);
      const res = await data.json()
      if (res && res.result && res.status === 200) {
        this.setState({ isLoading: true, sort: true })
        res.result.map(async info => {
          const lat = info.latitude
          const long = info.longitude
          const getBranches = await this.props.getBranchesFilteredByPostCode({ lat, long })
          const orgsData = [];
          getBranches.data.filter(resData => resData.distance)
            .map(branchs => {
              const { distance } = branchs;
              const orgs = branchs.data;
              return orgsData.push({ distance, ...orgs })
            })
          this.setState({ organisations: orgsData })
        })
        this.setState({ isLoading: false })
      } else {
        this.setState({ postcodeError: 'Your postcode is incorrect', isLoading: false })
      }
    }
  }

  updateSearchData = (e) => {
    e.preventDefault();
    if (this.state.postCode.length > 0) {
      this.setState({ postcodeValue: this.state.postCode, isPostcode: true })
      this.handlePostSearch()
    }
    this.setState({ search: this.state.value })
  }

  filterData = (orgs) => {
    const { search, postcodeValue } = this.state;
    if (search && postcodeValue) {
      return orgs.filter(org => org.org_name.toLowerCase().includes(search.toLowerCase()) || org.borough.toLowerCase().includes(search.toLowerCase())
        // return branches which service match or part of search 
        || search.toLowerCase().includes(org.service.toLowerCase())
        // return all branches which provide service on that day
        || org.service_days.toLowerCase().includes(search.toLowerCase())
        // return all branches if search match cat_name
        || org.cat_name.toLowerCase().includes(search.toLowerCase())
        // return all branches if search tag match 
        || org.tag.toLowerCase().includes(search.toLowerCase())
        // return all branches if search tag match
        || org.area.toLowerCase().includes(search.toLowerCase())
      )
    } else if (search) {
      return orgs.filter(org => org.org_name.toLowerCase().includes(search.toLowerCase()) || org.borough.toLowerCase().includes(search.toLowerCase())
        // return branches which service match or part of search 
        || search.toLowerCase().includes(org.service.toLowerCase())
        // return all branches which provide service on that day
        || org.service_days.toLowerCase().includes(search.toLowerCase())
        // return all branches if search match cat_name
        || org.cat_name.toLowerCase().includes(search.toLowerCase())
        // return all branches if search tag match 
        || org.tag.toLowerCase().includes(search.toLowerCase())
        // return all branches if search tag match
        || org.area.toLowerCase().includes(search.toLowerCase())
      )
        .sort(helpers.sortArrObj)
    } else if (postcodeValue) {
      return orgs
    }
    return [];
  }

  dataOrder = () => {
    if (!this.state.sort) {
      return helpers.sortArrObj
    }
    return (a, b) => parseFloat(a.distance) - parseFloat(b.distance)
  }

  handleSuggestionsFetchRequestedPostcode = ({ value }) => {
    this.setState({
      postcodeSuggestions: helpers.getSuggestions(value, this.state.postcodes),
    });
  };

  handleSuggestionsClearRequestedPostcode = () => {
    this.setState({
      postcodeSuggestions: [],
    });
  };

  handlePostCodeChange = (event, { newValue }) => {
    event.preventDefault();
    this.setState(
      {
        postCode: newValue,
        isPostcode: true
      }
    );
  };

  render() {
    const { editIdx, organisations } = this.state;
    const { classes } = this.props;
    if (this.state.isLoading || this.filterData.length === 0 || organisations.length <= 0) {
      return <Spinner />
    }
    if (!this.props.match.url.includes('/users')) {
      return (
        <div>
          <Grid container className="organisation-page" spacing={24}>
            <Grid item xs={12} className="search-input">
              <div className="search-text">
                <Autosuggest
                  theme={{
                    container: classes.container,
                    suggestionsContainerOpen: classes.suggestionsContainerOpen,
                    suggestionsList: classes.suggestionsList,
                    suggestion: classes.suggestion
                  }}
                  renderInputComponent={helpers.renderInput}
                  suggestions={this.state.suggestions}
                  onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
                  onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
                  renderSuggestionsContainer={helpers.renderSuggestionsContainer}
                  getSuggestionValue={helpers.getMainSearchSuggestionValue}
                  renderSuggestion={helpers.renderMainSearchSuggestion}
                  inputProps={{
                    classes,
                    placeholder: 'Search by keyword',
                    value: this.state.value,
                    onChange: this.handleChange,
                    onKeyUp: this.handleKeyUp
                  }}
                />
                <button
                  variant="raised"
                  size="small"
                  color="secondary"
                  className={this.state.isHidden ? 'hidden' : 'clear-search'}
                  onClick={this.clearSearchField}
                >
                  <i
                    className="material-icons"
                    size="small"
                    variant="raised"
                  >
                    close
                  </i>
                </button>
              </div>
              <span className="postcode-field">
                <Autosuggest
                  theme={{
                    container: classes.container,
                    suggestionsContainerOpen: classes.suggestionsContainerOpen,
                    suggestionsList: classes.suggestionsList,
                    suggestion: classes.suggestion,
                  }}
                  className="post-code-suggesition"
                  renderInputComponent={helpers.renderInput}
                  suggestions={this.state.postcodeSuggestions}
                  onSuggestionsFetchRequested={this.handleSuggestionsFetchRequestedPostcode}
                  onSuggestionsClearRequested={this.handleSuggestionsClearRequestedPostcode}
                  renderSuggestionsContainer={helpers.renderSuggestionsContainer}
                  getSuggestionValue={helpers.getSuggestionValue}
                  renderSuggestion={helpers.renderSuggestion}
                  inputProps={{
                    classes,
                    placeholder: 'Enter postcode',
                    name: 'postCode',
                    value: this.state.postCode,
                    onChange: this.handlePostCodeChange,
                  }}
                />
                <button
                  variant="raised"
                  size="small"
                  color="secondary"
                  className={!this.state.isPostcode ? 'hidden' : 'clear-postcode'}
                  onClick={this.clearPostcodeField}
                >
                  <i
                    className="material-icons"
                    size="small"
                    variant="raised"
                  >
                    close
                  </i>
                </button>
                <span className="postcode-error">{this.state.postcodeError}</span>
              </span>
              <Button
                onClick={this.updateSearchData}
                variant="raised"
                color="primary"
                size="small"
                className="btn-search"
              >
                Search
              </Button>
            </Grid>
            {this
              .filterData(organisations.sort(this.dataOrder()))
              .map((org, index) => {
                const currentlyEditing = editIdx === index;
                return currentlyEditing
                  ? (
                    <Fragment>
                      <EditOrganisation stopEditing={this.stopEditing} editOrgData={org} show />
                      <SingleOrganisation stopEditing={this.stopEditing} handleShawDetails org={org} />
                    </Fragment>
                  )
                  : (
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
        </div >
      );
    }
    return null;
  }
}

HomeSearch.propTypes = {
  classes: PropTypes.object.isRequired,
  getBranchesFilteredByPostCode: PropTypes.func.isRequired
};

export default connect(null, { getBranchesFilteredByPostCode })(withStyles(styles)(withRouter(props => <HomeSearch {...props} />)));
