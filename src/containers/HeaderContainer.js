import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import Button from '@material-ui/core/Button';

import ClientMenu from 'components/ClientMenu';

import logo from '../jfsa.png';

const drawerWidth = 240;

const styles = theme => ({
  header: {
    zIndex: theme.zIndex.drawer + 1,
  },
  logo: {
    width: drawerWidth - 48,
    marginRight: 24
  },
});

const HeaderContainer = ({ classes }) => (
  <AppBar color="default" position="fixed" className={classes.header}>
    <Toolbar>
      <Grid container>
        <Grid item>
          <Button className={classes.logo}>
            <img src={logo} alt="JFSA" height={40} />
          </Button>
        </Grid>
        <Grid xs item container alignItems="center">
          <Grid xs item>
            <Typography variant="h6" noWrap>
              Stations Météo
            </Typography>
          </Grid>
          <Grid item>
            <ClientMenu />
          </Grid>
        </Grid>
      </Grid>
    </Toolbar>
  </AppBar>
);

HeaderContainer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HeaderContainer);
