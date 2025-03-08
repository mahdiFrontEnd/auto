import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../loader/Loading';
import EndMsg from './EndMsg';
import Automation from '../../../api/http_request/Model/automation/Automation';
import MessageItem from './MessageItem';
import { getHomeData } from '../../../api/http_request/Model/User/HomeRequest';

function MessageDD({ type, activeKey }) {
  const showNotifSidebar = useSelector((state) => state.customizer.showNotifSidebar);
  const dispatch = useDispatch();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, sethasMore] = useState(true);
  const [skip, setSkip] = useState(0);

   useEffect(() => {
    if(showNotifSidebar && JSON.stringify(activeKey) !== '[]'){
      setSkip(0);
      setItems([]);
    }


  }, [showNotifSidebar, JSON.stringify(activeKey)]);
  useEffect(() => {
    if (skip === 0 && JSON.stringify(items) === '[]') {
       fetchMessages();
      getHomeData(dispatch);
    }

  }, [skip, JSON.stringify(items)]);
  const fetchMessages = async () => {
    const params = { skip, take: 5 };
    if (type === 'message' || type === 'refer') {
      params.read = 2;
    }
    setLoading(true);
    Automation.request({
      success: (result) => {
        const value = result.result.data;
        setItems([...items, ...value]);
        if (value.length === 0 || value.length < 5) {
          sethasMore(false);

        } else {
          setSkip(items.length + 5);
        }
      }, final: () => {
        setLoading(false);
      },
    }).addParams(params).getMessage(type);


  };

  return (<div style={{ minWidth: '260px' }}>
    <InfiniteScroll
      dataLength={items.length} //This is important field to render the next data
      next={fetchMessages}
      hasMore={hasMore}
      loader={loading && <Loading isSpinner />}
      endMessage={items.length ? <EndMsg /> : ''}
      height={250}
    >
      {loading && items.length === 0 ? (<Loading isMassageList type={type} />) : <>{items.map((item) => (
        <MessageItem key={item?.id} item={item} type={type} />
      ))}</>}
      {!loading && items.length === 0 && (<div className="p-3 text-center w-100 h4 ">موردی یافت نشد.</div>)}
    </InfiniteScroll>
  </div>);
}

export default MessageDD;
