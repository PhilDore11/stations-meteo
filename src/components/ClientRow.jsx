import React from "react";
import PropTypes from "prop-types";

import {
  Grid,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography,
  Divider,
} from "@material-ui/core";

import { ExpandMoreOutlined as ExpandMoreIcon } from "@material-ui/icons";

import { ClientMenu, ClientStations } from "./";

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
    const {
      isAdmin,
      client,
      onClientEdit,
      onUserEdit,
      onClientDelete,
      onStationAdd,
      onStationEdit,
      onStationDelete,
    } = this.props;
    const { expanded } = this.state;

    if (!isAdmin) {
      return <ClientStations client={client} />;
    } else {
      return (
        <ExpansionPanel
          expanded={expanded}
          key={client.id}
          onChange={this.handleExpand}
        >
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Grid container spacing={24} alignItems="center">
              <Grid item xs>
                <Typography variant="subtitle1">{client.name}</Typography>
              </Grid>
              {isAdmin ? (
                <Grid item>
                  <ClientMenu
                    onClientEdit={() => onClientEdit(client)}
                    onUserEdit={() => onUserEdit(client)}
                    onDelete={() => onClientDelete(client)}
                  />
                </Grid>
              ) : (
                ""
              )}
            </Grid>
          </ExpansionPanelSummary>
          <Divider />
          <ExpansionPanelDetails>
            <ClientStations
              client={client}
              hideActions={true}
              onAdd={onStationAdd}
              onEdit={onStationEdit}
              onDelete={onStationDelete}
            />
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
  onUserEdit: PropTypes.func.isRequired,
  onClientDelete: PropTypes.func.isRequired,
  onStationAdd: PropTypes.func.isRequired,
  onStationEdit: PropTypes.func.isRequired,
  onStationDelete: PropTypes.func.isRequired,
};

export default ClientRow;
