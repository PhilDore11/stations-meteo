import React from 'react';
import PropTypes from 'prop-types';
import { TextField, Grid } from '@material-ui/core';

const ClientForm = ({ client, error, loading, onChange }) => (
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
          onChange={event => onChange(event, client)}
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
          onChange={event => onChange(event, client)}
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
          onChange={event => onChange(event, client)}
        />
      </Grid>
    </Grid>
  </form>
);

ClientForm.propTypes = {
  client: PropTypes.object.isRequired,
  error: PropTypes.bool,
  loading: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

export default React.memo(ClientForm);
