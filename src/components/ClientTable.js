import React from "react";
import PropTypes from "prop-types";

import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell
} from "@material-ui/core";

const ClientTable = ({ clients }) => (
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>Name</TableCell>
        <TableCell>Addresse courriel</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {clients && clients.map(client => (
        <TableRow key={client.id}>
          <TableCell>{client.name}</TableCell>
          <TableCell>{client.email}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

ClientTable.propTypes = {
  clients: PropTypes.array
};

export default ClientTable;
