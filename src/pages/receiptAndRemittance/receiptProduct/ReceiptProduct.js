import { Link } from 'react-router-dom';
import React, { useEffect } from 'react';
import { LuPlus } from 'react-icons/lu';
import CreatorTable from '../../../components/MicroComponents/table/CreatorTable';
import DeleteFilterTable from '../../../components/MicroComponents/DeleteFilterTable';
import TitleBox from '../../../components/TitleBox';
import IconBtn from '../../../components/MicroComponents/button/IconBtn';
import ReceiptProductColumn from './ReceiptProductColumn';
import ResetInventoryState from '../ResetInventoryState';


const ReceiptProduct = ({ address }) => {
  const [columns] = ReceiptProductColumn(address);


  const [resetStates] = ResetInventoryState();
  useEffect(() => {
    resetStates();

  }, []);



  return (<>
    <TitleBox title="رسید کالا">
      <DeleteFilterTable />
      <Link to={`${address}/store`}>
        <IconBtn btnClass="greenIconBtn" icon={<LuPlus size={22} />} />
      </Link>
    </TitleBox>
    <CreatorTable columns={columns} listAddress="process/form" />
  </>);
};


export default ReceiptProduct;