import React from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from "@material-ui/core";

const ClientModal = ({ body, isAdd, isOpen, onToggle, onSave }) => (
  <Dialog open={isOpen} onClose={onToggle}>
    <DialogTitle>{isAdd ? "Nouveau Client" : "Modifier Client"}</DialogTitle>
    <DialogContent>
      {body}
    </DialogContent>
    <DialogActions>
      <Button onClick={onToggle} color="default">
        Annuler
      </Button>
      <Button onClick={onSave} color="primary">
        {isAdd ? "Créer" : "Modifier"}
      </Button>
    </DialogActions>
  </Dialog>
);

ClientModal.propTypes = {
  body: PropTypes.node,
  isAdd: PropTypes.bool,
  isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired
};

export default React.memo(ClientModal);
