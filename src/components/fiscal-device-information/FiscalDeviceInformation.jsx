/* eslint-disable react/display-name */
import { forwardRef, Fragment, useState, useEffect, useMemo } from 'react';
import { H3 } from '../layout/typography-elements/TypographyElements';
import { TableVirtuoso } from 'react-virtuoso';
import { useFP } from '../../hooks/useFP';
import { useDispatch } from "react-redux";
import { toast } from 'react-toastify';
import { executeFPOperationWithLoading } from '../../utils/loadingUtils';
import { handleZFPLabServerError } from '../../utils/tremolLibraryUtils';
import { 
  READING_STATUS_ENTRIES_LOADING_MESSAGE, 
  VERSION_DRAGGABLE_DIALOG_TITLE,
  DATE_AND_TIME_DRAGGABLE_DIALOG_TITLE,
  PRINTING_DIAGNOSTICS_LOADING_MESSAGE 
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
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import DraggableDetailsDialog from '../layout/draggable-details-dialog/DraggableDetailsDialog';
import PropTypes from 'prop-types';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
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
        sx={{ flexGrow: { xs: 0, lg: 0.3 } }}
      />
      <FormGroup row>
        <FormControlLabel
          control={
            <Checkbox name="onStatusEntries" checked={onStatusEntries} onChange={handleOnOrOffCheckedStatusEntriesChange} />
          }
          label="On"
        />
        <FormControlLabel
          control={
            <Checkbox name="offStatusEntries" checked={offStatusEntries} onChange={handleOnOrOffCheckedStatusEntriesChange} />
          }
          label="Off"
        />
      </FormGroup>
    </Box>
  )
}

StatusEntriesFilterBar.propTypes = {
  statusEntriesSearchTerm: PropTypes.string,
  onStatusEntriesSearch: PropTypes.func.isRequired,
  statusEntriesToToggle: PropTypes.object,
  onToggleStatusEntriesFilterChange: PropTypes.func
};

const FiscalDeviceInformation = () => {
  const [isFiscalDeviceInformationDraggableDialogOpen, setIsFiscalDeviceInformationDraggableDialogOpen] = useState(false);
  const [fiscalDeviceInformationDraggableDialogTitle, setFiscalDeviceInformationDraggableDialogTitle] = useState('');
  const [fiscalDeviceInformationDraggableDialogContent, setFiscalDeviceInformationDraggableDialogContent] = useState('');
  const [statusEntriesToFill, setStatusEntriesToFill] = useState([]);
  const [statusEntriesSearchTermForFiltering, setStatusEntriesSearchTermForFiltering] = useState('');
  const [statusEntriesToToggle, setStatusEntriesToToggle] = useState({ onStatusEntries: true, offStatusEntries: true });
  const dispatch = useDispatch();
  const fp = useFP();

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

  const handleReadVersionClick = async () => {
    try {
      const version = await fp.ReadVersion().Version;
      handleFiscalDeviceInformationDraggableDialogOpen(VERSION_DRAGGABLE_DIALOG_TITLE, version);
    } catch (error) {
      toast.error(handleZFPLabServerError(error));
    }
  }

  const handleReadDateTimeClick = async () => {
    try {
      const readDateTime = await fp.ReadDateTime();
      const formattedDateTime = readDateTime.toStringWithFormat("dd.MM.yyyy hh:mm");
      handleFiscalDeviceInformationDraggableDialogOpen(DATE_AND_TIME_DRAGGABLE_DIALOG_TITLE, formattedDateTime);
    } catch (error) {
      toast.error(handleZFPLabServerError(error));
    }
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

  const handleFiscalDeviceInformationDraggableDialogOpen = (draggableDialogTitle, draggableDialogContent) => {
    setFiscalDeviceInformationDraggableDialogTitle(draggableDialogTitle);
    setFiscalDeviceInformationDraggableDialogContent(draggableDialogContent);
    setIsFiscalDeviceInformationDraggableDialogOpen(true);
  }

  const handleFiscalDeviceInformationDraggableDialogClose = () => {
    setIsFiscalDeviceInformationDraggableDialogOpen(false);
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
          <Grid size={{ xs: 12, lg: 3 }}>
            <Card>
              <CardContent>
                <H3 sx={{ color: 'text.secondary' }}>
                  Information
                </H3>
                <Stack spacing={2} sx={{ mt: 3 }}>
                  <Button size="medium" variant="contained" sx={{ width: '100%' }} onClick={handleReadStatusEntries}>
                    Read Status
                  </Button>
                  <Button size="medium" variant="contained" sx={{ width: '100%' }} onClick={handleReadVersionClick}>
                    Version
                  </Button>
                  <Button size="medium" variant="contained" sx={{ width: '100%' }} onClick={handleReadDateTimeClick}>
                    Date / Time
                  </Button>
                  <Button size="medium" variant="contained" sx={{ width: '100%' }} onClick={handlePrintDiagnosticsClick}>
                    Diagnostics
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
        </Grid>
        <DraggableDetailsDialog
          isDraggableDialogOpen={isFiscalDeviceInformationDraggableDialogOpen}
          onDraggableDialogClose={handleFiscalDeviceInformationDraggableDialogClose}
          draggableDialogTitle={fiscalDeviceInformationDraggableDialogTitle}
          draggableDialogContent={fiscalDeviceInformationDraggableDialogContent}
        />
      </Box>
    </>
  );
}

export default FiscalDeviceInformation;