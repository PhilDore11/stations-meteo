import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { withStyles, Grid, Fab } from '@material-ui/core';

import { AddOutlined as AddIcon } from '@material-ui/icons';

import { ClientRow, ClientModal, ClientForm, Loading, NoData } from '../../components';

import {
  fetchClients,
  addClient,
  editClient,
  deleteClient,
  toggleClientModal,
  setClientData,
  setClientAlerts,
} from './actions';

const styles = () => ({
  add: {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
  },
});

class ClientsContainer extends React.PureComponent {
  componentDidMount() {
    if (this.props.loggedInUser) {
      this.props.fetchClients();
    }
  }
  componentDidUpdate(prevProps) {
    if (this.props.loggedInUser && this.props.loggedInUser !== prevProps.loggedInUser) {
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
      index === alertIndex ? { ...alert, [id]: type === 'checkbox' ? checked : value } : alert,
    );
    this.props.setClientAlerts(newAlerts);
  };

  onAddAlert = alerts => {
    const newAlert = { email: '', hasRain: false, hasSnow: false, hasWind: false, hasHydro: false };
    this.props.setClientAlerts(alerts ? [...alerts, newAlert] : [newAlert]);
  };

  onClientEdit = clientData => {
    this.props.setClientData({ ...clientData, password: '' });
    this.props.toggleClientModal(false);
  };

  onClientAdd = () => {
    this.props.setClientData({
      name: '',
      username: '',
      password: '',
    });
    this.props.toggleClientModal(true);
  };

  onClientSave = () => {
    this.props.isAdd ? this.props.addClient(this.props.clientData) : this.props.editClient(this.props.clientData);
  };

  onClientDelete = clientData => {
    if (window.confirm('Le client sera supprimer de facon permanente. Voulez-vous poursuivre?')) {
      this.props.deleteClient(clientData);
    }
  };

  render() {
    const {
      classes,
      loggedInUser,
      clients,
      clientModalOpen,
      clientData,
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
              clients.map(client => (
                <ClientRow
                  key={client.id}
                  client={client}
                  isAdmin={isAdmin}
                  expanded={!isAdmin}
                  onClientEdit={this.onClientEdit}
                  onClientDelete={this.onClientDelete}
                />
              ))}
            {isAdmin ? (
              <React.Fragment>
                <Fab color="primary" aria-label="Add" className={classes.add} onClick={this.onClientAdd}>
                  <AddIcon />
                </Fab>
                <ClientModal
                  isOpen={clientModalOpen}
                  isAdd={isAdd}
                  onToggle={() => this.props.toggleClientModal(isAdd)}
                  onSave={this.onClientSave}
                  body={
                    <ClientForm
                      client={clientData}
                      error={clientsError}
                      loading={clientsLoading}
                      onClientChange={this.onClientChange}
                      onAlertChange={this.onAlertChange}
                      onAddAlert={this.onAddAlert}
                    />
                  }
                />
              </React.Fragment>
            ) : (
              ''
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
  setClientData,
  setClientAlerts,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(ClientsContainer));
