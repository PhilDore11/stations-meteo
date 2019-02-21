import React from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';
import { isNumber } from 'lodash';

import {
  withStyles,
  Card,
  CardHeader,
  Divider,
  CardContent,
  Grid,
  Typography,
  IconButton,
  Tooltip,
} from '@material-ui/core';

import {
  OpacityOutlined as ReadingIcon,
  BatteryAlertOutlined as BatteryIcon,
  CloudOutlined as RainIcon,
  AcUnitOutlined as SnowIcon,
  WavesOutlined as WindIcon,
  FlashOnOutlined as HydroIcon,
  DashboardOutlined as DashboardIcon,
} from '@material-ui/icons';

import { green, red, grey, orange } from '@material-ui/core/colors';

const styles = theme => ({
  stationCard: {
    width: 400,
    height: 262,
  },
  success: {
    color: green[600],
  },
  warning: {
    color: orange[600],
  },
  error: {
    color: red[600],
  },
  readingSection: {
    textAlign: 'center',
    padding: theme.spacing.unit * 2,
    borderRight: `1px solid ${grey[300]}`,
  },
  batterySection: {
    textAlign: 'center',
    padding: theme.spacing.unit * 2,
  },
});

const StationCard = ({ classes, station }) => {
  const getBatteryClass = battery => {
    if (battery > 11.5) {
      return classes.success;
    } else if (battery < 11.5 && battery > 10.5) {
      return classes.warning;
    } else {
      return classes.error;
    }
  };
  return (
    <Card className={classes.stationCard}>
      <CardHeader
        title={station.name}
        titleTypographyProps={{ variant: 'subtitle1' }}
        action={
          <React.Fragment>
            <Tooltip title="Analyse">
              <IconButton href={`/dashboard/${station.stationId}`}>
                <DashboardIcon />
              </IconButton>
            </Tooltip>
          </React.Fragment>
        }
      />
      <Divider />
      <Grid container spacing={0} direction="row">
        <Grid item xs>
          <div className={classes.readingSection}>
            <ReadingIcon fontSize="large" color="action" />
            <Typography variant="h5">
              {isNumber(station.intensity) ? parseFloat(station.intensity).toFixed(2) : ' - '}
              <small>mm</small>
            </Typography>
          </div>
        </Grid>
        <Grid item xs>
          <div className={[classes.batterySection, getBatteryClass(station.battery)].join(' ')}>
            <BatteryIcon fontSize="large" color="inherit" />
            <Typography variant="h5" color="inherit">
              {isNumber(station.battery) ? parseFloat(station.battery).toFixed(2) : ' - '}
              <small>V</small>
            </Typography>
          </div>
        </Grid>
      </Grid>
      <Divider />
      <Grid container spacing={24} justify="center" alignItems="center">
        <Grid item>
          <Typography variant="caption">{moment(station.date).fromNow()}</Typography>
        </Grid>
      </Grid>
      <Divider />
      <CardContent>
        <Grid container spacing={24} justify="center" alignItems="center">
          {station.hasRain ? (
            <Grid item>
              <RainIcon color="action" />
            </Grid>
          ) : null}
          {station.hasSnow ? (
            <Grid item>
              <SnowIcon color="action" />
            </Grid>
          ) : null}
          {station.hasWind ? (
            <Grid item>
              <WindIcon color="action" />
            </Grid>
          ) : null}
          {station.hasHydro ? (
            <Grid item>
              <HydroIcon color="action" />
            </Grid>
          ) : null}
        </Grid>
      </CardContent>
    </Card>
  );
};

StationCard.propTypes = {
  classes: PropTypes.object.isRequired,
  station: PropTypes.object.isRequired,
};

export default React.memo(withStyles(styles)(StationCard));
