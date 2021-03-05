import React from "react";
import PropTypes from "prop-types";

import {
  withStyles,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Divider,
} from "@material-ui/core";

import {
  MoreVertOutlined as MoreVertIcon,
  EditOutlined as EditStationIcon,
  DeleteOutlined as DeleteIcon,
  SettingsInputComponentOutlined as AdjustCoefficientIcon,
} from "@material-ui/icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileImport } from "@fortawesome/free-solid-svg-icons";

const styles = () => ({
  icon: {
    width: "1em !important",
    height: "1em !important",
  },
});

class StationMenu extends React.PureComponent {
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
    const { classes, onStationEdit, onImport, onAdjustCoefficient, onDelete } = this.props;
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
          <MenuItem onClick={(event) => this.onItemClick(event, onStationEdit)}>
            <ListItemIcon>
              <EditStationIcon />
            </ListItemIcon>
            <ListItemText primary="Modifier" />
          </MenuItem>
          <MenuItem
            onClick={(event) => this.onItemClick(event, onAdjustCoefficient)}
          >
            <ListItemIcon>
              <AdjustCoefficientIcon />
            </ListItemIcon>
            <ListItemText primary="Ajuster le coefficient" />
          </MenuItem>
          <MenuItem onClick={(event) => this.onItemClick(event, onImport)}>
            <ListItemIcon>
              <FontAwesomeIcon
                className={classes.icon}
                icon={faFileImport}
                fixedWidth
                color="grey"
              />
            </ListItemIcon>
            <ListItemText primary="Import de données" />
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

StationMenu.propTypes = {
  classes: PropTypes.object.isRequired,
  onStationEdit: PropTypes.func.isRequired,
  onImport: PropTypes.func.isRequired,
  onAdjustCoefficient: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default withStyles(styles)(StationMenu);
