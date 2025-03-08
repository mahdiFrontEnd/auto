import React from 'react';
import NewLoading from '../../layouts/loader/NewLoading';

const CircleChartLoading = () => {
  return (
    <div>
      <div style={{ height: '22px' }} className="mb-4 rounded-2 overflow-hidden">

        <NewLoading />
      </div>

      <div style={{ height: '22px' }} className="mb-2 rounded-2 overflow-hidden">

        <NewLoading />
      </div>


      <div style={{ height: '22px' }} className="mb-2 rounded-2 overflow-hidden">

        <NewLoading />
      </div>

      <div style={{ height: '150px', width: '150px' }}
           className="mb-2 rounded-circle m-auto overflow-hidden">

        <NewLoading />
      </div>
    </div>
  );
};

export default CircleChartLoading;