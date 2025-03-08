import React, { useState } from 'react';
import { Badge, Button, Collapse, ConfigProvider, Drawer } from 'antd';
import { NotificationBing } from 'iconsax-react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { hasPermission } from '../../permission/module';
import MessageDD from './messageDD/MessageDD';
import { ToggleShowNotifSidebar } from '../../store/customizer/CustomizerSlice';

const NotifSidebar = () => {
  const dispatch = useDispatch();

  const showNotifSidebar = useSelector((state) => state.customizer.showNotifSidebar);
  const { messages_count, refers_count } = useSelector((state) => state.loadingReducer.notifCount);
  const commerce_count = useSelector((state) => state.loadingReducer.commerce_count);
  const [activeKey, setActiveKey] = useState([]);

  let items = [];

  const getItems = () => {

    items = [{
      label: <div className="d-flex align-items-center justify-content-between  ">
        <span>پیام ها</span><span
        className="mb-0 fs-5 text-end orangeText">{messages_count}مورد</span></div>,
      key: 'message',
      children: <div><MessageDD type="message" activeKey={activeKey} getAgainStatus={showNotifSidebar} />

        <Link block to="/automation/messages"><Button onClick={() => {
          dispatch(ToggleShowNotifSidebar(false));
        }} className="w-100 mt-4 py-3 defBtn orangeBtn"> نمایش
          همه</Button></Link>

      </div>,
    }, {
      label: <div className="d-flex align-items-center justify-content-between  "><span>ارجاعی ها</span><span
        className="mb-0 fs-5 text-end orangeText">{refers_count}مورد</span></div>,
      key: 'refer',
      children: <div><MessageDD type="refer" activeKey={activeKey} getAgainStatus={showNotifSidebar} />

        <Link block to="/automation/refers"><Button onClick={() => {
          dispatch(ToggleShowNotifSidebar(false));
        }} className="w-100 mt-4 defBtn py-3 orangeBtn"> نمایش
          همه </Button></Link>

      </div>,
    }];


    if (hasPermission('commerce_purchase', ['create'])) {

      items.push({
        label: <div className="d-flex align-items-center justify-content-between  "><span>هشدار ها</span><span
          className="mb-0 fs-5 text-end orangeText">{commerce_count}مورد</span></div>

        , key: 'alert', children: <MessageDD type="alert" activeKey={activeKey} getAgainStatus={showNotifSidebar} />,
      });
    }
    return items;

  };
  return (
    <div className="NotifSidebar">
      <div className="cursor-pointer" onClick={() => {
        dispatch(ToggleShowNotifSidebar(true));
      }}>
        <ConfigProvider
          direction="ltr"
        ><Badge color="orange"
                count={(messages_count || 0) + (refers_count || 0) + (hasPermission('commerce_purchase', ['create']) ? commerce_count : 0)}>
          <NotificationBing
            size="25"
          /> </Badge></ConfigProvider>
      </div>

      <Drawer
        styles={{ body: { padding: 0 } }}
        className="customDrawer"
        title="اعلان ها"
        placement="left"
        closable
        onClose={() => {
          dispatch(ToggleShowNotifSidebar(false));
        }}
        open={showNotifSidebar}
        width="300px"
      >
        <Collapse
          accordion bordered={false}
          activeKey={activeKey}
          onChange={setActiveKey}
          style={{ backgroundColor: 'white' }}
          onClick={(e) => e?.stopPropagation()}
          items={getItems()} />
      </Drawer>
    </div>
  );
};

export default NotifSidebar;