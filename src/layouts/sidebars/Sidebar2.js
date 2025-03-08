import React, { useState } from 'react';
import { Menu } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import SidebarJson from './SidebarJson2';
import useGetOpenKey from './GetOpenKey';
import { ToggleShowSidebar } from '../../store/customizer/CustomizerSlice';

const Sidebar = () => {



  const rootSubmenuKeys = ['/storehouse', '/products', '/commerce', '/usersManagement', '/Official', '/hse', '/receiptAndRemittance', '/accounting'];
  const dispatch = useDispatch();
  const showSidebar = useSelector((state) => state.customizer.showSidebar);
  const [SidebarData] = SidebarJson();
  const [initialOpenKey, selectedKeys] = useGetOpenKey();
  const [openKeys, setOpenKeys] = useState(initialOpenKey);
  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else if (openKeys.length > 1) {

      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };
  return (<>
    {showSidebar ? <div className="sidebarOverlay d-lg-none" onClick={() => {
      dispatch(ToggleShowSidebar(false));
    }} /> : ''}

    <aside className="sidebarArea ">


      <Menu className="sidebarBox custom-scroll"
            mode="inline"
            openKeys={openKeys}
            selectedKeys={selectedKeys}
            onOpenChange={onOpenChange}
            items={SidebarData}
      />


    </aside>
  </>);
};

export default Sidebar;
