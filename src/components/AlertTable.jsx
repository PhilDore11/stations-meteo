import React from "react";
import PropTypes from "prop-types";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  TableFooter,
} from "@material-ui/core";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AlertTableRow } from ".";
import { EAlertTypes } from "../utils/EAlertTypes";

const AlertTable = ({ alerts, onChange, onAddRow, onDeleteRow }) => (
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>Addresse email</TableCell>
        {EAlertTypes.map((type) => (
          <TableCell key={type.id} align="center">
            <FontAwesomeIcon
              icon={type.icon}
              fixedWidth
              size="lg"
              color="grey"
            />
          </TableCell>
        ))}
        <TableCell />
      </TableRow>
    </TableHead>
    <TableBody>
      {alerts &&
        alerts.map((alert, index) => (
          <AlertTableRow
            key={index}
            alertIndex={index}
            alert={alert}
            onChange={(event) => onChange(event, index, alerts)}
            onDeleteRow={() => onDeleteRow(index, alerts)}
          />
        ))}
    </TableBody>
    <TableFooter>
      <TableRow>
        <TableCell colSpan={EAlertTypes.length + 2}>
          <Button fullWidth variant="outlined" onClick={() => onAddRow(alerts)}>
            Ajouter
          </Button>
        </TableCell>
      </TableRow>
    </TableFooter>
  </Table>
);

AlertTable.propTypes = {
  alerts: PropTypes.array,
  onChange: PropTypes.func.isRequired,
  onAddRow: PropTypes.func.isRequired,
  onDeleteRow: PropTypes.func.isRequired,
};

export default React.memo(AlertTable);
