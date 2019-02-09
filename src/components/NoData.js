import React from 'react';
import PropTypes from 'prop-types';

import { withStyles, Grid, Typography } from '@material-ui/core';

import { WarningOutlined as WarningIcon } from '@material-ui/icons';

const styles = theme => ({
  icon: {
    margin: 'auto',
  },
});

const NoData = ({ classes }) => (
  <Grid container direction="column" spacing={12} justify="center" alignItems="center">
    <Grid item>
      <WarningIcon fontSize="large" color="action" className={classes.icon} />
    </Grid>
    <Grid item>
      <Typography variant="h6">Aucunes donnees</Typography>
    </Grid>
  </Grid>
);

NoData.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default React.memo(withStyles(styles)(NoData));
