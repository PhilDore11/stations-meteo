import React from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";

import moment from "moment";

import {
  Grid,
  IconButton,
  Typography
} from "@material-ui/core";

import {
  ChevronLeftOutlined as ChevronLeftIcon,
  ChevronRightOutlined as ChevronRightIcon
} from "@material-ui/icons";

import { defaults } from "react-chartjs-2";

import { fetchStationData, incrementDay, decrementDay } from "./actions";
import { ChartCard } from "../../components";

defaults.global.responsive = true;

const chartColors = {
  red: {
    border: "rgb(255, 99, 132)",
    background: "rgba(255, 99, 132, 0.2)"
  },
  blue: {
    border: "rgb(54, 162, 235)",
    background: "rgba(54, 162, 235, 0.2)"
  }
};

class DashboardContainer extends React.PureComponent {
  constructor(props) {
    super(props);

    this.fetchStationData = this.fetchStationData.bind(this);
  }
  
  componentDidMount() {
    this.fetchStationData();
  }
  componentDidUpdate(prevProps) {
    if (this.props.currentDay !== prevProps.currentDay) {
      this.fetchStationData();
    }
  }

  fetchStationData() {
    const { loggedInUser } = this.props;
    const clientId = loggedInUser && loggedInUser.clients[0].id
    this.props.fetchStationData(clientId, this.props.currentDay);
  }

  render() {
    const { precipitationData, currentDay } = this.props;
    const chartData = {
      datasets: [
        {
          label: "Précipitation (mm/h)",
          backgroundColor: chartColors.blue.background,
          borderColor: chartColors.blue.border,
          data:
            precipitationData &&
            precipitationData.map(data => {
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
          <Grid
            container
            spacing={24}
            justify="space-between"
            alignItems="center"
          >
            <Grid item>
              <IconButton onClick={this.props.decrementDay}>
                <ChevronLeftIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <Typography variant="h6">
                {moment(currentDay).format("MMMM DD")}
              </Typography>
            </Grid>
            <Grid item>
              <IconButton onClick={this.props.incrementDay}>
                <ChevronRightIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <ChartCard
            title="Précipitations"
            fetchData={this.fetchStationData}
            chartData={chartData}
            chartOptions={this.chartOptions}
          />
        </Grid>
      </Grid>
    );
  }
}

DashboardContainer.propTypes = {
  fetchStationData: PropTypes.func.isRequired,
  precipitationData: PropTypes.array,
  loggedInUser: PropTypes.object,
  incrementDay: PropTypes.func.isRequired,
  decrementDay: PropTypes.func.isRequired,
  currentDay: PropTypes.object
};

const mapStateToProps = state => ({
  ...state.dashboard,
  ...state.login
});

const mapDispatchToProps = {
  fetchStationData,
  incrementDay,
  decrementDay
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardContainer);
