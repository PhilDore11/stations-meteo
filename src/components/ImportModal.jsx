import React from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Divider,
  CircularProgress,
  Grid,
} from "@material-ui/core";
import { DropzoneArea } from "material-ui-dropzone";

const ImportModal = ({ stationData, loading, isOpen, onToggle, onImport }) => (
  <Dialog fullWidth maxWidth="md" open={isOpen} onClose={onToggle}>
    <DialogTitle>Import de Données</DialogTitle>
    <Divider />
    <DialogContent style={{ height: 300 }}>
      <Grid
        container
        spacing={2}
        alignItems="center"
        justify="center"
        style={{ height: "100%" }}
      >
        {loading ? (
          <Grid item>
            <CircularProgress size={48} />
          </Grid>
        ) : (
          <Grid item xs>
            <DropzoneArea
              acceptedFiles={[".csv"]}
              filesLimit={1}
              showPreviews={false}
              showPreviewsInDropzone={false}
              dropzoneText={"Ajouter votre fichier"}
              showAlerts={false}
              onChange={(files) =>
                files && files.length > 0 && onImport(files[0], stationData)
              }
            />
          </Grid>
        )}
      </Grid>
    </DialogContent>
    <Divider />
    <DialogActions>
      <Button
        disabled={loading}
        variant="outlined"
        onClick={onToggle}
        color="default"
      >
        Annuler
      </Button>
    </DialogActions>
  </Dialog>
);

ImportModal.propTypes = {
  stationData: PropTypes.object.isRequired,
  error: PropTypes.bool,
  loading: PropTypes.bool,
  isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  onImport: PropTypes.func.isRequired,
};

export default React.memo(ImportModal);
