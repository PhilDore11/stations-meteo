import React from "react";
import PropTypes from "prop-types";
import {
  TableRow,
  TableCell,
  TextField,
  Checkbox,
  Fab,
} from "@material-ui/core";
import { DeleteOutlined as RemoveIcon } from "@material-ui/icons";
import { EAlertTypes } from "../utils/EAlertTypes";

const AlertTableRow = ({ alert, onChange, onDeleteRow }) => (
  <TableRow>
    <TableCell align="center">
      <TextField
        fullWidth
        id="email"
        label="Addresse Email"
        type="text"
        margin="dense"
        variant="outlined"
        value={alert.email}
        onChange={onChange}
        required
      />
    </TableCell>
    {EAlertTypes.map((type) => (
      <TableCell key={type.id} align="center">
        <Checkbox
          id={type.prop}
          color="primary"
          checked={alert[type.prop]}
          onChange={onChange}
          value={type.prop}
        />
      </TableCell>
    ))}
    <TableCell align="center">
      <Fab size="small" color="secondary" onClick={onDeleteRow}>
        <RemoveIcon />
      </Fab>
    </TableCell>
  </TableRow>
);

AlertTableRow.propTypes = {
  alert: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onDeleteRow: PropTypes.func.isRequired,
};

export default React.memo(AlertTableRow);
