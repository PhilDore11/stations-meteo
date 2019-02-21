import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { isEmpty, chain } from 'lodash';

import { Grid } from '@material-ui/core';
import { MultilineChartOutlined as IdfIcon, ListOutlined as TableIcon } from '@material-ui/icons';

import { blue, amber, green, indigo, red, pink } from '@material-ui/core/colors';

import { fetchIdfData, fetchIdfStationData } from '../actions';
import { ChartCard, IdfTableCard } from '../../components';

const chartColors = [blue[200], pink[200], green[200], amber[200], indigo[200], red[200]];

class idfContainer extends React.PureComponent {
  componentDidMount() {
    this.fetchIdfData();
    this.fetchIdfStationData();
  }
  componentDidUpdate(nextProps) {
    const { stationId, start, end } = this.props;
    if (stationId !== nextProps.stationId || start !== nextProps.start || end !== nextProps.end) {
      this.fetchIdfData();
      this.fetchIdfStationData();
    }
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

    const idfChartData = {
      labels: ['5 mins', '10 mins', '15 mins', '30 mins', '1 hr', '2 hrs', '6 hrs', '12 hrs', '24hrs'],
      datasets:
        idfData &&
        chain(idfData)
          .map((data, index) => ({
            label: `${data.interval} ans`,
            fill: false,
            lineTension: 0,
            borderDash: [10, 5],
            backgroundColor: chartColors[index],
            borderColor: chartColors[index],
            data: [5, 10, 15, 30, 60, 120, 360, 720, 1440].map(increment =>
              parseFloat(data[increment] * (60 / increment)).toFixed(2),
            ),
          }))
          .unshift({
            label: 'Donnees mensuelles',
            fill: false,
            lineTension: 0,
            backgroundColor: blue[800],
            borderColor: blue[800],
            data: idfStationData.map(stationData =>
              parseFloat(stationData.intensity * (60 / stationData.increment)).toFixed(2),
            ),
          })
          .value(),
    };

    const idfChartOptions = {
      maintainAspectRatio: false,
      scales: {
        yAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: 'Intensite de pluie (mm/h)',
            },
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

    return (
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <ChartCard
            type="line"
            title="IDF"
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

const mapStateToProps = state => ({
  ...state.idf,
});

const mapDispatchToProps = {
  fetchIdfData,
  fetchIdfStationData,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(idfContainer);
