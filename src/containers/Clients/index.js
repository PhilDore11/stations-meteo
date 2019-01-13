import React from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";

import {
  withStyles,
  Divider,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Fab
} from "@material-ui/core";

import { Add as AddIcon } from "@material-ui/icons";

import { ClientTable, ClientAddModal } from "../../components";

import { fetchClients, addClient, toggleClientAddModal } from "./actions";

const styles = theme => ({
  add: {
    position: "fixed",
    bottom: "20px",
    right: "20px"
  }
});

class ClientsContainer extends React.Component {
  componentDidMount() {
    this.props.fetchClients(this.props.currentDay);
  }

  render() {
    const {
      classes,
      clients,
      addModalOpen,
      toggleClientAddModal,
      addClient
    } = this.props;

    return (
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <Card>
            <CardHeader title="Clients" />
            <Divider />
            <CardContent>
              <ClientTable clients={clients} />
            </CardContent>
          </Card>
          <Fab
            color="primary"
            aria-label="Add"
            className={classes.add}
            onClick={toggleClientAddModal}
          >
            <AddIcon />
          </Fab>
          <ClientAddModal
            isOpen={addModalOpen}
            onToggle={toggleClientAddModal}
            onCreate={addClient}
          />
        </Grid>
      </Grid>
    );
  }
}

ClientsContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  fetchClients: PropTypes.func.isRequired,
  clients: PropTypes.array
};

const mapStateToProps = state => ({
  ...state.clients
});

const mapDispatchToProps = {
  fetchClients,
  addClient,
  toggleClientAddModal
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ClientsContainer));
