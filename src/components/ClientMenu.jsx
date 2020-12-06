import React from "react";
import PropTypes from "prop-types";

import {
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Divider,
} from "@material-ui/core";

import {
  MoreVertOutlined as MoreVertIcon,
  PersonOutlined as EditClientIcon,
  LockOutlined as EditUserIcon,
  DeleteOutlined as DeleteIcon,
} from "@material-ui/icons";

class ClientMenu extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };
  }

  handleClick = (event) => {
    event.stopPropagation();
    this.setState({ isOpen: true });
  };

  handleClose = (event) => {
    event.stopPropagation();
    this.setState({ isOpen: false });
  };

  onItemClick = (event, action) => {
    event.stopPropagation();
    this.setState({ isOpen: false });
    action();
  };

  render() {
    const { onClientEdit, onUserEdit, onDelete } = this.props;
    const { isOpen } = this.state;

    return (
      <span>
        <IconButton
          onClick={this.handleClick}
          buttonRef={(node) => (this.anchorEl = node)}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu anchorEl={this.anchorEl} open={isOpen} onClose={this.handleClose}>
          <MenuItem onClick={(event) => this.onItemClick(event, onClientEdit)}>
            <ListItemIcon>
              <EditClientIcon />
            </ListItemIcon>
            <ListItemText primary="Modifier Client" />
          </MenuItem>
          <MenuItem onClick={(event) => this.onItemClick(event, onUserEdit)}>
            <ListItemIcon>
              <EditUserIcon />
            </ListItemIcon>
            <ListItemText primary="Modifier Usager" />
          </MenuItem>
          <Divider />
          <MenuItem onClick={(event) => this.onItemClick(event, onDelete)}>
            <ListItemIcon>
              <DeleteIcon />
            </ListItemIcon>
            <ListItemText primary="Supprimer" />
          </MenuItem>
        </Menu>
      </span>
    );
  }
}

ClientMenu.propTypes = {
  onClientEdit: PropTypes.func.isRequired,
  onUserEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ClientMenu;
