import React from 'react';

import { useSelector } from 'react-redux';
import CreatedTime from '../../../components/CreatedTime';
import CreatedBy from './CreatedBy';
import NewLoading from '../../../../../layouts/loader/NewLoading';
import TitleBox from '../../../../../components/TitleBox';


const TopBoxData = () => {

  const { loading, receiptAndRemittanceData } = useSelector((state) => state.Storehouse);


  return (
    <div className="mb-3 defBox">
      <TitleBox title="رسید کالا"></TitleBox>
      {!loading
        ?
        <div className="">
          <div className="d-flex  align-items-center column-gap-4 flex-wrap  justify-content-between">
            <CreatedBy />
            {/*<div className="mb-4  d-flex gap-2 align-items-center keyValue">*/}
              {/*<span className="key"> عنوان درخواست:</span><span*/}
              {/*className="value">{receiptAndRemittanceData.request_name}</span></div>*/}
            <CreatedTime />

          </div>
          <div className="flex-1 d-flex gap-2 align-items-center keyValue">
            <span className="key"> توضیحات درخواست:</span><span
            className="value">{receiptAndRemittanceData.description}</span></div>
        </div>

        :
        <div style={{ height: '48px' }} className="mb-2 rounded-2 overflow-hidden w-100">
          <NewLoading />
        </div>
      }
    </div>
  );
};


export default TopBoxData;