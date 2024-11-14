import { Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { useSelector } from 'react-redux';
import Popper from '@mui/material/Popper';
import Demo from './pages/demo/Demo';
import NotFound from './pages/not-found/NotFound';

const demoPrimaryTheme = createTheme({
  palette: {
    primary: {
      main: '#1f4788'
    }
  },
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
    MuiButton: {
      styleOverrides: {
        contained: {
          backgroundColor: '#1f4788',
          '&:hover': {
            backgroundColor: '#2555a3'
          }
        }
      }
    }
  }
});

const fullScreenContainer = () => document.fullscreenElement ?? document.body;

const CustomPopper = (props) => (
  <Popper {...props} container={fullScreenContainer} />
);

const fullscreenTheme = createTheme({
  palette: {
    primary: {
      main: '#1f4788'
    }
  },
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
    MuiButton: {
      styleOverrides: {
        contained: {
          backgroundColor: '#1f4788',
          '&:hover': {
            backgroundColor: '#2555a3'
          }
        }
      }
    },
    MuiAutocomplete: {
      defaultProps: {
        PopperComponent: CustomPopper, 
      },
    },
    MuiMenu: {
      defaultProps: {
        PopperProps: {
          container: fullScreenContainer,
        },
      },
    },
    MuiSelect: {
      defaultProps: {
        PopperProps: {
          container: fullScreenContainer,
        },
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
    <ThemeProvider theme={!isFullscreen ? demoPrimaryTheme : fullscreenTheme}>
      <Routes>
        <Route path="/" element={<Demo />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;