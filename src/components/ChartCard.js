import React from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';

import {
  withStyles,
  Grid,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography,
  CircularProgress,
} from '@material-ui/core';

import {
  ExpandMoreOutlined as ExpandMoreIcon,
  CloudOutlined as CloudIcon,
} from '@material-ui/icons';

import { blue } from '@material-ui/core/colors';

import { Line } from 'react-chartjs-2';

const styles = () => ({
  chartArea: {
    height: 400,
  },
  loading: {
    margin: 'auto',
  },
});

class ChartCard extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      expanded: true,
    };

    this.handleExpand = this.handleExpand.bind(this);
  }

  handleExpand() {
    this.setState({ expanded: !this.state.expanded });
  }

  render() {
    const { classes, stationData, title, view, error, loading } = this.props;
    const { expanded } = this.state;

    const chartOptions = {
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

    const chartData = {
      datasets: [
        {
          label: 'Précipitation (mm/h)',
          fill: false,
          borderColor: blue[500],
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
      <ExpansionPanel expanded={expanded} onChange={this.handleExpand}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Grid container spacing={24} alignItems="center">
            <Grid item>
              <CloudIcon />
            </Grid>
            <Grid item xs>
              <Typography variant="subtitle1">{title}</Typography>
            </Grid>
          </Grid>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.chartArea}>
          {!error && !loading ? (
            <Line
              className={classes.chart}
              data={chartData}
              options={chartOptions}
            />
          ) : (
            <CircularProgress className={classes.loading} />
          )}
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
}

ChartCard.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string,
  view: PropTypes.string.isRequired,
  stationData: PropTypes.array.isRequired,
  error: PropTypes.bool,
  loading: PropTypes.bool,
};

export default withStyles(styles)(ChartCard);
