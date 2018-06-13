import React, { Component } from 'react';
import Table, {
  TableBody,
  TableCell,
  TableFooter,
  TablePagination,
  TableRow,
} from 'material-ui/Table';
import Button from 'material-ui/Button';
import Hidden from 'material-ui/Hidden';
import TextField from 'material-ui/TextField';
import { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';
import Select from 'material-ui/Select';
import Save from 'material-ui-icons/Save';
import NotificationSystem from 'react-notification-system';
import Notification from './Notification';

import UsersTableHead from './UsersTableHead';
import './user-table.css';

export default class UsersListTable extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      order: 'asc',
      orderBy: 'fullname',
      selected: [],
      data: [],
      page: 0,
      rowsPerPage: 5,
      editIdx: -1,
      notificationSystem: null,
    };
  }

  
  componentDidMount() {
    this.setState({
      notificationSystem: this.refs.savedChanges,
    });
  }

  componentWillReceiveProps (newProps) {
    const users = newProps.usersList;
    if(users) {
      this.setState({
        data: users,
      })
    }
    
  }

  savedChangesSuccessfully = () => {
    this.state.notificationSystem.addNotification({
      title: 'Success',
      message: 'Your Changes have been saved successfully',
      level: 'success',
    });
  };

  unSucessSavedChanges = event => {
    event.preventDefault();
    this.state.notificationSystem.addNotification({
      title: 'Unsuccess',
      message: 'Your Changes have not been saved successfully',
      level: 'error',
    });
  };

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    const data =
      order === 'desc'
        ? this.state.data.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
        : this.state.data.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));

    this.setState({ data, order, orderBy });
  };

  handleClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    this.setState({ selected: newSelected });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  removeUser = index => {
    this.setState(state => ({
      data: state.data.filter((row, rowIndex) => rowIndex !== index),
    }));
  };

  startEditing = index => {
    this.setState({ editIdx: index });
  };

  stopEditing = () => {
    this.setState({ editIdx: -1 }, this.savedChangesSuccessfully());
  };

  handleUserDataChange = (e, index) => {
    const { value } = e.target;
    this.setState({
      data: this.state.data.map(
        (row, rowIndex) =>
          rowIndex === index ? { ...row, [e.target.name]: value } : row,
      ),
    });
  };

  render() {
    const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
    const emptyRows = null;
    const { editIdx } = this.state;
    return (
      <Table className="users-table">
        <NotificationSystem ref="savedChanges" />
        <UsersTableHead
          numSelected={selected.length}
          order={order}
          orderBy={orderBy}
          onSelectAllClick={this.handleSelectAllClick}
          onRequestSort={this.handleRequestSort}
          rowCount={data.length}
        />
        <TableBody className="users-tbody">
          {data
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, index) => {
              const currentlyEditing = editIdx === index;
              return currentlyEditing ? (
                <tr key={row.id}>
                  <TableCell className="user-text">
                    <TextField
                      name="fullname"
                      onChange={e => this.handleUserDataChange(e, index)}
                      value={row.fullname}
                    />
                  </TableCell>
                  <TableCell className="user-text">
                    <TextField
                      name="organisation"
                      onChange={e => this.handleUserDataChange(e, index)}
                      value={row.organisation}
                    />
                  </TableCell>
                  <TableCell className="user-text">
                    <FormControl className="form-control-filed">
                      <InputLabel htmlFor="controlled-open-select">
                        Role
                      </InputLabel>
                      <Select
                        open={this.state.open}
                        onClose={this.handleClose}
                        value={row.role}
                        onChange={e => this.handleUserDataChange(e, index)}
                        inputProps={{
                          name: 'role',
                          id: 'controlled-open-select',
                        }}
                      >
                        <MenuItem value="None">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value="Admin">Admin</MenuItem>
                        <MenuItem value="Editor">Editor</MenuItem>
                      </Select>
                    </FormControl>
                  </TableCell>
                  <TableCell className="user-text">
                    <Button
                      variant="raised"
                      size="small"
                      type="submit"
                      className="edit-user-button"
                      onClick={this.stopEditing}
                    >
                      <Save className="save" /> save
                    </Button>
                  </TableCell>
                </tr>
              ) : (
                <TableRow key={row.id}>
                  <TableCell className="user-text">{row.fullname}</TableCell>
                  <Hidden xsDown>
                    <TableCell className="user-text">{row.organisation}</TableCell>
                  </Hidden>
                  <TableCell className="user-text">{row.role? row.role : 'None'}</TableCell>
                  <TableCell className="user-text">
                    <Button onClick={() => this.startEditing(index)} raised>
                      <i className="material-icons">edit</i>
                    </Button>
                    <Notification
                      value={row.fullname}
                      removeHandler={() => this.removeUser(index)}
                      title='USER'
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          {emptyRows > 0 && (
            <TableRow
              style={{
                height: 49 * emptyRows,
              }}
            >
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter className="users-tfoot">
          <TableRow>
            <TablePagination
              colSpan={6}
              count={data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              backIconButtonProps={{
                'aria-label': 'Previous Page',
              }}
              nextIconButtonProps={{
                'aria-label': 'Next Page',
              }}
              onChangePage={this.handleChangePage}
              onChangeRowsPerPage={this.handleChangeRowsPerPage}
            />
          </TableRow>
        </TableFooter>
      </Table>
    );
  }
}
