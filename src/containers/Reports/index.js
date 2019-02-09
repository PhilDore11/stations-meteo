import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import moment from 'moment';

import { Grid } from '@material-ui/core';
import { MultilineChartOutlined as IdfIcon, CloudOutlined as PrecipitationIcon } from '@material-ui/icons';

import { blue, red, orange, green, cyan, purple } from '@material-ui/core/colors';

import { fetchStationData, fetchIdfData, setYear, setMonth } from '../actions';
import { ChartCard, ReportHeader } from '../../components';

const chartColors = [blue, red, orange, green, cyan, purple];

class ReportsContainer extends React.PureComponent {
  constructor(props) {
    super(props);

    this.fetchIdfData = this.fetchIdfData.bind(this);
    this.handleYearChange = this.handleYearChange.bind(this);
    this.handleMonthChange = this.handleMonthChange.bind(this);
  }

  componentDidMount() {
    this.fetchIdfData();
    this.fetchStationData();
  }
  componentDidUpdate(prevProps) {
    if (this.props.month !== prevProps.month) {
      this.fetchIdfData();
      this.fetchStationData();
    }
  }

  fetchIdfData() {
    const { loggedInUser } = this.props;
    if (loggedInUser) {
      const clientId = loggedInUser.clients[0].id;
      this.props.fetchIdfData(clientId);
    }
  }

  fetchStationData() {
    const { loggedInUser, year, month } = this.props;
    const start = moment()
      .year(year)
      .month(month)
      .startOf('month')
      .toISOString();
    const end = moment()
      .year(year)
      .month(month)
      .endOf('month')
      .toISOString();

    if (loggedInUser) {
      const clientId = loggedInUser.clients[0].id;
      this.props.fetchStationData(clientId, start, end);
    }
  }

  handleMonthChange(event) {
    this.props.setMonth(event.target.value);
  }

  handleYearChange(event) {
    this.props.setYear(event.target.value);
  }

  render() {
    const {
      idfData,
      stationData,
      year,
      month,
      reportsError,
      reportsLoading,
      dashboardError,
      dashboardLoading,
    } = this.props;

    const idfChartData = {
      labels: ['5 mins', '10 mins', '15 mins', '30 mins', '1 hr', '2 hrs', '6 hrs', '12 hrs', '24hrs'],
      datasets:
        idfData &&
        idfData.map((data, index) => ({
          label: `${data.interval} ans`,
          fill: false,
          backgroundColor: chartColors[index][600],
          borderColor: chartColors[index][800],
          data: [
            data['5mins'] * 12,
            data['10mins'] * 6,
            data['15mins'] * 4,
            data['30mins'] * 2,
            data['1hr'],
            data['2hrs'] / 2,
            data['6hrs'] / 6,
            data['12hrs'] / 12,
            data['24hrs'] / 24,
          ],
        })),
    };

    const idfChartOptions = {
      maintainAspectRatio: false,
      scales: {
        yAxes: [
          {
            type: 'logarithmic',
            ticks: {
              min: 0,
              max: 250,
              callback: value => Number(value.toString()),
            },
          },
        ],
      },
    };

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
              unit: 'day',
              min: moment().year(year).month(month).startOf('month').valueOf(),
              max: moment().year(year).month(month).endOf('month').valueOf(),
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

    const currentYear = moment().year();
    const reportYears = [];
    [0, 1, 2, 3, 4, 5].forEach(index => reportYears.push(currentYear - index));

    return (
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <ReportHeader
            years={reportYears}
            year={year}
            month={month}
            onYearChange={this.handleYearChange}
            onMonthChange={this.handleMonthChange}
          />
        </Grid>
        <Grid item xs={12}>
          <ChartCard
            type="line"
            title="IDF"
            icon={<IdfIcon />}
            data={idfChartData}
            options={idfChartOptions}
            error={reportsError}
            loading={reportsLoading}
          />
        </Grid>
        <Grid item xs={12}>
          <ChartCard
            type="bar"
            title="Precipitations"
            icon={<PrecipitationIcon />}
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

ReportsContainer.propTypes = {
  fetchIdfData: PropTypes.func.isRequired,
  fetchStationData: PropTypes.func.isRequired,
  idfData: PropTypes.array,
  stationData: PropTypes.array,
  loggedInUser: PropTypes.object,
  month: PropTypes.number,
  reportsError: PropTypes.bool,
  reportsLoading: PropTypes.bool,
  dashboardError: PropTypes.bool,
  dashboardLoading: PropTypes.bool,
};

const mapStateToProps = state => ({
  ...state.reports,
  ...state.dashboard,
  ...state.login,
});

const mapDispatchToProps = {
  fetchStationData,
  fetchIdfData,
  setYear,
  setMonth,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReportsContainer);
