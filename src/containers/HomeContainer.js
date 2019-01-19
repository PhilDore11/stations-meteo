import React from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";

import {
  Divider,
  Grid,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton
} from "@material-ui/core";

import {
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Battery90 as Battery90Icon,
  Battery60 as Battery60Icon,
  Battery30 as Battery30Icon,
  Room as PinIcon,
  LocationSearching as LocationSearchingIcon,
  Memory as MemoryIcon
} from "@material-ui/icons";

import { green, red } from "@material-ui/core/colors";

const styles = theme => ({
  successIcon: {
    color: green[600]
  },
  errorIcon: {
    color: red[600]
  }
});

const stationsData = [
  {
    name: "Station 1",
    status: "ON",
    ipAddress: "10.50.20.1",
    deviceType: "CR200",
    battery: <Battery90Icon />
  },
  {
    name: "Station 2",
    status: "ON",
    ipAddress: "10.50.20.2",
    deviceType: "CR200",
    battery: <Battery60Icon />
  },
  {
    name: "Station 3",
    status: "OFF",
    ipAddress: "10.50.20.3",
    deviceType: "CR800",
    battery: <Battery30Icon />
  }
];

const HomeContainer = ({ classes }) => (
  <Grid container spacing={24}>
    {stationsData.map((station, index) => (
      <Grid key={index} item xs={6} md={4} lg={3}>
        <Card>
          <CardHeader
            avatar={
              station.status === "ON" ? (
                <CheckCircleIcon
                  fontSize="large"
                  className={classes.successIcon}
                />
              ) : (
                <ErrorIcon fontSize="large" className={classes.errorIcon} />
              )
            }
            title={station.name}
            action={<IconButton>{station.battery}</IconButton>}
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
          <CardActions>
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
  classes: PropTypes.object.isRequired
};

export default React.memo(withStyles(styles)(HomeContainer));
