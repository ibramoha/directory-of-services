import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TableRow, TableCell, TableHead, TableSortLabel } from 'material-ui/Table';
import Hidden from 'material-ui/Hidden';
import Tooltip from 'material-ui/Tooltip';
import './user-table.css';

const columnData = [
  {
    id: 'fullname',
    numeric: false,
    disablePadding: false,
    label: 'Name',
  },
  {
    id: 'organisation',
    numeric: false,
    disablePadding: false,
    label: 'Organisation',
  },
  {
    id: 'role',
    numeric: false,
    disablePadding: false,
    label: 'Role',
  },
  {
    id: 'action',
    numeric: false,
    active: false,
    label: 'Actions',
  },
];

class UsersTableHead extends Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { params, usersList, order, orderBy } = this.props;
    return (
      <TableHead>
        <TableRow className="users-thead">
          {columnData.map(
            column => (
              ( column.label ===  params && usersList.length === 1) ? null :
              <TableCell
                key={column.id}
                numeric={column.numeric}
                padding={column.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === column.id ? order : false}
                className={usersList && usersList.length === 1 && 'user-role'}
              >
                <Tooltip
                  title={`Sort ${column.label}`}
                  placement={column.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={order}
                    onClick={this.createSortHandler(column.id)}
                  >
                    <Hidden smUp>
                      {!column.label.includes('Email') ? column.label : false}
                    </Hidden>
                    <Hidden xsDown>
                      {column.label }
                    </Hidden>
                  </TableSortLabel>
                </Tooltip>
              </TableCell> 
            ),
            this,
          )}
        </TableRow>
      </TableHead>
    );
  }
}

UsersTableHead.propTypes = {
  onRequestSort: PropTypes.func,
  order: PropTypes.string,
  orderBy: PropTypes.string,
};

function handleRequestSort() {
}

UsersTableHead.defaultProps = {
  order: "asc",
  orderBy: "fullname",
  onRequestSort: handleRequestSort()
};

export default UsersTableHead;