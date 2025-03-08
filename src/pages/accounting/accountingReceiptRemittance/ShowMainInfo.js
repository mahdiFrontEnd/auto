import React from 'react';
import dayjs from 'dayjs';
import { Button } from 'antd';
import { receiptAndRemittanceArray } from '../../../helper/jsons/receiptAndRemittanceArray';

const ShowMainInfo = ({ data, showSubmitBtn }) => {
  console.log(data);
  return (

    <div className="defBox px-0 mb-2 pt-4">
      <div className="row row-gap-4">
        <div className="col-sm-6  col-md-4 col-lg-3 ">

          <div className="keyValue">
            <div className="key">ایجاد کننده:</div>
            <div className="value">{`${data?.create_by?.first_name} ${data?.create_by?.last_name}`}</div>
          </div>
        </div>
        <div className="col-sm-6  col-md-4 col-lg-3 ">
          <div className="keyValue">
            <div className="key">زمان ایجاد:</div>
            <div className="value"> {dayjs(data?.created_at).format('HH:mm YYYY-MM-DD')}</div>
          </div>
        </div>
        {/*<div className="col-sm-6  col-md-4 col-lg-3 ">*/}

        {/*  <div className="keyValue">*/}
        {/*    <div className="key">عنوان:</div>*/}
        {/*    <div className="value">{data?.title}</div>*/}
        {/*  </div>*/}
        {/*</div>*/}

        <div className="col-sm-6  col-md-4 col-lg-3 ">

          <div className="keyValue">
            <div className="key">نوع ورود خروج:</div>
            <div className="value">{data?.in_out?.search('in') > -1 ? 'ورود به انبار' : 'خروج از انبار'}</div>
          </div>
        </div>

        <div className="col-sm-6  col-md-4 col-lg-3 ">

          <div className="keyValue">
            <div className="key">نوع گردش در انبار:</div>
            <div className="value">{receiptAndRemittanceArray.find(i => i.eName === data?.type)?.fName}</div>
          </div>
        </div>
        <div className="col-sm-6  col-md-4 col-lg-3 ">

          <div className="keyValue">
            <div className="key">توضیحات:</div>
            <div className="value">{data?.description}</div>
          </div>
        </div>
      </div>
      {
        showSubmitBtn ?
          <div className=" px-4 d-flex justify-content-end mt-3"><Button className="defBtn bgGreenBtn px-4 py-3 "
                                                                         htmlType="submit">ارسال اطلاعات</Button>
          </div> : ''
      }
    </div>

  );
};

export default ShowMainInfo;