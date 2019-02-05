import React from "react";
import PropTypes from "prop-types";

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

import { VIEWS } from '../containers/Dashboard/constants';

moment.locale('fr');

class ChartHeader extends React.PureComponent {
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
    const { start, end, view, increment, decrement, onViewChange } = this.props;
    
    return (
      <Grid container spacing={24} alignItems='center'>
        <Grid item xs />
        <Grid item>
          <IconButton onClick={decrement}>
            <ChevronLeftIcon />
          </IconButton>
        </Grid>
        <Grid item>
          <Typography variant='h6'>
            {moment(start).format('MMMM DD')}
          </Typography>
          <Typography style={{textAlign: 'center'}} variant='caption'>{moment(start).format('YYYY')}</Typography>
        </Grid>
        {view !== 'day' && (
          <React.Fragment>
            <Grid item>{' - '}</Grid>
            <Grid item>
              <Typography variant='h6'>
                {moment(end).format('MMMM DD')}
              </Typography>
              <Typography style={{textAlign: 'center'}} variant='caption'>{moment(end).format('YYYY')}</Typography>
            </Grid>
          </React.Fragment>
        )}
        <Grid item>
          <IconButton onClick={increment}>
            <ChevronRightIcon />
          </IconButton>
        </Grid>
        <Grid item xs>
          <Grid container justify='flex-end'>
            <Grid item>
              <TextField
                select
                value={view}
                onChange={onViewChange}
                margin='normal'
                variant='outlined'
              >
                {VIEWS.map(view => (
                  <MenuItem key={view.key} value={view.key}>
                    {view.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

ChartHeader.propTypes = {
  start: PropTypes.string.isRequired,
  end: PropTypes.string.isRequired,
  view: PropTypes.oneOf(VIEWS.keys()).isRequired,
  increment: PropTypes.func.isRequired,
  decrement: PropTypes.func.isRequired,
  onViewChange: PropTypes.func.isRequired
};

export default ChartHeader;
