import React from 'react';

import Divider from '@material-ui/core/Divider';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';

import PinIcon from '@material-ui/icons/Room';

import GoogleMapReact from 'google-map-react';

class MapContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      anchorEl: null,
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClick(event) {
    this.setState({ anchorEl: event.currentTarget });
  }

  handleClose() {
    this.setState({ anchorEl: null });
  }

  render() {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <Card>
            <CardHeader title="Map" subheader="Sous-titre" />
            <Divider />
            <CardContent>
              <div style={{ height: '60vh', width: '100%' }}>
                <GoogleMapReact
                  bootstrapURLKeys={{ key: 'AIzaSyBBzPnmM8AuGNrNyLwL-mwXqUXQf0R4Mc8' }}
                  center={
                    {
                      lat: 45.435117,
                      lng: -73.156920,
                    }
                  }
                  zoom={11}
                >
                  <Button
                    lat={45.435117}
                    lng={-73.156920}
                    aria-owns={open ? 'simple-popper' : undefined}
                    aria-haspopup="true"
                    variant="fab"
                    color="secondary"
                    mini
                    onClick={this.handleClick}
                  >
                    <PinIcon />
                  </Button>
                  <Popover
                    id="simple-popper"
                    open={open}
                    anchorEl={anchorEl}
                    onClose={this.handleClose}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'left',
                    }}
                  >
                    <Card>
                      <CardHeader title="Station 1" subheader="Sous-title" />
                      <Divider />
                      <CardContent>
                        <Typography variant="body1">Information au sujet de la station.</Typography>
                      </CardContent>
                    </Card>
                  </Popover>
                </GoogleMapReact>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  };
};

export default MapContainer;
