import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { withRouter } from 'react-router-dom';

import moment from 'moment';

import { Grid } from '@material-ui/core';

import { setStation, setYear, setMonth } from '../actions';
import { ReportHeader, Loading } from '../../components';
import { StationDataContainer, IdfContainer } from '..';

class ReportsContainer extends React.PureComponent {
  constructor(props) {
    super(props);

    this.handleStationChange = this.handleStationChange.bind(this);
    this.handleYearChange = this.handleYearChange.bind(this);
    this.handleMonthChange = this.handleMonthChange.bind(this);
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
      console.log('SET STATION', match.params.stationId);
      this.props.setStation(match.params.stationId);
    }
  }

  handleStationChange(event) {
    this.props.setStation(event.target.value);
  }

  handleMonthChange(event) {
    this.props.setMonth(event.target.value);
  }

  handleYearChange(event) {
    this.props.setYear(event.target.value);
  }

  render() {
    const { error, loading, clientStations, stationId, year, month, start, end } = this.props;

    const currentYear = moment().year();
    const reportYears = [];
    [0, 1, 2, 3, 4, 5].forEach(index => reportYears.push(currentYear - index));

    return (
      <Grid container spacing={24}>
        {!error && !loading ? (
          <React.Fragment>
            <Grid item xs={12}>
              <ReportHeader
                stations={clientStations}
                stationId={stationId}
                onStationChange={this.handleStationChange}
                years={reportYears}
                year={year}
                month={month}
                onYearChange={this.handleYearChange}
                onMonthChange={this.handleMonthChange}
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

ReportsContainer.propTypes = {
  match: PropTypes.object.isRequired,
  clientStations: PropTypes.array,
  setStation: PropTypes.func.isRequired,
  stationId: PropTypes.string,
  setYear: PropTypes.func.isRequired,
  year: PropTypes.number,
  setMonth: PropTypes.func.isRequired,
  month: PropTypes.number,
  error: PropTypes.bool,
  loading: PropTypes.bool,
};

const mapStateToProps = state => ({
  ...state.reports,
});

const mapDispatchToProps = {
  setStation,
  setYear,
  setMonth,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(ReportsContainer));
