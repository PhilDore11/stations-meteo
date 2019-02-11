import React from 'react';
import PropTypes from 'prop-types';

import {
  withStyles,
  Card,
  CardHeader,
  Divider,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';

import {
  CheckCircleOutlined as CheckCircleIcon,
  LocationSearchingOutlined as LocationSearchingIcon,
  MemoryOutlined as DeviceIcon,
} from '@material-ui/icons';

import { green, red } from '@material-ui/core/colors';

const styles = theme => ({
  successIcon: {
    color: green[600],
  },
  errorIcon: {
    color: red[600],
  },
});

const StationCard = ({ classes, station }) => (
  <Card>
    <CardHeader avatar={<CheckCircleIcon fontSize="large" className={classes.successIcon} />} title={station.name} />
    <Divider />
    <CardContent>
      <List>
        <ListItem>
          <ListItemIcon>
            <LocationSearchingIcon />
          </ListItemIcon>
          <ListItemText primary={station.ipAddress} />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <DeviceIcon />
          </ListItemIcon>
          <ListItemText primary={station.deviceType} />
        </ListItem>
      </List>
    </CardContent>
  </Card>
);

StationCard.propTypes = {
  classes: PropTypes.object.isRequired,
  station: PropTypes.object.isRequired,
};

export default React.memo(withStyles(styles)(StationCard));
