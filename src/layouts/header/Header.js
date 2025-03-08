import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


import { Button, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';
import { RiMenu4Line } from 'react-icons/ri';
import { Badge, ConfigProvider } from 'antd';
import { CalendarEdit } from 'iconsax-react';
import { ToggleShowSidebar } from '../../store/customizer/CustomizerSlice';
import ProfileDD from './ProfileDD';
import { imageOnError, imageOnLoad } from '../../functions';
import BrokenImage from '../../assets/images/users/user0.PNG';
import ClockBox from './ClockBox';
import NotifSidebar from './NotifSidebar';

const Header = () => {
  const showSidebar = useSelector((state) => state.customizer.showSidebar);
  const notifCount = useSelector((state) => state.loadingReducer.notifCount);
  const loginUser = useSelector((state) => state.profilesReducer.loginUser);
  const dispatch = useDispatch();


  return (<div className="fixedTopbar  ">
    <div className="d-flex h-100  align-items-center justify-content-between"
         style={{ borderBottom: '1px solid #49577747' }}>
      <div className="d-flex   align-items-center">
        <Button
          className=" mx-1 bg-transparent border-0"
          onClick={() => dispatch(ToggleShowSidebar(!showSidebar))}
        >
          <RiMenu4Line size={25} color="#333" />
        </Button>
        <ClockBox />
      </div>
      <div className="text-gray d-flex align-items-center gap-4">

        <Link to="/BlackBoard"> <ConfigProvider
          direction="ltr"
        >
          <Badge color="orange" count={notifCount?.calendar_count}><CalendarEdit size={25} /></Badge>
        </ConfigProvider>
        </Link>

        {/*<ParentDropDown />*/}
        <NotifSidebar />


        {/**********WorkDetails DD**********/}
        <UncontrolledDropdown>
          <DropdownToggle className="p-1" color="transparent">
            <img
              alt="user"
              className="defShadow main-img img-responsive img-circle"
              id="user"
              src={loginUser?.image || BrokenImage}
              width={50}
              height={50}
              onLoad={imageOnLoad}
              onError={imageOnError}
            />
          </DropdownToggle>
          <DropdownMenu className="ddWidth profile-dd text-start bg-white py-0 defBorder">
            <ProfileDD user={loginUser} />

          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    </div>
  </div>);
};

export default Header;
