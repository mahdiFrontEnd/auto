import React from 'react';
import LinkToAutomation from './LinkToAutomation';
import LoadingListOfText from '../../layouts/loader/LoadingListOfText';

const CommentsDashboardBox = ({ data }) => {
  return (
    <div className="defBox h-100">
      <h5 className=" mb-4 fw-bold text-black"> کامنت ها </h5>
      {data ? <LinkToAutomation data={data} tab={2} /> : <LoadingListOfText number={5} />}
    </div>
  );
};

export default CommentsDashboardBox;