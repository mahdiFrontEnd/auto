import { createSlice } from '@reduxjs/toolkit';

export const defReceiptAndRemittance = {
  isEmpty: true,
  editable: true,
  product: { name: '', id: null, unit: { unit: '' } },
  product_id: null,
  amount: '',
  dead_time: null,
  reason: '',
};
export const defReceiptAndRemittanceData = {
  request_name: null,
  description: null,
  another_product: 0,
};
export const initialStateReceiptAndRemittance = {
  receiptAndRemittanceArray: [],
  receiptAndRemittanceData: defReceiptAndRemittanceData,
  submitStatusForm: true,
  hasEdit: false,
  productList: [],
  productListLoading: false,
  placeList: [],
  placeListLoading: false,
  storekeeperList: [],
  buyerList: [],
  nextStatusesList: [],
  showJson: {},
  type: 'store',
  address: 'store',
  loading: false,
  statusForm: [],
  selectedItem: [],
  inOut: 'out',
  processId: 1,
  nextStep: "",

};
const initialState = initialStateReceiptAndRemittance;

export const StorehouseSlice = createSlice({
  name: 'storehouse',
  initialState,
  reducers: {
    handleReceiptAndRemittanceArray: (state, action) => {
      state.receiptAndRemittanceArray = action.payload;
    },
    handleReceiptAndRemittanceData: (state, action) => {
      state.receiptAndRemittanceData = action.payload;
    },
    handleHasEdit: (state, action) => {
      state.hasEdit = action.payload;
    },
    setProductList: (state, action) => {
      state.productList = action.payload;
    },
    setProductListLoading: (state, action) => {
      state.productListLoading = action.payload;
    },
    setPlaceList: (state, action) => {
      state.placeList = action.payload;
    },
    setPlaceListLoading: (state, action) => {
      state.placeListLoading = action.payload;
    },
    ChangeSubmitStatusForm: (state, action) => {
      state.submitStatusForm = action.payload;
    },
    handleStatusForm: (state, action) => {
      state.statusForm = action.payload;
    },
    handleShowJson: (state, action) => {
      state.showJson = action.payload;
    },
    handleStorekeeperList: (state, action) => {
      state.storekeeperList = action.payload;
    },
    handleBuyerList: (state, action) => {
      state.buyerList = action.payload;
    },
    handleNextStatusesList: (state, action) => {
      state.nextStatusesList = action.payload;
    },
    handleType: (state, action) => {
      state.type = action.payload;
    },
    handleAddress: (state, action) => {
      state.address = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    handleSelectedItem: (state, action) => {
      state.selectedItem = action.payload;
    },
    handleSetInOut: (state, action) => {
      state.inOut = action.payload;
    },
    handleProcessId: (state, action) => {
      state.processId = action.payload;
    },
    handleNextStep: (state, action) => {
      state.nextStep = action.payload;
    },

  },
});

export const {
  handleReceiptAndRemittanceArray,
  setLoading,
  handleStatusForm,
  handleAddress,
  handleType,
  handleNextStatusesList,
  handleBuyerList,
  handleProcessId,
  handleStorekeeperList,
  handleShowJson,
  ChangeSubmitStatusForm,
  handleSelectedItem,
  handleReceiptAndRemittanceData,
  setPlaceList,
  setPlaceListLoading,
  handleHasEdit,
  setProductList,
  handleNextStep,
  setProductListLoading,
  handleSetInOut,
} = StorehouseSlice.actions;

export default StorehouseSlice.reducer;
