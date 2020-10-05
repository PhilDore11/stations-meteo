import React from "react";
import PropTypes from "prop-types";

import moment from "moment";
import { isNumber } from "lodash";

import {
  withStyles,
  Card,
  CardHeader,
  Divider,
  CardContent,
  Grid,
  Typography,
  IconButton,
  Tooltip,
} from "@material-ui/core";

import { DashboardOutlined as DashboardIcon } from "@material-ui/icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTint,
  faBatteryFull,
  faBatteryHalf,
  faBatteryQuarter,
  faCloudRain,
  faSnowflake,
  faWind,
  faBolt,
} from "@fortawesome/free-solid-svg-icons";

import { green, red, grey, orange } from "@material-ui/core/colors";
import StationMenu from "./StationMenu";

const styles = (theme) => ({
  stationCard: {
    width: 400,
    height: 262,
  },
  success: {
    color: green[600],
  },
  warning: {
    color: orange[600],
  },
  error: {
    color: red[600],
  },
  icon: {
    height: 40,
    width: 40,
  },
  readingSection: {
    textAlign: "center",
    padding: theme.spacing.unit * 2,
    borderRight: `1px solid ${grey[300]}`,
  },
  batterySection: {
    textAlign: "center",
    padding: theme.spacing.unit * 2,
  },
});

const StationCard = ({ classes, station, onEdit, onDelete, hideActions }) => {
  let batteryObj = {};
  if (station && station.battery > 11.5) {
    batteryObj = {
      className: classes.success,
      icon: faBatteryFull,
    };
  } else if (station && station.battery < 11.5 && station.battery > 10.5) {
    batteryObj = {
      className: classes.warning,
      icon: faBatteryHalf,
    };
  } else {
    batteryObj = {
      className: classes.error,
      icon: faBatteryQuarter,
    };
  }
  return (
    <Card className={classes.stationCard}>
      <CardHeader
        title={station.name}
        titleTypographyProps={{ variant: "subtitle1" }}
        action={
          !hideActions ? (
            <Tooltip title="Analyse">
              <IconButton href={`/dashboard/${station.stationId}`}>
                <DashboardIcon />
              </IconButton>
            </Tooltip>
          ) : (
            <StationMenu
              onStationEdit={() => onEdit(station)}
              onDelete={() => onDelete(station)}
            />
          )
        }
      />
      <Divider />
      <Grid container spacing={0} direction="row">
        <Grid item xs>
          <div className={classes.readingSection}>
            <FontAwesomeIcon
              className={classes.icon}
              icon={faTint}
              fixedWidth
              size="2x"
              color="grey"
            />
            <Typography variant="h5">
              {isNumber(station.intensity)
                ? parseFloat(station.intensity).toFixed(2)
                : " - "}
              <small>mm</small>
            </Typography>
          </div>
        </Grid>
        <Grid item xs>
          <div
            className={[classes.batterySection, batteryObj.className].join(" ")}
          >
            <FontAwesomeIcon
              className={classes.icon}
              icon={batteryObj.icon}
              fixedWidth
              size="2x"
            />
            <Typography variant="h5" color="inherit">
              {isNumber(station.battery)
                ? parseFloat(station.battery).toFixed(2)
                : " - "}
              <small>V</small>
            </Typography>
          </div>
        </Grid>
      </Grid>
      <Divider />
      <Grid container spacing={24} justify="center" alignItems="center">
        <Grid item>
          <Typography variant="caption">
            {moment(station.date).fromNow()}
          </Typography>
        </Grid>
      </Grid>
      <Divider />
      <CardContent>
        <Grid container spacing={24} justify="center" alignItems="center">
          {station.hasRain ? (
            <Grid item>
              <FontAwesomeIcon
                icon={faCloudRain}
                color="grey"
                fixedWidth
                size="lg"
              />
            </Grid>
          ) : null}
          {station.hasSnow ? (
            <Grid item>
              <FontAwesomeIcon
                icon={faSnowflake}
                color="grey"
                fixedWidth
                size="lg"
              />
            </Grid>
          ) : null}
          {station.hasWind ? (
            <Grid item>
              <FontAwesomeIcon
                icon={faWind}
                color="grey"
                fixedWidth
                size="lg"
              />
            </Grid>
          ) : null}
          {station.hasHydro ? (
            <Grid item>
              <FontAwesomeIcon
                icon={faBolt}
                color="grey"
                fixedWidth
                size="lg"
              />
            </Grid>
          ) : null}
        </Grid>
      </CardContent>
    </Card>
  );
};

StationCard.propTypes = {
  classes: PropTypes.object.isRequired,
  station: PropTypes.object.isRequired,
  hideActions: PropTypes.bool,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};

export default React.memo(withStyles(styles)(StationCard));
