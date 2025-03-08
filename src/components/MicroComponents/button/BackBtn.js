import React from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { MdOutlineArrowBack } from 'react-icons/md';

const BackBtn = () => {
  const navigate = useNavigate();

  return (
    <Button className="defBtn grayBtn "
            onClick={() => {
              navigate(-1);
            }}>
      <span className="">بازگشت</span>
      {/*<i className="bi bi-arrow-left-short fs-2 d-flex"></i>*/}
      <MdOutlineArrowBack size={20} />

    </Button>
  );
};

export default BackBtn;