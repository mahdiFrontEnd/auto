import React from 'react';
import { Typography } from 'antd';

const { Paragraph } = Typography;


const CalendarBox = ({ data }) => {
  return (
    <>
      {(data.calendar?.to_pending.length || data.calendar?.reply_pending.length) ? (

        <div className=" col-md-6 col-xl-4 col-xxl-3">
          {data.calendar.to_pending.length ?
            <div className="mb-4 defBox overflow-auto custom-scroll"
                 style={{ minHeight: '240px',maxHeight: '240px' }}
            >
              <h5 className="mb-4  fw-bold text-black">    تسک های تقویمی ارجاع شده به شما </h5>
              {data.calendar.to_pending.map((item, index) => (
                <div key={item.id}>


                  <Paragraph className="mb-0 fw-bold" ellipsis={{ rows: 1 }}>
                    {item.title}
                  </Paragraph>


                  <div className="d-flex justify-content-between gap-2 fs-7">


                    <span>{item.from_user.first_name} {item.from_user.last_name}</span>

                    <span>{item.year}/{item.month}/{item.day}</span>
                  </div>
                  {data.calendar.to_pending[index + 1] ? <hr /> : ''}
                </div>


              ))}</div> : <div className="defBox">
              <p>هیچ تسک تقویمی به شما ارجاع داده نشده است.</p>
            </div>}


          {data.calendar.reply_pending.length ? (


            <div className="defBox mb-4 overflow-auto custom-scroll"
                 style={{ maxHeight: '212px' }}
            >



              <h5 className="mb-4  fw-bold text-black">   گزارش های ارسال شده به شما</h5>


              {data.calendar.reply_pending.map((item, index) => (

                <div key={item.id}>


                  <Paragraph className="mb-0 fw-bold" ellipsis={{ rows: 1 }}>
                    {item.title}
                  </Paragraph>
                  <div className="d-flex justify-content-between gap-2 fs-7">


                    <span>{item.from_user.first_name} {item.from_user.last_name}</span>

                    <span>{item.year}/{item.month}/{item.day}</span>
                  </div>
                  {data.calendar.reply_pending[index + 1] ? <hr /> : ''}
                </div>


              ))}</div>

          ) : ''
          }
        </div>


      ) : ''}
    </>
  );
};

export default CalendarBox;