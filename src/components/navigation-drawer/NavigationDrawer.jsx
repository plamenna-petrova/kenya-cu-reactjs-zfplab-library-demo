/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef, useCallback } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import {
  ZFP_LAB_SERVER_CONNECTION,
  FISCAL_DEVICE_CONNECTION,
  FISCAL_RECEIPTS,
  REPORTS,
  CONNECTING_TO_ZFP_LAB_SERVER_LOADING_MESSAGE,
  CONNECTING_TO_FISCAL_DEVICE_LOADING_MESSAGE,
  ZFP_LAB_SERVER_ADDRESS_KEY,
  DEFAULT_ZFP_LAB_SERVER_ADDRESS,
  SERIAL_PORT_CONNECTION,
  TCP_CONNECTION,
  ZFP_LAB_SERVER_CONNECTION_NOT_ESTABLISHED_ERROR_MESSAGE,
  FISCAL_DEVICE_NOT_CONNECTED_ERROR_MESSAGE,
  CONNECTED_TO_FISCAL_DEVICE_SUCCESS_MESSAGE,
  INFORMATION,
  APPLICATION_VIEW_IN_FULLSCREEN_MODE_TOOLTIP_TITLE,
  EXIT_FULLSCREEN_MODE_TOOLTIP_TITLE,
  ENTER_FULLSCREEN_LABEL,
  EXIT_FULLSCREEN_LABEL
} from '../../utils/constants';
import { executeFPOperationWithLoading } from "../../utils/loadingUtils";
import { useSelector, useDispatch } from 'react-redux';
import { useFP } from '../../hooks/useFP';
import { setActiveSection } from '../../store/slices/appNavigationSlice';
import {
  setFiscalDeviceConnectionState,
  setZFPLabServerConnectionState,
  setIsConnectingToZFPLabServer,
  setIsSearchingForFiscalDevice
} from '../../store/slices/zfpConnectionSlice';
import { enterFullscreenMode, exitFullscreenMode } from '../../store/slices/fullScreenModeSlice';
import { readStatus, readVersion } from '../../api/direct-api-queries';
import { handleZFPLabServerError } from '../../utils/tremolLibraryUtils';
import { getConfiguredFiscalDeviceConnectionSettings } from '../../utils/connectionUtils';
import { toast } from 'react-toastify';
import { H3, Paragraph } from '../layout/typography-elements/TypographyElements';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import MenuIcon from '@mui/icons-material/Menu';
import ButtonGroup from '@mui/material/ButtonGroup';
import Tooltip from '@mui/material/Tooltip';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import CircularProgress from "@mui/material/CircularProgress";
import ReceiptIcon from '@mui/icons-material/Receipt';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import InfoIcon from '@mui/icons-material/Info';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import ZFPLabServerConnection from '../zfp-lab-server-connection/ZFPLabServerConnection';
import FiscalDeviceConnection from '../fiscal-device-connection/FiscalDeviceConnection';
import FiscalReceipts from '../fiscal-receipts/FiscalReceipts';
import Reports from '../reports/Reports';
import FiscalDeviceInformation from '../fiscal-device-information/FiscalDeviceInformation';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const MiniVariantDrawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    variants: [
      {
        props: ({ open }) => open,
        style: {
          ...openedMixin(theme),
          '& .MuiDrawer-paper': openedMixin(theme),
        },
      },
      {
        props: ({ open }) => !open,
        style: {
          ...closedMixin(theme),
          '& .MuiDrawer-paper': closedMixin(theme),
        },
      },
    ],
  }),
);

