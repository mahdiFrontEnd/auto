import React from 'react';

const HeadersBox = () => {
  return (
    <div
      className="fw-bold fs-7 py-3 px-2 gap-2 text-black d-flex align-items-center rounded-2 border mb-2 "
      style={{ backgroundColor: '#fafafa' }}>
      <div className="flex-1 text-center">کالا</div>
      <div className="flex-1 text-center">مقدار</div>
      <div className="flex-1 text-center">محدودیت زمانی</div>
      <div className="flex-1 text-center">دلیل درخواست</div>
      <div className="text-center" style={{ width: '80px' }}>عملیات</div>
    </div>
  );
};

export default HeadersBox;
