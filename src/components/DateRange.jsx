import React from "react";
import PropTypes from "prop-types";

import { DatePicker } from "material-ui-pickers";

import { withStyles, Grid } from "@material-ui/core";

const styles = () => ({
  input: {
    backgroundColor: "white",
  },
});

const DateRange = ({ classes, start, end, onStartChange, onEndChange }) => (
  <Grid container spacing={2} justify="space-between" alignItems="center">
    <Grid item xs>
      <DatePicker
        fullWidth={true}
        InputProps={{
          className: classes.input,
        }}
        margin="dense"
        variant="outlined"
        label="Début"
        value={start}
        onChange={onStartChange}
        format={"LL"}
      />
    </Grid>
    <Grid item>{" - "}</Grid>
    <Grid item xs>
      <DatePicker
        fullWidth={true}
        InputProps={{
          className: classes.input,
        }}
        margin="dense"
        variant="outlined"
        label="Fin"
        value={end}
        onChange={onEndChange}
        format={"LL"}
      />
    </Grid>
  </Grid>
);

DateRange.propTypes = {
  classes: PropTypes.object.isRequired,
  start: PropTypes.string.isRequired,
  end: PropTypes.string.isRequired,
  onStartChange: PropTypes.func.isRequired,
  onEndChange: PropTypes.func.isRequired,
};

export default withStyles(styles)(DateRange);
