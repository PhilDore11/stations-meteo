import {
  faBolt,
  faCloudRain,
  faSnowflake,
  faWind,
} from "@fortawesome/free-solid-svg-icons";

export const EAlertTypes = [
  {
    id: "rain",
    icon: faCloudRain,
    prop: "hasRain",
  },
  {
    id: "snow",
    icon: faSnowflake,
    prop: "hasSnow",
  },
  {
    id: "wind",
    icon: faWind,
    prop: "hasWind",
  },
  {
    id: "hydro",
    icon: faBolt,
    prop: "hasHydro",
  },
];
