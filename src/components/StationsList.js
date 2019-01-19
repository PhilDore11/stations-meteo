import React from "react";

import {
  Grid,
} from "@material-ui/core";

import {
  Battery90 as Battery90Icon,
  Battery60 as Battery60Icon,
  Battery30 as Battery30Icon,
} from "@material-ui/icons";

import {StationCard} from "./";

const stationsData = [
  {
    name: "Station 1",
    status: "ON",
    ipAddress: "10.50.20.1",
    deviceType: "CR200",
    battery: <Battery90Icon />
  },
  {
    name: "Station 2",
    status: "ON",
    ipAddress: "10.50.20.2",
    deviceType: "CR200",
    battery: <Battery60Icon />
  },
  {
    name: "Station 3",
    status: "OFF",
    ipAddress: "10.50.20.3",
    deviceType: "CR800",
    battery: <Battery30Icon />
  }
];

const StationsList = () => (
  <Grid container spacing={24} justify="space-evenly">
    {stationsData.map((station, index) => (
      <Grid key={index} item xs={6} md={4} lg={3}>
        <StationCard station={station} />
      </Grid>
    ))}
  </Grid>
);

export default React.memo(StationsList);
