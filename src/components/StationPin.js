import React from 'react';
import PropTypes from 'prop-types';

import { IconButton, Popover } from '@material-ui/core';

import { RoomOutlined as PinIcon } from '@material-ui/icons';

import { StationCard } from './';

class StationPin extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClick() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  handleClose() {
    this.setState({ isOpen: false });
  }

  render() {
    const { station } = this.props;
    const { isOpen } = this.state;
    return (
      <React.Fragment>
        <IconButton color="secondary" onClick={this.handleClick} buttonRef={node => (this.anchorEl = node)}>
          <PinIcon fontSize="large" />
        </IconButton>
        <Popover
          id="simple-popper"
          open={isOpen}
          anchorEl={this.anchorEl}
          onClose={this.handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}>
          <StationCard station={station} />
        </Popover>
      </React.Fragment>
    );
  }
}

StationPin.propTypes = {
  station: PropTypes.object.isRequired,
};

export default StationPin;
