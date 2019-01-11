import React from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";

import moment from "moment";

import {
  Divider,
  Grid,
  Card,
  CardHeader,
  CardContent,
  IconButton,
  Typography
} from "@material-ui/core";

import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon
} from "@material-ui/icons";

import { defaults, Line } from "react-chartjs-2";

import { fetchPrecipitationData, incrementDay, decrementDay } from "./actions";

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

class DashboardContainer extends React.Component {
  constructor(props) {
    super(props);

    this.chartOptions = {
      scales: {
        xAxes: [
          {
            type: "time"
          }
        ]
      }
    };
  }

  componentDidMount() {
    this.props.fetchPrecipitationData(this.props.currentDay);
  }
  componentDidUpdate(prevProps) {
    if (this.props.currentDay !== prevProps.currentDay) {
      this.props.fetchPrecipitationData(this.props.currentDay);
    }
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
        <Grid item xs={12} lg={6}>
          <Card>
            <CardHeader title="Précipitations" subheader="Sous title" />
            <Divider />
            <CardContent>
              <Line data={chartData} options={this.chartOptions} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  }
}

DashboardContainer.propTypes = {
  fetchPrecipitationData: PropTypes.func.isRequired,
  precipitationData: PropTypes.array,
  incrementDay: PropTypes.func.isRequired,
  decrementDay: PropTypes.func.isRequired,
  currentDay: PropTypes.object
};

const mapStateToProps = state => ({
  ...state.dashboard
});

const mapDispatchToProps = {
  fetchPrecipitationData,
  incrementDay,
  decrementDay
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardContainer);
