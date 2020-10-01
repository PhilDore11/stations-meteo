import React from "react";
import PropTypes from "prop-types";

import { 
  Menu, 
  MenuItem, 
  ListItemIcon, 
  ListItemText, 
  IconButton, 
  Divider
} from "@material-ui/core";

import { 
  MoreVertOutlined as MoreVertIcon, 
  EditOutlined as EditStationIcon,
  DeleteOutlined as DeleteIcon
} from "@material-ui/icons";

class StationMenu extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };
  }

  handleClick = event => {
    event.stopPropagation();
    this.setState({ isOpen: true });
  };

  handleClose = event => {
    event.stopPropagation();
    this.setState({ isOpen: false });
  };

  onItemClick = (event, action) => {
    event.stopPropagation();
    this.setState({ isOpen: false });
    action();
  }

  render() {
    const { onStationEdit, onDelete } = this.props;
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
          <MenuItem onClick={(event) => this.onItemClick(event, onStationEdit)}>
            <ListItemIcon>
              <EditStationIcon />
            </ListItemIcon>
            <ListItemText inset primary="Modifier" />
          </MenuItem>
          <Divider />
          <MenuItem onClick={(event) => this.onItemClick(event, onDelete)}>
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

StationMenu.propTypes = {
  onStationEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default StationMenu;
