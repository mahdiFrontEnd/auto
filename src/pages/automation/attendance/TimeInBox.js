import React from 'react';
import { Tooltip } from 'antd';
import { LuScanFace } from 'react-icons/lu';
import { FaFingerprint } from 'react-icons/fa';

const TimeInBox = ({ item }) => {
  return (
    <div>
      <div
        className={`d-flex align-items-center gap-2 justify-content-center   ${(item.takhir && !item.tatil) ? 'text-danger' : 'text-grayLight'}`}>
        {item.type ? <span>{item.type[0] === 'face' ?
          <Tooltip title="شروع با اسکن چهره">
            <LuScanFace size={20} /></Tooltip>
          : item.type[0] === 'finger' ?
            <Tooltip title="شروع با اثر انگشت"><FaFingerprint size={18} />
            </Tooltip> : '...'}</span> : '...'}
        <span className={(item.takhir && !item.tatil) ? 'text-danger' : 'text-black'}>{item.time_in}</span>
      </div>
    </div>
  );
};

export default TimeInBox;