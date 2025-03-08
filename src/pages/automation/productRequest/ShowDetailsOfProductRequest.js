import React from 'react';
import { Collapse } from 'antd';

const ShowDetailsOfProductRequest = ({ data }) => {
  return (<div>

    <Collapse className="mb-4">
      <Collapse.Panel header="نمایش جزییات" key="1">

        <div className="row">
          <div className="col-md-6 ">
            <div className="keyValue justify-content-between mb-4">
              <div className="key">درخواست کننده:</div>
              <div className="value">{data?.created_by}</div>
            </div>
          </div>
          <div className="col-md-6 ">
            <div className="keyValue justify-content-between mb-4">
              <div className="key">شماره درخواست:</div>
              <div className="value">{data?.id}</div>
            </div>
          </div>
          <div className="col-md-6 ">
            <div className="keyValue justify-content-between mb-4">
              <div className="key">نام کالا:</div>
              <div className="value">{data?.request_name}</div>
            </div>
          </div>

          <div className="col-md-6 ">
            <div className="keyValue justify-content-between mb-4">
              <div className="key">محدودیت زمانی خرید:</div>
              <div className="value">{data?.dead_time} روز</div>
            </div>
          </div>
          <div className="col-md-6 ">
            <div className="keyValue justify-content-between mb-4">
              <div className="key">در انتظار:</div>
              <div className="value">{data?.status?.waiting_status}</div>
            </div>
          </div>
          <div className="col-md-6 ">
            <div className="keyValue justify-content-between mb-4">
              <div className="key">وضعیت:</div>
              <div className="value">{data?.status?.persian_title}</div>
            </div>
          </div>
          <div>
            <div className="keyValue align-items-start   mb-4">
              <div className="key">دلیل درخواست:</div>
              <div className="value  fs-7 text-gray fw-light"
                   dangerouslySetInnerHTML={{ __html: data?.reason?.replace(/\n/g, '<br>') }} />

            </div>
          </div>
          <div className="defBorder rounded-2 row px-0">
            <div className="col-md-6 my-2">
              <div className="keyValue justify-content-between">
                <div className="key">مقدار ثبت شده:</div>
                <div className="value">{data?.old_count_request} {data?.old_unit?.unit_value}  </div>
              </div>
            </div>

            {(data?.old_count_request !== data?.count_request || data?.old_unit?.unit_value !== data?.unit?.unit_value) &&
              <div className="col-md-6 my-2">
                <div className="keyValue justify-content-between">
                  <div className="key">مقدار ثبت شده توسط انباردار:</div>
                  <div className="value">{data?.count_request} {data?.unit?.unit_value}  </div>
                </div>
              </div>}
          </div>
        </div>
      </Collapse.Panel>
    </Collapse>


  </div>);
};

export default ShowDetailsOfProductRequest;