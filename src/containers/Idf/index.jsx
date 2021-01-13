import { Grid } from "@material-ui/core";
import { green, orange, red, amber } from "@material-ui/core/colors";
import {
  ListOutlined as TableIcon,
  MultilineChartOutlined as IdfIcon,
} from "@material-ui/icons";
import { isEmpty } from "lodash";
import moment from "moment";
import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { ChartCard, IdfTableCard } from "../../components";
import { fetchIdfData, fetchIdfStationData } from "../actions";

const chartColors = [
  green[300],
  amber[400],
  orange[400],
  orange[800],
  red[600],
  red[900],
];

class IdfContainer extends React.PureComponent {
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

    const increments = [5, 10, 15, 30, 60, 120, 180, 360, 720, 1440];
    const idfIncrements = [5, 10, 15, 30, 60, 120, 360, 720, 1440];

    let pdrIncrements = Array.from(Array(1440).keys());
    pdrIncrements.splice(0, 5);

    const idfTableData = idfStationData.filter(
      (idfData) => increments.indexOf(idfData.increment) !== -1
    );

    const averagesData = idfData.map((data, index) => ({
      label: `HIDE - ${data.interval} ans`,
      fill: false,
      showLine: false,
      backgroundColor: chartColors[index],
      borderColor: chartColors[index],
      data: idfIncrements.map((increment) => ({
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
    const allData = {
      label: "Donnees mensuelles",
      fill: false,
      showLine: true,
      lineTension: 0.1,
      pointRadius: 0,
      backgroundColor: "#1F61AD",
      borderColor: "#1F61AD",
      data: idfStationData.map((stationData) => ({
        x: stationData.increment,
        y: parseFloat(stationData.intensity).toFixed(2),
      })),
    };
    const data = {
      label: "HIDE - Donnees mensuelles",
      fill: false,
      showLine: false,
      backgroundColor: "#1F61AD",
      borderColor: "#1F61AD",
      data: idfTableData.map((idfData) => ({
        x: idfData.increment,
        y: idfData.intensity.toFixed(2),
      })),
    };

    const idfChartData = {
      datasets: [allData, data, ...averagesData, ...pdrData],
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
              min: 1,
              max: 500,
              callback: (value) => Number(value.toString()),
            },
          },
        ],
      },
    };

    return (
      <Grid container spacing={2}>
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
            hasData={!isEmpty(idfTableData)}
            data={idfTableData}
            error={error}
            loading={loading}
          />
        </Grid>
      </Grid>
    );
  }
}

IdfContainer.propTypes = {
  fetchIdfData: PropTypes.func.isRequired,
  fetchIdfStationData: PropTypes.func.isRequired,
  idfData: PropTypes.array,
  idfStationData: PropTypes.array,
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

export default connect(mapStateToProps, mapDispatchToProps)(IdfContainer);
