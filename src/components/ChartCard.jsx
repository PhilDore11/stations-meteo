import React from "react";
import PropTypes from "prop-types";

import {
  withStyles,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Divider,
} from "@material-ui/core";

import { ExpandMoreOutlined as ExpandMoreIcon } from "@material-ui/icons";

import { Line, Bar, Scatter } from "react-chartjs-2";

import { Loading, NoData } from "./";

const styles = () => ({
  chartArea: {
    minHeight: 500,
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

  getChartType(type) {
    switch (type) {
      case "line":
        return Line;
      case "bar":
        return Bar;
      case "scatter":
        return Scatter;
      default:
        return Line;
    }
  }

  render() {
    const {
      classes,
      type,
      title,
      height,
      icon,
      hasData,
      data,
      options,
      error,
      loading,
    } = this.props;
    const { expanded } = this.state;

    const ChartType = this.getChartType(type);

    return (
      <Accordion expanded={expanded} onChange={this.handleExpand}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Grid container spacing={2} alignItems="center">
            <Grid item>{icon}</Grid>
            <Grid item xs>
              <Typography variant="subtitle1">{title}</Typography>
            </Grid>
          </Grid>
        </AccordionSummary>
        <Divider />
        <AccordionDetails className={classes.chartArea}>
          {!error && !loading ? (
            hasData ? (
              <ChartType data={data} options={options} height={height} />
            ) : (
              <NoData />
            )
          ) : (
            <Loading />
          )}
        </AccordionDetails>
      </Accordion>
    );
  }
}

ChartCard.propTypes = {
  classes: PropTypes.object.isRequired,
  type: PropTypes.oneOf(["line", "bar", "scatter"]),
  title: PropTypes.string,
  height: PropTypes.number,
  icon: PropTypes.element,
  hasdata: PropTypes.bool,
  data: PropTypes.object,
  options: PropTypes.object,
  error: PropTypes.bool,
  loading: PropTypes.bool,
};

export default withStyles(styles)(ChartCard);
