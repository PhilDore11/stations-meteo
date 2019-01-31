import React from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";

import {
  withStyles,
  Grid,
  Fab,
  Typography,
} from "@material-ui/core";

import { Add as AddIcon } from "@material-ui/icons";

import { ClientRow, ClientModal, ClientForm } from "../../components";

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
    this.props.fetchClients(this.props.loggedInUser);
  }
  componentDidUpdate(prevProps) {
    if (this.props.loggedInUser !== prevProps.loggedInUser) {
      this.props.fetchClients(this.props.loggedInUser);
    }
  }

  onClientChange = (event, clientData) => {
    const {id, value} = event.target;
    const newClientData = {...clientData, [id]: value};
    this.props.setClientData(newClientData);
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
      title,
      loggedInUser,
      clients,
      clientModalOpen,
      clientData,
      toggleClientModal,
      isAdd,
    } = this.props;

    const isAdmin = loggedInUser && loggedInUser.admin;

    return (
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>{title || "Clients"}</Typography>
          {clients && clients.map(client => (
            <ClientRow
              key={client.id}
              client={client}
              showActions={isAdmin}
              expanded={!isAdmin}
              onClientEdit={this.onClientEdit}
              onClientDelete={this.props.deleteClient}
            />
          ))}
          {isAdmin ? (
            <React.Fragment>
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
            </React.Fragment>
          ) : ""}
        </Grid>
      </Grid>
    );
  }
}

ClientsContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string,
  fetchClients: PropTypes.func.isRequired,
  clients: PropTypes.array,
  loggedInUser: PropTypes.object,
};

const mapStateToProps = state => ({
  ...state.clients,
  loggedInUser: state.login.loggedInUser,
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
