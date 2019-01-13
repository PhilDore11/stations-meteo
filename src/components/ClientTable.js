import React from "react";
import PropTypes from "prop-types";

import {
  withStyles,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell
} from "@material-ui/core";

import { ClientMenu } from '.';

const styles = theme => ({
  actionCell: {
    width: 48
  }
});

const ClientTable = ({ classes, clients, onClientEdit, onClientDelete }) => (
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>Name</TableCell>
        <TableCell>Addresse courriel</TableCell>
        <TableCell className={classes.actionCell}></TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {clients && clients.map(client => (
        <TableRow key={client.id}>
          <TableCell>{client.name}</TableCell>
          <TableCell>{client.email}</TableCell>
          <TableCell className={classes.actionCell}>
            <ClientMenu onEdit={onClientEdit} onDelete={onClientDelete} />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

ClientTable.propTypes = {
  classes: PropTypes.object.isRequired,
  clients: PropTypes.array,
  onClientEdit: PropTypes.func.isRequired,
  onClientDelete: PropTypes.func.isRequired,
};

export default withStyles(styles)(ClientTable);
