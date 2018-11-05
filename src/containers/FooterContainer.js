import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  footer: {
    top: 'auto',
    bottom: 0,
  },
});

const Footer = ({ classes }) => (
  <AppBar color="default" position="fixed" className={classes.footer}>
    <Toolbar>
      <Grid container justify="flex-end">
        <Grid item>
          <Typography variant="caption" color="inherit" noWrap>
            v0.0.3
          </Typography>
        </Grid>
      </Grid>
    </Toolbar>
  </AppBar>
);

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Footer);
