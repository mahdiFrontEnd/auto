import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  automationAddress: '',

};

export const automationSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    setAutomationAddress: (state, action) => {
      state.automationAddress = action.payload;
    },


  },
});

export const { setAutomationAddress } = automationSlice.actions;

export default automationSlice.reducer;
