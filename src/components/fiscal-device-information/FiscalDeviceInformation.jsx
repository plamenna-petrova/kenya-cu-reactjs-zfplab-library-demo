/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/display-name */
import { forwardRef, Fragment, useState, useEffect, useMemo } from 'react';
import { H3 } from '../layout/typography-elements/TypographyElements';
import { TableVirtuoso } from 'react-virtuoso';
import { useFP } from '../../hooks/useFP';
import { useDispatch } from "react-redux";
import { toast } from 'react-toastify';
import { executeFPOperationWithLoading } from '../../utils/loadingUtils';
import { handleZFPLabServerError } from '../../utils/tremolLibraryUtils';
import { isNullOrWhitespace } from '../../utils/helperFunctions';
import { openCreditNoteWithFreeCustomerData, openCreditNoteWithFreeCustomerDataManually } from '../../api/direct-api-requests-xhr';
import {
  READING_STATUS_ENTRIES_LOADING_MESSAGE,
  VERSION_INFO_ALERT_DIALOG_TITLE,
  DATE_AND_TIME_INFO_ALERT_DIALOG_TITLE,
  PRINTING_DIAGNOSTICS_LOADING_MESSAGE,
  READING_GS_INFO_LOADING_MESSAGE,
  GS_INFO_ALERT_DIALOG_TITLE,
  LIBRARY_INFORMATION_ALERT_DIALOG_TITLE
} from '../../utils/constants';
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
import useMediaQuery from '@mui/material/useMediaQuery';
import InfoAlertDialog from '../layout/info-alert-dialog/InfoAlertDialog';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import StatusEntriesFilterBar from './status-entries-filter-bar/StatusEntriesFilterBar';
import DirectCommands from './direct-commands/DirectCommands';
// eslint-disable-next-line no-unused-vars
import Tremol from "../../assets/js/fp";
import { saveLog, openCreditNoteWithFreeCustomerDataWithArgsParsing } from '../../api/direct-api-requests-xhr';

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

