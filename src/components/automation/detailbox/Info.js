import React, { useEffect, useState } from 'react';
import { BsPinAngle, BsPinAngleFill } from 'react-icons/bs';
import { favoriteAdd } from '../../../api/automation/favorite';
import AutomationFunctionButtons from '../AutomationFunctionButtons/AutomationDetailButtons';
import { imageOnError, imageOnLoad } from '../../../functions';
import IconBtn from '../../MicroComponents/button/IconBtn';

const InfoDetail = ({ data }) => {
  const [statusTitle, setStatusTitle] = useState('');
  const [favorite, setFavorite] = useState();
  useEffect(() => {
    setStatusTitle(data.status_title);

    setFavorite(data.is_favorited);
  }, [data]);


  return (<div className="defBox mb-3 position-relative">

    <IconBtn
      icon={
        favorite ? <BsPinAngle size={22} color="#FFC107" />
          : <BsPinAngleFill size={22} color="#495057" />
      }
      onClick={() => {

        favoriteAdd(data.id, favorite, (res) => {
          setFavorite(res.result.is_favorited);
        }, null, null, null);


      }} btnClass=" mx-2 p-0 position-absolute left-0 top-0 mt-2 ml-0"
    />

    <div className="d-flex d-lg-block gap-2 justify-content-center align-items-center">
      <div className="text-center">
        <img
          src={data.image_of_created_by ?? '/noImage.png'}
          className="rounded-circle"
          width="150"
          alt="avatar"
          onLoad={imageOnLoad}
          onError={imageOnError}
        />
      </div>


      <h6 className="fw-bold mt-3 mb-0 text-center ">
        {data.created_by}
      </h6>
    </div>
    <hr />

    <div className="fs-6">
      <div className="flex-1 d-flex mb-3 justify-content-between align-items-center ">
        <div>تاریخ :</div>
        <div>
          {data.created_at}
        </div>
      </div>
      <div className="flex-1 d-flex  justify-content-between align-items-center ">
        <div>
          <div>شماره نامه:</div>
        </div>
        <div>
          {data.number}
        </div>
      </div>
    </div>
    <div className="d-flex justify-content-between align-items-end mt-3">


      <AutomationFunctionButtons row={data}
                                 statusTitle={statusTitle} />


    </div>
  </div>)
    ;
};

export default InfoDetail;
