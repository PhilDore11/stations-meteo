import React from 'react';
import PropTypes from 'prop-types';

import {
  Grid,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography,
  Divider,
} from '@material-ui/core';

import { ExpandMoreOutlined as ExpandMoreIcon, RouterOutlined as DeviceIcon } from '@material-ui/icons';

import { ClientMenu, StationCard } from './';

const ClientStations = ({ client }) => (
  <Grid container spacing={24}>
    {client.stations &&
      client.stations.map(station => (
        <Grid item key={station.id}>
          <StationCard station={station} />
        </Grid>
      ))}
  </Grid>
);

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
    const { showActions, client, onClientEdit, onClientDelete } = this.props;
    const { expanded } = this.state;

    if (!showActions) {
      return <ClientStations client={client} />;
    } else {
      return (
        <ExpansionPanel expanded={expanded} key={client.id} onChange={this.handleExpand}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Grid container spacing={24} alignItems="center">
              <Grid item>
                <DeviceIcon color="action" />
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
            <ClientStations client={client} />
          </ExpansionPanelDetails>
        </ExpansionPanel>
      );
    }
  }
}

ClientRow.propTypes = {
  client: PropTypes.object.isRequired,
  stations: PropTypes.array,
  showActions: PropTypes.bool,
  expanded: PropTypes.bool,
  onClientEdit: PropTypes.func.isRequired,
  onClientDelete: PropTypes.func.isRequired,
};

export default ClientRow;
