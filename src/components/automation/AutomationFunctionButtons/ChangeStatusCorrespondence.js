import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Button, Popconfirm } from 'antd';
import { useSearchParams } from 'react-router-dom';
import { Folder2, FolderOpen } from 'iconsax-react';
import IconBtn from '../../MicroComponents/button/IconBtn';
import Automation from '../../../api/http_request/Model/automation/Automation';
import { getAgainHandler } from '../../../store/loading/LoadingSlice';

const ChangeStatusCorrespondence = ({ rowData }) => {

  const automationAddress = useSelector((state) => state.automationAddressRedux.automationAddress);
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const isPending = searchParams.get('status') === 'pending';
  const handleChangeStatus = (status) => {
    const newStatus = status === 'pending' ? 'complete' : 'pending';
    setLoading(true);
    Automation.request({
      success: (res) => {

        dispatch(getAgainHandler());
        toast.success(res.message);

      }, error: (error) => {

        toast.error(error.message);
      }, final: () => {
        setLoading(false);
      },
    }).changeCorrespondenceStatus(rowData.id, { 'automation_status': newStatus });
  };


  return (<>
    {automationAddress === 'correspondence' &&

      <Popconfirm
        placement="left"
        title="تغییر وضعیت مکاتبه"
        description={`ایا از تغییر وضعیت به مکاتبه ${isPending ? 'بسته' : 'باز'} اطمینان دارید؟`}
        onConfirm={() => handleChangeStatus(rowData.automation_status)}
        okText="بله"
        cancelText="خیر"
      >
        <div className="d-none d-md-block">
          <IconBtn
            loading={loading}
            TooltipText={isPending ? 'بستن مکاتبه' : 'باز کردن مکاتبه'}
            btnClass={isPending ? 'orangeIconBtn' : 'greenIconBtn'}
            icon={isPending ? <Folder2 variant="Bold" size={20} /> : <FolderOpen variant="Bold" size={20} />} />
        </div>

        <div className="d-md-none" style={{ width: '160px' }}>
          <Button className="text-black d-flex align-items-center gap-2 px-0 redText" type="link">

            {isPending ? <span className="orangeText"><Folder2 variant="Bold" size={20} /></span> :
              <span className="orangeText"><FolderOpen variant="Bold"
                                                       size={20} /></span>}
            <span>{isPending ? 'بستن مکاتبه' : 'باز کردن مکاتبه'}</span>
          </Button>
        </div>


      </Popconfirm>


    }</>);
};

export default ChangeStatusCorrespondence;