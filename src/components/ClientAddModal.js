import React from "react";
import PropTypes from "prop-types";
import {
  withStyles,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField
} from "@material-ui/core";

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  }
});

class ClientAddModal extends React.PureComponent {
  state = {
    name: "",
    email: ""
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  render() {
    const { classes, isOpen, onToggle, onCreate } = this.props;
    return (
      <Dialog open={isOpen} onClose={onToggle}>
        <DialogTitle>Nouveau Client</DialogTitle>
        <DialogContent>
          <form noValidate autoComplete="off">
            <TextField
              className={classes.textField}
              autoFocus
              id="name"
              label="Nom"
              type="text"
              margin="normal"
              variant="outlined"
              value={this.state.name}
              onChange={this.handleChange("name")}
            />
            <TextField
              className={classes.textField}
              id="email"
              label="Addresse courriel"
              type="email"
              margin="normal"
              variant="outlined"
              value={this.state.email}
              onChange={this.handleChange("email")}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={onToggle} color="default">
            Annuler
          </Button>
          <Button onClick={() => onCreate(this.state)} color="primary">
            Créer
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

ClientAddModal.propTypes = {
  classes: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired
};

export default withStyles(styles)(ClientAddModal);
