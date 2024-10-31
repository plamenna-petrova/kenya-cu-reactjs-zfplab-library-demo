/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect } from "react";
import { Formik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { setOperatorData } from "../../../store/slices/operatorDataSlice";
import { H3 } from "../../layout/typography-elements/TypographyElements";
import {
  REQUIRED_OPERATOR_NUMBER_ERROR_MESSAGE,
  OPERATOR_NUMBER_VALUE_NOT_A_NUMBER_ERROR_MESSAGE,
  OPERATOR_NUMBER_NOT_AN_INTEGER_ERROR_MESSAGE,
  MIN_OPERATOR_NUMBER_ERROR_MESSAGE,
  MAX_OPERATOR_NUMBER_ERROR_MESSAGE,
  REQUIRED_OPERATOR_PASSWORD_ERROR_MESSAGE,
  OPERATOR_PASSWORD_MAX_LENGTH_ERROR_MESSAGE
} from "../../../utils/constants";
import * as Yup from "yup";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const OperatorData = () => {
  const operatorData = useSelector((state) => state.operatorData);
  const dispatch = useDispatch();

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

  return (
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
  )
}

export default OperatorData;