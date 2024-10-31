/* eslint-disable react/display-name */
import { forwardRef, Fragment, useState, useEffect, useMemo } from 'react';
import { H3, Paragraph } from '../layout/typography-elements/TypographyElements';
import { TableVirtuoso } from 'react-virtuoso';
import { useFP } from '../../hooks/useFP';
import { useDispatch } from "react-redux";
import { toast } from 'react-toastify';
import { Formik } from "formik";
import { executeFPOperationWithLoading } from '../../utils/loadingUtils';
import { handleZFPLabServerError } from '../../utils/tremolLibraryUtils';
import {
  READING_STATUS_ENTRIES_LOADING_MESSAGE,
  VERSION_INFO_ALERT_DIALOG_TITLE,
  DATE_AND_TIME_INFO_ALERT_DIALOG_TITLE,
  PRINTING_DIAGNOSTICS_LOADING_MESSAGE,
  READING_GS_INFO_LOADING_MESSAGE,
  GS_INFO_ALERT_DIALOG_TITLE,
  SENDING_DIRECT_COMMAND_LOADING_MESSAGE,
  CLEAR_DIRECT_COMMAND_RESULT_TOOLTIP_TITLE,
  REQUIRED_DIRECT_COMMAND_INPUT_ERROR_MESSAGE
} from '../../utils/constants';
import * as Yup from "yup";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import PropTypes from 'prop-types';
import InfoAlertDialog from '../layout/info-alert-dialog/InfoAlertDialog';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import ClearIcon from '@mui/icons-material/Clear';
import Tremol from "../../assets/js/fp";

const STATUS_ENTRY_NAME_LABEL = "Name";

const STATUS_ENTRY_NAME_DATA_KEY = "statusEntryName";

const STATUS_ENTRY_VALUE_LABEL = "Status";

const STATUS_ENTRY_VALUE_DATA_KEY = "statusEntryValue";

const statusEntriesColumns = [
  {
    width: 80,
    label: STATUS_ENTRY_NAME_LABEL,
    dataKey: STATUS_ENTRY_NAME_DATA_KEY,
  },
  {
    width: 30,
    label: STATUS_ENTRY_VALUE_LABEL,
    dataKey: STATUS_ENTRY_VALUE_DATA_KEY,
  }
];

const StatusEntriesVirtuosoTableComponents = {
  Scroller: forwardRef((props, ref) => (
    <TableContainer component={Paper} {...props} ref={ref} />
  )),
  Table: (props) => (
    <Table {...props} sx={{ borderCollapse: 'separate', tableLayout: 'fixed' }} />
  ),
  TableHead: forwardRef((props, ref) => <TableHead {...props} ref={ref} />),
  TableRow,
  TableBody: forwardRef((props, ref) => <TableBody {...props} ref={ref} />),
};

const getFixedStatusEntriesHeaderContent = () => {
  return (
    <TableRow>
      {statusEntriesColumns.map((statusEntryColumn) => (
        <TableCell
          key={statusEntryColumn.dataKey}
          variant="head"
          align="left"
          style={{ width: statusEntryColumn.width }}
          sx={{ backgroundColor: 'background.paper' }}
        >
          {statusEntryColumn.label}
        </TableCell>
      ))}
    </TableRow>
  );
}

const statusEntriesRowContent = (_index, statusEntryRow) => {
  return (
    <Fragment>
      {statusEntriesColumns.map((statusEntryColumn) => (
        <TableCell key={statusEntryColumn.dataKey} align="left">
          {statusEntryColumn.dataKey === STATUS_ENTRY_VALUE_DATA_KEY ? (
            statusEntryRow[statusEntryColumn.dataKey]
              ? <EmojiObjectsIcon style={{ fill: 'orange' }} />
              : <EmojiObjectsIcon style={{ fill: 'grey' }} />
          ) : (
            statusEntryRow[statusEntryColumn.dataKey]
          )}
        </TableCell>
      ))}
    </Fragment>
  );
}

