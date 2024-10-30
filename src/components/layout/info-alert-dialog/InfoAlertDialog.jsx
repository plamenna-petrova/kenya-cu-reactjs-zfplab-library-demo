import { H2, H3 } from '../typography-elements/TypographyElements';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';

const InfoAlertDialog = ({ isInfoAlertDialogOpen, onInfoAlertDialogClose, infoAlertDialogTitle, infoAlertDialogContent }) => {
  const infoAlertStyles = {
    "& .MuiAlert-icon": {
      fontSize: 40,
      alignSelf: 'start'
    },
    "& .MuiAlert-message": {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }
  };

  return (
    <Dialog
      open={isInfoAlertDialogOpen}
      onClose={onInfoAlertDialogClose}
      fullWidth
      maxWidth="xs"
    >
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        bgcolor: "#0288d1",
        p: 2,
        width: '100%',
        maxWidth: { xs: '100%' }
      }}>
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <H2 sx={{ textAlign: 'center', color: '#fff', flexGrow: 1, fontSize: 20 }}>{infoAlertDialogTitle}</H2>
          <IconButton
            aria-label="Close Info Alert Dialog"
            color="inherit"
            size="medium"
            onClick={onInfoAlertDialogClose}
            sx={{
              color: '#fff',
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.1)"
              }
            }}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        </Box>
        <Alert
          aria-label="Info Alert"
          variant="filled"
          severity="info"
          sx={{
            display: 'flex',
            alignItems: 'center',
            mt: 2,
            ...infoAlertStyles
          }}
        >
          <AlertTitle>
            <H3 sx={{ whiteSpace: 'pre-wrap' }}>{infoAlertDialogContent}</H3>
          </AlertTitle>
        </Alert>
      </Box>
    </Dialog>
  )
}

InfoAlertDialog.propTypes = {
  isInfoAlertDialogOpen: PropTypes.bool.isRequired,
  onInfoAlertDialogClose: PropTypes.func.isRequired,
  infoAlertDialogTitle: PropTypes.string.isRequired,
  infoAlertDialogContent: PropTypes.string.isRequired
}

export default InfoAlertDialog;