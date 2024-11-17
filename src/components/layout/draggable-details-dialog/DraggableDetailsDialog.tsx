import { ReactNode, useRef, FC } from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Paper, { PaperProps } from '@mui/material/Paper';
import Draggable from 'react-draggable';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const DraggableDialogPaperWrapper: FC<PaperProps> = (props: PaperProps) => {
  const draggableDialogPaperRef = useRef<HTMLDivElement | null>(null);

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

interface DraggableDetailsDialogProps {
  isDraggableDialogOpen: boolean;
  onDraggableDialogClose: () => void;
  draggableDialogTitle: string;
  draggableDialogContent: string;
  draggableDialogActionNode?: ReactNode;
}

const DraggableDetailsDialog: FC<DraggableDetailsDialogProps> = ({
  isDraggableDialogOpen,
  onDraggableDialogClose,
  draggableDialogTitle,
  draggableDialogContent,
  draggableDialogActionNode
}) => {
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
        {draggableDialogActionNode && <>{draggableDialogActionNode}</>}
        <Button onClick={onDraggableDialogClose}>Close</Button>
      </DialogActions>
    </Dialog>
  )
}

export default DraggableDetailsDialog;