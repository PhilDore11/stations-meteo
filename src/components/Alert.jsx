import React from 'react';
import PropTypes from 'prop-types';

import { 
    withStyles,
    Snackbar,
    SnackbarContent,
    IconButton
} from '@material-ui/core';

import {
  CheckCircleOutlined as CheckCircleIcon,
  ErrorOutlined as ErrorIcon,
  InfoOutlined as InfoIcon,
  WarningOutlined as WarningIcon,
  CloseOutlined as CloseIcon,
} from '@material-ui/icons';

import { green, amber } from '@material-ui/core/colors';

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const styles = theme => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.dark,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
});

class Alert extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state ={
      open: true,
    };

    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    this.setState({open: false});
    this.props.resetAlerts();
  }

  render() {
    const { classes, message, variant, onClose, resetAlerts, ...rest } = this.props;
    const Icon = variantIcon[variant];

    const { open } = this.state;

    return (
      <Snackbar
        className={classes.alert}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={open}
        autoHideDuration={3000}
        onClose={this.handleClose}
      >
        <SnackbarContent
          className={classes[variant]}
          aria-describedby='alert-snackbar'
          message={
            <span id='alert-snackbar' className={classes.message}>
              <Icon className={[classes.icon, classes.iconVariant].join(' ')} />
              {message}
            </span>
          }
          action={[
            <IconButton
              key='close'
              aria-label='Close'
              color='inherit'
              className={classes.close}
              onClick={this.handleClose}
            >
              <CloseIcon className={classes.icon} />
            </IconButton>,
          ]}
          {...rest}
        />
      </Snackbar>
    );
  }
}
  
Alert.propTypes = {
  classes: PropTypes.object.isRequired,
  message: PropTypes.node,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,
  resetAlerts: PropTypes.func.isRequired,
};

export default withStyles(styles)(Alert);