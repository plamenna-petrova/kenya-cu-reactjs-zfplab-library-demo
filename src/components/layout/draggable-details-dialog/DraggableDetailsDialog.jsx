import { useRef } from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';

const DraggableDialogPaperWrapper = (props) => {
  const draggableDialogPaperRef = useRef(null);

  return (
    <Draggable
      nodeRef={draggableDialogPaperRef}
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper ref={draggableDialogPaperRef} {...props} />
    </Draggable>
  )
}

const DraggableDetailsDialog = ({ isDraggableDialogOpen, onDraggableDialogClose, draggableDialogTitle, draggableDialogContent }) => {
  return (
    <Dialog
      open={isDraggableDialogOpen}
      onClose={onDraggableDialogClose}
      PaperComponent={DraggableDialogPaperWrapper}
      aria-labelledby="draggable-dialog-title"
    >
      <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
        {draggableDialogTitle}
      </DialogTitle>
      <DialogContent sx={{ maxHeight: '600px', overflowY: 'auto' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <pre>{draggableDialogContent}</pre>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onDraggableDialogClose}>Close</Button>
      </DialogActions>
    </Dialog>
  )
}

DraggableDetailsDialog.propTypes = {
  isDraggableDialogOpen: PropTypes.bool.isRequired,
  onDraggableDialogClose: PropTypes.func.isRequired,
  draggableDialogTitle: PropTypes.string.isRequired,
  draggableDialogContent: PropTypes.string.isRequired
}

export default DraggableDetailsDialog;