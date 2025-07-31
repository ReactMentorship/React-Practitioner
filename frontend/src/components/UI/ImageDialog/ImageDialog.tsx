import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  IconButton,
} from "@mui/material";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import CloseIcon from "@mui/icons-material/Close";

interface ImageDialogProps {
  open: boolean;
  onClose: () => void;
  imageUrl: string;
}

const ImageDialog: React.FC<ImageDialogProps> = ({
  open,
  onClose,
  imageUrl,
}) => {
  const [fullScreen, setFullScreen] = React.useState(false);

  const handleFullScreenToggle = () => {
    setFullScreen((prev) => !prev);
  };

  const handleClose = () => {
    onClose();
    setFullScreen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullScreen={fullScreen}
      fullWidth={!fullScreen}
      maxWidth="md"
    >
      <DialogTitle>
        Image Viewer
        <IconButton
          onClick={handleFullScreenToggle}
          style={{ float: "right" }}
          color="primary"
        >
          <FullscreenIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <img
          src={imageUrl}
          alt="Preview"
          style={{ width: "100%", height: "auto", borderRadius: 8 }}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} color="primary" startIcon={<CloseIcon />}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ImageDialog;
