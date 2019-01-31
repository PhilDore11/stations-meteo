import React from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";

import {
  withStyles,
  AppBar, 
  Toolbar, 
  Typography, 
  Grid, 
  Button,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import {
  PowerSettingsNew as LogoutIcon,
} from "@material-ui/icons";

import {
  SettingsMenu,
} from "../components";

import {
  logout,
} from "./Login/actions"

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

class HeaderContainer extends React.PureComponent {
  render() {
    const { classes, loggedInUser } = this.props;
    return (
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
                  Stations Météo{loggedInUser && !loggedInUser.admin && loggedInUser.clients.length === 1 && ` > ${loggedInUser.clients[0].name}`}
                </Typography>
              </Grid>
            </Grid>
            {loggedInUser && (
              <Grid item>
                <Tooltip title="Logout">
                  <IconButton onClick={this.props.logout} color="inherit">
                    <LogoutIcon />
                  </IconButton>
                </Tooltip>
              </Grid>
            )}
          </Grid>
        </Toolbar>
      </AppBar>
    );
  }
}

HeaderContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  loggedInUser: PropTypes.object,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  ...state.login
});

const mapDispatchToProps = {
  logout,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(HeaderContainer));
