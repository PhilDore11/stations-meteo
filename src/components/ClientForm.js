import React from 'react';
import PropTypes from 'prop-types';
import { TextField, Grid } from '@material-ui/core';

import { AlertTable } from './';

const ClientForm = ({ client, error, loading, onClientChange, onAlertChange, onAddAlert }) => {
  console.log('ClientForm', client);
  return (
    <form noValidate autoComplete="off">
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <TextField
            error={error}
            disabled={loading}
            autoFocus
            fullWidth
            id="name"
            label="Nom"
            type="text"
            margin="dense"
            variant="outlined"
            value={client.name}
            onChange={event => onClientChange(event, client)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            error={error}
            disabled={loading}
            fullWidth
            id="username"
            label="Nom d'utilisateur"
            type="text"
            value={client.username}
            margin="dense"
            variant="outlined"
            onChange={event => onClientChange(event, client)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            error={error}
            disabled={loading}
            fullWidth
            id="password"
            label="Mot de passe"
            type="password"
            value={client.password}
            margin="dense"
            variant="outlined"
            onChange={event => onClientChange(event, client)}
          />
        </Grid>
        <Grid item xs={12}>
          <AlertTable alerts={client.alerts} onChange={onAlertChange} onAddRow={onAddAlert} />
        </Grid>
      </Grid>
    </form>
  );
};

ClientForm.propTypes = {
  client: PropTypes.object.isRequired,
  error: PropTypes.bool,
  loading: PropTypes.bool,
  onClientChange: PropTypes.func.isRequired,
  onAlertChange: PropTypes.func.isRequired,
  onAddAlert: PropTypes.func.isRequired,
};

export default React.memo(ClientForm);
