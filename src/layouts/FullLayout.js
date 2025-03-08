import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from 'reactstrap';
import Header from './header/Header';
import { getHomeData } from '../api/http_request/Model/User/HomeRequest';
import Sidebar from './sidebars/Sidebar2';

const FullLayout = () => {
  const dispatch = useDispatch();
  const showSidebar = useSelector((state) => state.customizer.showSidebar);


  useEffect(() => {
    getHomeData(dispatch, true);
  }, []);

  return (<main>
    <div className={`pageWrapper d-md-block d-lg-flex  ${showSidebar ? 'showSidebar' : ''}`}>
      <Sidebar />
      <Header />
      <div className="d-flex justify-content-end  w-100">

        <div className="contentArea">

          <Container fluid className="p-0">

            <Outlet />
          </Container>
        </div>
      </div>
    </div>
  </main>);
};

export default FullLayout;
