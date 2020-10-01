import React from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";

import { withStyles, Grid, Fab } from "@material-ui/core";

import { AddOutlined as AddIcon } from "@material-ui/icons";

import {
  ClientRow,
  ClientModal,
  ClientForm,
  Loading,
  NoData,
  UserForm, StationModal, StationForm,
} from "../../components";

import {
  fetchClients,
  addClient,
  editClient,
  deleteClient,
  toggleClientModal,
  toggleUserModal,
  setClientData,
  setClientAlerts,
  setStationData,
  toggleStationModal,
} from "./actions";

const styles = () => ({
  add: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
  },
});

class ClientsContainer extends React.PureComponent {
  componentDidMount() {
    if (this.props.loggedInUser) {
      this.props.fetchClients();
    }
  }
  componentDidUpdate(prevProps) {
    if (
      this.props.loggedInUser &&
      this.props.loggedInUser !== prevProps.loggedInUser
    ) {
      this.props.fetchClients();
    }
  }

  onClientChange = (event, clientData) => {
    const { id, value } = event.target;
    const newClientData = { ...clientData, [id]: value };
    this.props.setClientData(newClientData);
  };

  onAlertChange = (event, alertIndex, alerts) => {
    const { id, value, checked, type } = event.target;

    const newAlerts = alerts.map((alert, index) =>
      index === alertIndex
        ? { ...alert, [id]: type === "checkbox" ? checked : value }
        : alert
    );
    this.props.setClientAlerts(newAlerts);
  };

  onStationChange = (event, stationData) => {
    const { id, value } = event.target;
    const newStationData = { ...stationData, [id]: value };
    this.props.setStationData(newStationData);
  };

  onAddAlert = (alerts) => {
    const newAlert = {
      email: "",
      hasRain: false,
      hasSnow: false,
      hasWind: false,
      hasHydro: false,
    };
    this.props.setClientAlerts(alerts ? [...alerts, newAlert] : [newAlert]);
  };

  onDeleteAlert = (index, alerts) => {
    const newAlert = [...alerts.slice(0, index), ...alerts.slice(index + 1)];
    this.props.setClientAlerts(newAlert);
  };

  onClientEdit = (clientData) => {
    this.props.setClientData({ ...clientData });
    this.props.toggleClientModal(false);
  };

  onUserEdit = (clientData) => {
    const userData = { ...clientData, password: "" };
    if (!userData.username) {
      userData.username = "";
    }
    this.props.setClientData(userData);
    this.props.toggleUserModal();
  };

  onStationEdit = (stationData) => {
    this.props.setStationData({ ...stationData });
    this.props.toggleStationModal(false);
  };

  onClientAdd = () => {
    this.props.setClientData({
      name: "",
      username: "",
      password: "",
    });
    this.props.toggleClientModal(true);
  };

  onClientSave = () => {
    this.props.isAdd
      ? this.props.addClient(this.props.clientData)
      : this.props.editClient(this.props.clientData);
  };

  onUserSave = () => {
    this.props.editClient(this.props.clientData);
  };


  onStationSave = () => {
    this.props.isAdd
        ? this.props.addStation(this.props.stationData)
        : this.props.editStation(this.props.stationData);
  };

  onClientDelete = (clientData) => {
    if (
      window.confirm(
        "Le client sera supprimer de facon permanente. Voulez-vous poursuivre?"
      )
    ) {
      this.props.deleteClient(clientData);
    }
  };

  render() {
    const {
      classes,
      loggedInUser,
      clients,
      clientModalOpen,
      userModalOpen,
      stationModalOpen,
      clientData,
      stationData,
      isAdd,
      clientsError,
      clientsLoading,
    } = this.props;

    const isAdmin = loggedInUser && loggedInUser.admin ? true : false;

    return (
      <Grid container spacing={24}>
        {!clientsLoading && !clientsError ? (
          <Grid item xs={12}>
            {clients &&
              clients.map((client) => (
                <ClientRow
                  key={client.id}
                  client={client}
                  isAdmin={isAdmin}
                  expanded={!isAdmin}
                  onClientEdit={this.onClientEdit}
                  onUserEdit={this.onUserEdit}
                  onClientDelete={this.onClientDelete}
                  onStationEdit={this.onStationEdit}
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
                  title={isAdd ? "Nouveau Client" : "Modifier Client"}
                  isOpen={clientModalOpen}
                  onToggle={() => this.props.toggleClientModal(isAdd)}
                  saveLabel={isAdd ? "Créer" : "Modifier"}
                  onSave={this.onClientSave}
                  body={
                    <ClientForm
                      isAdd={isAdd}
                      client={clientData}
                      error={clientsError}
                      loading={clientsLoading}
                      onClientChange={this.onClientChange}
                      onAlertChange={this.onAlertChange}
                      onAddAlert={this.onAddAlert}
                      onDeleteAlert={this.onDeleteAlert}
                    />
                  }
                />
                <ClientModal
                  title={"Modifier Usager"}
                  isOpen={userModalOpen}
                  onToggle={this.props.toggleUserModal}
                  saveLabel={"Modifier"}
                  onSave={this.onUserSave}
                  body={
                    <UserForm
                      client={clientData}
                      error={clientsError}
                      loading={clientsLoading}
                      onClientChange={this.onClientChange}
                    />
                  }
                />
                <StationModal
                    title={isAdd ? "Nouvelle Station" : "Modifier Station"}
                    isOpen={stationModalOpen}
                    onToggle={() => this.props.toggleStationModal(isAdd)}
                    saveLabel={isAdd ? "Créer" : "Modifier"}
                    onSave={this.onStationSave}
                    body={
                      <StationForm
                          isAdd={isAdd}
                          station={stationData}
                          error={clientsError}
                          loading={clientsLoading}
                          onStationChange={this.onStationChange}
                      />
                    }
                />
              </React.Fragment>
            ) : (
              ""
            )}
          </Grid>
        ) : clientsLoading ? (
          <Loading />
        ) : (
          <NoData />
        )}
      </Grid>
    );
  }
}

ClientsContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  clientsError: PropTypes.bool,
  clientsLoading: PropTypes.bool,
  fetchClients: PropTypes.func.isRequired,
  clients: PropTypes.array,
  loggedInUser: PropTypes.object,
};

const mapStateToProps = (state) => ({
  ...state.clients,
  loggedInUser: state.login.loggedInUser,
});

const mapDispatchToProps = {
  fetchClients,
  addClient,
  editClient,
  deleteClient,
  toggleClientModal,
  toggleUserModal,
  setClientData,
  setClientAlerts,
  setStationData,
  toggleStationModal,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ClientsContainer));
