import React from 'react';
// import PropTypes from 'prop-types';

import moment from 'moment';

import Divider from '@material-ui/core/Divider';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

import { defaults, Line } from 'react-chartjs-2';

import precipitationData from './precipitationData.json';

defaults.global.responsive = true;

window.chartColors = {
  red: {
    border: 'rgb(255, 99, 132)',
    background: 'rgba(255, 99, 132, 0.2)',
  },
  blue: {
    border: 'rgb(54, 162, 235)',
    background: 'rgba(54, 162, 235, 0.2)',
  },
};

const currentDay = moment().month(4).day(20);

const DashboardContainer = () => {
  const chartData = (start, end) => {
    const chartStart = start || moment(currentDay).startOf('day');
    const chartEnd = start || moment(currentDay).endOf('day');

    const chartData = precipitationData.filter((data) =>
      moment(data.date).isBetween(chartStart, chartEnd)
    );

    return {
      datasets: [{
        label: 'Précipitation (mm/h)',
        backgroundColor: window.chartColors.blue.background,
        borderColor: window.chartColors.blue.border,
        data: chartData.map((data) => {
          return {
            t: moment(data.date),
            y: data.intensity,
          };
        }),
      }],
    };
  };

  const chartOptions = {
    scales: {
      xAxes: [{
        type: 'time',
      }]
    }
  };

  return (
    <Grid container spacing={24}>
      <Grid item xs={12} lg={6}>
        <Card>
          <CardHeader title="Précipitations" subheader="Sous title" />
          <Divider />
          <CardContent>
            <Line data={chartData()} options={chartOptions} />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

// DashboardContainer.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

export default DashboardContainer;
