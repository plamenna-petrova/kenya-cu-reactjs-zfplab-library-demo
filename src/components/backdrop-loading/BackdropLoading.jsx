import { H3 } from "../layout/typography-elements/TypographyElements";
import { DEFAULT_LOADING_MESSAGE } from "../../utils/constants";
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import CircularProgress from "@mui/material/CircularProgress";
import PropTypes from 'prop-types';

const BackdropLoading = ({ isBackdropLoadingOpen, loadingMessage = DEFAULT_LOADING_MESSAGE }) => {
  return (
    <div>
      <Backdrop
        aria-label="Backdrop Loading"
        sx={{
          color: '#000',
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: 'rgba(245, 245, 245, 0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        open={isBackdropLoadingOpen}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            gap: 2
          }}
        >
          <CircularProgress size="3rem" sx={{ color: '#273067' }} aria-label="FP operation loading spinner" />
          <H3>{loadingMessage}</H3>
        </Box>
      </Backdrop>
    </div>
  );
};

BackdropLoading.propTypes = {
  isBackdropLoadingOpen: PropTypes.bool.isRequired,
  loadingMessage: PropTypes.string
};

export default BackdropLoading;