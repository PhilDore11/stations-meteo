import React from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";

import {
  withStyles,
  Divider,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Fab
} from "@material-ui/core";

import { Add as AddIcon } from "@material-ui/icons";

import { ClientTable, ClientModal, ClientForm } from "../../components";

import { 
  fetchClients, 
  addClient, 
  editClient, 
  deleteClient, 
  toggleClientModal,
  setClientData, 
} from "./actions";

const styles = theme => ({
  add: {
    position: "fixed",
    bottom: "20px",
    right: "20px"
  }
});

class ClientsContainer extends React.Component {
  componentDidMount() {
    this.props.fetchClients(this.props.currentDay);
  }

  onClientChange(value) {
    console.log('onClientChange', value);
    this.props.setClientData();
  }

  render() {
    const {
      classes,
      clients,
      clientModalOpen,
      clientData,
      toggleClientModal,
      addClient,
      deleteClient
    } = this.props;

    return (
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <Card>
            <CardHeader title="Clients" />
            <Divider />
            <CardContent>
              <ClientTable
                clients={clients}
                onClientEdit={toggleClientModal}
                onClientDelete={deleteClient}
              />
            </CardContent>
          </Card>
          <Fab
            color="primary"
            aria-label="Add"
            className={classes.add}
            onClick={toggleClientModal}
          >
            <AddIcon />
          </Fab>
          <ClientModal
            isOpen={clientModalOpen}
            onToggle={toggleClientModal}
            onCreate={addClient}
            body={<ClientForm client={clientData} onChange={this.onClientChange} />}
          />
        </Grid>
      </Grid>
    );
  }
}

ClientsContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  fetchClients: PropTypes.func.isRequired,
  clients: PropTypes.array
};

const mapStateToProps = state => ({
  ...state.clients
});

const mapDispatchToProps = {
  fetchClients,
  addClient,
  editClient,
  deleteClient,
  toggleClientModal,
  setClientData
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ClientsContainer));
