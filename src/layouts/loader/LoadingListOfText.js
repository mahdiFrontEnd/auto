import React from 'react';
import { nanoid } from 'nanoid';
import NewLoading from './NewLoading';

const LoadingListOfText = ({
                             style = { height: '20px' },
                             className = 'rounded-2 overflow-hidden mb-3',
                             number = 1,
                           }) => {

  const arr = [...Array(number).keys()].map(i => i + 1);
  return (
    <div>
      {arr.map(() => (
        <div key={nanoid()} style={style} className={className}><NewLoading /></div>
      ))}
    </div>
  );
};

export default LoadingListOfText;