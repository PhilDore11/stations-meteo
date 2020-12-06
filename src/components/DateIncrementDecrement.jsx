import React from "react";
import PropTypes from "prop-types";

import { withStyles, Grid, Fab } from "@material-ui/core";

import {
  ChevronLeftOutlined as ChevronLeftIcon,
  ChevronRightOutlined as ChevronRightIcon,
} from "@material-ui/icons";
import { DatePicker } from "material-ui-pickers";

const styles = () => ({
  fab: {
    backgroundColor: "white",
  },
  input: {
    backgroundColor: "white",
  },
});

const DateIncrementDecrement = ({
  classes,
  start,
  end,
  onStartChange,
  onEndChange,
  increment,
  decrement,
  view,
}) => (
  <Grid container spacing={2} justify="space-between" alignItems="center">
    <Grid item>
      <Fab onClick={decrement} className={classes.fab} size="small">
        <ChevronLeftIcon color="action" />
      </Fab>
    </Grid>
    <Grid item xs>
      <Grid container spacing={2} justify="center" alignItems="center">
        <Grid item xs>
          <DatePicker
            fullWidth={true}
            InputProps={{
              className: classes.input,
            }}
            margin="dense"
            variant="outlined"
            label={view !== "day" ? "Début" : "Date"}
            value={start}
            onChange={onStartChange}
            format={"LL"}
          />
        </Grid>
        {view !== "day" && (
          <React.Fragment>
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
          </React.Fragment>
        )}
      </Grid>
    </Grid>
    <Grid item>
      <Fab onClick={increment} className={classes.fab} size="small">
        <ChevronRightIcon color="action" />
      </Fab>
    </Grid>
  </Grid>
);

DateIncrementDecrement.propTypes = {
  classes: PropTypes.object.isRequired,
  start: PropTypes.string.isRequired,
  end: PropTypes.string.isRequired,
  view: PropTypes.string.isRequired,
  onStartChange: PropTypes.func.isRequired,
  onEndChange: PropTypes.func.isRequired,
  increment: PropTypes.func.isRequired,
  decrement: PropTypes.func.isRequired,
};

export default withStyles(styles)(DateIncrementDecrement);
