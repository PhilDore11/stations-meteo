import React from 'react';
import PropTypes from 'prop-types';

import {
  withStyles,
  Grid,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Badge,
  Typography,
  Divider,
} from '@material-ui/core';

import { ExpandMoreOutlined as ExpandMoreIcon, RouterOutlined as DeviceIcon } from '@material-ui/icons';

import { ClientMenu, StationCard } from './';

const styles = theme => ({
  stationCard: {
    margin: theme.spacing.unit * 1,
  },
});

class ClientRow extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      expanded: this.props.expanded,
    };

    this.handleExpand = this.handleExpand.bind(this);
  }

  handleExpand() {
    this.setState({ expanded: !this.state.expanded });
  }

  render() {
    const { classes, showActions, client, onClientEdit, onClientDelete } = this.props;
    const { expanded } = this.state;
    return (
      <ExpansionPanel expanded={expanded} key={client.id} onChange={this.handleExpand}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Grid container spacing={24} alignItems="center">
            <Grid item>
              <Badge badgeContent={client.stations.length || 0} color="secondary">
                <DeviceIcon />
              </Badge>
            </Grid>
            <Grid item xs>
              <Typography variant="subtitle1">{client.name}</Typography>
            </Grid>
            {showActions ? (
              <Grid item>
                <ClientMenu onEdit={() => onClientEdit(client)} onDelete={() => onClientDelete(client)} />
              </Grid>
            ) : (
              ''
            )}
          </Grid>
        </ExpansionPanelSummary>
        <Divider />
        <ExpansionPanelDetails>
          {client.stations.map(station => (
            <div className={classes.stationCard}>
              <StationCard station={station} />
            </div>
          ))}
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
}

ClientRow.propTypes = {
  classes: PropTypes.object.isRequired,
  client: PropTypes.object.isRequired,
  stations: PropTypes.array,
  showActions: PropTypes.bool,
  expanded: PropTypes.bool,
  onClientEdit: PropTypes.func.isRequired,
  onClientDelete: PropTypes.func.isRequired,
};

export default React.memo(withStyles(styles)(ClientRow));
