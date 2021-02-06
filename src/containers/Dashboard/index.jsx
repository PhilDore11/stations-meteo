import React from "react";
import moment from "moment";
import PropTypes from "prop-types";

import { connect } from "react-redux";

import { withRouter } from "react-router-dom";

import { Grid } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

import {
  increment,
  decrement,
  setStart,
  setEnd,
  setStation,
  setView,
  exportStationData,
} from "../actions";
import { DashboardHeader, Loading } from "../../components";
import { StationDataContainer, IdfContainer } from "..";

class DashboardContainer extends React.PureComponent {
  constructor(props) {
    super(props);

    this.handleStationChange = this.handleStationChange.bind(this);
    this.handleStartChange = this.handleStartChange.bind(this);
    this.handleEndChange = this.handleEndChange.bind(this);
    this.handleViewChange = this.handleViewChange.bind(this);
  }

  componentDidMount() {
    this.setStationIdFromUrl();
  }

  componentDidUpdate() {
    this.setStationIdFromUrl();
  }

  setStationIdFromUrl() {
    const { match } = this.props;
    if (match && match.params && match.params.stationId) {
      this.props.setStation(match.params.stationId);
    }
  }

  handleStationChange(event) {
    window.location.href = `/dashboard/${event.target.value}`;
  }

  handleViewChange(event) {
    this.props.setView(event.target.value);
  }

  handleStartChange(start) {
    this.props.setStart(start);
    if (this.props.view !== "custom") {
      const newEnd = moment(start)
        .add(1, this.props.view)
        .subtract(1, "millisecond");
      this.props.setEnd(newEnd);
    }
  }

  handleEndChange(end) {
    this.props.setEnd(end);
    if (this.props.view !== "custom") {
      const newStart = moment(end).subtract(1, this.props.view);
      this.props.setStart(newStart);
    }
  }

  render() {
    const {
      error,
      loading,
      validated,
      clientStations,
      stationId,
      start,
      end,
      view,
    } = this.props;

    const dateDiff = moment(end).diff(moment(start), "month", true);

    return (
      <Grid container spacing={2}>
        {!error && !loading ? (
          <React.Fragment>
            {dateDiff >= 1 ? (
              <Grid item xs={12}>
                <Alert variant={"filled"} severity={"warning"}>
                  Attention, vous avez choisi une période supérieure à un mois.
                  Le tableau de précipitation ne peut être présenté.
                </Alert>
              </Grid>
            ) : (
              !validated && (
                <Grid item xs={12}>
                  <Alert variant={"filled"} severity={"error"}>
                    Attention, les données suivantes sont des données brutes,
                    les données traitées seront validées par JFSA dans un délais
                    de 60 jours
                  </Alert>
                </Grid>
              )
            )}
            <Grid item xs={12}>
              <DashboardHeader
                stations={clientStations}
                stationId={stationId}
                onStationChange={this.handleStationChange}
                start={start}
                end={end}
                view={view}
                increment={this.props.increment}
                decrement={this.props.decrement}
                onStartChange={this.handleStartChange}
                onEndChange={this.handleEndChange}
                onViewChange={this.handleViewChange}
                exportStationData={this.props.exportStationData}
              />
            </Grid>
            <Grid item xs={12}>
              <IdfContainer stationId={stationId} start={start} end={end} />
            </Grid>
            <Grid item xs={12}>
              <StationDataContainer
                stationId={stationId}
                start={start}
                end={end}
              />
            </Grid>
          </React.Fragment>
        ) : (
          <Loading />
        )}
      </Grid>
    );
  }
}

DashboardContainer.propTypes = {
  match: PropTypes.object.isRequired,
  clientStations: PropTypes.array,
  increment: PropTypes.func.isRequired,
  decrement: PropTypes.func.isRequired,
  view: PropTypes.string,
  start: PropTypes.string,
  end: PropTypes.string,
  error: PropTypes.bool,
  loading: PropTypes.bool,
  validated: PropTypes.bool,
  setStation: PropTypes.func.isRequired,
  setView: PropTypes.func.isRequired,
  setStart: PropTypes.func.isRequired,
  setEnd: PropTypes.func.isRequired,
  exportStationData: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    ...state.app,
    ...state.dashboard,
  };
};

const mapDispatchToProps = {
  increment,
  decrement,
  setStart,
  setEnd,
  setStation,
  setView,
  exportStationData,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(DashboardContainer));
