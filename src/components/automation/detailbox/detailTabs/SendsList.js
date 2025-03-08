import React from 'react';
import { Tag } from 'antd';
import { useLocation } from 'react-router-dom';
import { BiCheck, BiCheckDouble } from 'react-icons/bi';

const SendsList = ({ data }) => {

  const location = useLocation();
  const firstUrl = location.pathname.split('/')[2];

  return (
    <div>
      {firstUrl !== 'sent_letter' && firstUrl !== 'payment' && firstUrl !== 'request' && (<>
        <div className="defBox mb-3">
          {data.to ? (
            <div>
              <div className="mt-2 mb-2 orangeText"> ارسال به:</div>
              <div>
                {data.to?.map((item) => (
                  <Tag style={{ backgroundColor: "#fefefe",border:"1px solid #f3f3f3", color: "#666" }} bordered={false} key={item.id} className="mb-2">
                    {item.seen ? <BiCheckDouble color="#f78e20" size={22}/> : <BiCheck color="#aaa" size={22}/>}
                    {` ${item?.user?.first_name} ${item.user?.last_name} `}
                  </Tag>
                ))}
              </div>
            </div>
          ) : ''}
          {data?.cc?.length ? (<div>
            <div className="mt-4 mb-2 orangeText"> رونوشت به:</div>
            <div>
              {data.cc?.map((item) => (
                <Tag style={{ backgroundColor: "#fefefe",border:"1px solid #f3f3f3", color: "#666" }} bordered={false} key={item.id} className="mb-2">
                {item.seen ? <BiCheckDouble color="#f78e20" size={22}/> : <BiCheck color="#aaa" size={22}/>}
                {` ${item?.user?.first_name} ${item?.user?.last_name} `}
              </Tag>))}
            </div>
          </div>) : ''}
          <div>
            {data.bcc === true ?
              <div className="mt-4 mb-2 orangeText fw-bold"><BiCheckDouble color="#f78e20" size={22}/> شما در این مکاتبه رونوشت مخفی شده اید </div>
            : ''}
          </div>
        </div>
      </>)}
    </div>
  );
};

export default SendsList;