const FiscalDeviceInformation = () => {
  const [isFiscalDeviceInformationAlertDialogOpen, setIsFiscalDeviceInformationAlertDialogOpen] = useState(false);
  const [fiscalDeviceInformationAlertDialogTitle, setFiscalDeviceInformationAlertDialogTitle] = useState('');
  const [fiscalDeviceInformationAlertDialogContent, setFiscalDeviceInformationAlertDialogContent] = useState('');
  const [statusEntriesToFill, setStatusEntriesToFill] = useState([]);
  const [statusEntriesSearchTermForFiltering, setStatusEntriesSearchTermForFiltering] = useState('');
  const [statusEntriesToToggle, setStatusEntriesToToggle] = useState({ onStatusEntries: true, offStatusEntries: true });
  const isDesktopScreen = useMediaQuery('(min-width:1200px)');
  const dispatch = useDispatch();
  const fp = useFP();

  /**
   * Reads status entries from the fiscal device and sets initial filters.
   * - Initiates an asynchronous operation with a loading indicator.
   * - Clears the search term for filtering if it’s currently set.
   * - Sets toggle options for status entries visibility, defaulting both to `on`.
   * - Retrieves and maps status entries into a format suitable for display.
   * - If an error occurs, shows an error toast with the error message.
   * 
   * @async
   * @function handleReadStatusEntries
   * @returns {Promise<void>} A promise that resolves once the operation completes.
   */
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

  /**
   * Prints fiscal device diagnostics.
   * - Initiates an asynchronous operation with a loading indicator.
   * - Executes the print diagnostics operation.
   * - If an error occurs, shows an error toast with the error message.
   * 
   * @async
   * @function handlePrintDiagnosticsClick
   * @returns {Promise<void>} A promise that resolves once the operation completes.
   */
  const handlePrintDiagnosticsClick = async () => {
    await executeFPOperationWithLoading(dispatch, async () => {
      try {
        await fp.PrintDiagnostics();
      } catch (error) {
        toast.error(handleZFPLabServerError(error));
      }
    }, PRINTING_DIAGNOSTICS_LOADING_MESSAGE);
  }

  /**
   * Reads the version of the fiscal device.
   * - Executes the read version operation.
   * - Displays the fiscal device version in an alert dialog.
   * - If an error occurs, shows an error toast with the error message.
   * 
   * @async
   * @function handleReadVersionClick
   * @returns {Promise<void>} A promise that resolves once the operation completes.
   */
  const handleReadVersionClick = async () => {
    try {
      const version = await fp.ReadVersion().Version;
      handleFiscalDeviceInformationAlertDialogOpen(VERSION_INFO_ALERT_DIALOG_TITLE, version);
    } catch (error) {
      toast.error(handleZFPLabServerError(error));
    }
  }

  /**
   * Reads the set date and time on the fiscal device
   * - Executes the read date and time operation
   * - Converts the read date and time into a specified format 
   * (see fp_core.js for more details on the used function: toStringWithFormat).
   * - Displays the formatted date and time in an alert dialog.
   * - If an error occurs, shows an error toast with the error message.
   * 
   * @async
   * @function handleReadDateTimeClick
   * @returns {Promise<void>} A promise that resolves once the operation completes.
   */
  const handleReadDateTimeClick = async () => {
    try {
      const readDateTime = await fp.ReadDateTime();
      const formattedDateTime = readDateTime.toStringWithFormat("dd.MM.yyyy hh:mm");
      handleFiscalDeviceInformationAlertDialogOpen(DATE_AND_TIME_INFO_ALERT_DIALOG_TITLE, formattedDateTime);
    } catch (error) {
      toast.error(handleZFPLabServerError(error));
    }
  }

  /**
   * Reads and displays information about special fiscal device parameters.
   * - Initiates an asynchronous operation with a loading indicator.
   * - Sends a raw write command to the fiscal device and reads the response in bytes.
   * - Decodes the bytes using `windows-1252` text encoding and splits the decoded string by `;`.
   * - Maps the decoded information to the specific parameters.
   * - Constructs a formatted string with details of each parameter and its value.
   * - Displays the parameters information in an alert dialog.
   * - If an error occurs, shows an error toast with the error message.
   * 
   * @async
   * @function handleReadGSInfoClick
   * @returns {Promise<void>} A promise that resolves once the operation completes.
   */
  const handleReadGSInfoClick = async () => {
    await executeFPOperationWithLoading(dispatch, async () => {
      try {
        await fp.RawWrite(new Uint8Array([0x1d, 0x49]));
        const inputBytes = new Uint8Array([0x0a]);
        const decodedBytes = new TextDecoder().decode(inputBytes);

        const rawReadBytes = fp.RawRead(0, decodedBytes);
        const windows1252Decoder = new TextDecoder('windows-1252');
        const gsInfoDecodedBytes = windows1252Decoder.decode(new Uint8Array([...rawReadBytes]));

        const gsInfoArray = gsInfoDecodedBytes
          .toString()
          .split(';')
          .map(str => str.trim())
          .map((y, index) => index === 0 ? parseInt(y.slice(1)) : !isNullOrWhitespace(y) ? parseInt(y) : '-');

        const printableCharacersPerLine = gsInfoArray[0];
        const articlesNumber = gsInfoArray[1];
        const departmentsNumber = gsInfoArray[2];
        const operatorsNumber = gsInfoArray[3];
        const vatGroupsNumber = gsInfoArray[4];
        const headerAndFooterLines = gsInfoArray[5];
        const paymentsNumber = gsInfoArray[6];
        const logosNumber = gsInfoArray[7];
        const receiptTransactionNumber = gsInfoArray[9];
        const clientsNumber = gsInfoArray[10].trim();

        const gsInfoAlertContent =
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

  /**
   * Retrieves and displays the core version and the library definitions.
   * - Gets the core version and the library definitions version.
   * - Constructs a formatted string with these details.
   * - Displays the information in an alert dialog.
   * - If an error occurs, shows an error toast with the error message.
   * 
   * @async
   * @function handleGetLibraryInformationClick
   * @returns {Promise<void>} A promise that resolves once the operation completes.
   */
  const handleGetLibraryInformationClick = async () => {
    try {
      const coreVersion = await fp.GetVersionCore();
      const libraryDefinitions = await fp.GetVersionDefinitions().toString();

      const libraryDefinitionsAlertContent =
        `Core Version: ${coreVersion}\n` +
        `Library Definitions: ${libraryDefinitions}`;

      handleFiscalDeviceInformationAlertDialogOpen(LIBRARY_INFORMATION_ALERT_DIALOG_TITLE, libraryDefinitionsAlertContent);
    } catch (error) {
      handleZFPLabServerError(error);
    }
  }

  const handleSaveLogToATXTFileClick = () => {
    try {
      saveLog();
    } catch (error) {
      toast.error(handleZFPLabServerError(error));
    }
  }

  const handleOpenCreditNoteTestClick = async () => {
    try {
      // await openCreditNoteWithFreeCustomerDataWithArgsParsing("Tremol Ltd.", null, null, "Toledo Street", "5000, Veliko Tarnovo", null, "0080003220000045779", null);
      // await fp.OpenCreditNoteWithFreeCustomerData("Tremol Ltd.", null, null, "Toledo Street", "5000, Veliko Tarnovo", null, "0080003220000045779", null);
      await openCreditNoteWithFreeCustomerDataManually("Tremol Ltd.", null, null, "Toledo Street", "5000, Veliko Tarnovo", null, "0080003220000045780", null);
    } catch (error) {
      toast.error(handleZFPLabServerError(error));
    }
  }

  const handleFiscalDeviceInformationAlertDialogOpen = (infoAlertDialogTitle, infoAlertDialogContent) => {
    setFiscalDeviceInformationAlertDialogTitle(infoAlertDialogTitle);
    setFiscalDeviceInformationAlertDialogContent(infoAlertDialogContent);
    setIsFiscalDeviceInformationAlertDialogOpen(true);
  }

  const handleFiscalDeviceInformationAlertDialogClose = () => {
    setIsFiscalDeviceInformationAlertDialogOpen(false);
  }

  /*
    Filters status entries based on the populated status entries, the search term, 
    and toggle options for status entries visibility.
    - When both toggle options are either true or false, all status entries are shown.
    - Otherwise, status entries are filtered based on the true/false value and the toggle settings.
    - The filter considers status entries that match the search term and satisfy the toggle options.
  */
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
        <Grid container spacing={3} sx={{ pb: !isDesktopScreen ? 2 : 0 }}>
          <Grid size={{ xs: 12, lg: 3 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
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
                    <Button size="medium" variant="contained" sx={{ width: '100%' }} onClick={handleGetLibraryInformationClick}>
                      Library Definitions
                    </Button>
                    <Button size="medium" variant="contained" sx={{ width: '100%' }} onClick={handleSaveLogToATXTFileClick}>
                      Save Log File
                    </Button>
                    <Button size="medium" variant="contained" sx={{ width: '100%' }} onClick={handleOpenCreditNoteTestClick}>
                      Open Credit Note Test
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
              <DirectCommands />
            </Box>
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