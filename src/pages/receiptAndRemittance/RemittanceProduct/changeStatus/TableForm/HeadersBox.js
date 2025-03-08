import React from 'react';
import { useSelector } from 'react-redux';

const HeadersBox = () => {
  const { receiptAndRemittanceArray } = useSelector((state) => state.Storehouse);
  const status = receiptAndRemittanceArray[0]?.status;

  const showJson = status?.options || {};
  return (
    <div
      className="fw-bold fs-7 py-3 px-2 gap-2 text-black d-flex align-items-center rounded-2 border mb-2 "
      style={{ backgroundColor: '#fafafa' }}
    >
      <div className="flex-1 text-center">کالا</div>
      <div className="flex-1 text-center">مقدار</div>
      <div className="flex-1 text-center">دلیل درخواست</div>
      {showJson?.description ? <div className="flex-1 text-center">توضیحات</div> : ''}
      {showJson?.warehouse ? <div className="flex-1 text-center">مقدار از هر انبار</div> : ''}
      {showJson?.Operation ? <div className="flex-1 text-center" style={{ width: 'auto' }}>عملیات</div>:""}
      <div>نمایش</div>
    </div>
  );
};

export default HeadersBox;
