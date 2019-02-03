import React from 'react';
import PropTypes from 'prop-types';

import { connect } from "react-redux";

import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';

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
  HomeOutlined as HomeIcon,
  DashboardOutlined as DashboardIcon,
  MapOutlined as MapIcon,
  PeopleOutlined as PeopleIcon,
} from '@material-ui/icons';

import {
  LoginContainer,
  HeaderContainer,
  HomeContainer,
  DashboardContainer,
  MapContainer,
  ClientsContainer
} from '../';

import { Alert } from '../../components';

import { resetAlerts } from './actions';

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
  getSidebarItems() {
    const { loggedInUser } = this.props; 
    if (!loggedInUser) {
      return [];
    }
    
    return loggedInUser.admin ? adminSidebarItems : clientSidebarItems;
  }

  privateRouteRender(loggedInUser, container) {
    return () => loggedInUser ? container : <Redirect to="/login" />;
  }

  getAlertVariant() {
    if (this.props.success) return 'success';
    if (this.props.warning) return 'warning';
    if (this.props.error) return 'error';
    return 'info';
  };

  render() {
    const { classes, loggedInUser, message } = this.props;

    return (
      <React.Fragment>
        {message && <Alert variant={this.getAlertVariant()} message={message} resetAlerts={this.props.resetAlerts} />}
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
                {this.getSidebarItems().map((item, index) =>
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
                <Route exact path="/" render={() => (
                  loggedInUser ? (
                    <Redirect to={loggedInUser.admin ? '/clients' : '/home'} />
                  ) : (
                    <Redirect to="/login"/>
                  )
                )}/>
                <Route path='/login' render={() => (
                  loggedInUser ? (
                    <Redirect to={loggedInUser.admin ? '/clients' : '/home'} />
                  ) : (
                    <LoginContainer />
                  )
                )}/> />
                <Route path='/home' render={this.privateRouteRender(loggedInUser, <HomeContainer />)} />
                <Route path='/dashboard' render={this.privateRouteRender(loggedInUser, <DashboardContainer />)} />
                <Route path='/map' render={this.privateRouteRender(loggedInUser, <MapContainer />)} />
                <Route path='/clients' render={this.privateRouteRender(loggedInUser, <ClientsContainer />)} />
              </Switch>
            </div>
          </div>
        </Router>
      </React.Fragment>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
  loggedInUser: PropTypes.object,
  resetAlerts: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  ...state.app,
  ...state.login
});

const mapDispatchToProps = {
  resetAlerts,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(App));
