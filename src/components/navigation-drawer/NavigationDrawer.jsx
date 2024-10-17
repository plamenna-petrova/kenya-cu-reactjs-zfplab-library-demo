import { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { FISCAL_DEVICE_CONNECTION, FISCAL_RECEIPTS, REPORTS } from '../../utils/constants';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveSection } from '../../store/slices/appNavigationSlice';
import { H3, Paragraph } from '../typography-elements/TypographyElements';
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
import SensorsIcon from '@mui/icons-material/Sensors';
import ReceiptIcon from '@mui/icons-material/Receipt';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import FiscalDeviceConnection from '../fiscal-device-connection/FiscalDeviceConnection';
import FiscalReceipts from '../fiscal-receipts/FiscalReceipts';
import Reports from '../reports/Reports';

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
  const theme = useTheme();
  const dispatch = useDispatch();
  const activeSection = useSelector((state) => state.appNavigation.activeSection);
  const [isNavigationDrawerOpen, setIsNavigationDrawerOpen] = useState(true);

  const sidebarMenuItems = [
    {
      title: FISCAL_DEVICE_CONNECTION,
      icon: <SensorsIcon />
    },
    {
      title: FISCAL_RECEIPTS,
      icon: <ReceiptIcon />
    },
    {
      title: REPORTS,
      icon: <ReceiptLongIcon />
    }
  ];

  const handleNavigationDrawerOpen = () => {
    setIsNavigationDrawerOpen(true);
  };

  const handleNavigationDrawerClose = () => {
    setIsNavigationDrawerOpen(false);
  };

  const showSection = (sectionIdentifier) => {
    dispatch(setActiveSection(sectionIdentifier));
  }

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
              isNavigationDrawerOpen && { display: 'none' },
            ]}
          >
            <MenuIcon />
          </IconButton>
          <H3 sx={{ display: { xs: 'none', sm: 'block' } }}>
            React ZFPLab Library Demo Application
          </H3>
          <Box sx={{ flexGrow: 1 }} />
          <ButtonGroup
            size="medium"
            aria-label="ZFPLabServer and Fiscal Device Connection Button Group"
            sx={{ minHeight: { xs: '56px', sm: '64px' } }}
          >
            <Divider orientation="vertical" flexItem />
            <Tooltip
              title={<Paragraph>{`The fiscal device is connected`}</Paragraph>}
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
                onClick={() => showSection(FISCAL_DEVICE_CONNECTION)}
              >
                <Avatar variant="square" src="/assets/images/tremol-s21-removebg-preview.png" sx={{ p: '1px' }}></Avatar>
              </IconButton>
            </Tooltip>
            <Divider orientation="vertical" flexItem />
            <Tooltip
              title={<Paragraph>{`A connection with ZFPLabServer was not established`}</Paragraph>}
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
              <IconButton size="small" aria-label="ZFPLabServer Connection" color="inherit" sx={{ borderRadius: 0, py: 1, px: 2 }}>
                <Avatar variant="square" src="/assets/images/zfplabserver.5309b59b.png"></Avatar>
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
              <ListItemButton
                sx={[
                  {
                    minHeight: 48,
                    px: 2.5,
                  },
                  isNavigationDrawerOpen
                    ? {
                      justifyContent: 'initial',
                    }
                    : {
                      justifyContent: 'center',
                    },
                ]}
                onClick={() => showSection(sidebarMenuItem.title)}
              >
                <ListItemIcon
                  sx={[
                    {
                      minWidth: 0,
                      justifyContent: 'center',
                    },
                    isNavigationDrawerOpen
                      ? {
                        mr: 3,
                      }
                      : {
                        mr: 'auto',
                      },
                  ]}
                >
                  {sidebarMenuItem.icon}
                </ListItemIcon>
                <ListItemText
                  primary={sidebarMenuItem.title}
                  sx={[
                    isNavigationDrawerOpen
                      ? {
                        opacity: 1,
                      }
                      : {
                        opacity: 0,
                      },
                  ]}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </MiniVariantDrawer>
      <Box
        component="main"
        sx={{
          display: 'flex',
          flexGrow: 1,
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh'
        }}
      >
        <DrawerHeader />
        {activeSection === FISCAL_DEVICE_CONNECTION && <FiscalDeviceConnection />}
        {activeSection === FISCAL_RECEIPTS && <FiscalReceipts />}
        {activeSection === REPORTS && <Reports />}
      </Box>
    </Box>
  );
}

export default NavigationDrawer;