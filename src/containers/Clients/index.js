import React from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";

import {
  withStyles,
  Grid,
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

class ClientsContainer extends React.PureComponent {
  componentDidMount() {
    this.props.fetchClients(this.props.currentDay);
  }

  onClientChange = (event, clientData) => {
    const {id, value} = event.target;
    const newClientData = {...clientData, [id]: value};
    this.props.setClientData(newClientData);
  }

  onClientAdd = () => {
    this.props.setClientData({name: "", email: ""});
    this.props.toggleClientModal(true);
  }
  onClientEdit = clientData => {
    this.props.setClientData(clientData);
    this.props.toggleClientModal(false);
  }

  onClientSave = () => {
    this.props.isAdd
      ? this.props.addClient(this.props.clientData)
      : this.props.editClient(this.props.clientData);
  }

  render() {
    const {
      classes,
      clients,
      clientModalOpen,
      clientData,
      toggleClientModal,
      isAdd,
      deleteClient
    } = this.props;

    return (
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <ClientTable
            clients={clients}
            onClientEdit={this.onClientEdit}
            onClientDelete={deleteClient}
          />
          <Fab
            color="primary"
            aria-label="Add"
            className={classes.add}
            onClick={this.onClientAdd}
          >
            <AddIcon />
          </Fab>
          <ClientModal
            isOpen={clientModalOpen}
            isAdd={isAdd}
            onToggle={toggleClientModal}
            onSave={this.onClientSave}
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
