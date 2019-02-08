import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import moment from 'moment';

import { Grid } from '@material-ui/core';
import { MultilineChartOutlined as IdfIcon } from '@material-ui/icons';

import { blue, red, orange, green, cyan, purple } from '@material-ui/core/colors';

import { Line } from 'react-chartjs-2';

import { fetchIdfData, setMonth } from './actions';
import { ChartCard, ReportHeader } from '../../components';

const chartColors = [blue, red, orange, green, cyan, purple];

class ReportsContainer extends React.PureComponent {
  constructor(props) {
    super(props);

    this.fetchIdfData = this.fetchIdfData.bind(this);
    this.handleMonthChange = this.handleMonthChange.bind(this);
  }

  componentDidMount() {
    this.fetchIdfData();
  }

  fetchIdfData() {
    const { loggedInUser } = this.props;
    if (loggedInUser) {
      const clientId = loggedInUser.clients[0].id;
      this.props.fetchIdfData(clientId);
    }
  }

  handleMonthChange(event) {
    this.props.setMonth(event.target.value);
  }

  render() {
    const { idfData, month, reportsError, reportsLoading } = this.props;

    const precipitationChartData = {
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
      showLines: true,
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

    const currentMonth = moment().month();

    return (
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <ReportHeader maxMonth={currentMonth} month={month} onMonthChange={this.handleMonthChange} />
        </Grid>
        <Grid item xs={12}>
          <ChartCard title="IDF" icon={<IdfIcon />} error={reportsError} loading={reportsLoading}>
            <Line data={precipitationChartData} options={idfChartOptions} />
          </ChartCard>
        </Grid>
      </Grid>
    );
  }
}

ReportsContainer.propTypes = {
  fetchIdfData: PropTypes.func.isRequired,
  idfData: PropTypes.array,
  loggedInUser: PropTypes.object,
  month: PropTypes.number,
  reportsError: PropTypes.bool,
  reportsLoading: PropTypes.bool,
};

const mapStateToProps = state => ({
  ...state.reports,
  ...state.login,
});

const mapDispatchToProps = {
  fetchIdfData,
  setMonth,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReportsContainer);
