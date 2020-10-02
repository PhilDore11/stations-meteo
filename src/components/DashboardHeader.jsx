import React from "react";
import PropTypes from "prop-types";

import { withStyles, Grid, TextField, MenuItem } from "@material-ui/core";

import { VIEWS } from "../containers/Dashboard/constants";
import { DateIncrementDecrement, DateRange } from ".";

const styles = () => ({
  input: {
    backgroundColor: "white",
  },
  fab: {
    backgroundColor: "white",
  },
});

const DashboardHeader = ({
  classes,
  start,
  end,
  increment,
  decrement,
  onStartChange,
  onEndChange,
  stations,
  stationId,
  onStationChange,
  view,
  onViewChange,
}) => {
  return (
    <Grid container spacing={24} justify="space-between" alignItems="center">
      <Grid item xs={2}>
        <TextField
          select
          label={"Station"}
          InputProps={{
            className: classes.input,
          }}
          value={stationId}
          onChange={onStationChange}
          fullWidth
          margin="dense"
          variant="outlined"
        >
          {stations &&
            stations.map((station) => (
              <MenuItem key={station.stationId} value={station.stationId}>
                {station.name}
              </MenuItem>
            ))}
        </TextField>
      </Grid>
      <Grid item xs={4}>
        {view === "custom" ? (
          <DateRange
            start={start}
            end={end}
            onStartChange={onStartChange}
            onEndChange={onEndChange}
          />
        ) : (
          <DateIncrementDecrement
            start={start}
            end={end}
            view={view}
            onStartChange={onStartChange}
            onEndChange={onEndChange}
            increment={increment}
            decrement={decrement}
          />
        )}
      </Grid>
      <Grid item xs={2}>
        <TextField
          select
          label={"Intervale"}
          InputProps={{
            className: classes.input,
          }}
          value={view}
          onChange={onViewChange}
          fullWidth
          margin="dense"
          variant="outlined"
        >
          {VIEWS.map((view) => (
            <MenuItem key={view.key} value={view.key}>
              {view.label}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
    </Grid>
  );
};

DashboardHeader.propTypes = {
  classes: PropTypes.object.isRequired,
  start: PropTypes.string.isRequired,
  end: PropTypes.string.isRequired,
  onStartChange: PropTypes.func.isRequired,
  onEndChange: PropTypes.func.isRequired,
  increment: PropTypes.func.isRequired,
  decrement: PropTypes.func.isRequired,
  stations: PropTypes.array.isRequired,
  stationId: PropTypes.string,
  onStationChange: PropTypes.func.isRequired,
  view: PropTypes.string.isRequired,
  onViewChange: PropTypes.func.isRequired,
};

export default withStyles(styles)(DashboardHeader);
