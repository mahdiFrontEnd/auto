import React from 'react';
import { useSelector } from 'react-redux';
import HeadersBox from './HeadersBox';
import NewLoading from '../../../../../layouts/loader/NewLoading';
import ChangeStatusBox from './ChangeStatusBox';

const TableForm = () => {
  const { loading } = useSelector((state) => state.Storehouse);
  return (
    <div className="" style={{overflow:"auto"}}>
      <div className="" style={{minWidth:"800px"}}>
      <HeadersBox />
      {!loading ? (
        <ChangeStatusBox />
      ) : (
        <>
          {Array.from(Array(3).keys()).map((item) => (
            <div
              key={item}
              style={{ height: '40px' }}
              className="mb-2 rounded-2 overflow-hidden w-100"
            >
              <NewLoading />
            </div>
          ))}
        </>
      )}
    </div>
    </div>
  );
};

export default TableForm;
