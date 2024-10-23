import { Formik } from "formik";
import { H3 } from "../layout/typography-elements/TypographyElements";
import { useDispatch } from "react-redux";
import { useFP } from '../../hooks/useFP';
import { executeFPOperationWithLoading } from "../../utils/loadingUtils";
import { handleZFPLabServerError } from "../../utils/tremolLibraryUtils";
import {
  REQUIRED_OPERATOR_NUMBER_ERROR_MESSAGE,
  OPERATOR_NUMBER_VALUE_NOT_A_NUMBER_ERROR_MESSAGE,
  OPERATOR_NUMBER_NOT_AN_INTEGER_ERROR_MESSAGE,
  MIN_OPERATOR_NUMBER_ERROR_MESSAGE,
  MAX_OPERATOR_NUMBER_ERROR_MESSAGE,
  REQUIRED_OPERATOR_PASSWORD_ERROR_MESSAGE,
  OPERATOR_PASSWORD_MAX_LENGTH_ERROR_MESSAGE,
  REQUIRED_ARTICLE_NAME_ERROR_MESSAGE,
  ARTICLE_NAME_MAX_LENGTH_ERROR_MESSAGE,
  REQUIRED_PRICE_ERROR_MESSAGE,
  PRICE_VALUE_NOT_A_NUMBER_ERROR_MESSAGE,
  PRICE_MAX_LENGTH_ERROR_MESSAGE,
  QUANTITY_VALUE_NOT_A_NUMBER_ERROR_MESSAGE,
  QUANTITY_MAX_LENGTH_ERROR_MESSAGE,
  DISCOUNT_OR_ADDITION_VALUE_NOT_A_NUMBER_ERROR_MESSAGE,
  DISCOUNT_OR_ADDITION_PERCENTAGE_MAX_LENGTH_ERROR_MESSAGE,
  DISCOUNT_OR_ADDITION_VALUE_MAX_LENGTH_ERROR_MESSAGE,
  DEPARTMENT_NUMBER_VALUE_NOT_A_NUMBER_ERROR_MESSAGE,
  DEPARTMENT_NUMBER_MAX_LENGTH_ERROR_MESSAGE
} from "../../utils/constants";
import * as Yup from "yup";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

