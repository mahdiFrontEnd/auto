import { useDispatch } from 'react-redux';
import {
  ChangeSubmitStatusForm,
  defReceiptAndRemittanceData,
  handleAddress,
  handleBuyerList,
  handleHasEdit,
  handleNextStatusesList, handleNextStep, handleProcessId,
  handleReceiptAndRemittanceArray,
  handleReceiptAndRemittanceData, handleSelectedItem, handleSetInOut,
  handleShowJson, handleStatusForm,
  handleStorekeeperList,
  handleType,
  setLoading, setPlaceList, setPlaceListLoading,
  setProductList,
  setProductListLoading,
} from '../../store/storehouse/StorehouseSlice';

const ResetInventoryState = () => {
  const dispatch = useDispatch();

  const resetStates = () => {

    dispatch(handleReceiptAndRemittanceArray([]));
    dispatch(handleReceiptAndRemittanceData(defReceiptAndRemittanceData));
    dispatch(handleHasEdit(false));
    dispatch(setProductList([]));
    dispatch(setProductListLoading(false));
    dispatch(handleShowJson({}));
    dispatch(handleStorekeeperList([]));
    dispatch(handleBuyerList([]));
    dispatch(handleNextStatusesList([]));
    dispatch(handleType('store'));
    dispatch(setLoading(false));
    dispatch(ChangeSubmitStatusForm(true));
    dispatch(handleAddress('store'));
    dispatch(handleStatusForm([]));
    dispatch(handleProcessId(1));
    dispatch(handleSelectedItem([]));
    dispatch(setPlaceList([]));
    dispatch(setPlaceListLoading(false));
    dispatch(handleNextStep(""));
    dispatch(handleSetInOut("out"));






  };

  return [resetStates];
};

export default ResetInventoryState;