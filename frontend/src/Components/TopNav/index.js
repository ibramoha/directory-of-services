import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Avatar from 'material-ui/Avatar';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import { connect } from 'react-redux';
import { addFlashMessage } from '../../actions/flashMessages';
import { logout } from '../../actions/loginActions'
import './top-nav.css';
import helpers from '../../helpers';
import UserDropDown from '../Users/UserDropDown';
import categories from '../../Data/Categories.json';

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

  handleLogOut = (e) => {
    e.preventDefault();
    const res = this.props.logout();
    if (res) {
      this.props.addFlashMessage({
        type: 'LOGOUT_SUCCESS',
        text: 'You hve logged out successfully'
      });
      this.context.router.history.push('/')
    }
  }

  showUserDropDown = () => {
    this.setState({
      userDropDown: !this.state.userDropDown,
    });
  };

  renderUserDropDown = () =>
    this.state.userDropDown ? <UserDropDown handleLogOut={this.handleLogOut} role={this.props.user.role} /> : null;

  renderCategories = () => {
    const categoriesData = categories;
    const index1 = categoriesData.indexOf("Destitution/NRPF");
    const index2 = categoriesData.indexOf("Employment/Training/Volunteering");
    const index3 = categoriesData.indexOf("Young People/Children");
    if ((index1 !== -1 ) || (index2 !== -1) || (index3 !== -1)){
      categoriesData[index1] = "Destitution";
      categoriesData[index2] = "Employment";
      categoriesData[index3] = "Young People and Children";
    }
    return categoriesData
  }

  render() {
    const { classes, addLink, titleLink, title, addOrg, homePage } = this.props;
    const user = this.props.user.fullname ? this.props.user.fullname : '';
    const role = this.props.user.role ? this.props.user.role : '';
    const category = helpers.addSpace(this.renderCategories(), title);

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
                  {category}
                </Link>
                {addOrg || homePage || (role !== 'Admin' && role !== 'Editor') || this.props.userProfile ? null :
                  (
                    <Link to={`/${addLink}`} className="add-organization">
                      <span> Add a project </span>
                      <Button
                        className="add-organization-button"
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
              <Avatar
                onClick={this.showUserDropDown}
                className="avatar"
              >
                <Typography
                  variant="title"
                  color="inherit"
                  noWrap
                >
                  {user.charAt(0)}
                </Typography>
              </Avatar>
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
};

function mapStateToProps(state) {
  return {
    messages: state.flashMessages,
    user: state.loginAuth.user,
    categories: state.categoriesList
  }
}

export default withStyles(styles, { withTheme: true })(connect(mapStateToProps, { logout, addFlashMessage })(TopNav));