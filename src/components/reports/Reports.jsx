import { useState, useRef } from "react";
import { Formik } from "formik";
import { H3 } from '../layout/typography-elements/TypographyElements';
import { useDispatch } from "react-redux";
import { useFP } from '../../hooks/useFP';
import { toast } from 'react-toastify';
import { executeFPOperationWithLoading } from "../../utils/loadingUtils";
import { handleZFPLabServerError } from "../../utils/tremolLibraryUtils";
import { isNullOrWhitespace } from "../../utils/helperFunctions";
import {
  PRINT_DAILY_X_REPORT_LOADING_MESSAGE,
  PRINT_DAILY_Z_REPORT_LOADING_MESSAGE,
  READING_ELECTRONIC_JOURNAL_REPORT_BY_Z_REPORT_NUMBERS_LOADING_MESSAGE,
  REQUIRED_ELECTRONIC_JOURNAL_REPORT_STARTING_Z_REPORT_NUMBER_ERROR_MESSAGE,
  ELECTRONIC_JOURNAL_REPORT_STARTING_Z_REPORT_NUMBER_NOT_A_NUMBER_ERROR_MESSAGE,
  ELECTRONIC_JOURNAL_REPORT_STARTING_Z_REPORT_NUMBER_MAX_LENGTH_ERROR_MESSAGE,
  REQUIRED_ELECTRONIC_JOURNAL_REPORT_ENDING_Z_REPORT_NUMBER_ERROR_MESSAGE,
  ELECTRONIC_JOURNAL_REPORT_ENDING_Z_REPORT_NUMBER_NOT_A_NUMBER_ERROR_MESSAGE,
  ELECTRONIC_JOURNAL_REPORT_ENDING_Z_REPORT_NUMBER_MAX_LENGTH_ERROR_MESSAGE,
  ELECTRONIC_JOUNRAL_REPORT_STARTING_Z_REPORT_NUMBER_NOT_POSITIVE_ERROR_MESSAGE,
  ELECTRONIC_JOUNRAL_REPORT_ENDING_Z_REPORT_NUMBER_NOT_POSITIVE_ERROR_MESSAGE,
  ELECTRONIC_JOURNAl_REPORT_STARTING_Z_REPORT_NUMBER_GREATER_THAN_ENDING_NUMBER_ERROR_MESSAGE,
  NO_REPORT_CONTENT_ERROR_MESSAGE
} from '../../utils/constants';
import * as Yup from "yup";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import DraggableDetailsDialog from "../layout/draggable-details-dialog/DraggableDetailsDialog";
import Tremol from "../../assets/js/fp";

