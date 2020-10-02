import React from "react";
import PropTypes from "prop-types";

import { withStyles, Grid, Card, Fab } from "@material-ui/core";
import { AddOutlined as AddIcon } from "@material-ui/icons";

import { StationCard } from "./";

const styles = () => ({
  addStationCard: {
    width: 400,
    height: 262,
  },
  addStationBody: {
    height: "100%",
  },
});

const ClientStations = ({
  classes,
  client,
  hideActions,
  onEdit,
  onDelete,
  onAdd,
  isAdmin,
}) => (
  <Grid container spacing={24}>
    {client.stations &&
      client.stations.map((station) => (
        <Grid item key={station.id}>
          <StationCard
            station={station}
            hideActions={hideActions}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </Grid>
      ))}
    {isAdmin && (
      <Grid item>
        <Card className={classes.addStationCard}>
          <Grid
            className={classes.addStationBody}
            container
            justify={"center"}
            alignItems={"center"}
          >
            <Grid item>
              <Fab
                color="primary"
                aria-label="Add"
                onClick={() => onAdd(client)}
              >
                <AddIcon />
              </Fab>
            </Grid>
          </Grid>
        </Card>
      </Grid>
    )}
  </Grid>
);

ClientStations.propTypes = {
  classes: PropTypes.object.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  client: PropTypes.object.isRequired,
  hideActions: PropTypes.bool.isRequired,
  onAdd: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default React.memo(withStyles(styles)(ClientStations));
