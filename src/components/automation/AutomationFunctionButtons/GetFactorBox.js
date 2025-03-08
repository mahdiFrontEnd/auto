import React, { useState } from 'react';
import { Button, Popconfirm } from 'antd';
import { toast } from 'react-toastify';
import Automation from '../../../api/http_request/Model/automation/Automation';

const GetFactorBox = () => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const confirm = () => {


    setLoading(true);
    Automation.request({
      success: () => {
        setOpen(false)
      },
      error: (error) => {

        toast.error(error.message);
      },
      final: () => {
        setLoading(false);
      },
    }).deleteAutomation();

  };
  return (
    <div className="flex-1 w-100">
      <Popconfirm
        title="دریافت فاکتور اصلی"
        description="فاکتور اصلی را دریافت کردید؟"
        okText="بله"
        cancelText="خیر"
        open={open}
        className="w-100"
        onConfirm={confirm}
      >
        <Button loading={loading} className="w-100 defBtn blueBtn">دریافت فاکتور</Button>
      </Popconfirm>
    </div>
  );
};

export default GetFactorBox;