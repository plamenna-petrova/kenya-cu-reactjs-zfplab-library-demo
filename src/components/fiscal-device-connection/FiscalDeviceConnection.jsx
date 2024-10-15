import { useState } from 'react';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';

const FiscalDeviceConnectionStyledCardWrapper = styled(Card)(({ theme }) => ({
  maxWidth: 600,
  margin: "auto",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  borderRadius: theme.shape.borderRadius,
  overflow: "hidden"
}));

const FiscalDeviceConnectionTabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`fiscal-device-connection-tabpanel-${index}`}
      aria-labelledby={`fiscal-device-connection-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

FiscalDeviceConnectionTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const a11yProps = (index) => {
  return {
    id: `fiscal-device-connection-tab-${index}`,
    'aria-controls': `fiscal-device-connection-tabpanel-${index}`,
  };
}

const FiscalDeviceConnection = () => {
  const [fiscalDeviceConnectionTabValue, setFiscalDeviceConnectionTabValue] = useState(0);

  const handleFiscalDeviceConnectionTabChange = (_, newValue) => {
    setFiscalDeviceConnectionTabValue(newValue);
  };

  return (
    <FiscalDeviceConnectionStyledCardWrapper>
      <Tabs
        value={fiscalDeviceConnectionTabValue}
        onChange={handleFiscalDeviceConnectionTabChange}
        aria-label="Fiscal Device Connection Tabs"
        variant="fullWidth"
      >
        <Tab label="Connection by Serial Port / USB" {...a11yProps(0)} />
        <Tab label="Connection by LAN / WiFi" {...a11yProps(1)} />
      </Tabs>
      <CardContent>
        <FiscalDeviceConnectionTabPanel value={fiscalDeviceConnectionTabValue} index={0}>
          <Grid container spacing={2} justifyContent="center" alignItems="center">
            <Grid size={{ xs: 6 }} textAlign="center">
              <Typography>Grid 1 6</Typography>
            </Grid>
            <Grid size={{ xs: 6 }} textAlign="center">
              <Typography>Grid 1 6</Typography>
            </Grid>
          </Grid>
        </FiscalDeviceConnectionTabPanel>
        <FiscalDeviceConnectionTabPanel value={fiscalDeviceConnectionTabValue} index={1}>
          <Grid container spacing={2} justifyContent="center" alignItems="center">
            <Grid size={{ xs: 6 }} textAlign="center">
              <Typography>Grid 2 6</Typography>
            </Grid>
            <Grid size={{ xs: 6 }} textAlign="center">
              <Typography>Grid 2 6</Typography>
            </Grid>
          </Grid>
        </FiscalDeviceConnectionTabPanel>
      </CardContent>
    </FiscalDeviceConnectionStyledCardWrapper>
  )
}

export default FiscalDeviceConnection;