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

const StationModal = ({ title, body, loading, isOpen, onToggle, saveLabel, onSave }) => (
  <Dialog fullWidth maxWidth="md" open={isOpen} onClose={onToggle}>
    <DialogTitle>{title}</DialogTitle>
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
        {saveLabel}
      </Button>
    </DialogActions>
  </Dialog>
);

StationModal.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.node,
  loading: PropTypes.bool,
  isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  saveLabel: PropTypes.string.isRequired,
  onSave: PropTypes.func.isRequired
};

export default React.memo(StationModal);
