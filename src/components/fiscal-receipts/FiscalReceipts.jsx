/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from "react";
import { Formik } from "formik";
import { H3, Paragraph } from "../layout/typography-elements/TypographyElements";
import { useSelector, useDispatch } from "react-redux";
import { toast } from 'react-toastify';
import { useFP } from '../../hooks/useFP';
import { executeFPOperationWithLoading } from "../../utils/loadingUtils";
import { handleZFPLabServerError } from "../../utils/tremolLibraryUtils";
import { setOperatorData } from "../../store/slices/operatorDataSlice";
import { isNullOrWhitespace, sleepAsync } from "../../utils/helperFunctions";
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
  DEPARTMENT_NUMBER_MAX_LENGTH_ERROR_MESSAGE,
  FISCAL_RECEIPT_OPENING_LOADING_MESSAGE,
  FISCAL_RECEIPT_OPENING_ERROR_MESSAGE,
  FISCAL_RECEIPT_ALREADY_OPENED_ERROR_MESSAGE,
  FISCAL_RECEIPT_AUTOMATIC_CLOSURE_LOADING_MESSAGE,
  FISCAL_RECEIPT_NOT_OPENED_ERROR_MESSAGE
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
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import CircularProgress from "@mui/material/CircularProgress";
import Stack from '@mui/material/Stack';
import Tremol from "../../assets/js/fp";

