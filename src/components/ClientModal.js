import React from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from "@material-ui/core";

const ClientModal = ({ body, isOpen, onToggle, onCreate }) => (
  <Dialog open={isOpen} onClose={onToggle}>
    <DialogTitle>Nouveau Client</DialogTitle>
    <DialogContent>
      {body}
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

ClientModal.propTypes = {
  body: PropTypes.node,
  isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired
};

export default ClientModal;
