import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import moment from 'moment';
import { isEmpty } from 'lodash';

import { Grid } from '@material-ui/core';
import { CloudOutlined as PrecipitationIcon } from '@material-ui/icons';

import { blue } from '@material-ui/core/colors';

import { fetchStationData } from '../actions';
import { ChartCard } from '../../components';

class StationDataContainer extends React.PureComponent {
  componentDidMount() {
    this.fetchStationData();
  }
  componentDidUpdate(nextProps) {
    const { stationId, start, end } = this.props;
    if (stationId !== nextProps.stationId || start !== nextProps.start || end !== nextProps.end) {
      this.fetchStationData();
    }
  }

  fetchStationData() {
    const { stationId, start, end, view } = this.props;
    stationId && this.props.fetchStationData(stationId, start, end, view);
  }

  render() {
    const { stationData, start, end, view, error, loading } = this.props;

    const precipitationChartOptions = {
      maintainAspectRatio: false,
      scales: {
        yAxes: [
          {
            ticks: {
              min: 0,
            },
          },
        ],
        xAxes: [
          {
            type: 'time',
            time: {
              unit: view === 'day' ? 'hour' : 'day',
              min: moment(start).valueOf(),
              max: moment(end).valueOf(),
            },
          },
        ],
      },
    };

    const precipitationChartData = {
      datasets: [
        {
          label: 'Précipitation (mm)',
          fill: false,
          backgroundColor: blue[600],
          borderColor: blue[800],
          data:
            stationData &&
            stationData.map(data => {
              return {
                t: moment(data.date),
                y: data.intensity,
              };
            }),
        },
      ],
    };

    return (
      <Grid item xs={12}>
        <ChartCard
          type="bar"
          title="Précipitations"
          icon={<PrecipitationIcon />}
          hasData={!isEmpty(stationData)}
          data={precipitationChartData}
          options={precipitationChartOptions}
          error={error}
          loading={loading}
        />
      </Grid>
    );
  }
}

StationDataContainer.propTypes = {
  fetchStationData: PropTypes.func.isRequired,
  stationData: PropTypes.array,
  stationId: PropTypes.string.isRequired,
  start: PropTypes.string.isRequired,
  end: PropTypes.string.isRequired,
  error: PropTypes.bool,
  loading: PropTypes.bool,
};

const mapStateToProps = state => ({
  ...state.station,
});

const mapDispatchToProps = {
  fetchStationData,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StationDataContainer);
