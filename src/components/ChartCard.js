import React from 'react';
import PropTypes from 'prop-types';

import {
  withStyles,
  Grid,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography,
  CircularProgress,
  Divider,
} from '@material-ui/core';

import {
  ExpandMoreOutlined as ExpandMoreIcon,
} from '@material-ui/icons';

import { Line, Bar } from 'react-chartjs-2';

const styles = () => ({
  chartArea: {
    height: 500,
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

  getChartType(type) {
    switch(type) {
      case 'line': 
        return Line;
      case 'bar': 
        return Bar;
      default: return Line;
    }
  }

  render() {
    const { classes, type, title, icon, data, options, error, loading } = this.props;
    const { expanded } = this.state;

    const CartType = this.getChartType(type);

    return (
      <ExpansionPanel expanded={expanded} onChange={this.handleExpand}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Grid container spacing={24} alignItems="center">
            <Grid item>
              {icon}
            </Grid>
            <Grid item xs>
              <Typography variant="subtitle1">{title}</Typography>
            </Grid>
          </Grid>
        </ExpansionPanelSummary>
        <Divider />
        <ExpansionPanelDetails className={classes.chartArea}>
          {!error && !loading ? (
            <CartType data={data} options={options} />
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
  children: PropTypes.element,
  title: PropTypes.string,
  icon: PropTypes.element,
  error: PropTypes.bool,
  loading: PropTypes.bool,
};

export default withStyles(styles)(ChartCard);
