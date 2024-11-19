import { createSlice } from "@reduxjs/toolkit";

const operatorDataInitialState = {
  operatorNumber: 1,
  operatorPassword: "0"
}

export const operatorDataSlice = createSlice({
  name: "operator-data",
  initialState: operatorDataInitialState,
  reducers: {
    setOperatorData: (state, action) => {
      const { operatorNumber, operatorPassword } = action.payload;
      state.operatorNumber = operatorNumber;
      state.operatorPassword = operatorPassword;
    }
  }
})

export const { setOperatorData } = operatorDataSlice.actions;

export default operatorDataSlice.reducer