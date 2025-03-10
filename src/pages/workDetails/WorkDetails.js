import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChartPie } from 'react-icons/fa';
import DashboardReq from '../../api/http_request/Model/dashboard/DashboardReq';
import Loader from '../../layouts/loader/Loader';
import TitleBox from '../../components/TitleBox';

const WorkDetails = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    DashboardReq.request({
      beforeSend: () => {
        setLoading(true);
      },
      success: async (res) => {
        setData(res.result);
      }, error502: async () => {
        navigate('/error/502');

      }, final: () => {
        setLoading(false);
      },
    }).Dashboard();
  }, []);

  return (<>
      <TitleBox title="جزئیات کاری" />


      {loading ? <Loader /> : <div className="defBox">
        {data.options && <>
          {data.options.partners && <div>
            <h5 className="fw-bold mb-3 text-black d-flex align-items-center gap-2">
              <span><FaChartPie /></span><span>{data.options.partners.month.title}</span></h5>
            <div className="row mb-4">
              {data.options.partners.month?.body?.map((item) => (
                <div className="col-md-6  col-xxl-4 mb-2"><span
                  style={{ fontSize: '14px' }}>{item.title}: </span><span
                  className="text-black" style={{ fontSize: '16px' }}>{item.duration_number > 0 ? item.duration : 0}</span>
                </div>))}

            </div>

          </div>}
          {data.options.partners && <div>
            <h5 className="fw-bold mb-3 text-black d-flex align-items-center gap-2">
              <span><FaChartPie /></span><span>{data.options.partners.year.title}</span></h5>
            <div className="row mb-4 ">
              {data.options.partners.year?.body?.map((item) => (
                <div className="col-md-6  col-xxl-4  mb-2"><span
                  style={{ fontSize: '14px' }}>{item.title}: </span><span
                  className="text-black" style={{ fontSize: '16px' }}>{item.duration_number > 0 ? item.duration : 0}</span>
                </div>))}</div>
          </div>}
        </>}
      </div>}
    </>


  );
};

export default WorkDetails;