const FiscalReceipts = () => {
  const dispatch = useDispatch();
  const fp = useFP();

  const operatorCredentialsInitialFormValues = {
    operatorNumber: "",
    operatorPassword: ""
  }

  const operatorCredentialsValidationSchema = Yup.object().shape({
    operatorNumber: Yup
      .number()
      .required(REQUIRED_OPERATOR_NUMBER_ERROR_MESSAGE)
      .typeError(OPERATOR_NUMBER_VALUE_NOT_A_NUMBER_ERROR_MESSAGE)
      .integer(OPERATOR_NUMBER_NOT_AN_INTEGER_ERROR_MESSAGE)
      .min(1, MIN_OPERATOR_NUMBER_ERROR_MESSAGE)
      .max(20, MAX_OPERATOR_NUMBER_ERROR_MESSAGE),
    operatorPassword: Yup
      .string()
      .required(REQUIRED_OPERATOR_PASSWORD_ERROR_MESSAGE)
      .test("operatorPasswordLength", OPERATOR_PASSWORD_MAX_LENGTH_ERROR_MESSAGE, value => value.length <= 6)
  });

  const externalDatabaseArticleSaleInitialFormValues = {
    withCorrection: false,
    articleName: "",
    vatGroup: "",
    price: "",
    quantity: "",
    isDiscountOrAdditionInPercentage: false,
    discountOrAddition: "",
    departmentNumber: "",
  }

  const externalDatabaseArticleSaleValidationSchema = Yup.object().shape({
    withCorrection: Yup.boolean(),
    articleName: Yup
      .string()
      .required(REQUIRED_ARTICLE_NAME_ERROR_MESSAGE)
      .test("articleNameLength", ARTICLE_NAME_MAX_LENGTH_ERROR_MESSAGE, value => value && value.length <= 36),
    price: Yup
      .number()
      .required(REQUIRED_PRICE_ERROR_MESSAGE)
      .typeError(PRICE_VALUE_NOT_A_NUMBER_ERROR_MESSAGE)
      .test("priceLength", PRICE_MAX_LENGTH_ERROR_MESSAGE, value => value && value.toString().length <= 10),
    quantity: Yup
      .number()
      .typeError(QUANTITY_VALUE_NOT_A_NUMBER_ERROR_MESSAGE)
      .test("quantityLength", QUANTITY_MAX_LENGTH_ERROR_MESSAGE, value => !value || value.toString().length <= 10),
    isDiscountOrAdditionInPercentage: Yup.boolean(),
    discountOrAddition: Yup
      .number()
      .typeError(DISCOUNT_OR_ADDITION_VALUE_NOT_A_NUMBER_ERROR_MESSAGE)
      .test("discountOrAdditionLength", function (value) {
        const { isDiscountOrAdditionInPercentage } = this.parent;
        const discountOrAdditionMaxLength = isDiscountOrAdditionInPercentage ? 7 : 8;
        const discountOrAdditionMaxLengthErrorMessage = isDiscountOrAdditionInPercentage
          ? DISCOUNT_OR_ADDITION_PERCENTAGE_MAX_LENGTH_ERROR_MESSAGE
          : DISCOUNT_OR_ADDITION_VALUE_MAX_LENGTH_ERROR_MESSAGE;

        return !value || value.toString().length <= discountOrAdditionMaxLength
          ? true
          : this.createError({ message: discountOrAdditionMaxLengthErrorMessage });
      }),
    departmentNumber: Yup
      .number()
      .typeError(DEPARTMENT_NUMBER_VALUE_NOT_A_NUMBER_ERROR_MESSAGE)
      .test("departmentNumberLength", DEPARTMENT_NUMBER_MAX_LENGTH_ERROR_MESSAGE, value => !value || value.toString().length <= 2)
  });

  const handleExternalDatabaseArticleSaleFromSubmit = async (externalDatabaseArticleSaleFormData, { setSubmitting }) => {
    console.log(externalDatabaseArticleSaleFormData);
    setSubmitting(false);
  }

  return (
    <Box sx={{ width: '100%', height: '100%', px: 2 }}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 12, md: 3 }}>
          <Card>
            <CardContent>
              <H3 sx={{ color: 'text.secondary' }}>
                Operator
              </H3>
              <Formik
                initialValues={operatorCredentialsInitialFormValues}
                validationSchema={operatorCredentialsValidationSchema}
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
                          label="Number"
                          fullWidth
                          size="small"
                          type="text"
                          name="operatorNumber"
                          variant="outlined"
                          onBlur={handleBlur}
                          value={values.operatorNumber}
                          onChange={handleChange}
                          helperText={touched.operatorNumber && errors.operatorNumber}
                          error={Boolean(touched.operatorNumber && errors.operatorNumber)}
                        />
                        <TextField
                          label="Password"
                          fullWidth
                          size="small"
                          type="text"
                          name="operatorPassword"
                          variant="outlined"
                          onBlur={handleBlur}
                          value={values.operatorPassword}
                          onChange={handleChange}
                          helperText={touched.operatorPassword && errors.operatorPassword}
                          error={Boolean(touched.operatorPassword && errors.operatorPassword)}
                        />
                      </Box>
                    </form>
                  )
                }}
              </Formik>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 3 }}>
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
                <Card>
                  <form onSubmit={handleSubmit}>
                    <CardContent>
                      <H3 sx={{ color: 'text.secondary' }}>
                        Sale/Correction from external database
                      </H3>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <FormControlLabel
                          control={
                            <Checkbox 
                              checked={values.withCorrection} 
                              onChange={handleChange} 
                              name="withCorrection" 
                            />
                          }
                          label="Correction"
                          sx={{ width: '100%', justifyContent: 'flex-end', p: 0 }}
                        />
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
                        <FormControlLabel
                          control={
                            <Checkbox 
                              checked={values.isDiscountOrAdditionInPercentage} 
                              onChange={handleChange} 
                              name="isDiscountOrAdditionInPercentage" 
                            />
                          }
                          label="In Percentage"
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
                          helperText={touched.discountOrAddition && errors.discountOrAddition}
                          error={Boolean(touched.discountOrAddition && errors.discountOrAddition)}
                        />
                      </Box>
                    </CardContent>
                    <CardActions sx={{ justifyContent: 'center', px: 2, pb: 2, pt: 1 }}>
                      <Button type="submit" size="medium" variant="contained" sx={{ width: '100%' }}>Sell Article</Button>
                    </CardActions>
                  </form>
                </Card>
              )
            }}
          </Formik>
        </Grid>
      </Grid>
    </Box>
  )
}

export default FiscalReceipts;