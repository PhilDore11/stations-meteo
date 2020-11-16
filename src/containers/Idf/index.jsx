import React from "react";
import PropTypes from "prop-types";

import moment from "moment";

import { connect } from "react-redux";

import { isEmpty } from "lodash";

import { Grid } from "@material-ui/core";
import {
  MultilineChartOutlined as IdfIcon,
  ListOutlined as TableIcon,
} from "@material-ui/icons";

import {
  blue,
  amber,
  green,
  indigo,
  red,
  pink,
} from "@material-ui/core/colors";

import { fetchIdfData, fetchIdfStationData } from "../actions";
import { ChartCard, IdfTableCard } from "../../components";

const chartColors = [
  blue[200],
  pink[200],
  green[200],
  amber[200],
  indigo[200],
  red[200],
];

class idfContainer extends React.PureComponent {
  componentDidMount() {
    this.fetchIdfData();
    this.fetchIdfStationData();
  }
  componentDidUpdate(nextProps) {
    const { stationId, start, end } = this.props;
    if (
      stationId !== nextProps.stationId ||
      start !== nextProps.start ||
      end !== nextProps.end
    ) {
      this.fetchIdfData();
      this.fetchIdfStationData();
    }
  }

  get referenceStationName() {
    return (
      this.props.idfData &&
      this.props.idfData.length > 0 &&
      this.props.idfData[0].name
    );
  }

  fetchIdfData() {
    const { stationId } = this.props;
    this.props.fetchIdfData(stationId);
  }

  fetchIdfStationData() {
    const { stationId, start, end, view } = this.props;
    this.props.fetchIdfStationData(stationId, start, end, view);
  }

  render() {
    const { idfData, idfStationData, error, loading } = this.props;

    const increments = [5, 10, 15, 30, 60, 120, 360, 720, 1440];
    let pdrIncrements = Array.from(Array(1440).keys());
    pdrIncrements.splice(0, 5);

    const averagesData = idfData.map((data, index) => ({
      label: `HIDE - ${data.interval} ans`,
      fill: false,
      showLine: false,
      backgroundColor: chartColors[index],
      borderColor: chartColors[index],
      data: increments.map((increment) => ({
        x: increment,
        y: parseFloat(data[increment] * (60 / increment)).toFixed(2),
      })),
    }));
    const pdrData = idfData.map((data, index) => ({
      label: `${data.interval} ans`,
      fill: false,
      showLine: true,
      borderDash: [3],
      pointRadius: 0,
      backgroundColor: chartColors[index],
      borderColor: chartColors[index],
      data: pdrIncrements.map((increment) => ({
        x: increment,
        y: parseFloat(data.a / Math.pow(data.b + increment, data.c)).toFixed(2),
      })),
    }));
    const data = {
      label: "Donnees mensuelles",
      fill: false,
      lineTension: 0.2,
      showLine: true,
      backgroundColor: blue[800],
      borderColor: blue[800],
      data: idfStationData.map((stationData, index) => ({
        x: increments[index],
        y: parseFloat(
          stationData.intensity * (60 / stationData.increment)
        ).toFixed(2),
      })),
    };

    const idfChartData = {
      datasets: [data, ...averagesData, ...pdrData],
    };

    const idfChartOptions = {
      maintainAspectRatio: false,

      title: {
        display: true,
        text: `Station Référence: ${this.referenceStationName}`,
      },

      legend: {
        labels: {
          filter: (item) => !item.text.startsWith("HIDE"),
        },
      },

      scales: {
        xAxes: [
          {
            type: "logarithmic",
            ticks: {
              min: 0,
              max: 1440,
              callback: (value, index) => {
                const increment = increments[index];
                if (increment < 60) {
                  return (
                    moment.duration(value, "minutes").asMinutes() + " mins"
                  );
                } else if (increment > 60) {
                  return moment.duration(value, "minutes").asHours() + " hrs";
                } else {
                  return moment.duration(value, "minutes").asHours() + " hr";
                }
              },
            },
            afterBuildTicks: function (chart) {
              chart.ticks = [...increments];
            },
          },
        ],
        yAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: "Intensite de pluie (mm/h)",
            },
            type: "logarithmic",
            ticks: {
              min: 0,
              max: 500,
              callback: (value) => Number(value.toString()),
            },
          },
        ],
      },
    };

    return (
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <ChartCard
            type="scatter"
            title="IDF"
            height={700}
            icon={<IdfIcon />}
            hasData={!isEmpty(idfStationData) && !isEmpty(idfStationData)}
            data={idfChartData}
            options={idfChartOptions}
            error={error}
            loading={loading}
          />
        </Grid>
        <Grid item xs={12}>
          <IdfTableCard
            title="Tableau de donnees"
            icon={<TableIcon />}
            hasData={!isEmpty(idfStationData)}
            data={idfStationData}
            error={error}
            loading={loading}
          />
        </Grid>
      </Grid>
    );
  }
}

idfContainer.propTypes = {
  fetchIdfData: PropTypes.func.isRequired,
  fetchIdfStationData: PropTypes.func.isRequired,
  idfData: PropTypes.array,
  idfStationData: PropTypes.array,
  stationId: PropTypes.string.isRequired,
  start: PropTypes.string.isRequired,
  end: PropTypes.string.isRequired,
  error: PropTypes.bool,
  loading: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  ...state.idf,
});

const mapDispatchToProps = {
  fetchIdfData,
  fetchIdfStationData,
};

export default connect(mapStateToProps, mapDispatchToProps)(idfContainer);
