import React from "react";
import PropTypes from "prop-types";

import { 
  Menu, 
  MenuItem, 
  ListItemIcon, 
  ListItemText, 
  IconButton 
} from "@material-ui/core";

import { 
  MoreVert as MoreVertIcon, 
  Edit as EditIcon,
  Delete as DeleteIcon
} from "@material-ui/icons";

class ClientMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      anchorEl: null
    };
  }

  handleClick = event => {
    this.setState({ isOpen: true, anchorEl: event.target });
  };

  handleClose = () => {
    this.setState({ isOpen: false, anchorEl: null });
  };

  render() {
    const { onEdit, onDelete } = this.props;
    const { isOpen, anchorEl } = this.state;

    return (
      <span>
        <IconButton onClick={this.handleClick}>
          <MoreVertIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={isOpen}
          onClose={this.handleClose}
        >
          <MenuItem onClick={onEdit}>
            <ListItemIcon>
              <EditIcon />
            </ListItemIcon>
            <ListItemText inset primary="Modifier" />
          </MenuItem>
          <MenuItem onClick={onDelete}>
            <ListItemIcon>
              <DeleteIcon />
            </ListItemIcon>
            <ListItemText inset primary="Supprimer" />
          </MenuItem>
        </Menu>
      </span>
    );
  }
}

ClientMenu.propTypes = {
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default ClientMenu;
