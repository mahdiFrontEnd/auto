import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

import { Card, CardBody } from 'reactstrap';

import LogoWhite from '../assets/images/logos/hasel-novin (1).svg';

const LoginLayout = () => {
  const navigate = useNavigate();
  const token = Cookies.get('token');
  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, []);
  return (<div className="d-flex align-items-center justify-content-center">

    <div className="fullscreen-bg__video">
      <video muted autoPlay loop>
        <source src="/video/bg.mp4" type="video/mp4" />
      </video>
    </div>

{/*    <div className="loginBox"></div>*/}
    <Card className="shadow-none rounded-0 login-form">
      <CardBody className="px-4 border-0 d-flex align-items-center justify-content-center flex-column">
        <div className="d-flex justify-content-center mb-5">
          <img src={LogoWhite} alt="logoWhite" width={220} />
        </div>
        <Outlet />
      </CardBody>
    </Card>
  </div>);
};

export default LoginLayout;
