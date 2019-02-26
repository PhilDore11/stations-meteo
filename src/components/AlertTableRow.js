import React from 'react';
import PropTypes from 'prop-types';
import { TableRow, TableCell, TextField, Checkbox } from '@material-ui/core';

const AlertTableRow = ({ alertTypes, alert, onChange }) => (
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
    {alertTypes.map(type => (
      <TableCell key={type.id} align="center">
        <Checkbox id={type.prop} checked={alert[type.prop]} onChange={onChange} value={type.prop} />
      </TableCell>
    ))}
  </TableRow>
);

AlertTableRow.propTypes = {
  alerts: PropTypes.array,
  alert: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default React.memo(AlertTableRow);
