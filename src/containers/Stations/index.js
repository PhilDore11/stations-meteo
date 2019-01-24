import React from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";

import {
  Grid,
} from "@material-ui/core";

import {
  fetchStations,
} from "./actions";

import { StationCard } from "../../components";

class StationsContainer extends React.PureComponent {
  componentDidMount() {
    this.props.fetchStations(this.props.clientId);
  }
  render() {
    const {stations} = this.props;
    return (
      <Grid container spacing={24} justify="space-evenly">
        {stations.map((station) => (
          <Grid key={station.id} item xs={6} md={4} lg={3}>
            <StationCard station={station} />
          </Grid>
        ))}
      </Grid>
    );
  }
}

StationsContainer.propTypes = {
  clientId: PropTypes.number.isRequired,
  stations: PropTypes.array,
  fetchStations: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  ...state.stations
});

const mapDispatchToProps = {
  fetchStations,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StationsContainer);
