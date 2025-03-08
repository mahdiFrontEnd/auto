import React from 'react';
import { Edit, Trash } from 'iconsax-react';
import { useDispatch, useSelector } from 'react-redux';
import { handleReceiptAndRemittanceArray } from '../../../../../store/storehouse/StorehouseSlice';
import IconBtn from '../../../../../components/MicroComponents/button/IconBtn';

const EditDelRow = ({index}) => {
  const { receiptAndRemittanceArray } = useSelector((state) => state.Storehouse);
  const dispatch = useDispatch();
  const handleDelete = () => {
    const newArrayData = [...receiptAndRemittanceArray];
    newArrayData.splice(index, 1);
    dispatch(handleReceiptAndRemittanceArray(newArrayData));
  };
  const handleEdit = () => {

    const newArrayData = receiptAndRemittanceArray.map((item, i) => {
      return { ...item, editable: i === index };
    });

    const newIndex = newArrayData.findIndex(item => item.isEmpty === true);
    newArrayData.splice(newIndex, 1);
    dispatch(handleReceiptAndRemittanceArray(newArrayData));
  };
  return (
    <div className="d-flex gap-2 align-items-center justify-content-center " style={{ width: '80px' }}>

      <IconBtn onClick={handleEdit} btnClass="orangeIconBtn" icon={<Edit size="20" />} />
      <IconBtn onClick={handleDelete} btnClass="redIconBtn" icon={<Trash size="20" />} />
    </div>
  );
};

export default EditDelRow;