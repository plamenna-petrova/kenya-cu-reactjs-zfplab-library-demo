import { useState, useEffect } from "react";
import { Formik } from "formik";
import { H3, Paragraph } from "../layout/typography-elements/TypographyElements";
import { useSelector, useDispatch } from "react-redux";
import { toast } from 'react-toastify';
import { useFP } from '../../hooks/useFP';
import { executeFPOperationWithLoading } from "../../utils/loadingUtils";
import { handleZFPLabServerError } from "../../utils/tremolLibraryUtils";
import { isNullOrWhitespace, sleepAsync } from "../../utils/helperFunctions";
import {
  REQUIRED_OPERATOR_NUMBER_ERROR_MESSAGE,
  OPERATOR_NUMBER_VALUE_NOT_A_NUMBER_ERROR_MESSAGE,
  REQUIRED_OPERATOR_PASSWORD_ERROR_MESSAGE,
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
  FISCAL_RECEIPT_CLOSING_LOADING_MESSAGE,
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
import useMediaQuery from '@mui/material/useMediaQuery';
import OperatorData from "./operator-data/OperatorData";
import Tremol from "../../assets/js/fp";

const FiscalReceipts = () => {
  const [vatGroups, setVATGroups] = useState([]);
  const operatorData = useSelector((state) => state.operatorData);
  const isFullscreenModeActive = useSelector((state) => state.fullscreenMode.isFullscreenModeActive);
  const isDesktopScreen = useMediaQuery('(min-width:1200px)');
  const dispatch = useDispatch();
  const fp = useFP();

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

  /**
   * Executes an article sale or correction operation using `SellPLUwithSpecifiedVAT`, depending on the `withCorrection` value.
   * Handles fiscal receipt opening beforehand if the `Opened_Fiscal_Receipt` status entry is not active.
   * - If the fiscal receipt opening is unsuccessful, the `SellPLUwithSpecifiedVAT` operation will not execute.
   * - The `price` is set to `externalDatabaseArticlePrice`; if `withCorrection` is `true`, the `price` is transformed to a negative value.
   * - If `quantity` is provided (not `null` or whitespace), it is set as `externalDatabaseArticleQuantity`.
   * - The discount or addition array is populated using `getDiscountOrAdditionValues`, set to `externalDatabaseArticleDiscountOrAdditionArray`.
   * - If `departmentNumber` is provided (not `null` or whitespace), it is set as `externalDatabaseArticleDepartmentNumber`.
   * - Waits 200ms to handle the next operation `SellPLUwithSpecifiedVAT` if the fiscal receipt opening is successful.
   * - If an error occurs, shows an error toast with the error message.
   * 
   * @async
   * @function handleExternalDatabaseArticleSaleFormSubmit
   * @param {object} externalDatabaseArticleSaleFormData - Article sale or correction data.
   * @param {object} formikHelperFunctions - Formik helpers for handling form state.
   * @param {function} formikHelperFunctions.setSubmitting - Formik function to control the form's submitting state.
   * @returns {Promise<void>} A promise that resolves once the operation completes.
   */
  const handleExternalDatabaseArticleSaleFormSubmit = async (externalDatabaseArticleSaleFormData, { setSubmitting }) => {
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
      } = externalDatabaseArticleSaleFormData;

      const externalDatabaseArticlePrice = withCorrection && Number(price) > 0 ? Number(-price) : Number(price);

      const externalDatabaseArticleQuantity = !isNullOrWhitespace(quantity) ? Number(quantity) : null;

      const externalDatabaseArticleDiscountOrAdditionArray = getDiscountOrAdditionValues(
        discountOrAddition, isDiscountOrAdditionInPercentage
      );

      const externalDatabaseArticleDepartmentNumber = 
        !isNullOrWhitespace(departmentNumber) ? Number(departmentNumber) : null;

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

  /**
   * Attempts to open a fiscal receipt if the `Opened_Fiscal_Receipt` status entry is not active.
   * - If a fiscal receipt is already open, shows an error toast with a relevant message.
   * - Executes the `handleFiscalReceiptOpening` operation.
   * - If an error occurs, shows an error toast with the error message.
   * 
   * @async
   * @function handleOpenFiscalReceiptClick
   * @returns {Promise<void>} A promise that resolves once the operation completes.
   */
  const handleOpenFiscalReceiptClick = async () => {
    try {
      const openedFiscalReceiptStatusEntry = await fp.ReadStatus().Opened_Fiscal_Receipt;

      if (openedFiscalReceiptStatusEntry) {
        toast.error(FISCAL_RECEIPT_ALREADY_OPENED_ERROR_MESSAGE);
        return;
      }

      await handleFiscalReceiptOpening();
    } catch (error) {
      toast.error(handleZFPLabServerError(error));
    }
  }

  /**
   * Calculates the fiscal receipt subtotal with a specified printing option.
   * - If an error occurs, shows an error toast with the error message.
   * 
   * @async
   * @function handleCalculateSubtotalClick
   * @returns {Promise<void>} A promise that resolves once the operation completes.
   */
  const handleCalculateSubtotalClick = async () => {
    try {
      await fp.Subtotal(Tremol.Enums.OptionPrinting.Yes, Tremol.Enums.OptionDisplay.No, null, null);
    } catch (error) {
      toast.error(handleZFPLabServerError(error));
    }
  }

  /**
   * Pays the exact sum in cash for the fiscal receipt
   * - If an error occurs, shows an error toast with the error message.
   * 
   * @async
   * @function handlePayExactSumClick
   * @returns {Promise<void>} A promise that resolves once the operation completes.
   */
  const handlePayExactSumClick = async () => {
    try {
      await fp.PayExactSum(Tremol.Enums.OptionPaymentType.Cash);
    } catch (error) {
      toast.error(handleZFPLabServerError(error));
    }
  }

  /**
   * Attempts to close a fiscal receipt with cash payment if the `Opened_Fiscal_Receipt` status entry is active.
   * - If a fiscal receipt is not open, shows an error toast with a relevant message.
   * - Initiates an asynchronous operation with a loading indicator.
   * - Executes the `CashPayCloseReceipt` operation.
   * - If an error occurs, shows an error toast with the error message.
   * 
   * @async
   * @function handleAutomaticReceiptClosingClick
   * @returns {Promise<void>} A promise that resolves once the operation completes.
   */
  const handleAutomaticReceiptClosingClick = async () => {
    try {
      const openedFiscalReceiptStatusEntry = await fp.ReadStatus().Opened_Fiscal_Receipt;

      if (!openedFiscalReceiptStatusEntry) {
        toast.error(FISCAL_RECEIPT_NOT_OPENED_ERROR_MESSAGE);
        return;
      }

      await executeFPOperationWithLoading(dispatch, async () => {
        try {
          await fp.CashPayCloseReceipt();
        } catch (error) {
          toast.error(handleZFPLabServerError(error));
        }
      }, FISCAL_RECEIPT_AUTOMATIC_CLOSURE_LOADING_MESSAGE);
    } catch (error) {
      toast.error(handleZFPLabServerError(error));
    }
  }

  /**
   * Attempts to close a fiscal receipt if the `Opened_Fiscal_Receipt` status entry is active.
   * - If a fiscal receipt is not open, shows an error toast with a relevant message.
   * - Initiates an asynchronous operation with a loading indicator.
   * - Executes the `CloseReceipt` operation.
   * - If an error occurs, shows an error toast with the error message.
   * 
   * @async
   * @function handleCloseFiscalReceiptClick
   * @returns {Promise<void>} A promise that resolves once the operation completes.
   */
  const handleCloseFiscalReceiptClick = async () => {
    try {
      const openedFiscalReceiptStatusEntry = await fp.ReadStatus().Opened_Fiscal_Receipt;

      if (!openedFiscalReceiptStatusEntry) {
        toast.error(FISCAL_RECEIPT_NOT_OPENED_ERROR_MESSAGE);
        return;
      }

      await executeFPOperationWithLoading(dispatch, async () => {
        try {
          await fp.CloseReceipt();
        } catch (error) {
          toast.error(handleZFPLabServerError(error));
        }
      }, FISCAL_RECEIPT_CLOSING_LOADING_MESSAGE);
    } catch (error) {
      toast.error(handleZFPLabServerError(error));
    }
  }

  /**
   * Attempts to open a fiscal receipt based on operator data, status validation, and the `OpenReceipt` operation.
   * - Returns `false` if operator data or status validation fails, or if an error occurs during the operation.
   * - Returns `true` if the `OpenReceipt` operation succeeds.
   * 
   * @async
   * @function handleFiscalReceiptOpening
   * @returns {Promise<boolean>} `true` if the fiscal receipt is successfully opened; otherwise, `false`.
   */
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
          Number(operatorData.operatorNumber),
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

  /**
   * Checks if the fiscal device is ready to open a receipt, based on specific status entries.
   * - Returns `true` only if all required status entries indicate that the fiscal device is ready.
   * - Returns `false` if any blocking status entry is `true` or if an error occurs.
   * 
   * @async
   * @function checkStatusForReceiptOpening
   * @returns {Promise<boolean>} `true` if all checked status entries are `false`; otherwise, `false`.
   */
  const checkStatusForReceiptOpening = async () => {
    try {
      const readStatusEntries = await fp.ReadStatus();

      return !readStatusEntries.Blocking_3_days_without_mobile_operator
        && !readStatusEntries.DateTime_not_set && !readStatusEntries.DateTime_wrong
        && !readStatusEntries.FM_error && !readStatusEntries.FM_full && !readStatusEntries.FM_Read_only && !readStatusEntries.No_FM_module
        && !readStatusEntries.Hardware_clock_error
        && !readStatusEntries.No_GPRS_Modem && !readStatusEntries.No_SIM_card
        && !readStatusEntries.No_task_from_NRA
        && !readStatusEntries.Opened_Non_fiscal_Receipt && !readStatusEntries.Opened_Fiscal_Receipt
        && !readStatusEntries.Opened_Invoice_Fiscal_Receipt
        && !readStatusEntries.Printer_not_ready_no_paper
        && !readStatusEntries.Printer_not_ready_overheat
        && !readStatusEntries.RAM_reset
        && !readStatusEntries.Reports_registers_Overflow
        && !readStatusEntries.SD_card_full
        && !readStatusEntries.Unsent_data_for_24_hours
        && !readStatusEntries.Wrong_SIM_card
        && !readStatusEntries.Wrong_SD_card;
    } catch (error) {
      toast.error(handleZFPLabServerError(error));
      return false;
    }
  }

  /**
   * Checks the validity of the operator's data based on the operator number and password.
   * - Returns `false` if `operatorData.operatorNumber` is `null`, whitespace, or not a number (NaN).
   * - Returns `false` if `operatorData.operatorPassword` is `null` or whitespace.
   * - Otherwise, returns `true`.
   * 
   * @function isOperatorProvided
   * @returns {boolean} `true` if both operator number and password are valid; otherwise, `false`.
   */
  const isOperatorProvided = () => {
    if (isNullOrWhitespace(String(operatorData.operatorNumber))) {
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

  /**
   * Populates an array with discount or addition values based on input parameters.
   * - If `discountOrAdditionToCheck` is `null` or whitespace, the function returns an array with two `null` values.
   * - If `discountOrAdditionToCheck` is a non-null, non-whitespace string:
   *    - The value is parsed to a number and assigned to the first array element if `isDiscountOrAdditionInPercentage` is `true`.
   *    - Otherwise, it is assigned to the second array element.
   * 
   * @function getDiscountOrAdditionValues
   * @param {string} discountOrAdditionToCheck - The discount or addition value as a string.
   * @param {boolean} isDiscountOrAdditionInPercentage - Indicates whether the value represents a percentage.
   * @returns {(number | null)[]} An array with parsed discount or addition values, where the first element is used for percentage values and the second for absolute values.
   */
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

  /**
   * Maps and sets VAT class options from `Tremol.Enums.OptionVATClass`.
   * The `Tremol.Enums.OptionVATClass` enum is processed and the entries are transformed
   * into a suitable format for use as options in a select component.
   * 
   * @function configureVATGroups
   * @returns {void} This function does not return a value.
   */
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
      <Grid container spacing={2} sx={{ pb: !isDesktopScreen ? 2 : 0 }}>
        <Grid size={{ xs: 12, lg: 2 }}>
          <OperatorData />
        </Grid>
        <Grid size={{ xs: 12, lg: 3 }}>
          <Formik
            initialValues={externalDatabaseArticleSaleInitialFormValues}
            validationSchema={externalDatabaseArticleSaleValidationSchema}
            onSubmit={handleExternalDatabaseArticleSaleFormSubmit}
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
                            MenuProps={{
                              disablePortal: isFullscreenModeActive
                            }}
                          >
                            {vatGroups.length > 0 ? (
                              vatGroups.map((vatGroup) => (
                                <MenuItem key={vatGroup.name} value={vatGroup.value}>
                                  {vatGroup.value}
                                </MenuItem>
                              ))
                            ) : (
                              <MenuItem disabled sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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
                          type="text"
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
                          type="text"
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
                <Button size="medium" variant="contained" sx={{ width: '100%' }} onClick={handleOpenFiscalReceiptClick}>
                  Open Fiscal Receipt
                </Button>
                <Button size="medium" variant="contained" sx={{ width: '100%' }} onClick={handleCalculateSubtotalClick}>
                  Subtotal
                </Button>
                <Button size="medium" variant="contained" sx={{ width: '100%' }} onClick={handlePayExactSumClick}>
                  Pay exact sum
                </Button>
                <Button size="medium" variant="contained" sx={{ width: '100%' }} onClick={handleAutomaticReceiptClosingClick}>
                  Close Fiscal Receipt In Cash
                </Button>
                <Button size="medium" variant="contained" sx={{ width: '100%' }} onClick={handleCloseFiscalReceiptClick}>
                  Close fiscal Receipt
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