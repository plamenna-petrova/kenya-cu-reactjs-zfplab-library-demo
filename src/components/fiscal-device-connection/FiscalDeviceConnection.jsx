import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Formik } from "formik";
import { Paragraph } from '../typography-elements/TypographyElements';
import { BAUD_RATES, SELECT_MENU_ITEM_HEIGHT, SELECT_MENU_ITEM_PADDING_TOP } from '../../utils/constants';
import { fp } from '../../utils/tremol-library-helpers';
import * as Yup from "yup";
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
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import UsbIcon from '@mui/icons-material/Usb';
import LanIcon from '@mui/icons-material/Lan';
import SearchIcon from '@mui/icons-material/Search';
import CableIcon from '@mui/icons-material/Cable';

const FiscalDeviceConnectionStyledCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: '100%',
  maxWidth: 800,
  minWidth: 0,
  margin: "auto",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(2),
  overflow: "hidden",
  boxSizing: "border-box",
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1),
    maxWidth: '300px',
    margin: theme.spacing(1),
  },
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

  const handleFiscalDeviceConnectionTabChange = (_, newValue) => {
    setFiscalDeviceConnectionTabValue(newValue);
  };

  const serialPortOrUSBConnectionInitialFormValues = {
    serialPort: "COM1",
    baudRate: BAUD_RATES[BAUD_RATES.length - 1]
  }

  const serialPortOrUSBConnectionValidationSchema = Yup.object().shape({
    serialPort: Yup.string().required(),
    baudRate: Yup.number().required()
  });

  const handleFindDevice = () => {
    console.log("finding device");

    try {
      const foundDevice = fp.ServerFindDevice();
      console.log(foundDevice);
    } catch (error) {
      console.log(error);
    }
  }

  const handleSerialPortOrUSBConnectionFormSubmit = (serialPostOrUSBConnectionFormData, { setSubmitting, resetForm }) => {
    console.log("form submitted");
    console.log(serialPostOrUSBConnectionFormData);
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

  return (
    <FiscalDeviceConnectionStyledCard>
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
            validationSchema={serialPortOrUSBConnectionValidationSchema}
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
                    <Grid size={{ xs: 12, sm: 6 }} textAlign="center">
                      <FormControl fullWidth size="small" sx={{ textAlign: 'left' }}>
                        <Paragraph fontSize={14}>
                          Serial Port
                        </Paragraph>
                        <Autocomplete
                          name="serialPort"
                          size="small"
                          value={values.serialPort}
                          onChange={(_, newValue) => {
                            setFieldValue("serialPort", newValue || "");
                          }}
                          inputValue={values.serialPort}
                          onInputChange={(_, newInputValue) => {
                            setFieldValue("serialPort", newInputValue || "");
                          }}
                          onBlur={(event) => {
                            if (event.relatedTarget && event.relatedTarget.getAttribute("role") === "combobox") {
                              return;
                            }

                            handleBlur(event);
                          }}
                          options={serialPorts}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              name="serialPort"
                              onBlur={handleBlur}
                              error={Boolean(touched.serialPort && errors.serialPort)}
                            />
                          )}
                        />
                      </FormControl>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }} textAlign="center">
                      <FormControl fullWidth size="small" sx={{ textAlign: 'left' }}>
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
                          {BAUD_RATES.map((baudRate, index) => (
                            <MenuItem key={index} value={baudRate}>{baudRate}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, ml: { xs: '0px', sm: '30px' } }}>
                      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                        <Button variant="contained" startIcon={<SearchIcon />} onClick={handleFindDevice}>
                          Find
                        </Button>
                        <Button type="submit" variant="contained" startIcon={<CableIcon />}>
                          Connect
                        </Button>
                      </Stack>
                    </Box>
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
    </FiscalDeviceConnectionStyledCard>
  )
}

export default FiscalDeviceConnection;