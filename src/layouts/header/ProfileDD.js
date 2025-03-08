import React from 'react';

import { Link, useNavigate } from 'react-router-dom';
import { Button, DropdownItem } from 'reactstrap';
import { Lock, MenuBoard, User } from 'iconsax-react';
import BrokenImage from '../../assets/images/users/user0.PNG';
import { imageOnError, imageOnLoad } from '../../functions';
import Auth from '../../api/http_request/Model/auth/Auth';
import { deleteAllCookies } from '../../helper/deleteAllCookies';

const ProfileDD = ({ user }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Auth.request({
      beforeSend: () => {
        deleteAllCookies();
        navigate('/login');
      },
    }).logout();
  };
  return (

    <>
      <DropdownItem className=" px-0   text-dark">
        <Link to="/profile" className="active-text-white  text-dark text-decoration-none">
          <div className="d-flex gap-1 p-2 align-items-center">
            <img
              src={user?.image || BrokenImage}
              alt="user"
              className="main-img img-responsive img-circle"
              id="imagePreview"
              width={40}
              height={40}
              onLoad={imageOnLoad}
              onError={imageOnError}
            />
            <span>
          <h5 className=" ">
            <span>{user?.first_name} </span>
            <span>{user?.last_name} </span>
          </h5>
          <small className="fs-6 text-muted">نام کاربری: {user?.username}</small>
        </span>
          </div>
        </Link>
      </DropdownItem>
      <DropdownItem divider className="my-0 " />
      <DropdownItem className=" px-0 py-3 text-dark"> <Link to="/profile"
                                                            className="active-text-white text-dark text-decoration-none">
        <div className="d-flex px-2 align-items-center gap-1">

          <span className="px-2   ms-1"><User variant="Bold" size={20} /></span>
          <span> پروفایل من</span>
        </div>
      </Link>
      </DropdownItem>
      <DropdownItem divider className="my-0 " />
      <DropdownItem className=" px-0 py-3">
        <Link to="/WorkDetails">
          <div className="d-flex px-2 align-items-center gap-1" style={{ color: 'rgb(95, 95, 95)' }}>
            <span className="px-2   ms-1"><MenuBoard variant="Bold" size={20} /></span>
            <div className="">جزئیات کاری</div>
          </div>
        </Link>
      </DropdownItem>
      <DropdownItem divider className="my-0 " />
      <Link to="/profile/ChangePwd"><DropdownItem className=" px-0   py-3  ">

        <div className="d-flex px-2 align-items-center gap-1" style={{ color: 'rgb(95, 95, 95)' }}>
          <span className="px-2   ms-1"><Lock variant="Bold" size={20} /></span>
          <div className="">تغییر رمز عبور</div>
        </div>

      </DropdownItem></Link>
      <DropdownItem divider  className="my-0 "  />
      <div className="px-2 py-2">
        <Button
          onClick={() => {
            handleLogout();
          }}
          className="border-danger bg-white text-danger fw-bold"
          size="sm"
          block
        >
          خروج
        </Button>
      </div>
    </>

  );
};

export default ProfileDD;
