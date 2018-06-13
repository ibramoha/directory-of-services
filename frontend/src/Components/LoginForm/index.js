import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import { connect } from 'react-redux';
import { login } from '../../actions/loginActions';
import Login from './LoginForm';
import SignUpForm from '../Users/signUp';
import ForgotPassword from '../Users/forgot-password';
import Spinner from '../Spinner';
import helpers from '../../helpers';
import './login-form.css';

class LoginForm extends Component {
  state = {
    email: '',
    password: '',
    isLoading: false,
    errors: {},
    userVerification: '',
    login: true,
    signup: false,
    reset: false
  };

  validation = () => {
    let isError = false;
    const errors = {
      emailErr: '',
      passwordErr: ''
    };
    const { email, password } = this.state
    if (!helpers.validEmail(email)) {
      isError = true;
      errors.emailErr = 'Please enter a valid email';
    }
    if (password.length <= 0) {
      isError = true;
      errors.passwordErr = 'Please enter your password';
    }
    this.setState({
      errors
    });
    return isError;
  };

  handleFieldsChange = e => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleLogin = async (e) => {
    e.preventDefault();
    const errors = this.validation();
    const error = {
      emailErr: '',
      passwordErr: '',
      authErr: ''
    };
    if (!errors) {
      this.setState({ isLoading: true });
      this.props.login(this.state).then(user => {
        if (user && user.status && user.status === 200 && user.data.token) {
          this.context.router.history.push('/home')
          this.setState({ isLoading: false, errors: error });
        } else {
          error.authErr = "Email or Password invalid"
          this.setState({ userVerification: error.authErr, isLoading: false, password: '' });
        }
      })
    }
  };

  switchPageHandler = page => {
    let userLogin;
    let userSignup;
    let userReset;
    if (page === 'login') {
      userLogin = true;
      userSignup = false
      userReset = false
    } else if (page === 'signup') {
      userLogin = false;
      userReset = false
      userSignup = true
    } else {
      userLogin = false;
      userReset = true
      userSignup = false
    }
    this.setState({ login: userLogin, signup: userSignup, reset: userReset });
  }
  handleBlur = e => {
    e.preventDefault();
    this.setState({ userVerification: '' });
  };

  redirectToLogin = () => {
    this.setState({
      login: true,
      signup: false,
      reset: false
    })
  }

  render() {
    const { emailErr, passwordErr, authErr } = this.state.errors;
    if (this.state.isLoading) {
      return <Spinner color='white' bgColor='spinnerLogin' />;
    }
    const logins = (<Login
      username={this.state.username}
      password={this.state.password}
      userVerification={this.state.userVerification}
      handleFieldsChange={this.handleFieldsChange}
      handleLogin={this.handleLogin}
      handleBlur={this.handleBlur}
      email={this.state.email}
      passwordErr={passwordErr}
      emailErr={emailErr}
      authErr={authErr}
    />);
    return (
      <Fragment>
        <div className="sign-title">
          <Button onClick={() => this.switchPageHandler('login')}>Login</Button>
          <Button onClick={() => this.switchPageHandler('signup')}>Register</Button>
          <Button onClick={() => this.switchPageHandler('reset')}>Reset</Button>
        </div>
        {this.state.login ? logins : null}
        {this.state.signup ? <SignUpForm redirectToLogin={this.redirectToLogin} /> : null}
        {this.state.reset ? <ForgotPassword /> : null}
      </Fragment>
    );
  }
}

LoginForm.propTypes = {
  login: PropTypes.func.isRequired
};
LoginForm.contextTypes = {
  router: PropTypes.object.isRequired
};

export default connect(null, { login })(LoginForm);
