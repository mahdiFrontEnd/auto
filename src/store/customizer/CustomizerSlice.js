import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showSidebar: false,
  showNotifSidebar: false,
  showOnlineSidebar: false,
};

export const CustomizerSlice = createSlice({
  name: 'customizer',
  initialState,
  reducers: {
    ToggleShowSidebar: (state, action) => {
      state.showSidebar = action.payload;
    },
    ToggleShowNotifSidebar: (state, action) => {
      state.showNotifSidebar = action.payload;
    },
    setShowOnlineSidebar: (state, action) => {
      state.showOnlineSidebar = action.payload;
    },
  },
});

export const {
  ToggleShowSidebar,ToggleShowNotifSidebar,setShowOnlineSidebar
} = CustomizerSlice.actions;

export default CustomizerSlice.reducer;
