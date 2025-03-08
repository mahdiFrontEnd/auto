import React from 'react';
import { BsArrowDownRightSquareFill, BsChatRightDotsFill } from 'react-icons/bs';
import { Badge } from 'antd';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { imageOnError, imageOnLoad } from '../../../functions';
import { ToggleShowNotifSidebar } from '../../../store/customizer/CustomizerSlice';

const MessageItem = ({ item, type }) => {
  const dispatch = useDispatch();

  return (
    <div className="py-1 border-bottom overflow-hidden" onClick={() => {
      dispatch(ToggleShowNotifSidebar(false));
    }}>
      <Link
        to={type === 'alert' ? `/commerce/purchase_detail/${item?.id}` : `/automation/${item?.module}/${item?.module}_detail/${item?.module_id}?activeTab=${item?.type === 'comment' ? 2 : 3}`}
        className="w-100">
        <div className="d-flex align-items-center gap-3 py-2">
          {type !== 'alert' && <>
            {item.image_of_created_by ? (<img
              alt="user"
              className="rounded-circle flex-shrink-0"
              src={item?.image_of_created_by}
              width={50}
              height={50}
              onLoad={imageOnLoad}
              onError={imageOnError}
            />) : (<div className="image-name">{item?.created_by?.charAt(0)}</div>)}</>}

          <div className="col-9 text-end">
            <h5 className="mb-0 fw-bold d-flex align-items-center justify-content-between">
              <span className="text-end fs-6 mb-2">{item?.subject}</span>
              <span className="d-none">
              {item?.type === 'comment' && <span className="text-primary"><BsChatRightDotsFill size={22} /></span>}
                {item?.type === 'new-message' && (<Badge color="secondary" pill style={{ fontSize: '10px' }}>
                  جدید
                </Badge>)}
                {item?.type === 'refer' && (
                  <span className="text-info"><BsArrowDownRightSquareFill size={22} /></span>

                )}
            </span>
            </h5>
            {
              item?.like
                ?
                <div className="d-flex align-items-center gap-2 mb-2">
                  <span style={{ fontSize: '11px' }} className="text-gray  ">{item?.created_by}</span>
                  <img width={26} src={`/filelogo/${item?.like}.png`} alt="" />

                </div>

                :

                <div
                  className={`${type !== 'alert' ? 'text-muted' : 'fw-bold text-black'} text-truncate d-block ellipsis-column`}
                  style={{ maxWidth: '100%!important' }}>{item?.body}</div>
            }
            {/*?.replace(/(<([^>]+)>)/ig, '')*/}

            <div className="d-flex justify-content-end mt-1">
              <small className="text-muted">{item?.created_at}</small>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MessageItem;