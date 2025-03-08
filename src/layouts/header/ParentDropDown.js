import React, { useEffect, useState } from 'react';
import { Badge, Button, Collapse, ConfigProvider, Dropdown } from 'antd';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { NotificationBing } from 'iconsax-react';
import MessageDD from './messageDD/MessageDD';
import { hasPermission } from '../../permission/module';

const ParentDropDown = () => {
  const [activeKey, setActiveKey] = useState([]);
  const [getAgainStatus, setGetAgainStatus] = useState(false);
  const [open, setOpen] = useState(false);
  const { messages_count, refers_count } = useSelector((state) => state.loadingReducer.notifCount);
  const commerce_count = useSelector((state) => state.loadingReducer.commerce_count);

  let items = [];

  const getItems = () => {

    items = [{
      label: <div className="d-flex align-items-center justify-content-between  " style={{ width: '200px' }}>
        <span>پیام ها</span><span
        className="mb-0 fs-5 text-end orangeText">{messages_count}مورد</span></div>,
      key: 'message',
      children: <div><MessageDD type="message" activeKey={activeKey} getAgainStatus={getAgainStatus} />
        <Button className="w-100 mt-4 py-3 defBtn orangeBtn">
          <Link block to="/automation/messages"> نمایش همه</Link>
        </Button>
      </div>,
    }, {
      label: <div className="d-flex align-items-center justify-content-between  " style={{ width: '200px' }}><span>ارجاعی ها</span><span
        className="mb-0 fs-5 text-end orangeText">{refers_count}مورد</span></div>,
      key: 'refer',
      children: <div><MessageDD type="refer" activeKey={activeKey} getAgainStatus={getAgainStatus} />
        <Button className="w-100 mt-4 defBtn py-3 orangeBtn">
          <Link block to="/automation/refers"> نمایش همه</Link>
        </Button>
      </div>,
    }];


    if (hasPermission('commerce_purchase', ['create'])) {

      items.push({
        label: <div className="d-flex align-items-center justify-content-between  " style={{ width: '200px' }}><span>هشدار ها</span><span
          className="mb-0 fs-5 text-end orangeText">{commerce_count}مورد</span></div>

        , key: 'alert', children: <MessageDD type="alert" activeKey={activeKey} getAgainStatus={getAgainStatus} />,
      });
    }
    return items;

  };
  useEffect(() => {
    setOpen(getAgainStatus);
  }, [getAgainStatus]);
  return (<div>
    <Dropdown style={{ minWidth: '260px' }}
              rootClassName="hiddenArrow"
              onOpenChange={setGetAgainStatus}
              open={open}
              dropdownRender={() => (<Collapse
                accordion
                activeKey={activeKey}
                onChange={setActiveKey}
                style={{ backgroundColor: '#f3f3f3' }}
                onClick={(e) => e?.stopPropagation()}
                items={getItems()} />)}
              menu={{ items: [] }}
              trigger={['click']}>


      <div className="cursor-pointer">
        <ConfigProvider direction="ltr">
          <Badge color="orange"
                 count={messages_count || 0 + refers_count || 0 + (hasPermission('commerce_purchase', ['create']) ? commerce_count : 0)}>
            <NotificationBing
              size="25"
            /> </Badge>
        </ConfigProvider>
      </div>


    </Dropdown>


  </div>);
};

export default ParentDropDown;



