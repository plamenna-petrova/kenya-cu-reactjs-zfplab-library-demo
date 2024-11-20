import { FC } from "react";
import { Route, Routes } from 'react-router-dom';
import { Theme, ThemeProvider, createTheme } from '@mui/material/styles'
import { useSelector } from 'react-redux';
import { RootState } from './store';
import Popper from '@mui/material/Popper';
import Demo from './pages/demo/Demo';
import NotFound from './pages/not-found/NotFound';

const demoPrimaryTheme: Theme = createTheme({
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

const fullscreenContainer = (): Element => document.fullscreenElement || document.body;

const FullscreenCustomPopper = (props: any): JSX.Element => (
  <Popper {...props} container={fullscreenContainer} />
);

const fullscreenTheme: Theme = createTheme({
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
        PopperComponent: FullscreenCustomPopper, 
      },
    },
    MuiTooltip: {
      defaultProps: {
        PopperProps: {
          container: fullscreenContainer,
        },
      },
    },
    MuiDialog: {
      defaultProps: {
        container: fullscreenContainer,
      },
    }
  },
});

const App: FC = () => {
  const isFullscreenModeActive = useSelector((state: RootState) => state.fullscreenMode.isFullscreenModeActive);

  return (
    <ThemeProvider theme={!isFullscreenModeActive ? demoPrimaryTheme : fullscreenTheme}>
      <Routes>
        <Route path="/" element={<Demo />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;