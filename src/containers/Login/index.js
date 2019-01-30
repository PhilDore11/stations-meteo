import React from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
} from "@material-ui/core";

import { 
  login,
  setUsername,
  setPassword,
} from "./actions";

class LoginContainer extends React.PureComponent {
  handleLogin = () => {
    this.props.login(this.props);
  }

  handleUsernameChange = (event) => {
    console.log('event.target', event.target);

    this.props.setUsername(event.target.value);
  }

  handlePasswordChange = (event) => {
    console.log('event.target', event.target);

    this.props.setPassword(event.target.value);
  }

  render() {
    const {
      loggedInUser,
      username,
      password,
    } = this.props;

    return (
      <Dialog
        open={!loggedInUser}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Login</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please login to the portal.
          </DialogContentText>
          <TextField
            autoFocus
            id="username"
            label="Nom d'utilisateur"
            type="text"
            value={username}
            margin="normal"
            variant="outlined"
            fullWidth
            onChange={this.handleUsernameChange}
          />
          <TextField
            id="password"
            label="Mot de passe"
            type="password"
            value={password}
            margin="normal"
            variant="outlined"
            fullWidth
            onChange={this.handlePasswordChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleLogin} variant="contained" color="primary">
            Entrer
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

LoginContainer.propTypes = {
  username: PropTypes.string,
  password: PropTypes.string,
  login: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  ...state.login
});

const mapDispatchToProps = {
  login,
  setUsername,
  setPassword,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginContainer);
