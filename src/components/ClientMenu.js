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

class ClientMenu extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };
  }

  handleClick = event => {
    this.setState({ isOpen: true });
  };

  handleClose = () => {
    this.setState({ isOpen: false });
  };

  onItemClick = action => {
    this.setState({ isOpen: false });
    action()
  }

  render() {
    const { onEdit, onDelete } = this.props;
    const { isOpen } = this.state;

    return (
      <span>
        <IconButton
          onClick={this.handleClick}
          buttonRef={node => this.anchorEl = node}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          anchorEl={this.anchorEl}
          open={isOpen}
          onClose={this.handleClose}
        >
          <MenuItem onClick={() => this.onItemClick(onEdit)}>
            <ListItemIcon>
              <EditIcon />
            </ListItemIcon>
            <ListItemText inset primary="Modifier" />
          </MenuItem>
          <MenuItem onClick={() => this.onItemClick(onDelete)}>
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
