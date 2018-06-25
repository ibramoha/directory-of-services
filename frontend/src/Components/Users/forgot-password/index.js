import React, {Component} from 'react';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';

import './forgotPassword.css';

class ForgotPassword extends Component {
  state = {
    email: ''
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({email: ''});
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    return (
      <div className="forgot-password">
        <Paper className="form-card">
          <Typography color="primary" variant="display3">
            Forgot password
          </Typography>
          <p className="forgot-info">
            Enter your email address we will sent you a link to reset your password.
          </p>
          <Grid container spacing={24} onSubmit={this.handleSubmit}>
            <form className="forgot-password-form">
              <TextField
                type='email'
                placeholder="Email..."
                id="email"
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
                required
              />
              <Button variant="raised" size="small" type="submit" className="add-user-button">
                Sent
              </Button>
            </form>
          </Grid>
        </Paper>
      </div>
    );
  }
}

export default ForgotPassword;
