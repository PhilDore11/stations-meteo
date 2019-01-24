import React from "react";
import PropTypes from "prop-types";

import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Grid,
  Typography,
  Badge,
} from "@material-ui/core";

import {
  ExpandMore as ExpandMoreIcon,
  Router as DeviceIcon,
} from "@material-ui/icons";

import { StationsContainer } from "../containers";
import { ClientMenu } from '.';

const ClientTable = ({ clients, onClientEdit, onClientDelete }) => (
  <React.Fragment>
    <Typography variant="h5" gutterBottom>Clients</Typography>
    {clients && clients.map(client => (
      <ExpansionPanel key={client.id} onChange={(event) => console.log("Expansion Changed", event)}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Grid container spacing={24} alignItems="center">
            <Grid item>
              <Badge badgeContent={Math.ceil(Math.random() * 10)} color="secondary">
                <DeviceIcon />
              </Badge>
            </Grid>
            <Grid item xs>
              <Typography variant="subtitle1">{client.name}</Typography>
            </Grid>
            <Grid item>
              <ClientMenu
                onEdit={() => onClientEdit(client)}
                onDelete={() => onClientDelete(client)}
              />
            </Grid>
          </Grid>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <StationsContainer clientId={client.id} />
        </ExpansionPanelDetails>
      </ExpansionPanel>
    ))}
  </React.Fragment>
);

ClientTable.propTypes = {
  clients: PropTypes.array,
  onClientEdit: PropTypes.func.isRequired,
  onClientDelete: PropTypes.func.isRequired,
};

export default React.memo(ClientTable);
