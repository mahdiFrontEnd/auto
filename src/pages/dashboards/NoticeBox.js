import React from 'react';

const NoticeBox = ({ data }) => {
  return (
    <>
      {data.notice ? (<div className="mb-4 px-3">
        <div className="defBox">


          <div className="text-center "dangerouslySetInnerHTML={{ __html: data.notice }} /></div>
      </div>) : ''}
    </>
  );
};

export default NoticeBox;