const FiscalReceipts = () => {
  const [vatGroups, setVATGroups] = useState([]);
  const operatorData = useSelector((state) => state.operatorData);
  const dispatch = useDispatch();
  const fp = useFP();

  const operatorDataInitialFormValues = operatorData;

  const operatorDataValidationSchema = Yup.object().shape({
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
    vatGroup: Tremol.Enums.OptionVATClass.VAT_Class_A,
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
    try {
      const openedFiscalReceiptStatusEntry = await fp.ReadStatus().Opened_Fiscal_Receipt;
      
      let isFiscalReceiptOpeningHandled = false;

      if (!openedFiscalReceiptStatusEntry) {
        if (!await handleFiscalReceiptOpening()) {
          return;
        } 

        isFiscalReceiptOpeningHandled = true;
      }

      const {
        withCorrection,
        articleName: externalDatabaseArticleName,
        vatGroup: externalDatabaseArticleVATGroup,
        price,
        quantity,
        isDiscountOrAdditionInPercentage,
        discountOrAddition,
        departmentNumber,
      } = externalDatabaseArticleSaleFormData

      const externalDatabaseArticlePrice = withCorrection ? price * -1 : price;

      const externalDatabaseArticleQuantity = !isNullOrWhitespace(quantity) ? quantity : null;

      const externalDatabaseArticleDiscountOrAdditionArray = getDiscountOrAdditionValues(
        discountOrAddition, isDiscountOrAdditionInPercentage
      );

      const externalDatabaseArticleDepartmentNumber = !isNullOrWhitespace(departmentNumber) ? departmentNumber : null;

      if (isFiscalReceiptOpeningHandled) {
        await sleepAsync(200);
      }

      await fp.SellPLUwithSpecifiedVAT(
        externalDatabaseArticleName,
        externalDatabaseArticleVATGroup,
        externalDatabaseArticlePrice,
        externalDatabaseArticleQuantity,
        externalDatabaseArticleDiscountOrAdditionArray[0],
        externalDatabaseArticleDiscountOrAdditionArray[1],
        externalDatabaseArticleDepartmentNumber
      );
    } catch (error) {
      toast.error(handleZFPLabServerError(error));
    } finally {
      setSubmitting(false);
    }
  }

  const handleOpenFiscalReceiptClick = async () => {
    try {
      const openedFiscalReceiptStatusEntry = await fp.ReadStatus().Opened_Fiscal_Receipt;

      if (!openedFiscalReceiptStatusEntry) {
        await handleFiscalReceiptOpening();
      } else {
        toast.error(FISCAL_RECEIPT_ALREADY_OPENED_ERROR_MESSAGE);
      }
    } catch (error) {
      toast.error(handleZFPLabServerError(error));
    }
  }

  const handleAutomaticReceiptClosingClick = async () => {
    try {
      const openedFiscalReceiptStatusEntry = await fp.ReadStatus().Opened_Fiscal_Receipt;

      if (openedFiscalReceiptStatusEntry) {
        await executeFPOperationWithLoading(dispatch, async () => {
          try {
            await fp.CashPayCloseReceipt();
          } catch (error) {
            toast.error(handleZFPLabServerError(error));
          }
        }, FISCAL_RECEIPT_AUTOMATIC_CLOSURE_LOADING_MESSAGE);
      }
      else {
        toast.error(FISCAL_RECEIPT_NOT_OPENED_ERROR_MESSAGE);
      }
    } catch (error) {
      toast.error(handleZFPLabServerError(error));
    }
  }

  const handleFiscalReceiptOpening = async () => {
    let isReceiptOpeningSuccessful = false;

    if (!isOperatorProvided()) {
      return false;
    }

    if (!await checkStatusForReceiptOpening()) {
      return false;
    }

    await executeFPOperationWithLoading(dispatch, async () => {
      try {
        await fp.OpenReceipt(
          operatorData.operatorNumber,
          operatorData.operatorPassword,
          Tremol.Enums.OptionPrintType.Step_by_step_printing
        );

        isReceiptOpeningSuccessful = true;
      } catch (error) {
        toast.error(handleZFPLabServerError(error));
      }
    }, FISCAL_RECEIPT_OPENING_LOADING_MESSAGE);

    return isReceiptOpeningSuccessful;
  };

  const checkStatusForReceiptOpening = async () => {
    try {
      const status = await fp.ReadStatus();

      return !status.Blocking_3_days_without_mobile_operator
        && !status.DateTime_not_set && !status.DateTime_wrong
        && !status.FM_error && !status.FM_full && !status.FM_Read_only && !status.No_FM_module
        && !status.Hardware_clock_error
        && !status.No_GPRS_Modem && !status.No_SIM_card
        && !status.No_task_from_NRA
        && !status.Opened_Non_fiscal_Receipt && !status.Opened_Fiscal_Receipt
        && !status.Opened_Invoice_Fiscal_Receipt
        && !status.Printer_not_ready_no_paper
        && !status.Printer_not_ready_overheat
        && !status.RAM_reset
        && !status.Reports_registers_Overflow
        && !status.SD_card_full
        && !status.Unsent_data_for_24_hours
        && !status.Wrong_SIM_card
        && !status.Wrong_SD_card;
    } catch (error) {
      toast.error(handleZFPLabServerError(error));
      return false;
    }
  }

  const isOperatorProvided = () => {
    if (isNullOrWhitespace(operatorData.operatorNumber)) {
      toast.error(`${FISCAL_RECEIPT_OPENING_ERROR_MESSAGE}. ${REQUIRED_OPERATOR_NUMBER_ERROR_MESSAGE}.`);
      return false;
    } else {
      if (isNaN(operatorData.operatorNumber)) {
        toast.error(`${FISCAL_RECEIPT_OPENING_ERROR_MESSAGE}. ${OPERATOR_NUMBER_VALUE_NOT_A_NUMBER_ERROR_MESSAGE}.`);
        return false;
      }
    }

    if (isNullOrWhitespace(operatorData.operatorPassword)) {
      toast.error(`${FISCAL_RECEIPT_OPENING_ERROR_MESSAGE}. ${REQUIRED_OPERATOR_PASSWORD_ERROR_MESSAGE}.`);
      return false;
    }

    return true;
  }

  const getDiscountOrAdditionValues = (discountOrAdditionToCheck, isDiscountOrAdditionInPercentage) => {
    let discountOrAdditionFillableArray = [null, null];

    if (!isNullOrWhitespace(discountOrAdditionToCheck)) {
      if (isDiscountOrAdditionInPercentage) {
        discountOrAdditionFillableArray[0] = Number(discountOrAdditionToCheck);
      } else {
        discountOrAdditionFillableArray[1] = Number(discountOrAdditionToCheck);
      }
    }

    return discountOrAdditionFillableArray;
  }

  const configureVATGroups = () => {
    const vatGroupOptionsToSet = Object.entries(Tremol.Enums.OptionVATClass).map(([key, value]) => ({
      name: key.replaceAll("_", ""),
      value
    }));

    setVATGroups(vatGroupOptionsToSet);
  }

  useEffect(() => {
    configureVATGroups();
  }, []);

  return (
    <Box sx={{ width: '100%', height: '100%', px: 2 }}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, lg: 3 }}>
          <Card>
            <CardContent>
              <H3 sx={{ color: 'text.secondary' }}>
                Operator
              </H3>
              <Formik
                initialValues={operatorDataInitialFormValues}
                validationSchema={operatorDataValidationSchema}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit
                }) => {
                  useEffect(() => {
                    dispatch(setOperatorData(values));
                  }, [values]);

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
        <Grid size={{ xs: 12, lg: 3 }}>
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
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
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
                        <FormControl fullWidth size="small" sx={{ textAlign: 'left' }}>
                          <Paragraph fontSize={14}>VAT Group</Paragraph>
                          <Select
                            name="vatGroup"
                            value={vatGroups.length > 0 ? values.vatGroup : ''}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            displayEmpty
                          >
                            {vatGroups.length > 0 ? (
                              vatGroups.map((vatGroup) => (
                                <MenuItem key={vatGroup.name} value={vatGroup.value}>
                                  {vatGroup.value}
                                </MenuItem>
                              ))
                            ) : (
                              <MenuItem disabled sx={{ dispaly: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <CircularProgress size={20} />
                              </MenuItem>
                            )}
                          </Select>
                        </FormControl>
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
                    <CardActions sx={{ justifyContent: 'center', px: 2, pb: 3, pt: 1 }}>
                      <Button type="submit" size="medium" variant="contained" sx={{ width: '100%' }}>Sell Article</Button>
                    </CardActions>
                  </form>
                </Card>
              )
            }}
          </Formik>
        </Grid>
        <Grid size={{ xs: 12, lg: 3 }}>
          <Card>
            <CardContent>
              <H3 sx={{ color: 'text.secondary' }}>
                Fiscal Receipt Operations
              </H3>
              <Stack spacing={2} sx={{ mt: 3 }}>
                <Button 
                  size="medium" 
                  variant="contained" 
                  sx={{ width: '100%' }} 
                  onClick={handleOpenFiscalReceiptClick}
                >
                  Open Receipt
                </Button>
                <Button 
                  size="medium" 
                  variant="contained" 
                  sx={{ width: '100%' }} 
                  onClick={handleAutomaticReceiptClosingClick}
                >
                  Close In Cash
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default FiscalReceipts;