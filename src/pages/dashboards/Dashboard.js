import { useDispatch, useSelector } from 'react-redux';

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardReq from '../../api/http_request/Model/dashboard/DashboardReq';
import { whatIsStatusCode } from '../../store/loading/LoadingSlice';
import LeaveTimeBox from './LeaveTimeBox';
import MissionBox from './MissionBox';
import OvertimeBox from './OvertimeBox';
import LoginChartBox from './LoginChartBox';
import CalendarBox from './CalendarBox';
import BirthdateBox from './BirthdateBox';
import ManagersBox from './ManagersBox';
import NoticeBox from './NoticeBox';
import CommentsDashboardBox from './CommentsDashboardBox';
import RefersDashboardBox from './RefersDashboardBox';
import MessagesDashboardBox from './MessagesDashboardBox';
import OnlineSidebar from './OnlineSidebar';


const Dashboard = () => {
    const dispatch = useDispatch();

    const getAgain = useSelector((state) => state.loadingReducer.getAgain);
    const [data, setData] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
      DashboardReq.request({
        success: async (res) => {
          setData(res.result);
        }, error502: async () => {
          navigate('/error/502');
          dispatch(whatIsStatusCode(502));
        },
      }).Dashboard();
    }, [getAgain]);


    return (<div className="d-flex">
      <div className="flex-1">

        <div className="row">

          <div className="mb-4 col-lg-6 col-xl-4 col-xxl-3">
            <LeaveTimeBox data={data?.options?.partners} />
          </div>
          <div className="mb-4 col-lg-6 col-xl-4 col-xxl-3">
            <MissionBox data={data?.options?.partners} />
          </div>
          <div className="mb-4 col-lg-6 col-xl-4 col-xxl-3">
            <OvertimeBox data={data?.options?.partners} />
          </div>
          <div className="mb-4 col-lg-6 col-xl-4 col-xxl-3">
            <LoginChartBox data={data?.options?.attendance} isAdmin={data?.options?.is_admin} />
          </div>

          <div className="mb-4 col-lg-6 col-xl-4 col-xxl-3"><RefersDashboardBox data={data?.options?.referer} /></div>
          <div className="mb-4 col-lg-6 col-xl-4 col-xxl-3"><CommentsDashboardBox data={data?.options?.comment} /></div>
          <div className="mb-4 col-lg-6 col-xl-4 col-xxl-3"><MessagesDashboardBox data={data?.options?.message} /></div>

          <CalendarBox data={data} />
          <BirthdateBox data={data} />
          <ManagersBox data={data} />

        </div>

        <NoticeBox data={data} />

      </div>

      <OnlineSidebar/>

    </div>)
      ;
  }
;

export default Dashboard;