const StatusEntriesFilterBar = ({
  statusEntriesSearchTermForFiltering,
  onStatusEntriesSearch,
  statusEntriesToToggle,
  onToggleStatusEntriesFilterChange
}) => {
  const [statusEntriesSearchTerm, setStatusEntriesSearchTerm] = useState(statusEntriesSearchTermForFiltering);
  const [checkedOnOrOffStatusEntries, setCheckedOnOrOffStatusEntries] = useState(statusEntriesToToggle);

  const handleStatusEntriesSearch = (changeEvent) => {
    const enteredSearchTerm = changeEvent.target.value;
    setStatusEntriesSearchTerm(enteredSearchTerm);
    onStatusEntriesSearch(enteredSearchTerm);
  }

  const handleOnOrOffCheckedStatusEntriesChange = (changeEvent) => {
    const mergedOnOrOffStatusEntries = {
      ...checkedOnOrOffStatusEntries,
      [changeEvent.target.name]: changeEvent.target.checked
    }

    setCheckedOnOrOffStatusEntries(mergedOnOrOffStatusEntries);
    onToggleStatusEntriesFilterChange(mergedOnOrOffStatusEntries);
  };

  const { onStatusEntries, offStatusEntries } = checkedOnOrOffStatusEntries;

  useEffect(() => {
    setStatusEntriesSearchTerm(statusEntriesSearchTermForFiltering);
    setCheckedOnOrOffStatusEntries(statusEntriesToToggle);
  }, [statusEntriesSearchTermForFiltering, statusEntriesToToggle]);

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: { xs: 'column', sm: 'row' },
      width: '100%',
      gap: 2,
      mb: 2
    }}>
      <TextField
        type="text"
        placeholder="Search for status entry..."
        variant="outlined"
        size="small"
        value={statusEntriesSearchTerm}
        onChange={handleStatusEntriesSearch}
        sx={{ flexGrow: { xs: 0, lg: 1 } }}
      />
      <FormGroup row>
        <FormControlLabel
          control={
            <Checkbox
              name="onStatusEntries"
              checked={onStatusEntries}
              onChange={handleOnOrOffCheckedStatusEntriesChange}
            />
          }
          label="On"
        />
        <FormControlLabel
          control={
            <Checkbox
              name="offStatusEntries"
              checked={offStatusEntries}
              onChange={handleOnOrOffCheckedStatusEntriesChange}
            />
          }
          label="Off"
        />
      </FormGroup>
    </Box>
  )
}

StatusEntriesFilterBar.propTypes = {
  statusEntriesSearchTermForFiltering: PropTypes.string,
  onStatusEntriesSearch: PropTypes.func.isRequired,
  statusEntriesToToggle: PropTypes.object,
  onToggleStatusEntriesFilterChange: PropTypes.func
};

