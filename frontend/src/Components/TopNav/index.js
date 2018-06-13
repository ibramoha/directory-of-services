import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import { connect } from 'react-redux';
import { logout } from '../../actions/loginActions'
import './top-nav.css';
import helpers from '../../helpers';
import UserDropDown from '../Users/UserDropDown';
import { getCategories } from '../../actions/getApiData';

const drawerWidth = 240;

const styles = theme => ({
  appBar: {
    position: 'absolute',
    marginLeft: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
    background: '#1abcd4',
  },
});

class TopNav extends Component {
  state = {
    userDropDown: false,
  };

  componentDidMount() {
    this.props.getCategories();
  }

  handleLogOut = (e) => {
    e.preventDefault();
    this.context.router.history.push('/')
    this.props.logout();
  }

  showUserDropDown = () => {
    this.setState({
      userDropDown: !this.state.userDropDown,
    });
  };

  renderUserDropDown = () =>
    this.state.userDropDown ? <UserDropDown handleLogOut={this.handleLogOut} /> : null;

  render() {
    const { classes, addLink, titleLink, title, addOrg, user, homePage } = this.props;
    const categoriesData = this.props.categories.categories ? this.props.categories.categories : [];
    return (
      <AppBar className={classes.appBar}>
        <Toolbar>
          <Grid container spacing={24} className="top-nav-content">
            <Grid item xs={8}>
              <Typography
                className="add-new-button add-organisation-title"
                variant="title"
                color="inherit"
                noWrap
              >
                {addOrg}
                <Link to={`/${titleLink}`}>
                  {helpers.addSpace(categoriesData, title)}
                </Link>
                {addOrg || homePage ? null :
                  (
                    <Link to={`/${addLink}`} className="add-orgnaization">
                      <Button
                        className="add-orgonaization-button"
                        variant="fab"
                        aria-label="add"
                      >
                        <AddIcon />
                      </Button>
                    </Link>
                  )
                }
              </Typography>
            </Grid>
            <Grid className="login-section" item xs={4}>
              <Typography
                variant="title"
                color="inherit"
                noWrap
              >
                {user}
              </Typography>
              <Button
                onClick={this.showUserDropDown}
                className="logo-button"
                /* variant="fab" */
                color="primary"
              >
                <i className="material-icons">person</i>
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
        {this.renderUserDropDown()}
      </AppBar>
    );
  }
}

TopNav.contextTypes = {
  router: PropTypes.object.isRequired,
  classes: PropTypes.object,
  logout: PropTypes.func,
  user: PropTypes.object,
  getCategories: PropTypes.func,
};
function mapStateToProps(state) {
  return {
    messages: state.flashMessages,
    user: state.loginAuth.user.fullname,
    categories: state.categoriesList
  }
}

export default withStyles(styles, { withTheme: true })(connect(mapStateToProps, { logout, getCategories })(TopNav));
