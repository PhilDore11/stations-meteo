import React from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Divider,
} from "@material-ui/core";

const ClientModal = ({ body, isAdd, loading, isOpen, onToggle, onSave }) => (
  <Dialog fullWidth maxWidth="md" open={isOpen} onClose={onToggle}>
    <DialogTitle>{isAdd ? "Nouveau Client" : "Modifier Client"}</DialogTitle>
    <Divider />
    <DialogContent>
      {body}
    </DialogContent>
    <Divider />
    <DialogActions>
      <Button disabled={loading} variant="outlined" onClick={onToggle} color="default">
        Annuler
      </Button>
      <Button disabled={loading} variant="contained" onClick={onSave} color="primary">
        {isAdd ? "Créer" : "Modifier"}
      </Button>
    </DialogActions>
  </Dialog>
);

ClientModal.propTypes = {
  body: PropTypes.node,
  isAdd: PropTypes.bool,
  loading: PropTypes.bool,
  isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired
};

export default React.memo(ClientModal);
