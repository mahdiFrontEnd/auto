import React, { useEffect, useRef } from 'react';
import { Avatar, Tooltip } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { setShowOnlineSidebar } from '../../store/customizer/CustomizerSlice';

const OnlineSidebar = () => {
  const dispatch = useDispatch();
  const elementRef = useRef(null);
  const showOnlineSidebar = useSelector((state) => state.customizer.showOnlineSidebar);
  const onlineOffline = useSelector((state) => state.loadingReducer.onlineOffline);

  useEffect(() => {
    elementRef.current.scrollTop = 0;
  }, [showOnlineSidebar]);

  return (
    <div className="usersListAvatarBox">
      <div ref={elementRef} className={`usersListAvatar  hiddenScroll  ${showOnlineSidebar ? 'fullShow' : 'miniShow'}`}
           onClick={() => {
             dispatch(setShowOnlineSidebar(!showOnlineSidebar));
           }} style={{ height: showOnlineSidebar ? '50%' : '100px' }}>

        {onlineOffline.map((item, index) => (

          <Tooltip color="#444" placement="right" title={<div><span className="fs-7">{`${item.gender}`}</span><span className="fs-5">{`${item.first_name} ${item.last_name}`}</span><br />
            <span className="fs-7">{`${item?.chart?.role}`}</span>
            <br />
            <span className="fs-7 text-warning">{item.status === 'offline' ? item.last_seen : ''}</span></div>} mouseEnterDelay="0.3">
            <div className="bg-white item position-relative" style={{ zIndex: -index }}>
              <Avatar size={40} className="bg-white"
                      src={item.image || '/noImage.png'} />
              <span className="statusBadge" style={{backgroundColor: item.status === 'online' ? '#0aa677' : 'gray'}}></span>
            </div>
          </Tooltip>
        ))}

      </div>

    </div>
  );
};

export default OnlineSidebar;