import React from 'react';
import PropTypes from 'prop-types';
import { TextField, Grid } from '@material-ui/core';

const ClientForm = ({ client, error, loading, onClientChange }) => (
  <form noValidate autoComplete="off">
    <Grid container spacing={24}>
      <Grid item xs={12}>
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
      <Grid item xs={12}>
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
    </Grid>
  </form>
);

ClientForm.propTypes = {
  isAdd: PropTypes.bool,
  client: PropTypes.object.isRequired,
  error: PropTypes.bool,
  loading: PropTypes.bool,
  onClientChange: PropTypes.func.isRequired,
};

export default React.memo(ClientForm);
