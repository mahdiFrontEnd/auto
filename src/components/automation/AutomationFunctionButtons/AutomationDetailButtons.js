import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import DeleteBox from './DeleteBox';
import StatusBox from './StatusBox';
import PayBox from './PayBox';
import Reistered from './Registered';
import GetFactorBox from './GetFactorBox';

const AutomationFunctionButtons = ({ row, statusTitle }) => {
  const navigate = useNavigate();
  const automationAddress = useSelector((state) => state.automationAddressRedux.automationAddress);

  return (<div className="d-flex gap-1 w-100 flex-1 justify-content-end  flex-wrap">
    <StatusBox rowData={row} statusTitle={statusTitle} inDetail />
    <PayBox rowData={row} inDetail />
    {automationAddress === 'sent_letter' && <Reistered rowData={row} inDetail />}


    <DeleteBox type="textBtn" rowData={row} onSuccess={() => {
      navigate(`/automation/${automationAddress}`);
    }} />
    {automationAddress === 'payment' && <GetFactorBox rowData={row} />}
  </div>);
};

export default AutomationFunctionButtons;