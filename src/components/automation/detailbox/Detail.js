import React, { useEffect, useRef, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Badge } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Tabs as TabsAntd } from 'antd';
import { AiOutlineFileSearch } from 'react-icons/ai';
import { FaRegComment } from 'react-icons/fa';
import { TbEyeOff, TbTransfer } from 'react-icons/tb';
import BreadcrumbDetail from '../../../layouts/breadcrumbs/BreadcrumbDetail';
import InfoDetail from './Info';
import Loading from '../../../layouts/loader/Loading';
import Details from './detailTabs/Details';
import CommentsBox from './detailTabs/CommentsBox';
import References from './detailTabs/References';
import Print from './Print';
import { ComponentToPrint } from '../../ComponentToPrint';
import LoadingDetails from '../../../layouts/loader/LoadingDetails';
import PrintButton from './PrintButton';
import Automation from '../../../api/http_request/Model/automation/Automation';
import { getHomeData } from '../../../api/http_request/Model/User/HomeRequest';
import Error from '../../../pages/not-found/Error';
import { setAutomationAddress } from '../../../store/automation/automationSlice';
import ExtraDetailAutomation from './ExtraDetailAutomation';

const Detail = ({ title, pageAddress }) => {
  const dispatch = useDispatch();
  const automationAddress = useSelector((state) => state.automationAddressRedux.automationAddress);
  const getAgain = useSelector((state) => state.loadingReducer.getAgain);

  const onBeforeGetContentResolve = useRef(null);
  const [activeTab, setActiveTab] = useState();
  const [printLoading, setPrintLoading] = useState(false);
  const [comments, setComments] = useState({ list: [], can_reply: false });
  const [refers, setRefers] = useState([]);
  const [detail, setDetail] = useState({});
  const [loading, setLoading] = useState(true);
  const [notFoundId, setNotFoundId] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const { id } = useParams();
  const componentRefDetail = useRef();
  const componentRefRefer = useRef();
  const componentRefComment = useRef();


  useEffect(() => {
    dispatch(setAutomationAddress(pageAddress));
  }, []);


  const handleOnBeforeGetContent = React.useCallback(() => {
    setPrintLoading(true);

    return new Promise((resolve) => {
      onBeforeGetContentResolve.current = resolve;

      setTimeout(() => {
        setPrintLoading(false);
        resolve();
      }, 2000);
    });
  }, [setPrintLoading]);

  const newActiveTab = searchParams.get('activeTab') || '1';
  useEffect(() => {

    if (newActiveTab) {

      setActiveTab(newActiveTab);
    }
  }, [automationAddress, newActiveTab]);


  // useEffect(() => {
  //
  //   if (activeTab ) {
  //
  //     // getHomeData(dispatch);
  //   }
  // }, [activeTab]);

  useEffect(() => {
    setLoading(true);
    if (activeTab === '1') {
      Automation.request({
        beforeSend: () => {
          setLoading(true);
        }, success: async (data) => {
          setDetail(data?.result);
          getHomeData(dispatch);
          // setInformation(data?.result?.detail);
        }, error: (error) => {
          if (error.error_code === 404) {
            setNotFoundId(true);
          }
        }, final: () => {
          setLoading(false);
        },
      }).automationDetail(`automation_${automationAddress}`, id);
    } else if (activeTab === '2') {
      Automation.request({
        beforeSend: () => {
          setLoading(true);
        }, error: (error) => {
          if (error.error_code === 404) {
            setNotFoundId(true);
          }
        }, success: async (data) => {
          getHomeData(dispatch);
          setComments({ list: data?.result.comments, can_reply: data?.result.detail.can_reply });
          // setInformation(data?.result.detail);
          setDetail(data?.result.detail);
        }, failed: () => {
        }, final: () => {
          setLoading(false);
        },
      }).commentList(`automation_${automationAddress}`, id);
    } else if (activeTab === '3') {
      Automation.request({
        beforeSend: () => {
          setLoading(true);
        }, error: (error) => {
          if (error.error_code === 404) {
            setNotFoundId(true);
          }
        }, success: async (data) => {
          getHomeData(dispatch);
          setRefers(data?.result.refers);
          setDetail(data?.result.detail);
          // setInformation(data?.result.detail);
        }, failed: () => {
        }, final: () => {
          setLoading(false);
        },
      }).referList(`automation_${automationAddress}`, id);
    }
  }, [activeTab, getAgain, id]);

  ////////////////////////////////

  const items = [

    {
      key: '1', label: <div className="d-flex gap-2">
        <AiOutlineFileSearch size={18} />
        <span>جزئیات</span>
        {detail?.seen === false && <TbEyeOff size={20} />}
      </div>, children: <Details

        data={detail}
        loading={loading}
      />,
    }, {
      key: '2', label: <div className="d-flex gap-2 ">
        <FaRegComment size={18} />
        <span>کامنت ها</span>
        {detail?.unseen_comments_count > 0 && (<span className="">
                <Badge color="danger">{detail?.unseen_comments_count}</Badge>
              </span>)}
      </div>, children: <CommentsBox


        data={comments}
        loading={loading}

      />,
    }, {
      key: '3', label: <div className="d-flex gap-2 ">
        <TbTransfer size={18} />
        <span>ارجاعی ها</span>
        {detail?.unseen_refers_count > 0 && (<span>
                <Badge color="danger">{detail?.unseen_refers_count}</Badge>
              </span>)}
      </div>, children: <References loading={loading} data={refers} />,
    },
  ];
  ////////////////////////////////
  return (<>
    {notFoundId ? (<Error />) : (<div>
      {printLoading && <Loading isFullLoading />}

      <div className="automation-detail-data">

        <BreadcrumbDetail linkAddress={`/automation/${automationAddress}`} title={title} id={id} useBackBtn
                          hiddenTitle />


        <div className="d-flex   flex-column-reverse flex-lg-row">
          <div className="flex-1 custom-tab-bar">


            <TabsAntd
              tabBarExtraContent={
                <ExtraDetailAutomation
                  PrintButton={<div className="d-flex align-items-center gap-2">
                    <PrintButton onBeforeGetContent={handleOnBeforeGetContent}
                      content={activeTab === '1' ? componentRefDetail : activeTab === '2' ? componentRefComment : componentRefRefer} />
                  </div>}
                  activeTab={activeTab}
                  dataId={id}
                  data={activeTab === '1' ? detail : activeTab === '2' ? comments : refers}
                  loading={loading} />
              }


              defaultActiveKey="1" activeKey={activeTab} items={items}
              onChange={(e) => {
                setSearchParams(params => {
                  params.set('activeTab', e);
                  return params;
                });

                setActiveTab(e);
              }} />


          </div>
          <div className="w-100 w-lg-250 ms-lg-3">
            {!loading ? <InfoDetail data={detail} /> : (<LoadingDetails />)}
          </div>
        </div>

      </div>

      <ComponentToPrint ref={componentRefDetail}>
        <Print detail={detail} data={detail} />
      </ComponentToPrint>
      <ComponentToPrint ref={componentRefComment}>
        <Print comments={comments.list} data={detail} />
      </ComponentToPrint>
      <ComponentToPrint ref={componentRefRefer}>
        <Print refers={refers} data={detail} />
      </ComponentToPrint>
    </div>)}
  </>);
};

export default Detail;