export const NavigationDrawer = () => {
  const [isNavigationDrawerOpen, setIsNavigationDrawerOpen] = useState(true);
  const isFullscreenEventListenerAttached = useRef(false);
  const activeSection = useSelector((state) => state.appNavigation.activeSection);
  const zfpLabServerConnectionState = useSelector((state) => state.zfpConnection.zfpLabServerConnectionState);
  const fiscalDeviceConnectionState = useSelector((state) => state.zfpConnection.fiscalDeviceConnectionState);
  const isFullscreenModeActive = useSelector((state) => state.fullscreenMode.isFullscreenModeActive);
  const demoContentElement = document.getElementById('demo');
  const navigationDrawerInitialMountRef = useRef(true);
  const theme = useTheme();
  const dispatch = useDispatch();
  const fp = useFP();

  const sidebarMenuItems = [
    {
      title: FISCAL_RECEIPTS,
      icon: <ReceiptIcon />
    },
    {
      title: REPORTS,
      icon: <ReceiptLongIcon />
    },
    {
      title: INFORMATION,
      icon: <InfoIcon />
    }
  ];

  const handleNavigationDrawerOpen = () => {
    setIsNavigationDrawerOpen(true);
  };

  const handleNavigationDrawerClose = () => {
    setIsNavigationDrawerOpen(false);
  };

  const showZFPLabServerConnectionSection = () => {
    sendZFPLabServerConnectionState(false, ZFP_LAB_SERVER_CONNECTION_NOT_ESTABLISHED_ERROR_MESSAGE);
    sendFiscalDeviceConnectionState(false, FISCAL_DEVICE_NOT_CONNECTED_ERROR_MESSAGE);
    showSection(ZFP_LAB_SERVER_CONNECTION);
  }

  const showFiscalDeviceConnectionSection = () => {
    if (!fiscalDeviceConnectionState.isConnected) {
      return;
    }

    sendFiscalDeviceConnectionState(false, FISCAL_DEVICE_NOT_CONNECTED_ERROR_MESSAGE);
    showSection(FISCAL_DEVICE_CONNECTION);
  }

  const showSection = (sectionIdentifier) => {
    dispatch(setActiveSection(sectionIdentifier));
  }

  /**
   * Attempts to connect to the ZFPLabServer automatically and updates the Redux state based on the connection result.
   * - Initiates an asynchronous operation with a loading indicator.
   * - Sets the initial connection state to "not connected".
   * - Executes the `connectToZFPLabServer` operation.
   * - On completion, updates the Redux state to reflect the end of the connection attempt.
   * 
   * @async
   * @function handleZFPLabServerAutomaticConnection
   * @param {string} zfpLabServerAddress - The address of the ZFPLabServer.
   * @returns {Promise<void>} A promise that resolves once the connection attempt completes.
   */
  const handleZFPLabServerAutomaticConnection = async (zfpLabServerAddress) => {
    dispatch(setIsConnectingToZFPLabServer(true));

    await executeFPOperationWithLoading(dispatch, async () => {
      try {
        sendZFPLabServerConnectionState(false, ZFP_LAB_SERVER_CONNECTION_NOT_ESTABLISHED_ERROR_MESSAGE);
        await connectToZFPLabServer(zfpLabServerAddress);
      } finally {
        dispatch(setIsConnectingToZFPLabServer(false));
      }
    }, CONNECTING_TO_ZFP_LAB_SERVER_LOADING_MESSAGE);
  }

  /**
   * Configures the ZFPLabServer connection settings and tests the connection state.
   * - Executes the `ServerSetSettings` operation to set the server address.
   * - Tests the connection by executing `ServerGetSettingsForConnectionTest`.
   * - On successful connection:
   *   - Saves the ZFPLabServer address to localStorage.
   *   - Updates the Redux state with a "connected" status.
   *   - Shows the `FISCAL_DEVICE_CONNECTION` section.
   * - If the connection test fails, no state changes occur.
   *
   * @async
   * @function connectToZFPLabServer
   * @param {string} zfpLabServerAddress - The address of the ZFPLabServer.
   * @returns {Promise<void>} A promise that resolves once the ZFPLabServer connection operation completes.
   */
  const connectToZFPLabServer = async (zfpLabServerAddress) => {
    await fp.ServerSetSettings(zfpLabServerAddress);

    const serverSettingsForConnectionTest = await fp.ServerGetSettingsForConnectionTest();

    if (serverSettingsForConnectionTest) {
      localStorage.setItem(ZFP_LAB_SERVER_ADDRESS_KEY, zfpLabServerAddress);
      sendZFPLabServerConnectionState(true, `Connected to ZFPLabServer on: ${zfpLabServerAddress}`);
      showSection(FISCAL_DEVICE_CONNECTION);
    }
  };

  /**
   * Attempts to connect to the fiscal device automatically and updates the Redux state based on the connection result.
   * - Initiates an asynchronous operation with a loading indicator.
   * - Sets the initial connection state to "not connected".
   * - Executes the `connectToFiscalDevice` operation.
   * - On completion, updates the Redux state to reflect the end of the connection attempt.
   * 
   * @async
   * @function handleFiscalDeviceAutomaticConnection
   * @param {object} fiscalDeviceConnectionSettings - Connection settings for the fiscal device.
   * @param {string} connectionType - Type of the connection.
   * @returns {Promise<void>} A promise that resolves once the connection attempt completes.
   */
  const handleFiscalDeviceAutomaticConnection = async (fiscalDeviceConnectionSettings, connectionType) => {
    dispatch(setIsSearchingForFiscalDevice(true));

    await executeFPOperationWithLoading(dispatch, async () => {
      try {
        sendFiscalDeviceConnectionState(false, FISCAL_DEVICE_NOT_CONNECTED_ERROR_MESSAGE);
        await connectToFiscalDevice(fiscalDeviceConnectionSettings, connectionType);
      } finally {
        dispatch(setIsSearchingForFiscalDevice(false));
      }
    }, CONNECTING_TO_FISCAL_DEVICE_LOADING_MESSAGE);
  }

  /**
   * Connects to the fiscal device using `Serial` or `TCP` connection settings, applies client library definitions,
   * checks the fiscal device status and updates the Redux state with information about 
   * the connection type, the serial number and the model of the fiscal device.
   * - For `Serial` connection, executes `ServerSetDeviceSerialSettings`, specifying the serial port and baud rate.
   * - For `TCP` connection, executes `ServerSetDeviceTcpSettings`, specifying the IP address, 
   * default TCP port, and LAN/WiFi password.
   * - Upon a successful connection:
   *   - Applies client library definitions with `ApplyClientLibraryDefinitions`.
   *   - Checks the fiscal device's status via `ReadStatus`.
   *   - Reads the fiscal device's serial number using `ReadSerialAndFiscalNums()` and model using `ReadVersion()`.
   *   - Updates the Redux state with a formatted message based on the connection type.
   *   - Shows the `FiscalReceipts` section.
   *   - Shows a success toast message, confirming the succesful connection.
   *
   * @async
   * @function connectToFiscalDevice
   * @param {object} fiscalDeviceConnectionSettings - Connection settings for the fiscal device:
   *    - If `Serial`, includes `{ serialPort: string, baudRate: number }`.
   *    - If `TCP`, includes `{ fiscalDeviceIPAddress: string, lanOrWifiPassword: string }`.
   * @param {string} connectionType - Type of the connection, either `SERIAL_PORT_CONNECTION` or `TCP_CONNECTION`.
   * @returns {Promise<void>} A promise that resolves once the fiscal device connection operation completes.
   */
  const connectToFiscalDevice = async (fiscalDeviceConnectionSettings, connectionType) => {
    await fp.ApplyClientLibraryDefinitions();

    let fiscalDeviceConnectionDetails = {};

    switch (connectionType) {
      case SERIAL_PORT_CONNECTION: {
        const { serialPort, baudRate } = fiscalDeviceConnectionSettings;
        await fp.ServerSetDeviceSerialSettings(serialPort, baudRate, true);
        Object.assign(fiscalDeviceConnectionDetails, { serialPort, baudRate });
        break;
      }
      case TCP_CONNECTION: {
        const { fiscalDeviceIPAddress, lanOrWifiPassword } = fiscalDeviceConnectionSettings;
        await fp.ServerSetDeviceTcpSettings(fiscalDeviceIPAddress, 8000, lanOrWifiPassword);
        Object.assign(fiscalDeviceConnectionDetails, { fiscalDeviceIPAddress });
        break;
      }
    }

    // await fp.ReadStatus();

    // await readStatus();

    console.log("before reading status");

    // const readStatusCommandXML = `<Command Name="ReadStatus"></Command>`;
    // await fp.sendReq("POST", "/ReadStatus", readStatusCommandXML);

    await readStatus();

    console.log("after reading status");

    const fiscalDeviceModel = await readVersion();

    const fiscalDeviceSuccessfulConnectionMessage = connectionType === SERIAL_PORT_CONNECTION
      ? `(${fiscalDeviceModel}) on ${fiscalDeviceConnectionDetails.serialPort} and baud rate ${fiscalDeviceConnectionDetails.baudRate}`
      : `(${fiscalDeviceModel}) on IP address ${fiscalDeviceConnectionDetails.fiscalDeviceIPAddress}`;

    sendFiscalDeviceConnectionState(true, fiscalDeviceSuccessfulConnectionMessage);
    showSection(FISCAL_RECEIPTS);

    toast.success(CONNECTED_TO_FISCAL_DEVICE_SUCCESS_MESSAGE);
  }

  const sendZFPLabServerConnectionState = (isConnected, connectionStateMessage) => {
    dispatch(setZFPLabServerConnectionState({ isConnected, connectionStateMessage }));
  }

  const sendFiscalDeviceConnectionState = (isConnected, connectionStateMessage) => {
    dispatch(setFiscalDeviceConnectionState({ isConnected, connectionStateMessage }));
  }

  const isZFPLabServerOrFiscalDeviceConnectionSection = () =>
    activeSection === ZFP_LAB_SERVER_CONNECTION || activeSection === FISCAL_DEVICE_CONNECTION;

  const getFullscreenElement = () =>
    document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement;

  const toggleFullscreen = useCallback(() => {
    if (isFullscreenModeActive) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    } else {
      if (demoContentElement.requestFullscreen) {
        demoContentElement.requestFullscreen();
      } else if (demoContentElement.webkitRequestFullscreen) {
        demoContentElement.webkitRequestFullscreen();
      } else if (demoContentElement.mozRequestFullScreen) {
        demoContentElement.mozRequestFullScreen();
      } else if (demoContentElement.msRequestFullscreen) {
        demoContentElement.msRequestFullscreen();
      }
    }
  }, [isFullscreenModeActive, demoContentElement]);

  useEffect(() => {
    if (!navigationDrawerInitialMountRef.current) {
      return;
    }

    navigationDrawerInitialMountRef.current = false;

    /**
     * Attempts to connect to both the ZFPLabServer and the fiscal device autonatically using settings found in local storage.
     * - Retrieves `savedZFPLabServerAddress` from the local storage, or uses the default address `http://localhost:4444`, 
     * if no saved ZFPLabServer address is found.
     * - Executes `handleZFPLabServerAutomaticConnection` using the provided ZFPLabServer address.
     * - Upon successful connection to the ZFPLabServer:
     *    - Sets a 300ms timeout before proceeding.
     *    - Attempts to retrieve fiscal device connection settings from the local storage.
     *    - If fiscal device connection settings are available, executes `handleFiscalDeviceAutomaticConnection` 
     * with specified `connectionParameters` and `connectionType`.
     * - Shows an error toast with the error message if an error occurs during either the ZFPLabServer or the fiscal device connection attempt.
     * - The function is executed once when the `NavigationDrawer` component mounts.
     *
     * @async
     * @function handleZFPLabServerAndFiscalDeviceAutomaticConnection
     * @returns {Promise<void>} A promise that resolves once the operation completes.
     */
    const handleZFPLabServerAndFiscalDeviceAutomaticConnection = async () => {
      const savedZFPLabServerAddress = localStorage.getItem(ZFP_LAB_SERVER_ADDRESS_KEY) || DEFAULT_ZFP_LAB_SERVER_ADDRESS;

      try {
        await handleZFPLabServerAutomaticConnection(savedZFPLabServerAddress);

        setTimeout(async () => {
          const configuredFiscalDeviceConnectionSettings = getConfiguredFiscalDeviceConnectionSettings();

          if (configuredFiscalDeviceConnectionSettings) {
            const { connectionType, ...connectionParameters } = configuredFiscalDeviceConnectionSettings;

            try {
              await handleFiscalDeviceAutomaticConnection(connectionParameters, connectionType);
            } catch (error) {
              toast.error(handleZFPLabServerError(error));
            }
          }
        }, 300);
      } catch (error) {
        toast.error(handleZFPLabServerError(error));
      }
    };

    handleZFPLabServerAndFiscalDeviceAutomaticConnection();

  }, [dispatch]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      const fullscreenElement = getFullscreenElement();

      if (fullscreenElement) {
        dispatch(enterFullscreenMode());
      } else {
        dispatch(exitFullscreenMode());
      }
    }

    let fullscreenEventName;

    if (!isFullscreenEventListenerAttached.current) {
      fullscreenEventName =
        'onfullscreenchange' in document ? 'fullscreenchange' :
          'onwebkitfullscreenchange' in document ? 'webkitfullscreenchange' :
            'onmozfullscreenchange' in document ? 'mozfullscreenchange' :
              'onmsfullscreenchange' in document ? 'msfullscreenchange' :
                null;

      if (fullscreenEventName) {
        document.addEventListener(fullscreenEventName, handleFullscreenChange);
        isFullscreenEventListenerAttached.current = true;
      }
    }

    return () => {
      if (isFullscreenEventListenerAttached.current && fullscreenEventName) {
        document.removeEventListener(fullscreenEventName, handleFullscreenChange);
        isFullscreenEventListenerAttached.current = false;
      }
    };
  }, []);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" elevation={0} open={isNavigationDrawerOpen} sx={{ bgcolor: '#f5f5f5', color: '#000000' }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="Open Navigation Drawer"
            onClick={handleNavigationDrawerOpen}
            edge="start"
            sx={[
              {
                marginRight: 5,
              },
              isNavigationDrawerOpen && { display: 'none' }
            ]}
          >
            <MenuIcon />
          </IconButton>
          <H3 sx={{ display: { xs: 'none', md: 'block' } }}>
            React ZFPLab Library Demo Application
          </H3>
          <Box sx={{ flexGrow: 1 }} />
          <ButtonGroup
            size="medium"
            aria-label="Fullscreen mode toggle, ZFPLabServer and Fiscal Device Connection Button Group"
            sx={{ minHeight: { xs: '56px', sm: '64px' } }}
          >
            <Divider orientation="vertical" flexItem />
            <Tooltip
              title={
                <Paragraph>
                  {isFullscreenModeActive ? EXIT_FULLSCREEN_MODE_TOOLTIP_TITLE : APPLICATION_VIEW_IN_FULLSCREEN_MODE_TOOLTIP_TITLE}
                </Paragraph>
              }
              placement="bottom"
              slotProps={{
                popper: {
                  modifiers: [
                    {
                      name: 'offset',
                      options: {
                        offset: [0, -5]
                      }
                    }
                  ]
                }
              }}
            >
              <Button
                size="large"
                aria-label="Fullscreen Mode"
                color="inherit"
                sx={{ border: 'none', textTransform: 'capitalize', px: 2, py: 0 }}
                onClick={toggleFullscreen}
                startIcon={isFullscreenModeActive
                  ? <CloseFullscreenIcon fontSize="inherit" sx={{ color: 'primary.main', transform: 'scale(1.3)' }} />
                  : <FullscreenIcon fontSize="inherit" sx={{ color: 'primary.main', transform: 'scale(1.4)' }} />
                }
              >
                {isFullscreenModeActive ? EXIT_FULLSCREEN_LABEL : ENTER_FULLSCREEN_LABEL}
              </Button>
            </Tooltip>
            <Divider orientation="vertical" flexItem />
            <Tooltip
              title={<Paragraph>{fiscalDeviceConnectionState.connectionStateMessage}</Paragraph>}
              placement="bottom"
              slotProps={{
                popper: {
                  modifiers: [
                    {
                      name: 'offset',
                      options: {
                        offset: [0, -5]
                      }
                    }
                  ]
                }
              }}
            >
              <IconButton
                size="small"
                aria-label="Fiscal Device Connection"
                color="inherit"
                sx={{ borderRadius: 0, py: 1, px: 2 }}
                onClick={showFiscalDeviceConnectionSection}
              >
                <Avatar
                  variant="square"
                  src="/assets/images/tremol-s21.png"
                  sx={{ bgcolor: !fiscalDeviceConnectionState.isConnected ? red[600] : 'transparent' }}
                ></Avatar>
                {fiscalDeviceConnectionState.isSearching && (
                  <CircularProgress
                    size={22}
                    thickness={7}
                    aria-label="Fiscal device connection loading spinner"
                    sx={{ ml: 1, color: '#252525' }}
                  />
                )}
              </IconButton>
            </Tooltip>
            <Divider orientation="vertical" flexItem />
            <Tooltip
              title={<Paragraph>{zfpLabServerConnectionState.connectionStateMessage}</Paragraph>}
              placement="bottom"
              slotProps={{
                popper: {
                  modifiers: [
                    {
                      name: 'offset',
                      options: {
                        offset: [0, -5]
                      }
                    }
                  ]
                }
              }}
            >
              <IconButton
                size="small"
                aria-label="ZFPLabServer Connection"
                color="inherit"
                sx={{ borderRadius: 0, py: 1, px: 2 }}
                onClick={showZFPLabServerConnectionSection}
              >
                <Avatar
                  variant="square"
                  src="/assets/images/zfplabserver.5309b59b.png"
                  sx={{ bgcolor: !zfpLabServerConnectionState.isConnected ? red[600] : 'transparent' }}
                ></Avatar>
                {zfpLabServerConnectionState.isConnecting && (
                  <CircularProgress
                    size={22}
                    thickness={7}
                    aria-label="ZFPLabServer connection loading spinner"
                    sx={{ ml: 1, color: '#252525' }}
                  />
                )}
              </IconButton>
            </Tooltip>
            <Divider orientation="vertical" flexItem />
          </ButtonGroup>
        </Toolbar>
        <Divider />
      </AppBar>
      <MiniVariantDrawer
        variant="permanent"
        open={isNavigationDrawerOpen}
        PaperProps={{
          sx: {
            backgroundColor: "#f5f5f5",
          }
        }}
      >
        <DrawerHeader>
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <a href="https://tremol.bg/en">
              <img src="/assets/images/tremol-full-text-logo.png" alt="Tremol Logo" style={{ width: '100%', height: '1.5rem' }} />
            </a>
          </Box>
          <IconButton onClick={handleNavigationDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {sidebarMenuItems.map((sidebarMenuItem, index) => (
            <ListItem key={index} disablePadding sx={{ display: 'block' }}>
              <Tooltip
                title={<Paragraph>{sidebarMenuItem.title}</Paragraph>}
                placement="right"
                disableHoverListener={isNavigationDrawerOpen}
              >
                <ListItemButton
                  sx={[
                    {
                      minHeight: 48,
                      px: 2.5,
                    },
                    isNavigationDrawerOpen ? { justifyContent: 'initial' } : { justifyContent: 'center' }
                  ]}
                  onClick={() => showSection(sidebarMenuItem.title)}
                  disabled={!zfpLabServerConnectionState.isConnected || !fiscalDeviceConnectionState.isConnected}
                >
                  <ListItemIcon
                    sx={[
                      {
                        minWidth: 0,
                        justifyContent: 'center',
                      },
                      isNavigationDrawerOpen ? { mr: 3 } : { mr: 'auto' }
                    ]}
                  >
                    {sidebarMenuItem.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={sidebarMenuItem.title}
                    sx={[isNavigationDrawerOpen ? { opacity: 1 } : { opacity: 0 }]}
                  />
                </ListItemButton>
              </Tooltip>
            </ListItem>
          ))}
        </List>
      </MiniVariantDrawer>
      <Box
        component="main"
        sx={[
          {
            display: 'flex',
            flexGrow: 1,
            justifyContent: isZFPLabServerOrFiscalDeviceConnectionSection() ? 'center' : 'flex-start',
            alignItems: isZFPLabServerOrFiscalDeviceConnectionSection() ? 'center' : 'flex-start',
            height: '100vh',
            flexDirection: 'column',
            bgcolor: '#fff',
            p: 2
          },
          isFullscreenModeActive && { overflow: 'auto' }
        ]}
      >
        <DrawerHeader />
        {activeSection === ZFP_LAB_SERVER_CONNECTION && (
          <ZFPLabServerConnection zfpLabServerConnectionHandler={connectToZFPLabServer} />
        )}
        {activeSection === FISCAL_DEVICE_CONNECTION && (
          <FiscalDeviceConnection fiscalDeviceConnectionHandler={connectToFiscalDevice} />
        )}
        {activeSection === FISCAL_RECEIPTS && <FiscalReceipts />}
        {activeSection === REPORTS && <Reports />}
        {activeSection === INFORMATION && <FiscalDeviceInformation />}
      </Box>
    </Box>
  );
}

export default NavigationDrawer;