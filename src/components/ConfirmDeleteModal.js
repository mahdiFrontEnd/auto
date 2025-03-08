import React, { useState } from 'react';

import { Button, Modal } from 'antd';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { Trash } from 'iconsax-react';
import IconBtn from './MicroComponents/button/IconBtn';
import { getAgainHandler } from '../store/loading/LoadingSlice';
import Automation from '../api/http_request/Model/automation/Automation';


const ConfirmDeleteModal = ({
                              id,
                              apiAddress,
                              modalTitle = 'حذف',
                              tooltip = 'حذف',
                              submitButtonText = 'حذف',
                              description = ' آیا برای حذف اطمینان دارید؟',
                              icon = <Trash variant="Bold" size={22} />,
                            }) => {

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const onFinish = () => {
    setLoading(true);
    Automation.request({
      success: (res) => {
        handleCancel();
        dispatch(getAgainHandler());
        toast.success(res.message);
      }, error: ({ response }) => {
        handleCancel();
        toast.error(response.data.errors.error);
      }, final: () => {
        setLoading(false);
      },
    }).handleDelete(apiAddress, id);
  };

  return (<>
    <div onClick={showModal}><IconBtn TooltipText={tooltip} btnClass="redIconBtn" icon={icon} />
    </div>

    <Modal
      open={open}
      title={modalTitle}
      onCancel={handleCancel}
      footer={[
        //   <Button key="back" onClick={handleCancel}>
        //   انصراف
        // </Button>, <Button className="defBtn orangeBtn px-4" key="submit" loading={loading} onClick={onFinish}>
        //   {submitButtonText}
        // </Button>,

        <Button key="back" onClick={handleCancel}>
          انصراف
        </Button>, <Button className="defBtn orangeBtn px-4" key="submit" loading={loading} onClick={onFinish}>
          {submitButtonText}
        </Button>,


        // <Button key="back" onClick={handleCancel}>
        //   انصراف
        // </Button>,
        // <Button key="submit" className="defBtn orangeBtn px-4" loading={loading} onClick={onFinish}>
        //   {submitButtonText}
        // </Button>,
      ]}
    >
      {description}
    </Modal>
  </>);
};


export default ConfirmDeleteModal;