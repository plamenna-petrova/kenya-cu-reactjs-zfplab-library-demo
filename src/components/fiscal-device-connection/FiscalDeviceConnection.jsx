import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Formik } from "formik";
import { Paragraph } from '../typography-elements/TypographyElements';
import { BAUD_RATES, SELECT_MENU_ITEM_HEIGHT, SELECT_MENU_ITEM_PADDING_TOP } from '../../utils/constants';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import UsbIcon from '@mui/icons-material/Usb';
import LanIcon from '@mui/icons-material/Lan';

const FiscalDeviceConnectionStyledCardWrapper = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
  width: '100%',
  maxWidth: 800,
  margin: "auto",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  borderRadius: theme.shape.borderRadius,
  overflow: "hidden",
  padding: theme.spacing(2)
}));

const FiscalDeviceConnectionTabPanel = (props) => {
  const { children, value, index, ...restProps } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`fiscal-device-connection-tabpanel-${index}`}
      aria-labelledby={`fiscal-device-connection-tab-${index}`}
      {...restProps}
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
  const [serialPorts, setSerialPorts] = useState([]);
  const [baudRates, setBaudRates] = useState([]);

  const handleFiscalDeviceConnectionTabChange = (_, newValue) => {
    setFiscalDeviceConnectionTabValue(newValue);
  };

  const serialPortOrUSBConnectionInitialFormValues = {
    serialPort: "COM1",
    baudRate: BAUD_RATES[BAUD_RATES.length - 1]
  }

  const handleSerialPortOrUSBConnectionFormSubmit = (serialPostOrUSBConnectionFormData, { setSubmitting, resetForm }) => {
    console.log("form submitted");
  }

  const FiscalDeviceConnectionMenuProps = {
    PaperProps: {
      style: {
        maxHeight: SELECT_MENU_ITEM_HEIGHT * 4.5 + SELECT_MENU_ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  useEffect(() => {
    let sampleSerialPorts = [];

    for (let i = 0; i < 15; i++) {
      sampleSerialPorts.push(`COM${i + 1}`);
    }

    setSerialPorts([...sampleSerialPorts]);
  }, []);

  useEffect(() => {
    setBaudRates([...BAUD_RATES]);
  }, []);

  return (
    <FiscalDeviceConnectionStyledCardWrapper>
      <Tabs
        value={fiscalDeviceConnectionTabValue}
        onChange={handleFiscalDeviceConnectionTabChange}
        aria-label="Fiscal Device Connection Tabs"
        variant="fullWidth"
      >
        <Tab label="Connection by Serial Port / USB" icon={<UsbIcon />} iconPosition="start" {...a11yProps(0)} />
        <Tab label="Connection by LAN / WiFi" icon={<LanIcon />} iconPosition="start" {...a11yProps(1)} />
      </Tabs>
      <CardContent>
        <FiscalDeviceConnectionTabPanel value={fiscalDeviceConnectionTabValue} index={0}>
          <Formik
            initialValues={serialPortOrUSBConnectionInitialFormValues}
            onSubmit={handleSerialPortOrUSBConnectionFormSubmit}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue,
              isSubmitting
            }) => {
              return (
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={2} justifyContent="center" alignItems="center">
                    <Grid size={{ xs: 6 }} textAlign="center">
                      <FormControl fullWidth size="small" sx={{ textAlign: 'left' }}>
                        <Paragraph fontSize={14}>
                          Serial Port
                        </Paragraph>
                        <Select
                          name="serialPort"
                          value={values.serialPort}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          MenuProps={FiscalDeviceConnectionMenuProps}
                        >
                          {serialPorts.map((serialPort) => (
                            <MenuItem value={serialPort}>{serialPort}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid size={{ xs: 6 }} textAlign="center">
                      <FormControl fullWidth size="small" sx={{ textAlign: 'left'}}>
                         <Paragraph fontSize={14}>
                            Baud Rate
                         </Paragraph>
                         <Select
                           name="baudRate"
                           value={values.baudRate}
                           onChange={handleChange}
                           onBlur={handleBlur}
                           MenuProps={FiscalDeviceConnectionMenuProps}
                         >
                            {baudRates.map((baudRate) => (
                              <MenuItem value={baudRate}>{baudRate}</MenuItem>
                            ))}
                         </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </form>
              )
            }}
          </Formik>
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