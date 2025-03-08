import React from 'react';

import DateObject from 'react-date-object';
import persian from 'react-date-object/calendars/persian';
import { AiOutlineDoubleLeft } from 'react-icons/ai';
import { Typography } from 'antd';
import { useSelector } from 'react-redux';
import AttachmentsShow from './AttachmentsShow';


const { Paragraph } = Typography;


const FormDetail = ({ data }) => {
  const automationAddress = useSelector((state) => state.automationAddressRedux.automationAddress);

  return (<>
    <div className="defBox mb-3">

      <div className="d-flex justify-content-between gap-4 flex-wrap">
        {(data.subject || data.type) && (
          <div className="d-flex align-items-center gap-2 mt-2 ">

            <AiOutlineDoubleLeft size={20} className="orangeText mb-1" />
            <h3 className="  mb-0 orangeText">
              {`${data.type && data.type}${(data.subject && data.type) ? '-' : ''}${data.subject ?? ''}`}
            </h3>
          </div>)}

      </div>

      <hr className="mb-3" />
      {data.price && (<div className="d-flex align-items-center gap-2 pb-3">

          <div>مبلغ ( ریال ):</div>
          <div className=" text-black">
            <Paragraph className="mb-0"
                       copyable={{
                         text: data.price,
                       }}
            >
              {Number(data.price).toLocaleString()}
            </Paragraph>


          </div>
        </div>

      )}

      {automationAddress === 'payment' && <>
        <div className="d-flex align-items-center gap-2 pb-3">

          <div>نوع پرداخت:</div>
          <div className=" text-black">
            {data.pay_type === 'cheque' ?   'چکی' : data.pay_type === 'cash' ? 'نقدی' : 'تنخواه'}
          </div>
        </div>
        <div className="d-flex align-items-center gap-2 pb-3">

          <div>در وجه:</div>
          <div className=" text-black">
            <Paragraph className="mb-0"
                       copyable={{
                         text: data.pay_to,
                       }}
            >
              {data.pay_to}
            </Paragraph>
          </div>
        </div>


        {data.pay_type === 'cheque' ? <div className="d-flex align-items-center gap-2 pb-3">

            <div>{data.target_type === 1 ? 'شماره ملی' : 'شناسه ملی'}:</div>
            <div className=" text-black">
              <Paragraph className="mb-0"
                         copyable={{
                           text: data.id_number,
                         }}
              >
                {data.id_number}
              </Paragraph>

            </div>
          </div>
          : <div className="d-flex align-items-center gap-2 pb-3">
            {data?.sheba && <>
              <div>شماره شبا:</div>
              <div className=" text-black">
                <Paragraph className="mb-0"
                           copyable={{
                             text: data?.sheba,
                           }}
                >
                  IR{data?.sheba}
                </Paragraph>
              </div>
            </>}
          </div>
        }
      </>}


      {data.new_price && (<div className="d-flex align-items-center gap-2 pb-3">

          <div> آخرین مبلغ ارجاع شده ( ریال ):</div>
          <div className=" text-black">
            {Number(data.new_price).toLocaleString()}
          </div>
        </div>


      )}
      {data.destination && (<div className="d-flex align-items-center gap-2 pb-3">

          <div> مقصد:</div>
          <div className=" text-black">
            {data.destination}
          </div>
        </div>

      )}
      {data.start_date && (<div className="d-flex align-items-center gap-2 pb-3">

        <div> {data.end_date ? 'از تاریخ' : 'روز'}:</div>
        <div className=" text-black">
          {data.start_date && new DateObject({
            date: data.start_date * 1000, calendar: persian,
          }).format('YYYY/MM/DD')}
        </div>
      </div>)}

      {data.end_date && (<div className="d-flex align-items-center gap-2 pb-2">

        <div> تا تاریخ:</div>
        <div className=" text-black">
          {data.end_date && new DateObject({
            date: data.end_date * 1000, calendar: persian,
          }).format('YYYY/MM/DD')}
        </div>
      </div>)}
      {data.start_time && (<div className="d-flex align-items-center gap-2 pb-3">

          <div> از ساعت:</div>
          <div className=" text-black">
            {data.start_time}
          </div>
        </div>

      )}
      {data.end_time && (<div className="d-flex align-items-center gap-2 pb-3">

          <div> تا ساعت:</div>
          <div className=" text-black">
            {data.end_time}
          </div>
        </div>

      )}
      {data.company && (<div className="d-flex align-items-center gap-2 pb-3">

        <div> شرکت:</div>
        <div className=" text-black">
          {data.company}
        </div>
      </div>)}

      {data.body && (<div>
          <div className="fs-5">
            <div style={{ color:'#666' }} dangerouslySetInnerHTML={{ __html: data.body }} />
          </div>
        </div>

      )}

      {data?.attachments?.length > 0 ? (

        <div className="d-block mb-2 mt-5 orangeText">
          <div className="mb-4"> فایل های ضمیمه ({data?.attachments?.length} مورد)</div>
          <div className="text-black" style={{ filter:'grayscale(1)' }}>
            <AttachmentsShow data={data?.attachments} />
          </div>
        </div>) : ''

      }
    </div>
  </>);
};

export default FormDetail;
;
