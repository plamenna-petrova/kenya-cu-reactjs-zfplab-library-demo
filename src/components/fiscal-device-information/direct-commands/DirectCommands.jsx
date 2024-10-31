import { Formik } from "formik";
import { H3, Paragraph } from '../../layout/typography-elements/TypographyElements';
import {
  SENDING_DIRECT_COMMAND_LOADING_MESSAGE,
  CLEAR_DIRECT_COMMAND_RESULT_TOOLTIP_TITLE,
  REQUIRED_DIRECT_COMMAND_INPUT_ERROR_MESSAGE
} from '../../../utils/constants';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';

const DirectCommands = () => {
  const directCommandInitialFormValues = {
    directCommandInput: "",
    directCommandResult: ""
  };

  const directCommandValidationSchema = Yup.object().shape({
    directCommandInput: Yup.string().required(REQUIRED_DIRECT_COMMAND_INPUT_ERROR_MESSAGE)
  });

  const handleDirectCommandFormSubmit = async (directCommandFormData, { setFieldValue, setSubmitting }) => {
    await executeFPOperationWithLoading(dispatch, async () => {
      try {
        if (directCommandFormData.directCommandResult.trim() !== '') {
          setFieldValue("directCommandResult", '');
        }

        const directCommandResult = await fp.DirectCommand(directCommandFormData.directCommandInput);
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

  return (
    <Card>
      <CardContent>
        <H3 sx={{ color: 'text.secondary' }}>
          Direct Commands Sending
        </H3>
        <Box sx={{ display: 'flex', width: '100%', mt: 2 }}>
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
                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12, xl: 6 }}>
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
                    <Grid size={{ xs: 12, xl: 6 }}>
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
  )
}

export default DirectCommands;