import React from "react";
import PropTypes from "prop-types";

import {
  Grid,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography,
} from "@material-ui/core";

import {
  ExpandMoreOutlined as ExpandMoreIcon,
  CloudOutlined as CloudIcon
} from "@material-ui/icons";

import { Line } from "react-chartjs-2";

class ChartCard extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      expanded: true,
      chartOptions: {
        scales: {
          xAxes: [
            {
              type: "time"
            }
          ]
        }
      }
    };

    this.handleExpand = this.handleExpand.bind(this);
  }

  handleExpand() {
    this.setState({expanded: !this.state.expanded})
  }

  render() {
    const { title, chartData, error, loading } = this.props;
    const { expanded, chartOptions } = this.state;
    
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
        <ExpansionPanelDetails>
          {!error && !loading ? <Line data={chartData} options={chartOptions} /> : <Typography variant="h6">Loading...</Typography>}
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
}

ChartCard.propTypes = {
  title: PropTypes.string,
  chartData: PropTypes.object.isRequired
};

export default ChartCard;
