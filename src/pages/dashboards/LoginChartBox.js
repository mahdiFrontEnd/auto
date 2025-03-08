import React from 'react';
import { nanoid } from 'nanoid';
import TimeInBox from '../automation/attendance/TimeInBox';
import TimeOutBox from '../automation/attendance/TimeOutBox';
import LoadingListOfText from '../../layouts/loader/LoadingListOfText';


const LoginChartBox = ({ data, isAdmin }) => {
   return (<div className="defBox h-100  ">
    <h5 className="mb-4 fw-bold text-black ئذ-3">ورود خروج ها </h5>
    <div>
      <div className="d-flex mb-3 align-items-center justify-content-between fw-bold text-black">
        <span className="flex-2 text-center">{isAdmin ? 'نام' : 'تاریخ'}</span>
        <span className="flex-1 text-center">ورود</span>
        <span className="flex-1 text-center">خروج</span>
      </div>


      {data?.length
        ?
        <>
          {
            data?.map((item) => (
              <div key={nanoid()} className="d-flex mb-3  align-items-center  justify-content-between text-black">
            <span
              className="fs-7 flex-2 text-center ellipsis-column">{isAdmin ? (`${item?.user?.first_name} ${item?.user?.last_name}`) : item.date}</span>
                <span className="fs-7 flex-1 text-center"><TimeInBox item={item} /></span>
                <span className="fs-7 flex-1 text-center"><TimeOutBox item={item} /></span>
              </div>

            ))
          }

        </>
        :

        <LoadingListOfText number={6}   />
      }


    </div>
  </div>);
};

export default LoginChartBox;