import React from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";

import { AppBar, Toolbar, Typography, Grid, Button } from "@material-ui/core";

// import { ClientMenu } from "../components";

import logo from "../jfsa.png";

const drawerWidth = 240;

const styles = theme => ({
  header: {
    zIndex: theme.zIndex.drawer + 1
  },
  logo: {
    width: drawerWidth - 48,
    marginRight: 24
  }
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
        </Grid>
      </Grid>
    </Toolbar>
  </AppBar>
);

HeaderContainer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default React.memo(withStyles(styles)(HeaderContainer));
