import React from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';

import { Grid, IconButton, Typography, TextField, MenuItem } from '@material-ui/core';

import { ChevronLeftOutlined as ChevronLeftIcon, ChevronRightOutlined as ChevronRightIcon } from '@material-ui/icons';

import { VIEWS } from '../containers/Dashboard/constants';

const ChartHeader = ({ start, end, increment, decrement, stations, stationId, onStationChange, view, onViewChange }) => (
  <Grid container spacing={24} alignItems="center">
    <Grid item xs={2}>
      <TextField select value={stationId} onChange={onStationChange} fullWidth margin="normal" variant="outlined">
        {stations && stations.map(station => (
          <MenuItem key={station.id} value={station.id}>
            {station.name}
          </MenuItem>
        ))}
      </TextField>
    </Grid>
    <Grid item xs>
      <Grid container spacing={24} justify="center" alignItems="center">
        <Grid item>
          <IconButton onClick={decrement}>
            <ChevronLeftIcon />
          </IconButton>
        </Grid>
        <Grid item>
          <Typography variant="h6">{moment(start).format('MMMM DD')}</Typography>
          <Typography style={{ textAlign: 'center' }} variant="caption">
            {moment(start).format('YYYY')}
          </Typography>
        </Grid>
        {view !== 'day' && (
          <React.Fragment>
            <Grid item>{' - '}</Grid>
            <Grid item>
              <Typography variant="h6">{moment(end).format('MMMM DD')}</Typography>
              <Typography style={{ textAlign: 'center' }} variant="caption">
                {moment(end).format('YYYY')}
              </Typography>
            </Grid>
          </React.Fragment>
        )}
        <Grid item>
          <IconButton onClick={increment}>
            <ChevronRightIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Grid>
    <Grid item xs={2}>
      <TextField select value={view} onChange={onViewChange} fullWidth margin="normal" variant="outlined">
        {VIEWS.map(view => (
          <MenuItem key={view.key} value={view.key}>
            {view.label}
          </MenuItem>
        ))}
      </TextField>
    </Grid>
  </Grid>
);

ChartHeader.propTypes = {
  start: PropTypes.string.isRequired,
  end: PropTypes.string.isRequired,
  increment: PropTypes.func.isRequired,
  decrement: PropTypes.func.isRequired,
  stations: PropTypes.array.isRequired,
  stationId: PropTypes.number,
  onStationChange: PropTypes.func.isRequired,
  view: PropTypes.string.isRequired,
  onViewChange: PropTypes.func.isRequired,
};

export default ChartHeader;
