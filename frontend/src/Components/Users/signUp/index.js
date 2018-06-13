import React, { Component } from 'react';
import NotificationSystem from 'react-notification-system';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import PasswordValidator from 'password-validator';
import SignUpFields from './SignUpFields';
import { signup } from '../../../actions/loginActions';
import './signUp.css';

const numbLetters = new PasswordValidator();
numbLetters
  .is()
  .min(6) // Minimum length 7
  .is()
  .max(256);

const letterTransform = new PasswordValidator(); // Maximum length 100
letterTransform
  .has()
  .uppercase() // Must have uppercase letters
  .has()
  .lowercase();

const digits = new PasswordValidator();
digits // Must have lowercase letters
  .has()
  .digits() // Must have digits
  .has()
  .not()
  .spaces() // Should not have spaces
  .is()
  .not()
  .oneOf(['Passw0rd', 'Password123']); // Blacklist these values

class SignUpForm extends Component {
  state = {
    fullname: '',
    organisation: '',
    email: '',
    emailError: '',
    password: '',
    passwordError: '',
    confirmPassword: '',
    confirmPasswordError: '',
    notificationSystem: null,
    organisations: [],
  };

  componentDidMount() {
    this.setState({
      notificationSystem: this.refs.savedChanges,
    });
  }

  savedChangesSuccessfully = (message) => {
    this.state.notificationSystem.addNotification({
      title: 'Success',
      message,
      level: 'success',
    });
  };

  failedSavedChanges = (message) => {
    this.state.notificationSystem.addNotification({
      title: 'Unsuccess',
      message,
      level: 'error',
    });
  };

  validateFormHandler = () => {
    let isError = false;
    const errors = {
      emailError: '',
      passwordError: '',
      confirmPasswordError: '',
    };

    if (this.state.email.indexOf('@') === -1) {
      isError = true;
      errors.emailError = 'Requires valid email';
    }

    if (!numbLetters.validate(this.state.password)) {
      isError = true;
      errors.passwordError += 'Your password need at least 6 characters.';
    }

    if (!letterTransform.validate(this.state.password)) {
      isError = true;
      errors.passwordError += ' You must include upper and lower case letters.';
    }

    if (!digits.validate(this.state.password)) {
      isError = true;
      errors.passwordError += ' You must include a digit and no space.';
    }

    if (this.state.password !== this.state.confirmPassword) {
      isError = true;
      errors.confirmPasswordError = ' Your password is not matching.';
    }
    this.setState({
      ...this.state,
      ...errors,
    });

    return isError;
  };



  handleSubmit = (e) => {
    e.preventDefault();
    const err = this.validateFormHandler();

    if (err) {
      this.failedSavedChanges('Please fill all the required fields');
    }
    const data = {
      fullname: this.state.fullname,
      email: this.state.email,
      organisation: this.state.organisation,
      password: this.state.password,
    }
    if (!err) {
      this.props.signup(data).then(user => {
        if (user.data && user.data.success !== false) {
          this.savedChangesSuccessfully(user.data.message);
          setTimeout(() => this.props.redirectToLogin(), 1000)
        } else {
          this.setState({ userVerification: user.data.message })
          this.failedSavedChanges(user.data.message);
        }
      });
    }
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    return (
      <div className="sign-up-page">
        <NotificationSystem ref="savedChanges" />
        <Paper className="form-card">
          <Typography color="primary" variant="display3">
            Create account 
          </Typography>
          <Grid container spacing={24}>
            <SignUpFields
              fullName={this.state.fullname}
              org={this.state.organisation}
              email={this.state.email}
              password={this.state.password}
              userNameError={this.state.userNameError}
              emailError={this.state.emailError}
              passwordError={this.state.passwordError}
              confirmPasswordError={this.state.confirmPasswordError}
              handleSubmit={this.handleSubmit}
              handleChange={this.handleChange}
              savedChangesSuccessfully={this.savedChangesSuccessfully}
              organisations={this.state.organisations}
            />
          </Grid>
        </Paper>
      </div>
    );
  }
}

SignUpForm.propTypes = {
  signup: PropTypes.func.isRequired
}
SignUpForm.contextTypes = {
  router: PropTypes.object.isRequired,
}

export default connect(null, { signup })(SignUpForm);
