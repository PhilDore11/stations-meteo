import React from "react";
import PropTypes from "prop-types";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";

import {
  Drawer,
  CssBaseline,
  List,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText
} from "@material-ui/core";

import {
  Home as HomeIcon,
  Dashboard as DashboardIcon,
  Map as MapIcon,
  People as PeopleIcon
} from "@material-ui/icons";

import {
  HeaderContainer,
  HomeContainer,
  DashboardContainer,
  MapContainer,
  ClientsContainer,
  FooterContainer
} from "./containers";

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: "flex"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3
  },
  menuLink: {
    textDecoration: "none"
  }
});

const App = ({ classes }) => (
  <Router>
    <div className={classes.root}>
      <CssBaseline />
      <HeaderContainer />
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper
        }}
        anchor="left"
      >
        <div className={classes.toolbar} />
        <Divider />
        <List>
          {[
            { icon: <HomeIcon />, label: "Acceuil", location: "/" },
            {
              icon: <DashboardIcon />,
              label: "Analyse",
              location: "dashboard"
            },
            { icon: <MapIcon />, label: "Map", location: "map" },
            { icon: <PeopleIcon />, label: "Clients", location: "clients" }
          ].map((item, index) => (
            <Link key={index} to={item.location} className={classes.menuLink}>
              <ListItem button>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItem>
            </Link>
          ))}
        </List>
      </Drawer>
      <div className={classes.content}>
        <div className={classes.toolbar} />
        <Switch>
          <Route exact path="/" component={HomeContainer} />
          <Route path="/dashboard" component={DashboardContainer} />
          <Route path="/map" component={MapContainer} />
          <Route path="/clients" component={ClientsContainer} />
        </Switch>
        <div className={classes.toolbar} />
      </div>
      <Divider />
      <FooterContainer />
    </div>
  </Router>
);

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(App);
