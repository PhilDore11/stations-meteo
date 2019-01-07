import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import {
  Divider,
  Grid,
  Card,
  CardHeader,
  CardContent,
} from '@material-ui/core';

import ClientsTable from 'components/ClientsTable';

import { 
  fetchClients,
} from './actions';

class ClientsContainer extends React.Component {
  componentDidMount() {
    this.props.fetchClients(this.props.currentDay);
  }

  render() {
    const { clients } = this.props;
    
    console.log('clients', clients);

    return (
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <Card>
            <CardHeader title="Clients" />
            <Divider />
            <CardContent>
              <ClientsTable clients={clients} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  }
}

ClientsContainer.propTypes = {
  fetchClients: PropTypes.func.isRequired,
  clients: PropTypes.array,
};

const mapStateToProps = state => ({
  ...state.clients,
})

const mapDispatchToProps = {
  fetchClients,
};

export default connect(mapStateToProps, mapDispatchToProps)(ClientsContainer);
