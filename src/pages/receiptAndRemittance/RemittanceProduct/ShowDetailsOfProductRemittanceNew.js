import React from 'react';
import { Collapse } from 'antd';
import { useSelector } from 'react-redux';
// import dayjs from 'dayjs';

const ShowDetailsOfProductRemittanceNew = ({ data }) => {
  const { receiptAndRemittanceData } = useSelector((state) => state.Storehouse);

  return (<div>

    <Collapse className="mb-4">
      <Collapse.Panel header="نمایش جزییات" key="1">

        <div className="row">
          <div className="col-md-6 ">
            <div className="keyValue justify-content-between mb-4">
              <div className="key">شماره درخواست:</div>
              <div className="value">{data?.id}</div>
            </div>
          </div>

          <div className="col-md-6 ">
            <div className="keyValue justify-content-between mb-4">
              <div className="key">وضعیت:</div>
              <div style={{ color: data?.status?.colors }} className="value">{data?.status?.description}</div>
            </div>
          </div>
          <div className="col-md-6 ">
            <div className="keyValue justify-content-between mb-4">
              <div className="key">در انتظار:</div>
              <div
                className="value">{data.accessible_users ? (`${data?.accessible_users.first_name} ${data?.accessible_users.last_name}`) : '.....'}</div>
            </div>
          </div>
          <div className="col-md-6 ">
            <div className="keyValue justify-content-between mb-4">
              <div className="key">درخواست دهنده:</div>
              <div
                className="value">{`${receiptAndRemittanceData?.user?.first_name} ${receiptAndRemittanceData?.user?.last_name}`}</div>
            </div>


          </div>

          <div>
            <div className="keyValue  mb-4">
              <div className="key">دلیل درخواست:</div>
              <div className="value">{data?.reason}</div>
            </div>
          </div>
        </div>
      </Collapse.Panel>
    </Collapse>


  </div>);
};

export default ShowDetailsOfProductRemittanceNew;