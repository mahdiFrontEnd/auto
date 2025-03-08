import React from 'react';
import LinkToAutomation from './LinkToAutomation';
import LoadingListOfText from '../../layouts/loader/LoadingListOfText';

const RefersDashboardBox = ({ data }) => {
  return (
    <div className="defBox h-100 ">
      <h5 className="mb-4  fw-bold text-black"> ارجاعی ها </h5>
      {data ? <LinkToAutomation data={data} tab={3} /> : <LoadingListOfText number={5} />}
    </div>
  );
};

export default RefersDashboardBox;