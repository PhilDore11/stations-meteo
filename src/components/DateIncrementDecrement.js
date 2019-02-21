import React from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';

import { withStyles, Grid, Typography, Fab } from '@material-ui/core';

import { ChevronLeftOutlined as ChevronLeftIcon, ChevronRightOutlined as ChevronRightIcon } from '@material-ui/icons';

const styles = () => ({
  fab: {
    backgroundColor: 'white',
  },
});

const DateIncrementDecrement = ({ classes, start, end, increment, decrement, view }) => (
  <Grid container spacing={24} justify="space-between" alignItems="center">
    <Grid item>
      <Fab onClick={decrement} className={classes.fab} size="small">
        <ChevronLeftIcon color="action" />
      </Fab>
    </Grid>
    <Grid item xs>
      <Grid container spacing={16} justify="center" alignItems="center">
        <Grid item>
          <Typography variant="body1">{moment(start).format('MMMM DD')}</Typography>
          <Typography style={{ textAlign: 'center' }} variant="caption">
            {moment(start).format('YYYY')}
          </Typography>
        </Grid>
        {view !== 'day' && (
          <React.Fragment>
            <Grid item>{' - '}</Grid>
            <Grid item>
              <Typography variant="body1">{moment(end).format('MMMM DD')}</Typography>
              <Typography style={{ textAlign: 'center' }} variant="caption">
                {moment(end).format('YYYY')}
              </Typography>
            </Grid>
          </React.Fragment>
        )}
      </Grid>
    </Grid>
    <Grid item>
      <Fab onClick={increment} className={classes.fab} size="small">
        <ChevronRightIcon color="action" />
      </Fab>
    </Grid>
  </Grid>
);

DateIncrementDecrement.propTypes = {
  classes: PropTypes.object.isRequired,
  start: PropTypes.string.isRequired,
  end: PropTypes.string.isRequired,
  view: PropTypes.string.isRequired,
  increment: PropTypes.func.isRequired,
  decrement: PropTypes.func.isRequired,
};

export default withStyles(styles)(DateIncrementDecrement);
