import React from 'react';
import { Tooltip } from 'antd';
import { LuScanFace } from 'react-icons/lu';
import { FaFingerprint } from 'react-icons/fa';

const TimeOutBox = ({item}) => {
  return (
    <div>
      <div
        className={`d-flex align-items-center gap-2 justify-content-center   ${(item.tajil && !item.tatil) ? 'text-danger' : 'text-grayLight'}`}>
        {item.type ? <span>{item.type[1] === 'face' ?
          <Tooltip title="پایان با اسکن چهره">
            <LuScanFace size={20} /></Tooltip>
          : item.type[1] === 'finger' ?
            <Tooltip title="پایان با اثر انگشت"><FaFingerprint size={18} /></Tooltip> : '...'}</span> : '...'}
        <span className={(item.tajil && !item.tatil) ? 'text-danger ' : 'text-black'}>{item.time_out}</span>

      </div>
    </div>


  );
};

export default TimeOutBox;