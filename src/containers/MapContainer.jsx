import React from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";

import {
  withStyles,
  Divider,
  Grid,
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
} from "@material-ui/core";

import {
  ExpandMoreOutlined as ExpandMoreIcon,
  MapOutlined as MapIcon,
} from "@material-ui/icons";

import GoogleMapReact from "google-map-react";

import { StationPin, Loading, NoData } from "../components";

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
    const { classes, loading, error, clientStations } = this.props;
    const { expanded } = this.state;

    return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Accordion expanded={expanded} onChange={this.handleExpand}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Grid container spacing={2} alignItems="center">
                <Grid item>
                  <MapIcon />
                </Grid>
                <Grid item xs>
                  <Typography variant="subtitle1">Carte</Typography>
                </Grid>
              </Grid>
            </AccordionSummary>
            <Divider />
            <AccordionDetails className={classes.mapArea}>
              {!loading && !error ? (
                <GoogleMapReact
                  bootstrapURLKeys={{
                    key: "AIzaSyBBzPnmM8AuGNrNyLwL-mwXqUXQf0R4Mc8",
                  }}
                  center={{
                    lat:
                      (clientStations &&
                        clientStations[0] &&
                        clientStations[0].latitude) ||
                      45.2714412,
                    lng:
                      (clientStations &&
                        clientStations[0] &&
                        clientStations[0].longitude) ||
                      -75.921709,
                  }}
                  zoom={12}
                >
                  {clientStations &&
                    clientStations.map((station) => (
                      <StationPin
                        key={station.id}
                        lat={station.latitude}
                        lng={station.longitude}
                        station={station}
                      />
                    ))}
                </GoogleMapReact>
              ) : loading ? (
                <Loading />
              ) : (
                <NoData />
              )}
            </AccordionDetails>
          </Accordion>
        </Grid>
      </Grid>
    );
  }
}

MapContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  clientStations: PropTypes.array,
  loading: PropTypes.bool,
  error: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  ...state.app,
});

export default connect(mapStateToProps)(withStyles(styles)(MapContainer));
