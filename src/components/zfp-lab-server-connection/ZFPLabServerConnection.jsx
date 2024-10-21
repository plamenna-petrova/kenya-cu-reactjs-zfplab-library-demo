import { useEffect, useCallback } from "react";
import { styled } from '@mui/material/styles';
import { Formik } from "formik";
import { executeFPOperationWithLoading } from "../../utils/loadingUtils";
import { Paragraph } from "../typography-elements/TypographyElements";
import { useDispatch } from 'react-redux';
import { useFP } from '../../hooks/useFP';
import { handleZFPLabServerError } from '../../utils/tremolLibraryUtils';
import { toast } from 'react-toastify';
import { setActiveSection } from '../../store/slices/appNavigationSlice';
import { CONNECTING_TO_ZFP_LAB_SERVER_LOADING_MESSAGE, FISCAL_DEVICE_CONNECTION } from '../../utils/constants';
import * as Yup from "yup";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid2';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import PowerIcon from '@mui/icons-material/Power';

const ZFPLabServerConnectionStyledCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: '100%',
  maxWidth: 800,
  minWidth: 0,
  margin: "auto",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  borderRadius: theme.shape.borderRadius,
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1),
    maxWidth: '300px',
    margin: theme.spacing(1),
  },
}));

const ZFPLabServerConnection = () => {
  const fp = useFP();
  const dispatch = useDispatch();

  const zfpLabServerConnectionInitialFormValues = {
    zfpLabServerAddress: "http://localhost:4444"
  }

  const zfpLabServerConnectionValidationSchema = Yup.object().shape({
    zfpLabServerAddress: Yup
      .string()
      .required("The ZFPLabServer address is required")
      .matches(
        /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[\w]*))?)/,
        "The ZFPLabServer address must be a valid URL"
      )
  });

  const handleZFPLabServerConnectionFormSubmit = async ({ zfpLabServerAddress }, { setSubmitting }) => {
    await connectToZFPLabServer(zfpLabServerAddress, setSubmitting);
  }

  const connectToZFPLabServer = useCallback(async (zfpLabServerAddress, setSubmitting) => {
    await executeFPOperationWithLoading(dispatch, async () => {
      try {
        await fp.ServerSetSettings(zfpLabServerAddress);

        const serverDeviceSettings = await fp.ServerGetDeviceSettings();

        if (serverDeviceSettings) {
          dispatch(setActiveSection(FISCAL_DEVICE_CONNECTION));
        }
      } catch (error) {
        const zfpLabServerError = handleZFPLabServerError(error);
        toast.error(`${zfpLabServerError ? zfpLabServerError + '\n' : ''}Unable to connect to ZFPLabServer on: \r\n${zfpLabServerAddress}`);
      } finally {
        if (setSubmitting) {
          setSubmitting(false);
        }
      }
    }, CONNECTING_TO_ZFP_LAB_SERVER_LOADING_MESSAGE);
  }, [dispatch, fp]);

  useEffect(() => {
    const handleZFPLabServerConnection = async () => {
      await connectToZFPLabServer(zfpLabServerConnectionInitialFormValues.zfpLabServerAddress);
    };

    handleZFPLabServerConnection();
  }, [connectToZFPLabServer, zfpLabServerConnectionInitialFormValues.zfpLabServerAddress]);

  return (
    <ZFPLabServerConnectionStyledCard>
      <CardContent>
        <Formik
          initialValues={zfpLabServerConnectionInitialFormValues}
          validationSchema={zfpLabServerConnectionValidationSchema}
          onSubmit={handleZFPLabServerConnectionFormSubmit}
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
                <Grid container spacing={2} justifyContent="center" alignItems="center">
                  <Grid size={{ xs: 12 }} textAlign="center">
                    <FormControl fullWidth size="small" sx={{ textAlign: 'left' }}>
                      <Paragraph>ZFPLabServer Address</Paragraph>
                      <TextField
                        fullWidth
                        size="small"
                        type="text"
                        name="zfpLabServerAddress"
                        variant="outlined"
                        onBlur={handleBlur}
                        value={values.zfpLabServerAddress}
                        onChange={handleChange}
                        helperText={touched.zfpLabServerAddress && errors.zfpLabServerAddress}
                        error={Boolean(touched.zfpLabServerAddress && errors.zfpLabServerAddress)}
                      />
                    </FormControl>
                  </Grid>
                  <Box sx={{ display: 'flex', width: '100%', justifyContent: 'flex-end' }}>
                    <Button type="submit" variant="contained" startIcon={<PowerIcon />}>
                      Connect
                    </Button>
                  </Box>
                </Grid>
              </form>
            )
          }}
        </Formik>
      </CardContent>
    </ZFPLabServerConnectionStyledCard>
  )
}

export default ZFPLabServerConnection;