import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GoLaw } from 'react-icons/go';
import { Button } from 'antd';
import TitleBox from '../../../components/TitleBox';
import Automation from '../../../api/http_request/Model/automation/Automation';
import CreateRegulation from './CreateRegulation';
import CheckPermissionPage from '../../../permission/CheckPermissionPage';
import AttachmentsShow from '../../../components/automation/detailbox/AttachmentsShow';
import { getAgainHandler } from '../../../store/loading/LoadingSlice';
import Loader from '../../../layouts/loader/Loader';
import { getHomeData } from '../../../api/http_request/Model/User/HomeRequest';


const RegulationsPage = () => {
  const getAgain = useSelector((state) => state.loadingReducer.getAgain);
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {


    Automation.request({
      beforeSend: () => {
        setLoading(true);
      }, success: async (res) => {

        setData(res?.result);
      }, final: () => {
        setLoading(false);
      },
    }).Regulations();
  }, [getAgain]);

  const handleClickLink = (id) => {
    Automation.request({
      success: async () => {
        getHomeData(dispatch);
        dispatch(getAgainHandler());
      },
    }).RegulationsSeen(id);
  };


  return (<>
    <div className="mx-2">
      <TitleBox title="آیین نامه ها">
        <CreateRegulation />
      </TitleBox>
    </div>

    <div className="">
      <CheckPermissionPage module="regulations">
        {loading ? <Loader /> : <div className="row ">
          {data.map((item) => (<div className=" col-md-6 col-xl-4 my-2 px-2">
            <div className="h-100 defBox p-3">
              <div className=" d-flex justify-content-between  align-items-start">
                <div className="gap-1 d-flex gap-2  align-items-start">
                  <GoLaw size={22} color="orange" />
                  <h4 className="  flex-1 text-break  mb-0 fw-bold">
                    {item.title}
                  </h4>
                </div>
              </div>
              <hr />
              <div className="text-dark lh-lg" dangerouslySetInnerHTML={{ __html: item.body }} />
              <div className="mt-4">
                {item.attachments.length ?
                  <AttachmentsShow hiddenName data={item.attachments} /> : ''}
              </div>
              <div className="text-end">
                <Button className="fs-7 py-1" disabled={item.seen} onClick={() => handleClickLink(item.id)}>{item.seen ? 'خوانده شده' : 'خواندم و از مفاد مطلع شدم'}</Button>
              </div>
            </div>
          </div>))}
        </div>}
      </CheckPermissionPage>
    </div>
  </>);
};

export default RegulationsPage;
