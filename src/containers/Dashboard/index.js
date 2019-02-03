import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import moment from 'moment';

import {
  Grid,
  IconButton,
  Typography,
  TextField,
  MenuItem,
} from '@material-ui/core';

import {
  ChevronLeftOutlined as ChevronLeftIcon,
  ChevronRightOutlined as ChevronRightIcon
} from '@material-ui/icons';

import { defaults } from 'react-chartjs-2';

import { fetchStationData, increment, decrement, setView } from './actions';
import { ChartCard } from '../../components';

defaults.global.responsive = true;

const chartColors = {
  red: {
    border: 'rgb(255, 99, 132)',
    background: 'rgba(255, 99, 132, 0.2)'
  },
  blue: {
    border: 'rgb(54, 162, 235)',
    background: 'rgba(54, 162, 235, 0.2)'
  }
};

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
      const clientId = loggedInUser.clients[0].id
      this.props.fetchStationData(clientId, this.props.start, this.props.end);
    }
  }

  handleViewChange(event) {
    this.props.setView(event.target.value);
  }

  render() {
    const { stationData, start, end, view, dashboardError, dashboardLoading } = this.props;
    const chartData = {
      datasets: [
        {
          label: 'Précipitation (mm/h)',
          backgroundColor: chartColors.blue.background,
          borderColor: chartColors.blue.border,
          data:
            stationData &&
            stationData.map(data => {
              return {
                t: moment(data.date),
                y: data.intensity
              };
            })
        }
      ]
    };

    return (
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <Grid container spacing={24} alignItems='center'>
            <Grid item xs />
            <Grid item>
              <IconButton onClick={this.props.decrement}>
                <ChevronLeftIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <Typography variant='h6'>
                {moment(start).format('MMMM DD')}
              </Typography>
              <Typography style={{textAlign: 'center'}} variant='caption'>{moment(start).format('YYYY')}</Typography>
            </Grid>
            <Grid item>{' - '}</Grid>
            <Grid item>
              <Typography variant='h6'>
                {moment(end).format('MMMM DD')}
              </Typography>
              <Typography style={{textAlign: 'center'}} variant='caption'>{moment(end).format('YYYY')}</Typography>
            </Grid>
            <Grid item>
              <IconButton onClick={this.props.increment}>
                <ChevronRightIcon />
              </IconButton>
            </Grid>
            <Grid item xs>
              <Grid container justify='flex-end'>
                <Grid item>
                  <TextField
                    select
                    value={view}
                    onChange={this.handleViewChange}
                    margin='normal'
                    variant='outlined'
                  >
                    {['day', 'week', 'month', 'year'].map(view => (
                      <MenuItem key={view} value={view}>
                        {view}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <ChartCard
            title='Précipitations'
            fetchData={this.fetchStationData}
            chartData={chartData}
            chartOptions={this.chartOptions}
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
  stationData: PropTypes.array,
  loggedInUser: PropTypes.object,
  increment: PropTypes.func.isRequired,
  decrement: PropTypes.func.isRequired,
  start: PropTypes.string,
  end: PropTypes.string,
  dashboardError: PropTypes.bool,
  dashboardLoading: PropTypes.bool
};

const mapStateToProps = state => ({
  ...state.dashboard,
  ...state.login
});

const mapDispatchToProps = {
  fetchStationData,
  increment,
  decrement,
  setView
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardContainer);
