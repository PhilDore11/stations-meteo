import React from "react";
import PropTypes from "prop-types";
import {
  withStyles,
  TextField
} from "@material-ui/core";

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  }
});

const ClientForm = ({ classes, client, error, loading, onChange }) => (
  <form noValidate autoComplete="off">
    <TextField
      error={error}
      disabled={loading}
      className={classes.textField}
      autoFocus
      id="name"
      label="Nom"
      type="text"
      margin="normal"
      variant="outlined"
      value={client.name}
      onChange={(event) => onChange(event, client)}
      />
    <TextField
      error={error}
      disabled={loading}
      className={classes.textField}
      id="email"
      label="Addresse courriel"
      type="email"
      margin="normal"
      variant="outlined"
      value={client.email}
      onChange={(event) => onChange(event, client)}
    />
  </form>
);

ClientForm.propTypes = {
  classes: PropTypes.object.isRequired,
  client: PropTypes.object.isRequired,
  error: PropTypes.bool,
  loading: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

export default React.memo(withStyles(styles)(ClientForm));
