import React, { Component } from 'react';
import Dialog, {
  DialogTitle,
  DialogContent,
  DialogActions,
} from 'material-ui/Dialog';
import EditOrganisation from './EditOrganisation';
import './single-org.css';

export default class SingleOrganisation extends Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  render() {
    return (
      <div className="single-oganisation">
        <button className="orgnaization-detais-button" onClick={this.handleOpen}><span className="button-title">DETAILS</span></button>
        <Dialog
          className="single-org-dialog"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <DialogActions>
            <button onClick={this.handleClose} className="single-oganisation-close-button">Close</button>
          </DialogActions>
          <EditOrganisation />
          <DialogTitle className="single-oganisation-title" id="alert-dialog-title">Haringey Migrant Service</DialogTitle>
          <DialogContent className="single-oganisation-content">
            <h4 className="details-area">Area: North | Borough: Haringey</h4>
            <div className="health-advice-process">
              <h4> - Health advice</h4>
              <h4> - Help accessing NHS</h4>
            </div>
            <div className="single-process-date">
              <div>
                <h4>Process</h4>
                <p>Call in advance (appt only)</p>
              </div>
              <div>
                <h4>Day</h4>
                <p>Monday</p>
              </div>
            </div>
            <div className="single-telephone-email">
              <div>
                <h4>Telephone</h4>
                <p>028 297 4111</p>
              </div>
              <div>
                <h4>Email</h4>
                <p>test@test.com</p>
              </div>
            </div>
            <a className="website-link" target="blank" href="http://www.haringeymsc.org">http://www.haringeymsc.org</a>
            <h5 className="detail-footer">Healthcare, trafficking, destituition</h5>
          </DialogContent>
        </Dialog>
      </div>
    )
  }
}