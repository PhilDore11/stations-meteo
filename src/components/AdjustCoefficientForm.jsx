import React from "react";
import PropTypes from "prop-types";
import { TextField, Grid } from "@material-ui/core";

const AdjustCoefficientForm = ({ stationData, onStationChange }) => (
  <Grid container spacing={2}>
    <Grid item xs={12}>
      <TextField
        required={true}
        fullWidth
        name="coefficient"
        label="Coefficient"
        type="text"
        margin="dense"
        variant="outlined"
        value={stationData.coefficient}
        onChange={(event) => onStationChange(event, stationData)}
      />
    </Grid>
  </Grid>
);

AdjustCoefficientForm.propTypes = {
  stationData: PropTypes.object.isRequired,
  onStationChange: PropTypes.func.isRequired,
};

export default React.memo(AdjustCoefficientForm);
