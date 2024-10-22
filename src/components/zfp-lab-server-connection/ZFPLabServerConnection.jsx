import { Formik } from "formik";
import { Paragraph } from "../layout/typography-elements/TypographyElements";
import { 
  DEFAULT_ZFP_LAB_SERVER_ADDRESS, 
  CONNECTING_TO_ZFP_LAB_SERVER_LOADING_MESSAGE, 
  ZFP_LAB_SERVER_CONNECTION_NOT_ESTABLISHED_ERROR_MESSAGE 
} from '../../utils/constants';
import { executeFPOperationWithLoading } from "../../utils/loadingUtils";
import { handleZFPLabServerError } from "../../utils/tremolLibraryUtils";
import { setZFPLabServerConnectionState } from "../../store/slices/zfpConnectionSlice";
import { useDispatch } from "react-redux";
import { toast } from 'react-toastify';
import * as Yup from "yup";
import PropTypes from 'prop-types';
import ZFPLabServerConnectionCard from '../layout/zfp-connection-card/ZFPConnectionCard';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid2';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import PowerIcon from '@mui/icons-material/Power';

const ZFPLabServerConnection = ({ zfpLabServerConnectionHandler }) => {
  const dispatch = useDispatch();

  const zfpLabServerConnectionInitialFormValues = {
    zfpLabServerAddress: DEFAULT_ZFP_LAB_SERVER_ADDRESS
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
    await executeFPOperationWithLoading(dispatch, async () => {
      try {
        await zfpLabServerConnectionHandler(zfpLabServerAddress);
      } catch (error) {
        const zfpLabServerConnectionError = handleZFPLabServerError(error);
        toast.error(`${zfpLabServerConnectionError || ''}Unable to connect to ZFPLabServer on: ${zfpLabServerAddress}`);
        dispatch(setZFPLabServerConnectionState({ isConnected: false, connectionStateMessage: ZFP_LAB_SERVER_CONNECTION_NOT_ESTABLISHED_ERROR_MESSAGE }))
      } finally {
        setSubmitting(false);
      }
    }, CONNECTING_TO_ZFP_LAB_SERVER_LOADING_MESSAGE);
  }

  return (
    <ZFPLabServerConnectionCard>
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
    </ZFPLabServerConnectionCard>
  )
}

ZFPLabServerConnection.propTypes = {
  zfpLabServerConnectionHandler: PropTypes.func
}

export default ZFPLabServerConnection;