const Reports = () => {
  const [isReadElectronicJournalReportDraggableDialogOpen, setIsReadElectronicJournalReportDraggableDialogOpen] = useState(false);
  const [readElectronicJournalReportDraggableDialogTitle, setReadElectronicJournalReportDraggableDialogTitle] = useState('');
  const [readElectronicJournalReportDraggableDialogContent, setReadElectronicJournalReportDraggableDialogContent] = useState('');
  const dispatch = useDispatch();
  const fp = useFP();

  const electronicJournalReportByZReportNumbersInitialFormValues = {
    startingZReportNumber: "",
    endingZReportNumber: ""
  }

  const electronicJournalReportByZReportNumbersValidationSchema = Yup.object().shape({
    startingZReportNumber: Yup
      .number()
      .required(REQUIRED_ELECTRONIC_JOURNAL_REPORT_STARTING_Z_REPORT_NUMBER_ERROR_MESSAGE)
      .typeError(ELECTRONIC_JOURNAL_REPORT_STARTING_Z_REPORT_NUMBER_NOT_A_NUMBER_ERROR_MESSAGE)
      .positive(ELECTRONIC_JOUNRAL_REPORT_STARTING_Z_REPORT_NUMBER_NOT_POSITIVE_ERROR_MESSAGE)
      .test("startingZReportNumberLength", ELECTRONIC_JOURNAL_REPORT_STARTING_Z_REPORT_NUMBER_MAX_LENGTH_ERROR_MESSAGE, value => value && value.toString().length <= 4),
    endingZReportNumber: Yup
      .number()
      .required(REQUIRED_ELECTRONIC_JOURNAL_REPORT_ENDING_Z_REPORT_NUMBER_ERROR_MESSAGE)
      .typeError(ELECTRONIC_JOURNAL_REPORT_ENDING_Z_REPORT_NUMBER_NOT_A_NUMBER_ERROR_MESSAGE)
      .positive(ELECTRONIC_JOUNRAL_REPORT_ENDING_Z_REPORT_NUMBER_NOT_POSITIVE_ERROR_MESSAGE)
      .test("endingZReportNumberLength", ELECTRONIC_JOURNAL_REPORT_ENDING_Z_REPORT_NUMBER_MAX_LENGTH_ERROR_MESSAGE, value => value && value.toString().length <= 4),
  })

  const handlePrintDailyXReportClick = async () => {
    await executeFPOperationWithLoading(dispatch, async () => {
      try {
        await fp.PrintDailyReport(Tremol.Enums.OptionZeroing.Without_zeroing);
      } catch (error) {
        toast.error(handleZFPLabServerError(error));
      }
    }, PRINT_DAILY_X_REPORT_LOADING_MESSAGE)
  }

  const handlePrintDailyZReportClick = async () => {
    await executeFPOperationWithLoading(dispatch, async () => {
      try {
        await fp.PrintDailyReport(Tremol.Enums.OptionZeroing.Zeroing);
      } catch (error) {
        toast.error(handleZFPLabServerError(error));
      }
    }, PRINT_DAILY_Z_REPORT_LOADING_MESSAGE)
  }

  const handleReadElectronicJournalReportByZReportNumbers = async ({ startingZReportNumber, endingZReportNumber }, { setSubmitting }) => {
    if (Number(startingZReportNumber) > Number(endingZReportNumber)) {
      toast.error(ELECTRONIC_JOURNAl_REPORT_STARTING_Z_REPORT_NUMBER_GREATER_THAN_ENDING_NUMBER_ERROR_MESSAGE);
      return;
    }

    await executeFPOperationWithLoading(dispatch, async () => {
      try {
        await fp.ReadEJByZBlocks(Number(startingZReportNumber), Number(endingZReportNumber));
        const electronicJournalReportByZReportNumbersContent = await rawReadAndFormatBytesToString();

        if (!isNullOrWhitespace(electronicJournalReportByZReportNumbersContent)) {
          handleReadReportDraggableDialogOpen(
            `EJ Report By Z Report Numbers (${startingZReportNumber}, ${endingZReportNumber})`,
            electronicJournalReportByZReportNumbersContent
          );
        } else {
          toast.error(NO_REPORT_CONTENT_ERROR_MESSAGE);
        }
      } catch (error) {
        toast.error(handleZFPLabServerError(error));
      } finally {
        setSubmitting(false);
      }
    }, READING_ELECTRONIC_JOURNAL_REPORT_BY_Z_REPORT_NUMBERS_LOADING_MESSAGE);
  }

  const rawReadAndFormatBytesToString = async () => {
    try {
      const rawReadBytes = await fp.RawRead(0, "@");
      const decodedLines = new TextDecoder("windows-1252").decode(rawReadBytes).split("\n");

      let formattedResultString = "";

      for (let i = 0; i < decodedLines.length - 1; i++) {
        if (decodedLines[i] === "@") {
          continue;
        }

        let currentLineToProcess = decodedLines[i].slice(4, -2).replace(/\x7f/g, '.');

        formattedResultString += currentLineToProcess + "\r\n";
      }

      return formattedResultString;
    } catch (error) {
      toast.error(handleZFPLabServerError(error));
      return null;
    }
  }

  const handleReadReportDraggableDialogOpen = (draggableDialogTitle, draggableDialogContent) => {
    setReadElectronicJournalReportDraggableDialogTitle(draggableDialogTitle);
    setReadElectronicJournalReportDraggableDialogContent(draggableDialogContent);
    setIsReadElectronicJournalReportDraggableDialogOpen(true);
  }

  const handleReadReportDraggableDialogClose = () => {
    setIsReadElectronicJournalReportDraggableDialogOpen(false);
  }

  return (
    <Box sx={{ width: '100%', height: '100%', px: 2 }}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, lg: 3 }}>
          <Card>
            <CardContent>
              <H3 sx={{ color: 'text.secondary' }}>
                Reports
              </H3>
              <Stack spacing={2} sx={{ mt: 3 }}>
                <Button
                  size="medium"
                  variant="contained"
                  sx={{ width: '100%' }}
                  onClick={handlePrintDailyXReportClick}
                >
                  Daily X Report
                </Button>
                <Button
                  size="medium"
                  variant="contained"
                  sx={{ width: '100%' }}
                  onClick={handlePrintDailyZReportClick}
                >
                  Daily Z Report
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, lg: 3 }}>
          <Card>
            <CardContent>
              <H3 sx={{ color: 'text.secondary' }}>
                EJ Report By Z Report Numbers
              </H3>
              <Formik
                initialValues={electronicJournalReportByZReportNumbersInitialFormValues}
                validationSchema={electronicJournalReportByZReportNumbersValidationSchema}
                onSubmit={handleReadElectronicJournalReportByZReportNumbers}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit
                }) => {
                  return (
                    <form onSubmit={handleSubmit}>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
                        <TextField
                          label="Starting Number"
                          fullWidth
                          size="small"
                          type="text"
                          name="startingZReportNumber"
                          variant="outlined"
                          onBlur={handleBlur}
                          value={values.startingZReportNumber}
                          onChange={handleChange}
                          helperText={touched.startingZReportNumber && errors.startingZReportNumber}
                          error={Boolean(touched.startingZReportNumber && errors.startingZReportNumber)}
                        />
                        <TextField
                          label="Ending Number"
                          fullWidth
                          size="small"
                          type="text"
                          name="endingZReportNumber"
                          variant="outlined"
                          onBlur={handleBlur}
                          value={values.endingZReportNumber}
                          onChange={handleChange}
                          helperText={touched.endingZReportNumber && errors.endingZReportNumber}
                          error={Boolean(touched.endingZReportNumber && errors.endingZReportNumber)}
                        />
                        <Button type="submit" size="medium" variant="contained" sx={{ width: '100%' }}>
                          Read
                        </Button>
                      </Box>
                    </form>
                  )
                }}
              </Formik>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <DraggableDetailsDialog
        isDraggableDialogOpen={isReadElectronicJournalReportDraggableDialogOpen}
        onDraggableDialogClose={handleReadReportDraggableDialogClose}
        draggableDialogTitle={readElectronicJournalReportDraggableDialogTitle}
        draggableDialogContent={readElectronicJournalReportDraggableDialogContent} 
      />
    </Box>
  )
}

export default Reports;