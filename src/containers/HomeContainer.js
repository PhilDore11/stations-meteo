import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import Divider from '@material-ui/core/Divider';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import IconButton from '@material-ui/core/IconButton';

import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import Battery90Icon from '@material-ui/icons/Battery90';
import Battery60Icon from '@material-ui/icons/Battery60';
import Battery30Icon from '@material-ui/icons/Battery30';
import PinIcon from '@material-ui/icons/Room';
import LocationSearchingIcon from '@material-ui/icons/LocationSearching';
import MemoryIcon from '@material-ui/icons/Memory';

import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';

const styles = theme => ({
  successIcon: {
    color: green[600],
  },
  errorIcon: {
    color: red[600],
  },
});

const stationsData = [{
  name: 'Station 1', 
  status: 'ON',
  ipAddress: '10.50.20.1',
  deviceType: 'CR200',
  battery: <Battery90Icon />,
}, {
  name: 'Station 2', 
  status: 'ON',
  ipAddress: '10.50.20.2',
  deviceType: 'CR200',
  battery: <Battery60Icon />,
}, {
  name: 'Station 3', 
  status: 'OFF',
  ipAddress: '10.50.20.3',
  deviceType: 'CR800',
  battery: <Battery30Icon />,
}];

const HomeContainer = ({ classes }) => (
  <Grid container spacing={24}>
    {stationsData.map((station, index) => (
      <Grid key={index} item xs={6} md={4} lg={3}>
        <Card>
          <CardHeader 
            avatar={
              station.status === 'ON' ?
                <CheckCircleIcon fontSize="large" className={classes.successIcon} /> 
                : 
                <ErrorIcon fontSize="large" className={classes.errorIcon} />
            }
            title={station.name}
            action={
              <IconButton>
                {station.battery}
              </IconButton>
            }
          />
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
                  <MemoryIcon />
                </ListItemIcon>
                <ListItemText primary={station.deviceType} />
              </ListItem>
            </List>
          </CardContent>
          <Divider />
          <CardActions className={classes.actions}>
            <Grid container justify="flex-end">
              <Grid item>
                <IconButton aria-label="Add to favorites">
                  <PinIcon />
                </IconButton>
              </Grid>
            </Grid>
          </CardActions>
        </Card>
      </Grid>
    ))}
  </Grid>
);

HomeContainer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HomeContainer);
