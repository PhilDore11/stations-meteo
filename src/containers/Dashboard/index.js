import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import moment from 'moment';
import { isEmpty } from 'lodash';

import { Grid } from '@material-ui/core';
import { CloudOutlined as PrecipitationIcon } from '@material-ui/icons';

import { blue } from '@material-ui/core/colors';

import { fetchStationData, increment, decrement, setStation, setView } from '../actions';
import { ChartCard, DashboardHeader } from '../../components';

class DashboardContainer extends React.PureComponent {
  constructor(props) {
    super(props);

    this.handleStationChange = this.handleStationChange.bind(this);
    this.handleViewChange = this.handleViewChange.bind(this);
  }

  componentDidMount() {
    this.fetchStationData();
  }
  componentDidUpdate(prevProps) {
    if (
      this.props.stationId !== prevProps.stationId ||
      this.props.start !== prevProps.start ||
      this.props.end !== prevProps.end ||
      this.props.view !== prevProps.view
    ) {
      this.fetchStationData();
    }
  }

  fetchStationData() {
    const { stationId, start, end, view } = this.props;
    stationId && this.props.fetchStationData(stationId, start, end, view);
  }

  handleStationChange(event) {
    this.props.setStation(event.target.value);
  }

  handleViewChange(event) {
    this.props.setView(event.target.value);
  }

  render() {
    const { clientStations, stationId, stationData, start, end, view, dashboardError, dashboardLoading } = this.props;

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
      <Grid container spacing={24}>
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
          <ChartCard
            type="bar"
            title="Précipitations"
            icon={<PrecipitationIcon />}
            hasData={!isEmpty(stationData)}
            data={precipitationChartData}
            options={precipitationChartOptions}
            error={dashboardError}
            loading={dashboardLoading}
          />
        </Grid>
      </Grid>
    );
  }
}

DashboardContainer.propTypes = {
  fetchStationData: PropTypes.func.isRequired,
  clientStations: PropTypes.array,
  stationId: PropTypes.string,
  stationData: PropTypes.array,
  increment: PropTypes.func.isRequired,
  decrement: PropTypes.func.isRequired,
  start: PropTypes.string,
  end: PropTypes.string,
  dashboardError: PropTypes.bool,
  dashboardLoading: PropTypes.bool,
  setStation: PropTypes.func.isRequired,
  setView: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  console.log('app', state.app);
  return {
    ...state.app,
    ...state.dashboard,
  };
};

const mapDispatchToProps = {
  fetchStationData,
  increment,
  decrement,
  setStation,
  setView,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DashboardContainer);
