import React from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';

import { Grid, TextField, MenuItem, Typography } from '@material-ui/core';

const ReportHeader = ({ month, onMonthChange }) => (
  <Grid container spacing={24} alignItems="center">
    <Grid item xs={2} />
    <Grid item xs>
      <Grid container justify="center">
        <Grid item>
          <Typography variant="h6">Rapport Mensuel</Typography>
        </Grid>
      </Grid>
    </Grid>
    <Grid item xs={2}>
      <TextField select value={month} onChange={onMonthChange} fullWidth margin="normal" variant="outlined">
        {moment.months().map(
          (month, index) => (
            <MenuItem key={index} value={index}>
              {month}
            </MenuItem>
          )
        )}
      </TextField>
    </Grid>
  </Grid>
);

ReportHeader.propTypes = {
  month: PropTypes.number.isRequired,
  onMonthChange: PropTypes.func.isRequired,
};

export default ReportHeader;
