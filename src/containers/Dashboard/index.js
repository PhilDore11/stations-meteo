import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import moment from 'moment';

import { Grid } from '@material-ui/core';
import { CloudOutlined as PrecipitationIcon } from '@material-ui/icons';

import { blue } from '@material-ui/core/colors';

import { Bar } from 'react-chartjs-2';

import { fetchStationData, increment, decrement, setView } from './actions';
import { ChartCard, ChartHeader } from '../../components';

class DashboardContainer extends React.PureComponent {
  constructor(props) {
    super(props);

    this.fetchStationData = this.fetchStationData.bind(this);
    this.handleViewChange = this.handleViewChange.bind(this);
  }

  componentDidMount() {
    this.fetchStationData();
  }
  componentDidUpdate(prevProps) {
    if (this.props.start !== prevProps.start || this.props.end !== prevProps.end) {
      this.fetchStationData();
    }
  }

  fetchStationData() {
    const { loggedInUser } = this.props;
    if (loggedInUser) {
      const clientId = loggedInUser.clients[0].id;
      this.props.fetchStationData(clientId, this.props.start, this.props.end);
    }
  }

  handleViewChange(event) {
    this.props.setView(event.target.value);
  }

  render() {
    const { stationData, start, end, view, dashboardError, dashboardLoading } = this.props;

    const precipitationChartOptions = {
      maintainAspectRatio: false,
      scales: {
        xAxes: [
          {
            type: 'time',
            time: {
              unit: view === 'day' ? 'hour' : 'day',
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
          <ChartHeader
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
            title="Précipitations"
            icon={<PrecipitationIcon />}
            error={dashboardError}
            loading={dashboardLoading}>
            <Bar data={precipitationChartData} options={precipitationChartOptions} />
          </ChartCard>
        </Grid>
      </Grid>
    );
  }
}

DashboardContainer.propTypes = {
  fetchStationData: PropTypes.func.isRequired,
  stationData: PropTypes.array,
  loggedInUser: PropTypes.object,
  increment: PropTypes.func.isRequired,
  decrement: PropTypes.func.isRequired,
  start: PropTypes.string,
  end: PropTypes.string,
  dashboardError: PropTypes.bool,
  dashboardLoading: PropTypes.bool,
};

const mapStateToProps = state => ({
  ...state.dashboard,
  ...state.login,
});

const mapDispatchToProps = {
  fetchStationData,
  increment,
  decrement,
  setView,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DashboardContainer);