const FiscalDeviceInformation = () => {
  const [isFiscalDeviceInformationAlertDialogOpen, setIsFiscalDeviceInformationAlertDialogOpen] = useState(false);
  const [fiscalDeviceInformationAlertDialogTitle, setFiscalDeviceInformationAlertDialogTitle] = useState('');
  const [fiscalDeviceInformationAlertDialogContent, setFiscalDeviceInformationAlertDialogContent] = useState('');
  const [statusEntriesToFill, setStatusEntriesToFill] = useState([]);
  const [statusEntriesSearchTermForFiltering, setStatusEntriesSearchTermForFiltering] = useState('');
  const [statusEntriesToToggle, setStatusEntriesToToggle] = useState({ onStatusEntries: true, offStatusEntries: true });
  const dispatch = useDispatch();
  const fp = useFP();

  const directCommandInitialFormValues = {
    directCommandInput: "",
    directCommandResult: ""
  };

  const directCommandValidationSchema = Yup.object().shape({
    directCommandInput: Yup.string().required(REQUIRED_DIRECT_COMMAND_INPUT_ERROR_MESSAGE)
  });

  const handleReadStatusEntries = async () => {
    await executeFPOperationWithLoading(dispatch, async () => {
      try {
        if (statusEntriesSearchTermForFiltering !== '') {
          setStatusEntriesSearchTermForFiltering('');
        }

        if (!statusEntriesToToggle.onStatusEntries || !statusEntriesToToggle.offStatusEntries) {
          setStatusEntriesToToggle({ onStatusEntries: true, offStatusEntries: true });
        }

        const readStatusEntries = fp.ReadStatus();

        const mappedStatusEntries = Object.entries(readStatusEntries).map(([key, value]) => ({
          statusEntryName: key.replaceAll("_", " "),
          statusEntryValue: value
        }));

        setStatusEntriesToFill(mappedStatusEntries);
      } catch (error) {
        toast.error(handleZFPLabServerError(error));
      }
    }, READING_STATUS_ENTRIES_LOADING_MESSAGE);
  }

  const handlePrintDiagnosticsClick = async () => {
    await executeFPOperationWithLoading(dispatch, async () => {
      try {
        await fp.PrintDiagnostics();
      } catch (error) {
        toast.error(handleZFPLabServerError(error));
      }
    }, PRINTING_DIAGNOSTICS_LOADING_MESSAGE);
  }

  const handleReadVersionClick = async () => {
    try {
      const version = await fp.ReadVersion().Version;
      handleFiscalDeviceInformationAlertDialogOpen(VERSION_INFO_ALERT_DIALOG_TITLE, version);
    } catch (error) {
      toast.error(handleZFPLabServerError(error));
    }
  }

  const handleReadDateTimeClick = async () => {
    try {
      const readDateTime = await fp.ReadDateTime();
      const formattedDateTime = readDateTime.toStringWithFormat("dd.MM.yyyy hh:mm");
      handleFiscalDeviceInformationAlertDialogOpen(DATE_AND_TIME_INFO_ALERT_DIALOG_TITLE, formattedDateTime);
    } catch (error) {
      toast.error(handleZFPLabServerError(error));
    }
  }

  const handleReadGSInfoClick = async () => {
    await executeFPOperationWithLoading(dispatch, async () => {
      try {
        await fp.RawWrite(new Uint8Array([0x1d, 0x49]));
        const inputBytes = new Uint8Array([0x0a]);
        const decodedBytes = new TextDecoder().decode(inputBytes);
        const rawReadBytes = fp.RawRead(0, decodedBytes);
        const windows1252Decoder = new TextDecoder('windows-1252');
        const gsInfoDecodedBytes = windows1252Decoder.decode(new Uint8Array([...rawReadBytes]));
        const gsInfoArray = gsInfoDecodedBytes.toString().split(';');

        let gsInfoAlertContent;

        const printableCharacersPerLine = gsInfoArray[0].slice(1);
        const articlesNumber = gsInfoArray[1];
        const departmentsNumber = gsInfoArray[2];
        const operatorsNumber = gsInfoArray[3];
        const vatGroupsNumber = gsInfoArray[4];
        const headerAndFooterLines = gsInfoArray[5];
        const paymentsNumber = gsInfoArray[6];
        const logosNumber = gsInfoArray[7];
        const receiptTransactionNumber = gsInfoArray[9];
        const clientsNumber = gsInfoArray[10].trim();

        gsInfoAlertContent =
          `Printable characters per line: ${printableCharacersPerLine}\n` +
          `Articles number: ${articlesNumber}\n` +
          `Departments number: ${departmentsNumber}\n` +
          `Operators number: ${operatorsNumber}\n` +
          `VAT groups number: ${vatGroupsNumber}\n` +
          `Header/Footer lines: ${headerAndFooterLines}\n` +
          `Payments number: ${paymentsNumber}\n` +
          `Logos number: ${logosNumber}\n` +
          `Receipt transaction number: ${receiptTransactionNumber}\n` +
          `Clients number: ${clientsNumber}\n`;

        handleFiscalDeviceInformationAlertDialogOpen(GS_INFO_ALERT_DIALOG_TITLE, gsInfoAlertContent);
      } catch (error) {
        toast.error(handleZFPLabServerError(error));
      }
    }, READING_GS_INFO_LOADING_MESSAGE);
  }

  const handleFiscalDeviceInformationAlertDialogOpen = (infoAlertDialogTitle, infoAlertDialogContent) => {
    setFiscalDeviceInformationAlertDialogTitle(infoAlertDialogTitle);
    setFiscalDeviceInformationAlertDialogContent(infoAlertDialogContent);
    setIsFiscalDeviceInformationAlertDialogOpen(true);
  }

  const handleFiscalDeviceInformationAlertDialogClose = () => {
    setIsFiscalDeviceInformationAlertDialogOpen(false);
  }

  const handleDirectCommandFormSubmit = async (directCommandFormData, { setFieldValue, setSubmitting }) => {
    await executeFPOperationWithLoading(dispatch, async () => {
      try {
        if (directCommandFormData.directCommandResult.trim() !== '') {
          setFieldValue("directCommandResult", '');
        }

        const directCommandResult = await fp.DirectCommand(directCommandFormData.directCommandInput);
        console.log(directCommandResult);

        setFieldValue("directCommandResult", directCommandResult);
      } catch (error) {
        toast.error(handleZFPLabServerError(error));
      } finally {
        setSubmitting(false);
      }
    }, SENDING_DIRECT_COMMAND_LOADING_MESSAGE);
  }

  const clearDirectCommandResult = (setFieldValue) => {
    setFieldValue("directCommandResult", '');
  }

  const filteredStatusEntries = useMemo(() => {
    return statusEntriesToFill.filter((x) => {
      const matchesStatusEntrySearchTerm = x.statusEntryName.toLowerCase().includes(statusEntriesSearchTermForFiltering.toLowerCase());
      const showAllStatusEntries = (statusEntriesToToggle.onStatusEntries && statusEntriesToToggle.offStatusEntries) ||
        (!statusEntriesToToggle.onStatusEntries && !statusEntriesToToggle.offStatusEntries);
      const matchesStatusEntriesToggle = showAllStatusEntries ||
        (statusEntriesToToggle.onStatusEntries && x.statusEntryValue) ||
        (statusEntriesToToggle.offStatusEntries && !x.statusEntryValue);
      return matchesStatusEntrySearchTerm && matchesStatusEntriesToggle;
    });
  }, [statusEntriesToFill, statusEntriesSearchTermForFiltering, statusEntriesToToggle]);

  useEffect(() => {
    handleReadStatusEntries();
  }, []);

  return (
    <>
      <Box sx={{ width: '100%', height: '100%', px: 2 }}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, lg: 2 }}>
            <Card>
              <CardContent>
                <H3 sx={{ color: 'text.secondary' }}>
                  Information
                </H3>
                <Stack spacing={2} sx={{ mt: 3 }}>
                  <Button size="medium" variant="contained" sx={{ width: '100%' }} onClick={handleReadStatusEntries}>
                    Read Status
                  </Button>
                  <Button size="medium" variant="contained" sx={{ width: '100%' }} onClick={handlePrintDiagnosticsClick}>
                    Diagnostics
                  </Button>
                  <Button size="medium" variant="contained" sx={{ width: '100%' }} onClick={handleReadVersionClick}>
                    Version
                  </Button>
                  <Button size="medium" variant="contained" sx={{ width: '100%' }} onClick={handleReadDateTimeClick}>
                    Date / Time
                  </Button>
                  <Button size="medium" variant="contained" sx={{ width: '100%' }} onClick={handleReadGSInfoClick}>
                    GS Info
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, lg: 5 }}>
            <StatusEntriesFilterBar
              statusEntriesSearchTermForFiltering={statusEntriesSearchTermForFiltering}
              onStatusEntriesSearch={setStatusEntriesSearchTermForFiltering}
              statusEntriesToToggle={statusEntriesToToggle}
              onToggleStatusEntriesFilterChange={setStatusEntriesToToggle}
            />
            {filteredStatusEntries.length === 0 ? (
              <H3 sx={{ color: 'text.secondary' }}>
                No status entries results found
              </H3>
            ) : (
              <Paper style={{ height: '600px', width: '100%' }}>
                <TableVirtuoso
                  data={filteredStatusEntries}
                  components={StatusEntriesVirtuosoTableComponents}
                  fixedHeaderContent={getFixedStatusEntriesHeaderContent}
                  itemContent={statusEntriesRowContent}
                />
              </Paper>
            )}
          </Grid>
          <Grid size={{ xs: 12, lg: 4 }}>
            <Card>
              <CardContent>
                <H3 sx={{ color: 'text.secondary' }}>
                  Direct Commands Sending
                </H3>
                <Box sx={{ display: 'flex', mt: 2 }}>
                  <Formik
                    initialValues={directCommandInitialFormValues}
                    validationSchema={directCommandValidationSchema}
                    onSubmit={handleDirectCommandFormSubmit}
                  >
                    {({
                      values,
                      errors,
                      touched,
                      setFieldValue,
                      handleChange,
                      handleBlur,
                      handleSubmit
                    }) => {
                      return (
                        <form onSubmit={handleSubmit}>
                          <Grid container spacing={2}>
                            <Grid size={{ xs: 12, lg: 6 }}>
                              <TextField
                                label="Direct Command"
                                fullWidth
                                size="small"
                                type="text"
                                name="directCommandInput"
                                variant="outlined"
                                onBlur={handleBlur}
                                value={values.directCommandInput}
                                onChange={handleChange}
                                helperText={touched.directCommandInput && errors.directCommandInput}
                                error={Boolean(touched.directCommandInput && errors.directCommandInput)}
                              />
                            </Grid>
                            <Grid size={{ xs: 12, lg: 6 }}>
                              <Stack direction="row" spacing={1}>
                                <Button type="submit" size="medium" variant="contained" sx={{ width: '100%' }}>Send</Button>
                                <Tooltip title={<Paragraph>{CLEAR_DIRECT_COMMAND_RESULT_TOOLTIP_TITLE}</Paragraph>}>
                                  <IconButton 
                                    aria-label={CLEAR_DIRECT_COMMAND_RESULT_TOOLTIP_TITLE} 
                                    onClick={() => clearDirectCommandResult(setFieldValue)}>
                                    <ClearIcon />
                                  </IconButton>
                                </Tooltip>
                              </Stack>
                            </Grid>
                            <Grid size={{ xs: 12 }}>
                              <TextField
                                fullWidth
                                size="small"
                                type="text"
                                name="directCommandResult"
                                variant="outlined"
                                multiline
                                rows={4}
                                onBlur={handleBlur}
                                value={values.directCommandResult}
                                onChange={handleChange}
                                helperText={touched.directCommandResult && errors.directCommandResult}
                                error={Boolean(touched.directCommandResult && errors.directCommandResult)}
                                sx={{ width: '100%' }}
                              />
                            </Grid>
                          </Grid>
                        </form>
                      )
                    }}
                  </Formik>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <InfoAlertDialog
          isInfoAlertDialogOpen={isFiscalDeviceInformationAlertDialogOpen}
          onInfoAlertDialogClose={handleFiscalDeviceInformationAlertDialogClose}
          infoAlertDialogTitle={fiscalDeviceInformationAlertDialogTitle}
          infoAlertDialogContent={fiscalDeviceInformationAlertDialogContent}
        />
      </Box>
    </>
  );
}

export default FiscalDeviceInformation;