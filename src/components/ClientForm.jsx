import React from "react";
import PropTypes from "prop-types";
import { TextField, Grid } from "@material-ui/core";

import { AlertTable } from "./";

const ClientForm = ({
  isAdd,
  client,
  error,
  loading,
  onClientChange,
  onAlertChange,
  onAddAlert,
  onDeleteAlert,
}) => (
  <form noValidate autoComplete="off">
    <Grid container spacing={24}>
      <Grid item xs={12}>
        <TextField
          required={true}
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
          onChange={(event) => onClientChange(event, client)}
        />
      </Grid>
      {isAdd && (
        <React.Fragment>
          <Grid item xs={6}>
            <TextField
              required={true}
              error={error}
              disabled={loading}
              fullWidth
              id="username"
              label="Nom d'utilisateur"
              type="text"
              value={client.username}
              margin="dense"
              variant="outlined"
              onChange={(event) => onClientChange(event, client)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              required={true}
              error={error}
              disabled={loading}
              fullWidth
              id="password"
              label="Mot de passe"
              type="password"
              value={client.password}
              margin="dense"
              variant="outlined"
              onChange={(event) => onClientChange(event, client)}
            />
          </Grid>
        </React.Fragment>
      )}
      <Grid item xs={12}>
        <AlertTable
          alerts={client.alerts}
          onChange={onAlertChange}
          onAddRow={onAddAlert}
          onDeleteRow={onDeleteAlert}
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
  onAlertChange: PropTypes.func.isRequired,
  onAddAlert: PropTypes.func.isRequired,
  onDeleteAlert: PropTypes.func.isRequired,
};

export default React.memo(ClientForm);
