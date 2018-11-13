import React from 'react';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';

class ClientMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      anchorEl: null,
    };
  }
  

  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;

    return (
      <span>
        <IconButton
          aria-owns={anchorEl ? 'simple-menu' : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          <AccountCircleIcon />
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.handleClose}>Gestion des clients</MenuItem>
          <MenuItem onClick={this.handleClose}>Gestion des stations</MenuItem>
          <Divider />
          <MenuItem onClick={this.handleClose}>Logout</MenuItem>
        </Menu>
      </span>
    );
  }
}

export default ClientMenu;