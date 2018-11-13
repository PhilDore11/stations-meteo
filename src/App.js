import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import HomeIcon from '@material-ui/icons/Home';
import DashboardIcon from '@material-ui/icons/Dashboard';
import MapIcon from '@material-ui/icons/Map';

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import HeaderContainer from './containers/HeaderContainer';

import HomeContainer from './containers/HomeContainer';
import DashboardContainer from './containers/DashboardContainer';
import MapContainer from './containers/MapContainer';

import FooterContainer from './containers/FooterContainer';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
  menuLink: {
    textDecoration: 'none',
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
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.toolbar} />
        <Divider />
        <List>
          {[
            { icon: <HomeIcon />, label: 'Acceuil', location: '/' },
            { icon: <DashboardIcon />, label: 'Analyse', location: 'dashboard' },
            { icon: <MapIcon />, label: 'Map', location: 'map' }
          ].map((item, index) => (
            <Link key={index} to={item.location} className={classes.menuLink}>
              <ListItem button>
                <ListItemIcon>
                  {item.icon}
                </ListItemIcon>
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
        </Switch>
      </div>
      <Divider />
      <FooterContainer />
    </div>
  </Router>
);

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
