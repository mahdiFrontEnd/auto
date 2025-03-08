import React from 'react';
import { Tag } from 'antd';
import EditRefer from './EditRefer';

const RefersDetail = ({ data }) => {
  return (


    <div className="defBox mb-3">
      <div className="d-flex justify-content-between w-100 ">
        <div>
          {data.body && (<div className=" p-0" dangerouslySetInnerHTML={{ __html: data.body }} />)}
        </div>
        <EditRefer data={data} />
      </div>
      <div className="w-100 d-flex align-items-end gap-4">
        <div className="flex-grow-1 my-2">

          {data.price && <div className="">قیمت : {Number(data.price).toLocaleString()} ریال</div>}
          <div className="d-flex fs-7 flex-wrap align-items-center  gap-2">
            <span>ارجاع شده از </span>
            <span> {data.created_by} </span>
            <span> به </span>
            {
              data.users.map((item) => (
                <Tag bordered={false} style={{ color: '#999' }} key={item.user_id}>{item.name}</Tag>
                // <divclassName='  whiteTag white-space-nowrap '>{item.name}</div>
              ))
            } </div>

        </div>
        <div className="white-space-nowrap my-2 text-black-50 fs-7">
          <span>{data.created_at}</span>
        </div>
      </div>
    </div>
  );
};

export default RefersDetail;
