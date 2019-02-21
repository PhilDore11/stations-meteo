import React from 'react';
import PropTypes from 'prop-types';

import { DatePicker } from 'material-ui-pickers';

import { withStyles, Grid } from '@material-ui/core';

const styles = () => ({
  input: {
    backgroundColor: 'white',
  },
});

const IncrementDecrement = ({ classes, start, end, onStartChange, onEndChange }) => (
  <Grid container spacing={24} justify="space-between" alignItems="center">
    <Grid item xs>
      <DatePicker
        InputProps={{
          className: classes.input,
        }}
        margin="dense"
        variant="outlined"
        label="Start"
        value={start}
        onChange={onStartChange}
        format={'MMMM DD'}
      />
    </Grid>
    <Grid item>{' - '}</Grid>
    <Grid item xs>
      <DatePicker
        InputProps={{
          className: classes.input,
        }}
        margin="dense"
        variant="outlined"
        label="End"
        value={end}
        onChange={onEndChange}
        format={'MMMM DD'}
      />
    </Grid>
  </Grid>
);

IncrementDecrement.propTypes = {
  classes: PropTypes.object.isRequired,
  start: PropTypes.string.isRequired,
  end: PropTypes.string.isRequired,
  onStartChange: PropTypes.func.isRequired,
  onEndChange: PropTypes.func.isRequired,
};

export default withStyles(styles)(IncrementDecrement);
