import React from "react";
import PropTypes from "prop-types";

import {
  Grid,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Badge,
  Typography,
} from "@material-ui/core";

import {
  ExpandMore as ExpandMoreIcon,
  Router as DeviceIcon,
} from "@material-ui/icons";

import { ClientMenu, StationCard } from "./";

const ClientRow = ({showActions, expanded, client, onClientEdit, onClientDelete}) => (
  <ExpansionPanel expanded={expanded} key={client.id}>
    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
      <Grid container spacing={24} alignItems="center">
        <Grid item>
          <Badge badgeContent={(client.stations.length) || 0} color="secondary">
            <DeviceIcon />
          </Badge>
        </Grid>
        <Grid item xs>
          <Typography variant="subtitle1">{client.name}</Typography>
        </Grid>
        {showActions ? (
          <Grid item>
            <ClientMenu
              onEdit={() => onClientEdit(client)}
              onDelete={() => onClientDelete(client)}
            />
          </Grid>
        ) : ""}
      </Grid>
    </ExpansionPanelSummary>
    <ExpansionPanelDetails>
      <Grid container spacing={24}>
        {client.stations.map((station) => (
          <Grid key={station.id} item xs={6} md={4} lg={3}>
            <StationCard station={station} />
          </Grid>
        ))}
      </Grid>
    </ExpansionPanelDetails>
  </ExpansionPanel>
);

ClientRow.propTypes = {
  client: PropTypes.object.isRequired,
  stations: PropTypes.array,
  showActions: PropTypes.bool,
  expanded: PropTypes.bool,
  onClientEdit: PropTypes.func.isRequired,
  onClientDelete: PropTypes.func.isRequired,
};

export default React.memo(ClientRow);
