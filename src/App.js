import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';

import HomeIcon from '@material-ui/icons/Home';
import DashboardIcon from '@material-ui/icons/Dashboard';
import MapIcon from '@material-ui/icons/Map';

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import HomeContainer from './containers/HomeContainer';
import DashboardContainer from './containers/DashboardContainer';
import MapContainer from './containers/MapContainer';

import FooterContainer from './containers/FooterContainer';

import logo from './jfsa.png';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  grow: {
    flexGrow: 1,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
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
  },
  logo: {
    width: drawerWidth - 48,
    marginRight: 24
  },
});

const App = ({ classes }) => (
  <Router>
    <div className={classes.root}>
      <CssBaseline />
      <AppBar color="default" position="fixed" className={classes.appBar}>
        <Toolbar>
          <Button className={classes.logo} component="span">
            <img src={logo} alt="JFSA" height={40} />
          </Button>
          <Typography variant="h6" color="inherit" noWrap>
            Stations Météo
          </Typography>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton color="inherit">
              <Badge badgeContent={5} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton color="inherit">
              <AccountCircleIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
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
