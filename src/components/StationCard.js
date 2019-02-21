import React from 'react';
import PropTypes from 'prop-types';

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
  TrackChangesOutlined as ReadingIcon,
  BatteryAlertOutlined as BatteryIcon,
  CloudOutlined as RainIcon,
  AcUnitOutlined as SnowIcon,
  WavesOutlined as WindIcon,
  FlashOnOutlined as HydroIcon,
  DashboardOutlined as DashboardIcon,
  AssessmentOutlined as ReportIcon,
} from '@material-ui/icons';

import { green, red, grey } from '@material-ui/core/colors';

const styles = theme => ({
  stationCard: {
    width: 350,
    height: 230,
  },
  successIcon: {
    color: green[600],
  },
  errorIcon: {
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

const StationCard = ({ classes, station }) => (
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
          <Tooltip title="Rapport">
            <IconButton href={`/report/${station.stationId}`}>
              <ReportIcon />
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
        <div className={classes.batterySection}>
          <BatteryIcon fontSize="large" color="action" />
          <Typography variant="h5">
            {isNumber(station.battery) ? parseFloat((station.battery / 12) * 100).toFixed(0) : ' - '}
            <small>%</small>
          </Typography>
        </div>
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

StationCard.propTypes = {
  classes: PropTypes.object.isRequired,
  station: PropTypes.object.isRequired,
};

export default React.memo(withStyles(styles)(StationCard));
