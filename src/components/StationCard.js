import React from 'react';
import PropTypes from 'prop-types';

import { withStyles, Card, CardHeader, Divider, CardContent, Grid, Typography } from '@material-ui/core';

import {
  TrackChangesOutlined as ReadingIcon,
  BatteryAlertOutlined as BatteryIcon,
  CloudOutlined as RainIcon,
  AcUnitOutlined as SnowIcon,
  WavesOutlined as WindIcon,
  FlashOnOutlined as HydroIcon,
} from '@material-ui/icons';

import { green, red, grey } from '@material-ui/core/colors';

const styles = theme => ({
  successIcon: {
    color: green[600],
  },
  errorIcon: {
    color: red[600],
  },
  readingSection: {
    width: 200,
    textAlign: 'center',
    padding: theme.spacing.unit * 2,
    borderRight: `1px solid ${grey[300]}`,
  },
  batterySection: {
    width: 200,
    textAlign: 'center',
    padding: theme.spacing.unit * 2,
  }
});

const StationCard = ({ classes, station }) => (
  <Card>
    <CardHeader title={station.name} titleTypographyProps={{variant: "subtitle1"}} />
    <Divider />
    <Grid container spacing={0} direction="row">
      <Grid item xs>
        <div className={classes.readingSection}>
          <ReadingIcon fontSize="large" />
          <Typography variant="title">{`${parseFloat(Math.random() * 2).toFixed(2)}`}</Typography>
        </div>
      </Grid>
      <Grid item xs>
        <div className={classes.batterySection}>
          <BatteryIcon fontSize="large" />
          <Typography variant="title">{`${parseFloat(Math.random() * 100).toFixed(0)}`}</Typography>
        </div>
      </Grid>
    </Grid>
    <Divider />
    <CardContent>
      <Grid container spacing={24} justify="center" alignItems="center">
        {station.hasRain ? (
          <Grid item>
            <RainIcon />
          </Grid>
        ) : null}
        {station.hasSnow ? (
          <Grid item>
            <SnowIcon />
          </Grid>
        ) : null}
        {station.hasWind ? (
          <Grid item>
            <WindIcon />
          </Grid>
        ) : null}
        {station.hasHydro ? (
          <Grid item>
            <HydroIcon />
          </Grid>
        ) : null}
      </Grid>
    </CardContent>
  </Card>
);

StationCard.propTypes = {
  classes: PropTypes.object.isRequired,
  station: PropTypes.object.isRequired,
};

export default React.memo(withStyles(styles)(StationCard));
