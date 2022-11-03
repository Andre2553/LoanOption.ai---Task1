import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";

import {Button,Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import { deleteUniversity } from "../../../../store/modules/table/actions";

interface AlertProps{
   disabled:boolean,
}
export default function AlertDialog(props:AlertProps) {
  const dispatch = useDispatch();
  const handleDeleteUniversity = useCallback(() => {
    dispatch(deleteUniversity());
    handleClose();
  }, [dispatch]);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        onClick={handleClickOpen}
        disabled={props.disabled}
        variant="contained"
        startIcon={<DeleteIcon />}
        color="error"
      >
        Remove
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Would you like to delete the last row?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            If you want to do that, click on the delete button or cancel it.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button color='error' onClick={() => handleDeleteUniversity()} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
