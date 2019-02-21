import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { withRouter } from 'react-router-dom';

import { Grid } from '@material-ui/core';

import { increment, decrement, setStation, setView } from '../actions';
import { DashboardHeader, Loading } from '../../components';
import { StationDataContainer, IdfContainer } from '..';

class DashboardContainer extends React.PureComponent {
  constructor(props) {
    super(props);

    this.handleStationChange = this.handleStationChange.bind(this);
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
    this.props.setStation(event.target.value);
  }

  handleViewChange(event) {
    this.props.setView(event.target.value);
  }

  render() {
    const { error, loading, clientStations, stationId, start, end, view } = this.props;

    return (
      <Grid container spacing={24}>
        {!error && !loading ? (
          <React.Fragment>
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
                onViewChange={this.handleViewChange}
              />
            </Grid>
            <Grid item xs={12}>
              <IdfContainer stationId={stationId} start={start} end={end} />
            </Grid>
            <Grid item xs={12}>
              <StationDataContainer stationId={stationId} start={start} end={end} />
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
  stationId: PropTypes.string,
  increment: PropTypes.func.isRequired,
  decrement: PropTypes.func.isRequired,
  start: PropTypes.string,
  end: PropTypes.string,
  error: PropTypes.bool,
  loading: PropTypes.bool,
  setStation: PropTypes.func.isRequired,
  setView: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  ...state.app,
  ...state.dashboard,
});

const mapDispatchToProps = {
  increment,
  decrement,
  setStation,
  setView,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(DashboardContainer));
