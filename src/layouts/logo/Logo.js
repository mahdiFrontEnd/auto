import React from 'react';
import LogoWhite from '../../assets/images/logos/hasel-novin (1).svg';
import LogoWhiteSingle from '../../assets/images/logos/logo.png';

const Logo = ({ width = 170 }) => {
  return (
    <>

      <img className="d-md-none" src={LogoWhiteSingle} alt="logoWhite" width={50} />
      <img className="d-none d-md-block" src={LogoWhite} alt="logoWhite" width={width} />

    </>
  );
};

export default Logo;

