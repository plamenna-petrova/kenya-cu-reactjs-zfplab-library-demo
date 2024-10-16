import { styled } from "@mui/material/styles";
import { H3 } from "../typography-elements/TypographyElements";
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import PropTypes from 'prop-types';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[500],
    ...theme.applyStyles('dark', {
      backgroundColor: theme.palette.grey[800],
    }),
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: '#203760',
    ...theme.applyStyles('dark', {
      backgroundColor: '#308fe8',
    }),
  },
}));

const BackdropLoading = ({ isBackdropLoadingOpen, loadingMessage }) => {
  return (
    <div>
      <Backdrop
        sx={{
          color: '#000',
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: 'rgba(245, 245, 245, 0.8)'
        }}
        open={isBackdropLoadingOpen}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', width: { xs: '18rem', md: '30rem' } }}>
          <H3 sx={{ textAlign: 'center' }}>{loadingMessage}</H3>
          <BorderLinearProgress value={50} sx={{ mt: 2 }} />
        </Box>
      </Backdrop>
    </div>
  )
}

BackdropLoading.propTypes = {
  isBackdropLoadingOpen: PropTypes.bool.isRequired,
  loadingMessage: PropTypes.string
}

export default BackdropLoading;