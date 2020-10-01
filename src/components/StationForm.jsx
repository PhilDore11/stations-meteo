import React from "react";
import PropTypes from "prop-types";
import { TextField, Grid } from "@material-ui/core";

const StationForm = ({ isAdd, station, error, loading, onStationChange }) => (
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
          value={station.name}
          onChange={(event) => onStationChange(event, station)}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
            error={error}
            disabled={loading}
            autoFocus
            fullWidth
            id="referenceStationId"
            label="Station Reference"
            type="text"
            margin="dense"
            variant="outlined"
            value={station.referenceStationId}
            onChange={(event) => onStationChange(event, station)}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
            error={error}
            disabled={loading}
            autoFocus
            fullWidth
            id="coefficient"
            label="Coefficient"
            type="number"
            margin="dense"
            variant="outlined"
            value={station.coefficient}
            onChange={(event) => onStationChange(event, station)}
        />
      </Grid>
    </Grid>
  </form>
);

StationForm.propTypes = {
  isAdd: PropTypes.bool,
  station: PropTypes.object.isRequired,
  error: PropTypes.bool,
  loading: PropTypes.bool,
  onStationChange: PropTypes.func.isRequired,
};

export default React.memo(StationForm);
