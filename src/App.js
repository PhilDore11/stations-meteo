import React from 'react';
import PropTypes from 'prop-types';

import { connect } from "react-redux";

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';

import {
  Drawer,
  CssBaseline,
  List,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core';

import {
  Home as HomeIcon,
  Dashboard as DashboardIcon,
  Map as MapIcon,
  People as PeopleIcon,
} from '@material-ui/icons';

import {
  LoginContainer,
  HeaderContainer,
  HomeContainer,
  DashboardContainer,
  MapContainer,
  ClientsContainer
} from './containers';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex'
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
    textDecoration: 'none'
  },
  sidebarTitle: {
    backgroundColor: theme.palette.background.default
  }
});

const clientSidebarItems = [
  { 
    icon: <HomeIcon />,
    label: 'Acceuil',
    location: '/' },
  {
    icon: <DashboardIcon />,
    label: 'Analyse',
    location: 'dashboard'
  },
  { 
    icon: <MapIcon />,
    label: 'Map',
    location: 'map'
  },
];

const adminSidebarItems = [
  { 
    icon: <PeopleIcon />,
    label: 'Clients',
    location: '/clients',
  },
];

class App extends React.PureComponent {
  render() {
    const { classes, loggedInUser } = this.props;

    const sidebarItems = loggedInUser && loggedInUser.admin ? adminSidebarItems : clientSidebarItems;
    return (
      <Router>
        <div className={classes.root}>
          <CssBaseline />
          <HeaderContainer />
          <Drawer
            className={classes.drawer}
            variant='permanent'
            classes={{
              paper: classes.drawerPaper
            }}
            anchor='left'
          >
            <div className={classes.toolbar} />
            <Divider />
            <List>
              {sidebarItems.map((item, index) =>
                item.divider ? (
                  <React.Fragment key={index}>
                    <Divider />
                    <ListItem className={classes.sidebarTitle}>
                      <ListItemText primary={item.label} />
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ) : (
                  <Link key={index} to={item.location} className={classes.menuLink}>
                    <ListItem button>
                      <ListItemIcon>{item.icon}</ListItemIcon>
                      <ListItemText primary={item.label} />
                    </ListItem>
                  </Link>
                )
              )}
            </List>
          </Drawer>
          <div className={classes.content}>
            <div className={classes.toolbar} />
            <Switch>
              <Route exact path='/' component={HomeContainer} />
              <Route path='/dashboard' component={DashboardContainer} />
              <Route path='/map' component={MapContainer} />
              <Route path='/clients' component={ClientsContainer} />
            </Switch>
            <div className={classes.toolbar} />
          </div>
          <LoginContainer />
        </div>
      </Router>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
  loggedInUser: PropTypes.object,
};

const mapStateToProps = state => ({
  ...state.login
});

export default connect(
  mapStateToProps,
)(withStyles(styles)(App));
