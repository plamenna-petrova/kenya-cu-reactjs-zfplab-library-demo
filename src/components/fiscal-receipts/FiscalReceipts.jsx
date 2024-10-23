import { Formik } from "formik";
import { H3, Paragraph } from "../layout/typography-elements/TypographyElements";
import { useDispatch } from "react-redux";
import { useFP } from '../../hooks/useFP';
import { executeFPOperationWithLoading } from "../../utils/loadingUtils";
import { handleZFPLabServerError } from "../../utils/tremolLibraryUtils";
import * as Yup from "yup";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';

const FiscalReceipts = () => {
  const dispatch = useDispatch();
  const fp = useFP();

  const externalDatabaseArticleSaleInitialFormValues = {
    withCorrection: false,
    articleName: "",
    vatGroup: "",
    price: "",
    quantity: "",
    departmentNumber: "",
    isDiscountOrAdditionInPercentage: false,
    discountOrAddition: "",
  }

  const externalDatabaseArticleSaleValidationSchema = Yup.object().shape({

  });

  const handleExternalDatabaseArticleSaleFromSubmit = async (externalDatabaseArticleSaleFormData, { setSubmitting }) => {
    await executeFPOperationWithLoading(dispatch, async () => {
      try {

      } catch (error) {

      }
    });
  }

  return (
    <Box sx={{ width: '100%', height: '100%', px: 2 }}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 12, md: 3 }}>
          <Card>
            <CardContent>
              <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                Operator Data
              </Typography>
              <Typography variant="h5" component="div">
                benevolent
              </Typography>
              <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>adjective</Typography>
              <Typography variant="body2">
                well meaning and kindly.
                <br />
                {'"a benevolent smile"'}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 3 }}>
          <Card>
            <CardContent>
              <H3 sx={{ color: 'text.secondary' }}>
                Sale/Correction from external DB
              </H3>
              <Formik
                initialValues={externalDatabaseArticleSaleInitialFormValues}
                validationSchema={externalDatabaseArticleSaleValidationSchema}
                onSubmit={handleExternalDatabaseArticleSaleFromSubmit}
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
                          label="Article Name"
                          fullWidth
                          size="small"
                          type="text"
                          name="articleName"
                          variant="outlined"
                          onBlur={handleBlur}
                          value={values.articleName}
                          onChange={handleChange}
                          helperText={touched.articleName && errors.articleName}
                          error={Boolean(touched.articleName && errors.articleName)}
                        />
                        <TextField
                          label="Price"
                          fullWidth
                          size="small"
                          type="text"
                          name="price"
                          variant="outlined"
                          onBlur={handleBlur}
                          value={values.price}
                          onChange={handleChange}
                          helperText={touched.price && errors.price}
                          error={Boolean(touched.price && errors.price)}
                        />
                        <TextField
                          label="Quantity"
                          fullWidth
                          size="small"
                          type="text"
                          name="quantity"
                          variant="outlined"
                          onBlur={handleBlur}
                          value={values.quantity}
                          onChange={handleChange}
                          helperText={touched.quantity && errors.quantity}
                          error={Boolean(touched.quantity && errors.quantity)}
                        />
                        <TextField
                          label="Department Number"
                          fullWidth
                          size="small"
                          type="numbe"
                          name="departmentNumber"
                          variant="outlined"
                          onBlur={handleBlur}
                          value={values.departmentNumber}
                          onChange={handleChange}
                          helperText={touched.departmentNumber && errors.departmentNumber}
                          error={Boolean(touched.departmentNumber && errors.departmentNumber)}
                        />
                        <TextField
                          label="Discount/Addition"
                          fullWidth
                          size="small"
                          type="numbe"
                          name="discountOrAddition"
                          variant="outlined"
                          onBlur={handleBlur}
                          value={values.discountOrAddition}
                          onChange={handleChange}
                          helperText={touched.discountOrAddition&& errors.discountOrAddition}
                          error={Boolean(touched.discountOrAddition && errors.discountOrAddition)}
                        />
                      </Box>
                    </form>
                  )
                }}
              </Formik>
            </CardContent>
            <CardActions sx={{ justifyContent: 'center', px: 2, pb: 2, pt: 1 }}>
              <Button size="medium" variant="contained" sx={{ width: '100%' }}>Sell Article</Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default FiscalReceipts;