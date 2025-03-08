import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import EditBox from './EditBox';
import PrepaymentBox from '../AutomationFunctionButtons/PrePrintBox';


const ExtraDetailAutomationDetail = ({
                                       PrintButton, data,
                                     }) => {
  const automationAddress = useSelector((state) => state.automationAddressRedux.automationAddress);
const [newData,setNewData]=useState(data)

  useEffect(() => {
    setNewData(data)
  }, [data]);


  return (
    <div>
      <div className="flex-1 d-flex align-items-center gap-1 justify-content-end">
        {PrintButton}
        <EditBox data={newData} />
        {automationAddress === 'payment' && <div className="w-fit-content"><PrepaymentBox rowData={newData} /></div>}
      </div>
    </div>
  );
};

export default ExtraDetailAutomationDetail;