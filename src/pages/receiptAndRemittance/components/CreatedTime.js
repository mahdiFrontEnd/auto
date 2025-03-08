import React from 'react';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';

const CreatedTime = () => {
  const { receiptAndRemittanceData } = useSelector((state) => state.Storehouse);

  return (
    <div className="mb-4  d-flex gap-2 align-items-center keyValue">
      <span className="key"> تاریخ درخواست:</span>

      <span className="value">
        {dayjs(receiptAndRemittanceData.created_at).format('HH:mm / YYYY-MM-DD')}
      </span>
    </div>
  );
};

export default CreatedTime;
