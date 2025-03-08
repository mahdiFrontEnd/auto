import React from 'react';
import { Link } from 'react-router-dom';
import { nanoid } from 'nanoid';

const LinkToAutomation = ({data,tab}) => {
  return (
    <div>
      {
        data?.map((item) => (
          <div className="d-flex align-items-center gap-2 mb-3" key={nanoid()}>
            <div className={` ${item.seen ? 'bg-grayLight' : 'bg-primary'}`}
                 style={{ width: '8px', height: '8px' }} />
            <Link className="text-black fs-7 ellipsis-column mw-100"
                  to={`/automation/${item.request?.category}/${item.request?.category}_detail/${item.request?.id}?activeTab=${tab}`}>{item.request?.subject}</Link>
          </div>


        ))
      }
    </div>
  );
};

export default LinkToAutomation;