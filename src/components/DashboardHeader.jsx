import React from "react";
import PropTypes from "prop-types";

import {
  withStyles,
  Grid,
  TextField,
  MenuItem,
  IconButton,
  Tooltip,
  Typography,
} from "@material-ui/core";
import InfoIcon from "@material-ui/icons/InfoOutlined";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExport } from "@fortawesome/free-solid-svg-icons";

import { VIEWS } from "../containers/Dashboard/constants";
import { DateIncrementDecrement, DateRange } from ".";

const styles = () => ({
  input: {
    backgroundColor: "white",
  },
  fab: {
    backgroundColor: "white",
  },
  icon: {
    width: "1em !important",
    height: "1em !important",
  },
  infoIcon: {
    height: "0.75rem",
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
  exportStationData,
}) => {
  return (
    <React.Fragment>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={3}>
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
        <Grid item xs />
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
        <Grid item xs />
        <Grid item xs={3}>
          <Grid container spacing={0} alignItems="center">
            <Grid item xs>
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
            <Grid item>
              <Tooltip title="Export">
                <IconButton
                  onClick={() => exportStationData(stationId, start, end)}
                >
                  <FontAwesomeIcon
                    className={classes.icon}
                    icon={faFileExport}
                    fixedWidth
                    color="grey"
                  />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container spacing={0} justify="center" alignItems="center">
        <Grid item>
          <InfoIcon color={"action"} className={classes.infoIcon} />
        </Grid>
        <Grid item>
          <Typography variant={"caption"} color={"textSecondary"}>
            Toutes les dates indiquées seront présumées être en Heure Normale de
            l'Est
          </Typography>
        </Grid>
      </Grid>
    </React.Fragment>
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
  onStationChange: PropTypes.func.isRequired,
  view: PropTypes.string.isRequired,
  onViewChange: PropTypes.func.isRequired,
  exportStationData: PropTypes.func.isRequired,
};

export default withStyles(styles)(DashboardHeader);
