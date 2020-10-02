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
  UserForm,
  StationModal,
  StationForm,
} from "../../components";

import {
  fetchClients,
  fetchReferenceStations,
  addClient,
  editClient,
  deleteClient,
  editUser,
  toggleClientModal,
  toggleUserModal,
  setClientData,
  setClientAlerts,
  setStationData,
  toggleStationModal,
  addStation,
  editStation,
  deleteStation,
} from "./actions";

const styles = () => ({
  add: {
    position: "fixed",
    bottom: 20,
    right: 20,
  },
});

class ClientsContainer extends React.PureComponent {
  componentDidMount() {
    if (this.props.loggedInUser) {
      this.props.fetchClients();
      this.props.fetchReferenceStations();
    }
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
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

    const { name, value, checked, type } = event.target;
    const newStationData = {
      ...stationData,
      [name]: type === "checkbox" ? checked : value,
    };

    this.props.setStationData(newStationData);
  };

  onAddAlert = (alerts) => {
    const newAlert = {
      email: "",
      hasRain: true,
      hasSnow: true,
      hasWind: true,
      hasHydro: true,
    };
    this.props.setClientAlerts(alerts ? [...alerts, newAlert] : [newAlert]);
  };

  onDeleteAlert = (index, alerts) => {
    const newAlert = [...alerts.slice(0, index), ...alerts.slice(index + 1)];
    this.props.setClientAlerts(newAlert);
  };

  onClientEdit = (clientData) => {
    this.props.setClientData(clientData);
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

  onStationAdd = (client) => {
    this.props.setStationData({
      clientId: client.id,
      stationId: "",
      name: "",
      referenceStationId: "",
      coefficient: 0.1,
      latitude: "",
      longitude: "",
      ipAddress: "",
      deviceType: "",
      hasRain: false,
      hasSnow: false,
      hasWind: false,
      hasHydro: false,
      localisation: "",
      address: "",
      city: "",
      province: "",
      postalCode: "",
    });
    this.props.toggleStationModal(true);
  };

  onClientAdd = () => {
    this.props.setClientData({
      name: "",
      username: "",
      password: "",
      alerts: [],
    });
    this.props.toggleClientModal(true);
  };

  onClientSave = () => {
    this.props.isAdd
      ? this.props.addClient(this.props.clientData)
      : this.props.editClient(this.props.clientData);
  };

  onUserSave = () => {
    this.props.editUser(this.props.clientData);
  };

  onStationSave = () => {
    this.props.isAdd
      ? this.props.addStation(this.props.stationData)
      : this.props.editStation(this.props.stationData);
  };

  onClientDelete = (clientData) => {
    if (
      window.confirm(
        "Le client sera supprimé de facon permanente. Voulez-vous poursuivre?"
      )
    ) {
      this.props.deleteClient(clientData);
    }
  };

  onStationDelete = (stationData) => {
    if (
      window.confirm(
        "La station sera supprimée de facon permanente. Voulez-vous poursuivre?"
      )
    ) {
      this.props.deleteStation(stationData);
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

    const isAdmin = !!(loggedInUser && loggedInUser.admin);

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
                  onStationAdd={this.onStationAdd}
                  onStationEdit={this.onStationEdit}
                  onStationDelete={this.onStationDelete}
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
                      referenceStations={this.props.referenceStations}
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
  fetchReferenceStations: PropTypes.func.isRequired,
  clients: PropTypes.array,
  referenceStations: PropTypes.array,
  loggedInUser: PropTypes.object,
  isAdd: PropTypes.bool.isRequired,
  addClient: PropTypes.func.isRequired,
  editClient: PropTypes.func.isRequired,
  editUser: PropTypes.func.isRequired,
  deleteClient: PropTypes.func.isRequired,
  clientData: PropTypes.object.isRequired,
  setClientData: PropTypes.func.isRequired,
  toggleClientModal: PropTypes.func.isRequired,
  setClientAlerts: PropTypes.func.isRequired,
  setStationData: PropTypes.func.isRequired,
  toggleUserModal: PropTypes.func.isRequired,
  toggleStationModal: PropTypes.func.isRequired,
  addStation: PropTypes.func.isRequired,
  editStation: PropTypes.func.isRequired,
  deleteStation: PropTypes.func.isRequired,
  stationData: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  ...state.clients,
  loggedInUser: state.login.loggedInUser,
});

const mapDispatchToProps = {
  fetchClients,
  fetchReferenceStations,
  addClient,
  editClient,
  editUser,
  deleteClient,
  toggleClientModal,
  toggleUserModal,
  setClientData,
  setClientAlerts,
  setStationData,
  toggleStationModal,
  addStation,
  editStation,
  deleteStation,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ClientsContainer));
