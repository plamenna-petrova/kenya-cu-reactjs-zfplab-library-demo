import { Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { useSelector } from 'react-redux';
import Demo from './pages/demo/Demo';
import NotFound from './pages/not-found/NotFound';

const theme = createTheme({
  components: {
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          color: 'rgb(255, 61, 87) !important',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '&.Mui-error fieldset': {
            borderColor: 'rgb(255, 61, 87) !important',
          }
        },
      },
    },
  },
});

const fullScreenContainer = () => document.fullscreenElement ?? document.body;

const fullscreenTheme = createTheme({
  components: {
    MuiMenu: {
      defaultProps: {
        container: fullScreenContainer,
      },
    },
    MuiTooltip: {
      defaultProps: {
        PopperProps: {
          container: fullScreenContainer,
        },
      },
    },
  },
});

const App = () => {
  const isFullscreen = useSelector((state) => state.fullscreen.isFullscreen);

  return (
    <ThemeProvider theme={!isFullscreen ? theme : fullscreenTheme}>
      <Routes>
        <Route path="/" element={<Demo />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;