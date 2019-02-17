import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import {
  withStyles,
  Divider,
  Grid,
  ExpansionPanel,
  ExpansionPanelSummary,
  Typography,
  ExpansionPanelDetails,
} from '@material-ui/core';

import { ExpandMoreOutlined as ExpandMoreIcon, MapOutlined as MapIcon } from '@material-ui/icons';

import GoogleMapReact from 'google-map-react';

import { StationPin } from '../components';

const styles = () => ({
  mapArea: {
    height: 500,
  },
});

class MapContainer extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      expanded: true,
    };

    this.handleExpand = this.handleExpand.bind(this);
  }

  handleExpand() {
    this.setState({ expanded: !this.state.expanded });
  }

  render() {
    const { classes, clientStations } = this.props;
    const { expanded } = this.state;

    return (
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <ExpansionPanel expanded={expanded} onChange={this.handleExpand}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Grid container spacing={24} alignItems="center">
                <Grid item>
                  <MapIcon />
                </Grid>
                <Grid item xs>
                  <Typography variant="subtitle1">Carte</Typography>
                </Grid>
              </Grid>
            </ExpansionPanelSummary>
            <Divider />
            <ExpansionPanelDetails className={classes.mapArea}>
              <GoogleMapReact
                bootstrapURLKeys={{
                  key: 'AIzaSyBBzPnmM8AuGNrNyLwL-mwXqUXQf0R4Mc8',
                }}
                center={{
                  lat: clientStations && clientStations[0] && clientStations[0].latitude,
                  lng: clientStations && clientStations[0] && clientStations[0].longitude,
                }}
                zoom={12}>
                {clientStations &&
                  clientStations.map(station => (
                    <StationPin key={station.id} lat={station.latitude} lng={station.longitude} station={station} />
                  ))}
              </GoogleMapReact>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </Grid>
      </Grid>
    );
  }
}

MapContainer.propTypes = {
  clientStations: PropTypes.array,
};

const mapStateToProps = state => ({
  ...state.reports,
});

export default connect(mapStateToProps)(withStyles(styles)(MapContainer));
