import React, { useState } from 'react';
import { Button, Modal, Space } from 'antd';
import { BsCpu } from 'react-icons/bs';
import { toast } from 'react-toastify';
import Automation from '../../../api/http_request/Model/automation/Automation';
import Loader from '../../../layouts/loader/Loader';

const AiModal = ({ body, setInitialData }) => {
  const [newText, setNewText] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState();

  // const items = [
  //   {
  //     label: <div onClick={() => {
  //       showModal(1);
  //     }} className="py-2 d-flex gap-2 align-items-center"><ArrowDown size="18" /><span>برای مقام پایین دستی</span>
  //     </div>,
  //     key: '1',
  //
  //   },
  //   {
  //     label: <div onClick={() => {
  //       showModal(2);
  //     }} className="py-2 d-flex gap-2 align-items-center"><ArrowUp size="18" /><span>برای مقام بالا دستی</span></div>,
  //     key: '2',
  //
  //   },
  //   {
  //     label: <div onClick={() => {
  //       showModal(2);
  //     }} className="py-2 d-flex gap-2 align-items-center"><ArrowSwapHorizontal size="18" /><span>برای مقام هم رده</span>
  //     </div>,
  //     key: '3',
  //
  //   },
  //
  // ];

  const showModal = (type) => {
    if (body.length >= 80 && body.length < 1000) {
      getData(type);
      setIsModalOpen(true);
    } else {
      toast.error('برای استفاده از امکان اصلاح توسط هوش مصنوعی، متن شما حداقل باید دارای یک پاراگراف باشد.');
    }
  };
  const handleOk = () => {
setIsModalOpen(false);
    setInitialData(newText);
  };
  const handleCancel = () => {
    setNewText();
    setErrorText();
    setIsModalOpen(false);
  };


  const getData = (type) => {
    Automation.request({
      beforeSend: () => {
        setLoading(true);
      },
      success: ({ data }) => {
        setNewText(data);
        console.log(7777);
      },
      error: (error) => {

        setErrorText(error.data);
      },
      final: () => {
        setLoading(false);
      },

    }).handleAi({ type, body });
  };
  return (
    <div>
        <Button className="defBtn blueBtn" onClick={() => {
          showModal(1);
        }}>
          <Space>
            <BsCpu size={20} />
            اصلاح با هوش مصنوعی
          </Space>
        </Button>
      <Modal
        width={700}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            انصراف
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk} disabled={loading || !newText}>
            جایگزین کردن
          </Button>,
        ]}
        title="اصلاح با هوش مصنوعی" open={isModalOpen}>
        <div className="py-4">
          {loading ? <div>
            <Loader />
            <p className="text-center mt-4">لطفا منتظر بمانید...</p>
          </div> : ''}
          {newText ? <div className="lh-lg">
            <p className="fw-bold text-center">با کلیک بر روی دکمه (جایگزین کردن) متن اصلاح شده در فرم ارسالی شما نمایش
              داده میشود و در انجا امکان ویرایش
              خواهید داشت.</p>

            <div className="rounded-2 p-2" style={{ backgroundColor: '#eee' }}>
              <h5 className="fw-bold py-3 text-center rounded-2 bg-white orangeText">متن اصلاح شده</h5>
              <div className="p-2" style={{ backgroundColor: '#eee' }} dangerouslySetInnerHTML={{ __html: newText }} />
            </div>

          </div> : ''}


          {
            errorText ?
              <div className="fw-bold text-danger text-center" dangerouslySetInnerHTML={{ __html: errorText }} /> : ''
          }
        </div>

      </Modal>


    </div>
  );
};

export default AiModal;